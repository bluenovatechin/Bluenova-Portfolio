import { useEffect, useRef } from 'react';
import { MARK_B, MARK_HEX, prefersReducedMotion } from '../utils';

// Hexagonal "pointy-top" distance: matches the shape of the BlueNova mark,
// so shockwaves ripple outward as hexagons.
const hexDist = (dx, dy) => {
  const ax = Math.abs(dx);
  const k = Math.abs(dy) * 0.866;
  return Math.max(ax, ax * 0.5 + k);
};

// A hex lattice of dots. Hexagonal shockwaves ("novas") pulse out of the BlueNova mark
// at intervals, the pointer lights up nearby dots, and clicking fires an extra nova.
export default function NovaField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let GAP = 26;
    const SPEED = 0.36; // px per ms
    const BAND = 64;
    const hexPath = new Path2D(MARK_HEX);
    const bPaths = MARK_B.map((d) => new Path2D(d));

    let w = 0;
    let h = 0;
    let dots = [];
    let core = { x: 0, y: 0, size: 90 };
    let waves = [];
    let pointer = { x: -9999, y: -9999, active: false };
    let raf = 0;
    let lastAuto = -9999;
    let visible = true;

    // Dots are drawn in brightness buckets so the colour only changes LEVELS times per frame.
    const LEVELS = 10;
    const styles = Array.from({ length: LEVELS }, (_, i) => {
      const a = (0.08 + (i / (LEVELS - 1)) * 0.85).toFixed(3);
      return i >= 4 ? `rgba(90,178,255,${a})` : `rgba(200,214,240,${a})`;
    });
    const buckets = Array.from({ length: LEVELS }, () => []);
    let sprite = null;
    let frameGap = 0;
    let lastFrame = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const mobile = rect.width < 760;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      frameGap = mobile ? 1000 / 30 : 0;
      GAP = mobile ? 30 : 26;
      core = mobile
        ? { x: w * 0.82, y: 104, size: 50 } // sits in the space between the nav and the eyebrow
        : { x: w * 0.75, y: h * 0.42, size: Math.min(110, w * 0.075) };
      dots = [];
      const rowH = GAP * 0.866;
      for (let r = 0, y = rowH / 2; y <= h; r++, y += rowH) {
        for (let x = r % 2 ? GAP / 2 : 0; x <= w; x += GAP) {
          dots.push({ x, y, d: hexDist(x - core.x, y - core.y) });
        }
      }
      sprite = renderSprite(dpr);
    };

    // The glow and logo never change shape, so draw them once into an offscreen canvas.
    const renderSprite = (dpr) => {
      const halo = core.size * 1.9;
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

        if (pointer.active) {
          const pd = Math.hypot(p.x - pointer.x, p.y - pointer.y);
          if (pd < 160) glow += (1 - pd / 160) ** 2 * 0.8;
        }

        const level = Math.round(Math.min(glow, 1) * (LEVELS - 1));
        buckets[level].push(p.x + dx, p.y + dy);
      }

      for (let i = 0; i < LEVELS; i++) {
        const b = buckets[i];
        if (!b.length) continue;
        const size = 1 + (i / (LEVELS - 1)) * 1.7;
        const half = size / 2;
        ctx.fillStyle = styles[i];
        for (let j = 0; j < b.length; j += 2) ctx.fillRect(b[j] - half, b[j + 1] - half, size, size);
      }

      const pulse = reduced ? 1 : 1 + Math.sin(t / 650) * 0.04;
      const size = sprite.halo * 2 * pulse;
      ctx.drawImage(sprite.canvas, core.x - size / 2, core.y - size / 2, size, size);
    };

    const loop = (t) => {
      raf = visible ? requestAnimationFrame(loop) : 0;
      if (t - lastFrame < frameGap) return;
      lastFrame = t;
      if (t - lastAuto > 3400) {
        fire(core.x, core.y, t);
        lastAuto = t;
      }
      draw(t);
    };

    const local = (e) => {
      const rect = canvas.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMove = (e) => (pointer = { ...local(e), active: true });
    const onLeave = () => (pointer.active = false);
    const onDown = (e) => {
      const p = local(e);
      fire(p.x, p.y, performance.now());
    };

    const redraw = () => draw(0);
    resize();
    window.addEventListener('resize', resize);

    if (reduced) {
      redraw();
      window.addEventListener('resize', redraw);
      return () => {
        window.removeEventListener('resize', resize);
        window.removeEventListener('resize', redraw);
      };
    }

    const host = canvas.parentElement;
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);

    // Draw one still frame now, start animating once the page has finished loading,
    // and pause whenever the hero is off-screen.
    let started = false;
    redraw();
    // Start on the first interaction, or a moment after the page settles, whichever comes first.
    const kick = ['pointerdown', 'pointermove', 'touchstart', 'scroll', 'keydown'];
    const start = () => {
      if (started) return;
      started = true;
      kick.forEach((ev) => window.removeEventListener(ev, start));
      if (visible && !raf) raf = requestAnimationFrame(loop);
    };
    kick.forEach((ev) => window.addEventListener(ev, start, { once: true, passive: true }));
    const delayed = () => window.setTimeout(start, 2500);
    const idle = window.requestIdleCallback
      ? window.requestIdleCallback(delayed, { timeout: 2000 })
      : window.setTimeout(delayed, 800);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && started && !raf) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      kick.forEach((ev) => window.removeEventListener(ev, start));
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
    };
  }, []);

  return <canvas ref={canvasRef} className="nova-field" aria-hidden="true" />;
}
