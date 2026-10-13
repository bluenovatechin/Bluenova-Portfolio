import { useEffect, useRef, useState } from 'react';
import { clients } from '../data/site';
import { SectionHead } from '../lib';
import { asset, prefersReducedMotion } from '../utils';

const CYCLE = 4200;

// Pull the main colours out of a logo: sample its pixels, skip the white background,
// bucket similar colours and keep the most common distinct ones.
function extractPalette(img, count = 4) {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(img, 0, 0, size, size);
  const { data } = ctx.getImageData(0, 0, size, size);
  const buckets = new Map();
  for (let i = 0; i < data.length; i += 4) {
    const [r, g, b, a] = [data[i], data[i + 1], data[i + 2], data[i + 3]];
    if (a < 200 || (r > 232 && g > 232 && b > 232)) continue;
    const key = ((r >> 4) << 8) | ((g >> 4) << 4) | (b >> 4);
    const e = buckets.get(key) ?? { n: 0, r: 0, g: 0, b: 0 };
    e.n++;
    e.r += r;
    e.g += g;
    e.b += b;
    buckets.set(key, e);
  }
  const picked = [];
  for (const e of [...buckets.values()].sort((x, y) => y.n - x.n)) {
    const c = [e.r / e.n, e.g / e.n, e.b / e.n].map(Math.round);
    if (picked.every((p) => Math.hypot(p[0] - c[0], p[1] - c[1], p[2] - c[2]) > 60)) picked.push(c);
    if (picked.length === count) break;
  }
  return picked.map((c) => `#${c.map((v) => v.toString(16).padStart(2, '0')).join('')}`);
}

export default function LogoLab() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [palette, setPalette] = useState([]);
  const sectionRef = useRef(null);
  const c = clients[active];

  // auto-advance while the section is on screen, until someone picks a logo
  useEffect(() => {
    if (paused || prefersReducedMotion()) return undefined;
    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(sectionRef.current);
    const id = setInterval(() => visible && setActive((i) => (i + 1) % clients.length), CYCLE);
    return () => {
      clearInterval(id);
      io.disconnect();
    };
  }, [paused]);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      try {
        setPalette(extractPalette(img));
      } catch {
        setPalette([]);
      }
    };
    img.src = asset(c.logo);
  }, [c.logo]);

  const main = palette[0] ?? '#1d64dc';

  return (
    <section
      className="section lab-section"
      id="logos"
      ref={sectionRef}
      style={{ '--brand': main }}
    >
      <div className="lab-wash" aria-hidden="true" />
      <div className="wrap">
        <SectionHead
          index="03"
          label="Logo & brand identity"
          title={
            <>
              Logos we <em>designed</em>, from first grid to feed.
            </>
          }
        >
          Every brand in our hive starts here: a mark built on a grid, a colour palette, and a logo that works as an
          Instagram avatar, a visiting card and an app icon.
        </SectionHead>

        <div className="lab">
          <div className="lab-board" key={c.handle}>
            <svg className="lab-grid" viewBox="0 0 400 400" aria-hidden="true">
              <g className="lab-lines">
                <circle cx="200" cy="200" r="150" />
                <circle cx="200" cy="200" r="112" />
                <circle cx="200" cy="200" r="70" />
                <path d="M200 20v360M20 200h360M60 60l280 280M340 60 60 340" />
                <rect x="88" y="88" width="224" height="224" />
                <path d="M200 50 330 125v150L200 350 70 275V125z" />
              </g>
              <g className="lab-ticks">
                <text x="208" y="34">x 0</text>
                <text x="350" y="194">y 0</text>
                <text x="94" y="82">224 × 224</text>
              </g>
            </svg>
            <div className="lab-logo">
              <img src={asset(c.logo)} alt={`${c.name} logo designed by BlueNova Tech`} width="160" height="160" />
            </div>
            <span className="lab-corner lab-corner-tl mono">{c.name}</span>
            <span className="lab-corner lab-corner-br mono">{String(active + 1).padStart(2, '0')} / {clients.length}</span>
          </div>

          <div className="lab-side">
            <div className="lab-head" key={`h-${c.handle}`}>
              <p className="mono lab-field">
                {c.sector} · {c.field}
              </p>
              <h3>{c.name}</h3>
            </div>

            <div className="lab-palette" aria-label="Colour palette">
              {(palette.length ? palette : ['#1a2236', '#1a2236', '#1a2236']).map((hex, i) => (
                <span key={`${c.handle}-${i}`} style={{ '--sw': hex, '--d': `${i * 80}ms` }}>
                  <i />
                  <small className="mono">{palette.length ? hex : '·'}</small>
                </span>
              ))}
            </div>

            <div className="lab-mocks" key={`m-${c.handle}`}>
              <figure className="mock mock-ig">
                <span className="mock-ring">
                  <img src={asset(c.logo)} alt="" width="160" height="160" />
                </span>
                <figcaption>
                  <b>{c.handle}</b>
                  <small>{c.field}</small>
                </figcaption>
              </figure>
              <figure className="mock mock-card">
                <img src={asset(c.logo)} alt="" width="160" height="160" />
                <figcaption>
                  <b>{c.name}</b>
                  <small>{c.sector}</small>
                </figcaption>
                <i aria-hidden="true" />
              </figure>
              <figure className="mock mock-app">
                <span>
                  <img src={asset(c.logo)} alt="" width="160" height="160" />
                </span>
                <figcaption>{c.name.split(' ')[0]}</figcaption>
              </figure>
            </div>

            <div className="lab-strip" role="group" aria-label="Choose a logo">
              {clients.map((b, i) => (
                <button
                  key={b.handle}
                  type="button"
                  className={i === active ? 'is-on' : ''}
                  aria-pressed={i === active}
                  aria-label={b.name}
                  onClick={() => {
                    setPaused(true);
                    setActive(i);
                  }}
                >
                  <img src={asset(b.logo)} alt="" width="160" height="160" loading="lazy" decoding="async" />
                  {i === active && !paused && <i className="lab-timer" style={{ '--t': `${CYCLE}ms` }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
