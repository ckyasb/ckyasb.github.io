/*
 * Created: 2026-09-16
 * Author: ckyasb
 * Purpose: Add Seele as optional reading companions.
 * Added: Original dialogue, scroll milestones, persistent controls and butterfly effects.
 */

(() => {
  "use strict";

  if (document.querySelector(".seele-companion")) return;

  const scriptUrl = document.currentScript.src;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const dialogue = {
    seele: [
      "今天也一起读一点吧。不着急，希儿陪着你。",
      "遇到难懂的地方，就先留一个小书签吧。",
      "每弄懂一个小问题，都像多点亮了一只蝴蝶。",
      "要不要试试把刚才的结论，用自己的话讲一遍？",
      "如果有点累了，看看窗外也很好呀。",
    ],
  };
  const dialogueIndex = { seele: 0 };
  const milestones = [
    { progress: .25, speaker: "seele", text: "已经走过一小段啦。有什么想记下来的发现吗？" },
    { progress: .55, speaker: "seele", text: "读到这里了。回想一下，这一页最重要的结论是什么？" },
    { progress: .85, speaker: "seele", text: "快读完啦。把今天的一点收获带走吧。" },
  ];

  function readPreference(key, fallback) {
    try {
      const value = localStorage.getItem(`garden.${key}`);
      return value === null ? fallback : value === "true";
    } catch {
      // Some privacy modes block storage; interactions remain available in memory.
      console.info("阅读伙伴：浏览器不允许读取偏好，本页使用默认设置。");
      return fallback;
    }
  }

  function savePreference(key, value) {
    try {
      localStorage.setItem(`garden.${key}`, String(value));
    } catch {
      console.info("阅读伙伴：浏览器不允许保存偏好，设置仅在本页生效。");
    }
  }

  let collapsed = readPreference("companions-collapsed", false);
  let butterfliesEnabled = readPreference("butterflies-enabled", true);
  let lastSpokenAt = -Infinity;
  let lastMilestone = -1;
  let speechTimer;
  let scrollFrame;
  let pointerStart;
  let lastBurstAt = -Infinity;
  let stopSwarm;

  const companion = document.createElement("aside");
  companion.className = "seele-companion";
  companion.setAttribute("aria-label", "希儿阅读伙伴");
  // This template is constant. Dialogue is inserted with textContent, never HTML.
  companion.innerHTML = `
    <div class="seele-speech" hidden>
      <div role="status" aria-live="polite" aria-atomic="true">
        <strong></strong><p></p>
      </div>
      <button class="seele-dismiss" type="button" aria-label="关闭对话">×</button>
    </div>
    <div class="seele-panel" id="seele-panel">
      <div class="seele-stage">
        <button class="seele-character" type="button" data-character="seele" aria-label="和希儿聊聊" title="点点希儿，听一句小提醒">
          <img alt="希儿的死生之律者 Q 版形象" width="92" height="126" draggable="false">
          <span>希儿</span>
        </button>
      </div>
      <div class="seele-toolbar">
        <button class="seele-effects-toggle" type="button" aria-label="蝴蝶群与点击特效" aria-pressed="true">蝴蝶：开</button>
        <button class="seele-collapse" type="button" aria-label="收起阅读伙伴" aria-controls="seele-panel" aria-expanded="true">收起</button>
      </div>
    </div>
    <button class="seele-restore" type="button" aria-controls="seele-panel" aria-expanded="false" hidden>唤回希儿</button>
  `;
  document.body.append(companion);

  const speech = companion.querySelector(".seele-speech");
  const panel = companion.querySelector(".seele-panel");
  const restoreButton = companion.querySelector(".seele-restore");
  const effectsButton = companion.querySelector(".seele-effects-toggle");
  const collapseButton = companion.querySelector(".seele-collapse");
  const characterButtons = companion.querySelectorAll(".seele-character");

  characterButtons.forEach((button) => {
    const character = button.dataset.character;
    const portrait = button.querySelector("img");
    portrait.src = new URL("../assets/characters/seele-rebirth-still.webp", scriptUrl).href;
    portrait.addEventListener("error", () => {
      portrait.hidden = true;
      console.warn(`阅读伙伴：${character} 的图片加载失败，仍可通过名字按钮互动。`);
    });
    button.addEventListener("click", () => {
      const lines = dialogue[character];
      showMessage(character, lines[dialogueIndex[character] % lines.length]);
      dialogueIndex[character] += 1;
    });
  });

  function hideSpeech() {
    window.clearTimeout(speechTimer);
    speech.hidden = true;
    characterButtons.forEach((button) => button.classList.remove("is-speaking"));
  }

  function overlayIsOpen() {
    return Boolean(document.querySelector("#__search:checked, #__drawer:checked"));
  }

  function updatePortraitMotion() {
    // CSS cannot pause an animated image; switch to a separate static asset.
    const animate = !reducedMotion.matches && !collapsed && !document.hidden && !overlayIsOpen();
    const portrait = companion.querySelector('[data-character="seele"] img');
    const filename = animate ? "seele-rebirth-animated.webp" : "seele-rebirth-still.webp";
    const source = new URL(`../assets/characters/${filename}`, scriptUrl).href;
    if (portrait.src !== source) portrait.src = source;
  }

  function showMessage(character, text) {
    if (collapsed || document.hidden || overlayIsOpen()) return;
    hideSpeech();
    speech.dataset.speaker = character;
    speech.querySelector("strong").textContent = "希儿";
    speech.querySelector("p").textContent = text;
    speech.hidden = false;
    companion.querySelector(`[data-character="${character}"]`).classList.add("is-speaking");
    lastSpokenAt = performance.now();
    speechTimer = window.setTimeout(hideSpeech, 6500);
  }

  function updateCollapsedState() {
    panel.hidden = collapsed;
    restoreButton.hidden = !collapsed;
    collapseButton.setAttribute("aria-expanded", String(!collapsed));
    restoreButton.setAttribute("aria-expanded", String(!collapsed));
    if (collapsed) hideSpeech();
    updatePortraitMotion();
  }

  collapseButton.addEventListener("click", () => {
    collapsed = true;
    savePreference("companions-collapsed", true);
    updateCollapsedState();
    restoreButton.focus({ preventScroll: true });
  });
  restoreButton.addEventListener("click", () => {
    collapsed = false;
    savePreference("companions-collapsed", false);
    updateCollapsedState();
    characterButtons[0].focus({ preventScroll: true });
  });
  companion.querySelector(".seele-dismiss").addEventListener("click", () => {
    const speaker = speech.dataset.speaker;
    hideSpeech();
    companion.querySelector(`[data-character="${speaker}"]`).focus({ preventScroll: true });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideSpeech();
  });
  document.querySelectorAll("#__search, #__drawer").forEach((toggle) => {
    toggle.addEventListener("change", () => {
      hideSpeech();
      updatePortraitMotion();
    });
  });

  function effectsAreActive() {
    return butterfliesEnabled && finePointer.matches && !reducedMotion.matches;
  }

  function updateEffects() {
    const active = effectsAreActive();
    document.documentElement.classList.toggle("butterflies-on", active);
    if (active && !stopSwarm) {
      stopSwarm = window.startButterflySwarm(new URL("../assets/characters/butterfly-blue.svg", scriptUrl).href);
    } else if (!active && stopSwarm) {
      stopSwarm();
      stopSwarm = undefined;
    }
    effectsButton.setAttribute("aria-pressed", String(active));
    effectsButton.disabled = reducedMotion.matches || !finePointer.matches;
    effectsButton.textContent = reducedMotion.matches ? "静态模式" : !finePointer.matches ? "触屏模式" : butterfliesEnabled ? "蝴蝶：开" : "蝴蝶：关";
    effectsButton.title = reducedMotion.matches ? "已遵循系统的减少动态效果设置" : !finePointer.matches ? "连接鼠标后可使用蝴蝶群" : "切换蝴蝶群与点击特效";
    if (!active) document.querySelectorAll(".butterfly-particle").forEach((particle) => particle.remove());
  }

  effectsButton.addEventListener("click", () => {
    butterfliesEnabled = !butterfliesEnabled;
    savePreference("butterflies-enabled", butterfliesEnabled);
    updateEffects();
  });
  reducedMotion.addEventListener("change", updateEffects);
  reducedMotion.addEventListener("change", updatePortraitMotion);
  finePointer.addEventListener("change", updateEffects);

  // One frame per scroll tick; automatic dialogue is separated by at least 12 seconds.
  function checkReadingProgress() {
    scrollFrame = undefined;
    if (collapsed || document.hidden || overlayIsOpen() || performance.now() - lastSpokenAt < 12000) return;
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollableHeight < 800) return;
    const progress = window.scrollY / scrollableHeight;
    const reached = milestones.findLastIndex((milestone) => progress >= milestone.progress);
    if (reached <= lastMilestone) return;
    lastMilestone = reached;
    showMessage(milestones[reached].speaker, milestones[reached].text);
  }
  window.addEventListener("scroll", () => {
    if (scrollFrame === undefined) scrollFrame = requestAnimationFrame(checkReadingProgress);
  }, { passive: true });

  document.addEventListener("pointerdown", (event) => {
    pointerStart = event.isPrimary && event.button === 0 ? { x: event.clientX, y: event.clientY } : undefined;
  }, { passive: true });
  document.addEventListener("pointerup", (event) => {
    const start = pointerStart;
    pointerStart = undefined;
    if (!start || event.pointerType !== "mouse" || event.button !== 0 || !effectsAreActive()) return;
    if (Math.hypot(event.clientX - start.x, event.clientY - start.y) > 6) return;
    if (window.getSelection()?.isCollapsed === false || overlayIsOpen()) return;
    if (event.target.closest("input, textarea, select, [contenteditable], .seele-toolbar, .seele-restore")) return;
    if (performance.now() - lastBurstAt < 120 || document.querySelectorAll(".butterfly-particle").length >= 24) return;
    lastBurstAt = performance.now();
    for (let index = 0; index < 6; index += 1) {
      const particle = document.createElement("span");
      particle.className = "butterfly-particle";
      particle.setAttribute("aria-hidden", "true");
      const angle = (index / 6) * Math.PI * 2;
      particle.style.left = `${event.clientX}px`;
      particle.style.top = `${event.clientY}px`;
      particle.style.setProperty("--fly-x", `${Math.cos(angle) * 42}px`);
      particle.style.setProperty("--fly-y", `${Math.sin(angle) * 34 - 24}px`);
      particle.style.setProperty("--turn", `${index * 45}deg`);
      document.body.append(particle);
      // A timer also cleans up when animations are interrupted or disabled mid-flight.
      window.setTimeout(() => particle.remove(), 850);
    }
  }, { passive: true });
  document.addEventListener("pointercancel", () => { pointerStart = undefined; }, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) hideSpeech();
    updatePortraitMotion();
  });

  updateCollapsedState();
  updateEffects();
})();
