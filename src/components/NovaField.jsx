import { useEffect, useRef } from 'react';
import { MARK_B, MARK_HEX, prefersReducedMotion } from '../utils';

// Hexagonal "pointy-top" distance: matches the shape of the BlueNova mark
const hexDist = (dx, dy) => {
  const ax = Math.abs(dx);
  const k = Math.abs(dy) * 0.866;
  return Math.max(ax, ax * 0.5 + k);
};

// A clean hex lattice of dots with occasional gentle pulses.
// Optimized for zero main-thread blocking and smooth 60fps rendering.
export default function NovaField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let GAP = 38;
    const SPEED = 0.38; // px per ms
    const BAND = 64;
    const hexPath = new Path2D(MARK_HEX);
    const bPaths = MARK_B.map((d) => new Path2D(d));

    let w = 0;
    let h = 0;
    let dots = [];
    let core = { x: 0, y: 0, size: 90 };
    let waves = [];
    let raf = 0;
    let lastAuto = 0;
    let visible = true;
    let isMobile = false;

    // Dots are drawn in brightness buckets so the colour only changes LEVELS times per frame.
    const LEVELS = 8;
    const styles = Array.from({ length: LEVELS }, (_, i) => {
      const a = (0.08 + (i / (LEVELS - 1)) * 0.85).toFixed(3);
      return i >= 3 ? `rgba(90,178,255,${a})` : `rgba(200,214,240,${a})`;
    });
    const buckets = Array.from({ length: LEVELS }, () => []);
    let sprite = null;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      isMobile = rect.width < 760;
      const dpr = Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      GAP = isMobile ? 46 : 38;
      core = isMobile
        ? { x: w * 0.82, y: 104, size: 48 }
        : { x: w * 0.75, y: h * 0.42, size: Math.min(108, w * 0.075) };
      dots = [];
      const rowH = GAP * 0.866;
      for (let r = 0, y = rowH / 2; y <= h; r++, y += rowH) {
        for (let x = r % 2 ? GAP / 2 : 0; x <= w; x += GAP) {
          dots.push({ x, y, d: hexDist(x - core.x, y - core.y) });
        }
      }
      sprite = renderSprite(dpr);
      draw(0);
    };

    const renderSprite = (dpr) => {
      const halo = core.size * 1.85;
      const off = document.createElement('canvas');
      off.width = off.height = Math.ceil(halo * 2 * dpr);
      const o = off.getContext('2d');
      o.scale(dpr, dpr);
      const g = o.createRadialGradient(halo, halo, 0, halo, halo, halo);
      g.addColorStop(0, 'rgba(40,130,255,0.45)');
      g.addColorStop(0.35, 'rgba(26,90,230,0.14)');
      g.addColorStop(1, 'rgba(26,90,230,0)');
      o.fillStyle = g;
      o.fillRect(0, 0, halo * 2, halo * 2);
      const s = core.size / 496;
      o.translate(halo - 450 * s, halo - 437 * s);
      o.scale(s, s);
      const lg = o.createLinearGradient(236, 0, 664, 0);
      lg.addColorStop(0, '#1a3fcf');
      lg.addColorStop(1, '#0a96e6');
      o.fillStyle = lg;
      o.fill(hexPath);
      o.fillStyle = '#fff';
      bPaths.forEach((p) => o.fill(p));
      return { canvas: off, halo };
    };

    const fire = (x, y, t) => waves.push({ x, y, t0: t, max: Math.hypot(w, h) });

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      waves = waves.filter((wv) => (t - wv.t0) * SPEED < wv.max + BAND);
      const reach = Math.min(w, h) * 0.5;
      for (const b of buckets) b.length = 0;

      for (const p of dots) {
        let glow = Math.max(0, 1 - p.d / reach) * 0.32;
        let dx = 0;
        let dy = 0;

        for (const wv of waves) {
          const r = (t - wv.t0) * SPEED;
          const ox = p.x - wv.x;
          const oy = p.y - wv.y;
          const off = Math.abs(hexDist(ox, oy) - r);
          if (off < BAND) {
            const k = (1 - off / BAND) ** 2 * Math.max(0, 1 - r / wv.max);
            glow += k * 0.9;
            const len = Math.hypot(ox, oy) || 1;
            dx += (ox / len) * k * 6;
            dy += (oy / len) * k * 6;
          }
        }

        const level = Math.round(Math.min(glow, 1) * (LEVELS - 1));
        buckets[level].push(p.x + dx, p.y + dy);
      }

      for (let i = 0; i < LEVELS; i++) {
        const b = buckets[i];
        if (!b.length) continue;
        const size = 1 + (i / (LEVELS - 1)) * 1.6;
        const half = size / 2;
        ctx.fillStyle = styles[i];
        for (let j = 0; j < b.length; j += 2) ctx.fillRect(b[j] - half, b[j + 1] - half, size, size);
      }

      if (sprite) {
        const size = sprite.halo * 2;
        ctx.drawImage(sprite.canvas, core.x - size / 2, core.y - size / 2, size, size);
      }
    };

    const loop = (t) => {
      if (!visible) {
        raf = 0;
        return;
      }

      // Check if time to trigger a new wave
      if (t - lastAuto > 5000) {
        fire(core.x, core.y, t);
        lastAuto = t;
      }

      draw(t);

      // Only schedule next frame if waves are active or about to fire
      if (waves.length > 0) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const triggerWave = () => {
      if (!visible || reduced || isMobile) return;
      const now = performance.now();
      fire(core.x, core.y, now);
      lastAuto = now;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    let interval = null;
    const init = () => {
      resize();
      window.addEventListener('resize', resize);
      if (!reduced && !isMobile) {
        interval = setInterval(triggerWave, 6000);
      }
    };

    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(init, { timeout: 1200 })
      : setTimeout(init, 150);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    return () => {
      if (window.cancelIdleCallback && typeof idle === 'number') {
        window.cancelIdleCallback(idle);
      } else {
        clearTimeout(idle);
      }
      if (interval) clearInterval(interval);
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="nova-field" aria-hidden="true" />;
}
