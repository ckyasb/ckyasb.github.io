/* Created: 2026-09-18; Author: ckyasb.
 * Purpose: Butterfly companions inspired by cursor-effects' Ants interaction.
 * Added: Wandering, nearby recruitment, following, pause and teardown.
 * Behavior reference: https://github.com/tholman/cursor-effects
 * Implementation and butterfly artwork are local; no upstream code is bundled.
 */
window.startButterflySwarm = function (assetUrl) {
  const layer = document.createElement("div");
  layer.id = "butterfly-swarm";
  layer.setAttribute("aria-hidden", "true");
  layer.hidden = true;
  document.body.append(layer);
  const pointer = { x: 0, y: 0 };
  let inside = false;
  let frame;
  let previousTime;
  const butterflies = Array.from({ length: 14 }, (_, index) => {
    const element = document.createElement("img");
    element.src = assetUrl;
    element.alt = "";
    element.width = 14;
    element.height = 14;
    layer.append(element);
    return { element, x: Math.random() * innerWidth, y: Math.random() * innerHeight,
      angle: index * 2.4, phase: index, target: null };
  });
  const overlays = document.querySelectorAll("#__search, #__drawer");

  function animate(time) {
    const step = Math.min((time - (previousTime ?? time)) / 16.67, 2);
    previousTime = time;
    const recruited = [];
    butterflies.forEach((butterfly) => { butterfly.target = null; });
    const closest = butterflies.reduce((best, item) =>
      Math.hypot(item.x - pointer.x, item.y - pointer.y) < Math.hypot(best.x - pointer.x, best.y - pointer.y) ? item : best);
    if (Math.hypot(closest.x - pointer.x, closest.y - pointer.y) < 130) {
      closest.target = pointer;
      recruited.push(closest);
    }
    // Each recruited butterfly leads the next nearest neighbor, forming a chain.
    for (let index = 0; index < recruited.length; index += 1) {
      const leader = recruited[index];
      let nearest;
      let distance = 130;
      for (const candidate of butterflies) {
        if (candidate.target) continue;
        const gap = Math.hypot(candidate.x - leader.x, candidate.y - leader.y);
        if (gap < distance) { nearest = candidate; distance = gap; }
      }
      if (nearest) { nearest.target = leader; recruited.push(nearest); }
    }
    for (const butterfly of butterflies) {
      let speed = .45;
      if (butterfly.target) {
        const dx = butterfly.target.x - butterfly.x;
        const dy = butterfly.target.y - butterfly.y;
        const turn = Math.atan2(dy, dx) - butterfly.angle;
        butterfly.angle += Math.atan2(Math.sin(turn), Math.cos(turn)) * .15 * step;
        speed = Math.min(2.3, Math.max(0, Math.hypot(dx, dy) - 20) * .06);
      } else {
        butterfly.angle += (Math.random() - .5) * .16 * step;
        if (butterfly.x < 20 || butterfly.x > innerWidth - 20 || butterfly.y < 20 || butterfly.y > innerHeight - 20) {
          butterfly.angle = Math.atan2(innerHeight / 2 - butterfly.y, innerWidth / 2 - butterfly.x);
        }
      }
      butterfly.x = Math.max(8, Math.min(innerWidth - 8, butterfly.x + Math.cos(butterfly.angle) * speed * step));
      butterfly.y = Math.max(8, Math.min(innerHeight - 8, butterfly.y + Math.sin(butterfly.angle) * speed * step));
      butterfly.phase += .14 * step;
      butterfly.element.style.transform = `translate(${butterfly.x - 7}px, ${butterfly.y - 7}px) rotate(${butterfly.angle + Math.PI / 2}rad) scaleX(${.65 + Math.sin(butterfly.phase) * .25})`;
    }
    frame = requestAnimationFrame(animate);
  }

  function updateActivity() {
    const active = inside && !document.hidden && !document.querySelector("#__search:checked, #__drawer:checked");
    layer.hidden = !active;
    if (!active) {
      cancelAnimationFrame(frame);
      frame = undefined;
      previousTime = undefined;
    } else if (frame === undefined) frame = requestAnimationFrame(animate);
  }
  function move(event) {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
    inside = true;
    updateActivity();
  }
  function leave() { inside = false; updateActivity(); }
  document.addEventListener("mousemove", move);
  document.documentElement.addEventListener("mouseleave", leave);
  document.addEventListener("visibilitychange", updateActivity);
  overlays.forEach((toggle) => toggle.addEventListener("change", updateActivity));
  return () => {
    cancelAnimationFrame(frame);
    document.removeEventListener("mousemove", move);
    document.documentElement.removeEventListener("mouseleave", leave);
    document.removeEventListener("visibilitychange", updateActivity);
    overlays.forEach((toggle) => toggle.removeEventListener("change", updateActivity));
    layer.remove();
  };
};
