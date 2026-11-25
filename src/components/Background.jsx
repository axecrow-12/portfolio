import { useEffect, useRef } from "react";

const GLYPHS = [
  "{", "}", "<", "/>", "</>", "()", "[]", ";", "=>", "&&", "||", "!=",
  "0", "1", "$", "#", "::", "++", "fn", "if", "λ", "*", "%",
];
const COLORS = ["#818CF8", "#22D3EE", "#A78BFA", "#34D399", "#6366F1"];
const MAX_PARTICLES = 90;
const SPAWN_EVERY_PX = 16;
const LIFE_MS = 950;

// Site-wide background: drifting aurora, masked grid, a grid "spotlight"
// that follows the cursor, and a trail of code glyphs left by the cursor.
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const trailEnabled = finePointer && !reduceMotion;

    const canvas = canvasRef.current;
    const ctx = trailEnabled ? canvas.getContext("2d") : null;
    let dpr = 1;
    const resize = () => {
      if (!ctx) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const particles = [];
    let last = null;
    let frame = 0;
    let pending = null;

    const spawn = (x, y) => {
      if (particles.length >= MAX_PARTICLES) particles.shift();
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.25 - Math.random() * 0.6,
        glyph: GLYPHS[(Math.random() * GLYPHS.length) | 0],
        color: COLORS[(Math.random() * COLORS.length) | 0],
        size: 13 + Math.random() * 7,
        born: performance.now(),
      });
    };

    const draw = (now) => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const t = (now - p.born) / LIFE_MS;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx;
        p.y += p.vy;
        ctx.globalAlpha = (1 - t) * 0.95;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.font = `500 ${p.size}px "JetBrains Mono", monospace`;
        ctx.fillText(p.glyph, p.x, p.y);
      }
      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;
      // Only keep animating while there is something to draw.
      frame = particles.length ? requestAnimationFrame(draw) : 0;
    };

    const onMove = (e) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!trailEnabled) return;
      if (!last) last = pending;
      const dx = e.clientX - last.x;
      const dy = e.clientY - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist >= SPAWN_EVERY_PX) {
        const steps = Math.min(Math.floor(dist / SPAWN_EVERY_PX), 4);
        for (let s = 1; s <= steps; s++) {
          spawn(last.x + (dx * s) / steps + 8, last.y + (dy * s) / steps + 18);
        }
        last = { x: e.clientX, y: e.clientY };
        if (!frame) frame = requestAnimationFrame(draw);
      }
    };

    // Grid spotlight position, batched to one style write per frame.
    let spotFrame = 0;
    const onPointer = (e) => {
      onMove(e);
      if (spotFrame) return;
      spotFrame = requestAnimationFrame(() => {
        spotFrame = 0;
        root.style.setProperty("--cx", `${pending.x}px`);
        root.style.setProperty("--cy", `${pending.y}px`);
      });
    };
    const onLeave = () => {
      last = null;
      root.style.setProperty("--cx", "-9999px");
      root.style.setProperty("--cy", "-9999px");
    };

    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(spotFrame);
    };
  }, []);

  return (
    <>
      <div className="bg-layer" aria-hidden="true">
        <div className="aurora aurora-1" />
        <div className="aurora aurora-2" />
        <div className="aurora aurora-3" />
        <div className="bg-cursor-glow" />
        <div className="bg-grid" />
        <div className="bg-grid bg-grid-spot" />
        <div className="bg-vignette" />
        <div className="bg-noise" />
      </div>
      <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
    </>
  );
}
