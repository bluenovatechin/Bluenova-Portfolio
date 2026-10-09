import { allBrands } from '../data/site';
import { asset } from '../utils';

export default function Marquee() {
  const row = allBrands.map((b) => (
    <span key={b.name} className="marquee-item">
      <img src={asset(b.logo)} alt={`${b.name} logo`} width="36" height="36" loading="lazy" decoding="async" />
      {b.name}
    </span>
  ));

  return (
    <section className="marquee" aria-label="Brands we work with">
      <p className="marquee-label mono">Trusted by</p>
      <div className="marquee-track">
        <div className="marquee-row">{row}</div>
        <div className="marquee-row" aria-hidden="true">
          {row}
        </div>
      </div>
    </section>
  );
}
