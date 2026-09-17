/*
 * Created: 2026-09-16
 * Author: ckyasb
 * Purpose: Verify the built garden in a real Chromium browser without npm dependencies.
 * Added: Search, companion, preference, motion, mobile and math smoke checks with screenshots.
 */

import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { mkdtemp, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { setTimeout as delay } from "node:timers/promises";

const [baseUrl, chromePath] = process.argv.slice(2);
if (!baseUrl || !chromePath || typeof WebSocket === "undefined") {
  throw new Error("Usage: node --experimental-websocket scripts/verify_site.mjs <site-url> <chromium-path>");
}
const artifacts = await mkdtemp(join(tmpdir(), "garden-browser-check-"));
const browser = spawn(chromePath, [
  "--headless=new", "--no-sandbox", "--disable-dev-shm-usage",
  // CI hosts may have no physical mouse; emulate desktop pointer capabilities.
  "--blink-settings=primaryPointerType=4,availablePointerTypes=4,primaryHoverType=2,availableHoverTypes=2",
  "--remote-debugging-port=0", `--user-data-dir=${join(artifacts, "profile")}`, "about:blank",
], { stdio: "ignore" });
let launchError;
browser.on("error", (error) => { launchError = error; });
let socket;
const pending = new Map();
const scriptErrors = [];
const localFailures = [];
let requestId = 0;

async function eventually(check, description, timeout = 15000) {
  const deadline = Date.now() + timeout;
  while (Date.now() < deadline) {
    if (launchError) throw launchError;
    if (await check()) return;
    await delay(100);
  }
  throw new Error(`Timed out: ${description}`);
}

function command(method, params = {}) {
  const id = ++requestId;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP command timed out: ${method}`));
    }, 15000);
    pending.set(id, { resolve, reject, timer });
    socket.send(JSON.stringify({ id, method, params }));
  });
}

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", { expression, returnByValue: true, awaitPromise: true });
  if (result.exceptionDetails) throw new Error(JSON.stringify(result.exceptionDetails));
  return result.result.value;
}

async function navigate(path = "") {
  const url = new URL(path, baseUrl).href;
  await command("Page.navigate", { url });
  await eventually(() => evaluate(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && !!document.querySelector('.seele-companion')`), `load ${path || "home"}`, 30000);
}

async function click(selector) {
  const point = await evaluate(`(() => {
    const element = document.querySelector(${JSON.stringify(selector)});
    if (!element) throw new Error('Missing click target');
    const box = element.getBoundingClientRect();
    return {x: box.x + box.width / 2, y: box.y + box.height / 2};
  })()`);
  await command("Input.dispatchMouseEvent", { type: "mousePressed", ...point, button: "left", clickCount: 1 });
  await command("Input.dispatchMouseEvent", { type: "mouseReleased", ...point, button: "left", clickCount: 1 });
}

async function screenshot(name) {
  const { data } = await command("Page.captureScreenshot", { format: "png" });
  await writeFile(join(artifacts, `${name}.png`), Buffer.from(data, "base64"));
}

async function noOverflow() {
  assert.ok(await evaluate("document.documentElement.scrollWidth <= window.innerWidth + 1"), "Page should not overflow horizontally");
}

try {
  let debuggingPort;
  await eventually(async () => {
    try {
      debuggingPort = (await readFile(join(artifacts, "profile", "DevToolsActivePort"), "utf8")).split("\n")[0];
      return true;
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
      if (browser.exitCode !== null) throw new Error(`Chromium exited with ${browser.exitCode}`);
      return false;
    }
  }, "Chromium startup");
  const response = await fetch(`http://127.0.0.1:${debuggingPort}/json/new?about:blank`, { method: "PUT" });
  const tab = await response.json();
  socket = new WebSocket(tab.webSocketDebuggerUrl);
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    if (message.id && pending.has(message.id)) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      clearTimeout(request.timer);
      if (message.error) request.reject(new Error(JSON.stringify(message.error)));
      else request.resolve(message.result);
    }
    if (message.method === "Runtime.exceptionThrown") scriptErrors.push(message.params.exceptionDetails);
    if (message.method === "Network.responseReceived") {
      const { url, status } = message.params.response;
      if (url.startsWith(baseUrl) && status >= 400) localFailures.push({ url, status });
    }
  });
  await new Promise((resolve, reject) => {
    socket.addEventListener("open", resolve, { once: true });
    socket.addEventListener("error", reject, { once: true });
  });
  await command("Page.enable");
  await command("Runtime.enable");
  await command("Network.enable");
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await command("Emulation.setTouchEmulationEnabled", { enabled: false });
  await navigate();
  await noOverflow();
  assert.equal(await evaluate("document.querySelectorAll('.garden-path').length"), 3);
  assert.equal(await evaluate("document.querySelectorAll('.seele-character').length"), 1);
  assert.ok(await evaluate("!document.querySelector('.seele-companion').textContent.includes('黑希')"));
  await eventually(() => evaluate("[...document.querySelectorAll('.seele-character img')].every(image => image.complete && image.naturalWidth > 0)"), "portrait images loaded");
  assert.ok(await evaluate("document.querySelector('[data-character=seele] img').src.endsWith('seele-rebirth-animated.webp')"));
  assert.ok(await evaluate("document.documentElement.classList.contains('butterflies-on')"), JSON.stringify(await evaluate("({ finePointer: matchMedia('(hover: hover) and (pointer: fine)').matches, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches, label: document.querySelector('.seele-effects-toggle').textContent })")));
  assert.equal(await evaluate("document.querySelectorAll('#butterfly-swarm').length"), 1);
  const catBefore = await evaluate("document.querySelector('#butterfly-swarm img').style.transform");
  await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: 650, y: 450 });
  await delay(700);
  assert.notEqual(await evaluate("document.querySelector('#butterfly-swarm img').style.transform"), catBefore);
  assert.equal(await evaluate("getComputedStyle(document.querySelector('#butterfly-swarm')).pointerEvents"), "none");
  await evaluate("document.documentElement.dispatchEvent(new MouseEvent('mouseleave'))");
  assert.ok(await evaluate("document.querySelector('#butterfly-swarm').hidden"));
  const pausedPosition = await evaluate("document.querySelector('#butterfly-swarm').innerHTML");
  await delay(300);
  assert.equal(await evaluate("document.querySelector('#butterfly-swarm').innerHTML"), pausedPosition);
  await command("Input.dispatchMouseEvent", { type: "mouseMoved", x: 1200, y: 700 });
  assert.ok(await evaluate("!document.querySelector('#butterfly-swarm').hidden"));
  await command("Emulation.setDeviceMetricsOverride", { width: 640, height: 480, deviceScaleFactor: 1, mobile: false });
  await eventually(() => evaluate("document.querySelector('#butterfly-swarm').getBoundingClientRect().right <= innerWidth && document.querySelector('#butterfly-swarm').getBoundingClientRect().bottom <= innerHeight"), "swarm stays inside resized viewport");
  await command("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  await screenshot("home-light");
  console.log("PASS: home, portraits, desktop layout and butterfly swarm");

  await click('[data-character="seele"]');
  const firstLine = await evaluate("document.querySelector('.seele-speech p').textContent");
  await click('[data-character="seele"]');
  assert.notEqual(await evaluate("document.querySelector('.seele-speech p').textContent"), firstLine);
  await click('[data-character="seele"]');
  assert.equal(await evaluate("document.querySelector('.seele-speech').dataset.speaker"), "seele");
  await screenshot("companions-dialogue");
  await command("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  assert.ok(await evaluate("document.querySelector('.seele-speech').hidden"));

  await delay(900);
  await click(".garden-intro h1");
  assert.equal(await evaluate("document.querySelectorAll('.butterfly-particle').length"), 6);
  await delay(1000);
  assert.equal(await evaluate("document.querySelectorAll('.butterfly-particle').length"), 0);
  await click(".seele-effects-toggle");
  await navigate();
  assert.ok(await evaluate("!document.documentElement.classList.contains('butterflies-on')"));
  assert.equal(await evaluate("document.querySelectorAll('#butterfly-swarm').length"), 0);
  await click(".garden-intro h1");
  assert.equal(await evaluate("document.querySelectorAll('.butterfly-particle').length"), 0);
  await click(".seele-effects-toggle");
  await click(".seele-collapse");
  await navigate();
  assert.ok(await evaluate("document.querySelector('.seele-panel').hidden"));
  assert.ok(await evaluate("document.querySelector('[data-character=seele] img').src.endsWith('seele-rebirth-still.webp')"));
  await click(".seele-restore");
  assert.ok(await evaluate("!document.querySelector('.seele-panel').hidden"));
  await evaluate("document.querySelector('[data-character=seele]').focus()");
  await command("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r", unmodifiedText: "\r" });
  await command("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
  assert.ok(await evaluate("!document.querySelector('.seele-speech').hidden"));
  console.log("PASS: single character, keyboard, particle cleanup and persistent preferences");

  await click(".md-search__input");
  await command("Input.insertText", { text: "广义相对论" });
  await eventually(() => evaluate("document.querySelectorAll('.md-search-result__link').length > 0"), "Chinese search results");
  assert.equal(await evaluate("getComputedStyle(document.querySelector('.seele-companion')).visibility"), "hidden");
  assert.ok(await evaluate("document.querySelector('#butterfly-swarm').hidden"));
  await screenshot("search");
  await command("Input.dispatchKeyEvent", { type: "keyDown", key: "Escape", code: "Escape", windowsVirtualKeyCode: 27 });
  await navigate();
  await click('label[for="__palette_1"]');
  assert.equal(await evaluate("document.body.dataset.mdColorScheme"), "slate");
  await screenshot("home-dark");
  console.log("PASS: Chinese search, search overlay and dark theme");

  await navigate("Physics/广义相对论/06黑洞物理/");
  await eventually(() => evaluate("!!document.querySelector('mjx-container')"), "MathJax formulas", 30000);
  await evaluate("window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * .58)");
  await eventually(() => evaluate("!document.querySelector('.seele-speech').hidden"), "reading milestone");
  assert.equal(await evaluate("document.querySelector('.seele-speech').dataset.speaker"), "seele");
  const milestoneLine = await evaluate("document.querySelector('.seele-speech p').textContent");
  await evaluate("window.scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * .9)");
  await delay(150);
  assert.equal(await evaluate("document.querySelector('.seele-speech p').textContent"), milestoneLine, "Scroll dialogue must respect cooldown");
  await noOverflow();
  await screenshot("course-dark");
  console.log("PASS: nested-page assets, formulas, scroll dialogue and cooldown");

  await command("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  await eventually(() => evaluate("!document.documentElement.classList.contains('butterflies-on')"), "reduced motion");
  assert.ok(await evaluate("document.querySelector('.seele-effects-toggle').disabled"));
  assert.ok(await evaluate("document.querySelector('[data-character=seele] img').src.endsWith('seele-rebirth-still.webp')"));
  await click('[data-character="seele"]');
  assert.equal(await evaluate("getComputedStyle(document.querySelector('[data-character=seele] img')).animationName"), "none");
  await command("Emulation.setEmulatedMedia", { features: [] });
  await command("Emulation.setDeviceMetricsOverride", { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await command("Emulation.setTouchEmulationEnabled", { enabled: true, maxTouchPoints: 1 });
  await navigate();
  await click('label[for="__palette_0"]');
  await noOverflow();
  assert.ok(await evaluate("!document.documentElement.classList.contains('butterflies-on')"));
  await click('[data-character="seele"]');
  assert.ok(await evaluate("document.querySelector('.seele-speech').getBoundingClientRect().left >= 0"));
  await screenshot("home-mobile");
  await navigate("Physics/广义相对论/06黑洞物理/");
  await noOverflow();
  await screenshot("course-mobile");
  console.log("PASS: reduced motion, touch layout, mobile speech and mobile formulas");

  const blockedStorage = await command("Page.addScriptToEvaluateOnNewDocument", { source: `
    for (const name of ['getItem', 'setItem']) {
      const original = Storage.prototype[name];
      Storage.prototype[name] = function(key, ...args) {
        if (key.startsWith('garden.')) throw new DOMException('Test blocked storage', 'SecurityError');
        return original.call(this, key, ...args);
      };
    }
  ` });
  await navigate();
  await click(".seele-collapse");
  assert.ok(await evaluate("document.querySelector('.seele-panel').hidden"));
  assert.ok(await evaluate("document.querySelector('[data-character=seele] img').src.endsWith('seele-rebirth-still.webp')"));
  await click(".seele-restore");
  await click('[data-character="seele"]');
  assert.ok(await evaluate("!document.querySelector('.seele-speech').hidden"));
  await command("Page.removeScriptToEvaluateOnNewDocument", { identifier: blockedStorage.identifier });
  assert.deepEqual(scriptErrors, [], "Browser should have no uncaught script errors");
  assert.deepEqual(localFailures, [], "Local resources should load successfully");
  console.log("PASS: storage unavailable; no uncaught errors or local HTTP failures");
  console.log(`Screenshots: ${artifacts}`);
} catch (error) {
  if (socket?.readyState === WebSocket.OPEN) {
    await screenshot("failure");
    console.error("Browser exceptions:", JSON.stringify(scriptErrors));
    console.error(`Failure screenshot: ${artifacts}`);
  }
  throw error;
} finally {
  if (socket?.readyState === WebSocket.OPEN) socket.close();
  browser.kill();
  for (const request of pending.values()) clearTimeout(request.timer);
}
