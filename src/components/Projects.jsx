import { useEffect, useRef, useState } from 'react';
import { websites } from '../data/site';
import { Arrow } from '../lib';
import { asset, prefersReducedMotion } from '../utils';

const STEP = 360 / websites.length;
const pad = (n) => String(n).padStart(2, '0');

// Current projects on a 3D carousel. The section is tall; while it scrolls past, a sticky
// stage turns the ring one screen at a time. Phones get a stacked deck of cards instead.
export default function Projects() {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    const ring = ringRef.current;
    if (!section || !ring) return;
    const cards = [...ring.children];
    let raf = 0;
    let last = -1;

    const update = () => {
      raf = 0;
      const rect = section.getBoundingClientRect();
      const span = rect.height - window.innerHeight;
      const p = span > 0 ? Math.min(1, Math.max(0, -rect.top / span)) : 0;
      const turn = p * (websites.length - 1);
      section.style.setProperty('--p', p.toFixed(4));
      ring.style.setProperty('--turn', `${(-turn * STEP).toFixed(2)}deg`);
      // fade cards by how far they face away from the viewer
      cards.forEach((card, i) => {
        const off = Math.abs(i - turn);
        card.style.setProperty('--vis', Math.max(0, 1 - off * 0.42).toFixed(3));
      });
      const idx = Math.round(turn);
      if (idx !== last) {
        last = idx;
        setActive(idx);
      }
    };
    let visible = false;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) update();
    });
    io.observe(section);

    const onScroll = () => {
      if (!visible || prefersReducedMotion()) return;
      if (window.innerWidth < 900) return;
      if (!raf) raf = requestAnimationFrame(update);
    };

    if (prefersReducedMotion()) return undefined;
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const site = websites[active];
  const href = site.url || site.instagram;

  return (
    <section className="projects" id="work" ref={sectionRef} style={{ '--count': websites.length }}>
      <div className="projects-sticky">
        <div className="projects-bg" aria-hidden="true">
          <span className="projects-ghost">{site.client}</span>
        </div>

        <div className="wrap projects-grid">
          <div className="projects-info">
            <p className="eyebrow">
              <span>01</span> Current projects
            </p>
            <h2 className="h2 projects-title">
              On the <em>launchpad</em> right now.
            </h2>

            <div className="projects-counter mono" aria-hidden="true">
              <b>{pad(active + 1)}</b>
              <span className="projects-bar">
                <i />
              </span>
              <span>{pad(websites.length)}</span>
            </div>

            <div key={site.client} className="projects-detail" aria-live="polite">
              <div className="projects-brand">
                <img src={asset(site.logo)} alt="" width="52" height="52" />
                <div>
                  <h3>{site.client}</h3>
                  <p className="mono">
                    {site.sector} · {site.city}
                  </p>
                </div>
              </div>
              <p className="projects-summary">{site.summary}</p>
              <ul className="tags">
                {site.scope.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              {href && (
                <a href={href} target="_blank" rel="noreferrer" className="link">
                  {site.url ? 'Visit the live site' : 'See it on Instagram'} <Arrow />
                </a>
              )}
            </div>
          </div>

          <div className="orbit" aria-hidden="true">
            <div className="orbit-floor" />
            <div className="orbit-ring" ref={ringRef}>
              {websites.map((w, i) => (
                <div key={w.client} className="orbit-card" style={{ '--a': `${i * STEP}deg` }}>
                  <div className="browser">
                    <div className="browser-bar">
                      <span />
                      <span />
                      <span />
                      <em className="mono">{w.client}</em>
                    </div>
                    <div className="browser-screen">
                      <img
                        src={asset(w.image.replace('.webp', '-800.webp'))}
                        alt=""
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="380"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className="projects-scroll mono" aria-hidden="true">
          Scroll to turn the ring
        </p>
      </div>

      {/* Phones: a deck of cards that stack as you scroll. Also the accessible list of projects. */}
      <ol className="deck wrap">
        {websites.map((w, i) => {
          const link = w.url || w.instagram;
          return (
            <li key={w.client} className="deck-card" style={{ '--i': i }}>
              <div className="browser">
                <div className="browser-bar">
                  <span />
                  <span />
                  <span />
                  <em className="mono">{w.client}</em>
                </div>
                <img
                  src={asset(w.image.replace('.webp', '-800.webp'))}
                  alt={`Homepage of the ${w.client} website, designed and developed by BlueNova Tech`}
                  loading="lazy"
                  decoding="async"
                  width="800"
                  height="380"
                />
              </div>
              <div className="deck-meta">
                <span className="mono deck-num">{pad(i + 1)}</span>
                <h3>{w.client}</h3>
                <p className="mono">
                  {w.sector} · {w.city}
                </p>
                <p className="deck-summary">{w.summary}</p>
                {link && (
                  <a href={link} target="_blank" rel="noreferrer" className="link">
                    {w.url ? 'Visit site' : 'Instagram'} <Arrow />
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
