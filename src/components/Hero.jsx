import NovaField from './NovaField';
import { allBrands, clients, websites, services } from '../data/site';
import { Arrow } from '../lib';

const facts = [
  { value: String(allBrands.length), label: 'Brands we work with' },
  { value: String(clients.length), label: 'Instagram accounts we run' },
  { value: String(websites.length), label: 'Websites on the board' },
  { value: String(services.length), label: 'Services, one team' },
];

const index = [
  { href: '#work', n: '01', label: 'Current projects' },
  { href: '#clients', n: '02', label: 'Digital marketing clients' },
  { href: '#logos', n: '03', label: 'Logo design' },
  { href: '#instagram', n: '04', label: 'Instagram' },
  { href: '#faq', n: '05', label: 'FAQ' },
];

const ringText = 'BlueNova Tech · Portfolio 2026 · Scroll · ';

export default function Hero() {
  return (
    <section className="hero" id="top">
      <NovaField />
      <div className="hero-fade" />
      <div className="wrap hero-inner">
        <p className="eyebrow hero-eyebrow">
          <span>Portfolio · 2026</span> BlueNova Tech · Modasa · Ahmedabad
        </p>
        <h1 className="h1">
          <span className="line"><span>Brands people</span></span>
          <span className="line">
            <span>
              <em className="shimmer">stop</em> scrolling for.
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          The work of a digital studio in Gujarat: websites, reels, Instagram and identity for hospitals,
          manufacturers, retailers and food brands.
        </p>
        <div className="hero-ctas">
          <a href="#work" className="btn">
            View the work <Arrow />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Start a project
          </a>
        </div>

        <nav className="hero-index" aria-label="Portfolio sections">
          {index.map((s) => (
            <a key={s.href} href={s.href}>
              <span className="mono">{s.n}</span> {s.label}
            </a>
          ))}
        </nav>
      </div>

      <a href="#work" className="hero-badge" aria-label="Scroll to the work">
        <svg viewBox="0 0 200 200" aria-hidden="true">
          <defs>
            <path id="hero-ring-path" d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" />
          </defs>
          <text>
            <textPath href="#hero-ring-path" textLength="486" lengthAdjust="spacing">
              {ringText}
            </textPath>
          </text>
        </svg>
        <span className="hero-badge-arrow">↓</span>
      </a>

      <div className="wrap">
        <dl className="facts">
          {facts.map((f) => (
            <div key={f.label} className="fact">
              <dt className="mono">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
