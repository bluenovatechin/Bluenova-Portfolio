import NovaField from './NovaField';
import { allBrands, clients, websites, services } from '../data/site';
import { Arrow } from '../lib';

const facts = [
  { value: String(allBrands.length), label: 'Brands we work with' },
  { value: String(clients.length), label: 'Instagram accounts we run' },
  { value: String(websites.length), label: 'Websites shipped' },
  { value: String(services.length), label: 'Services, one team' },
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <NovaField />
      <div className="hero-fade" />
      <div className="wrap hero-inner">
        <p className="eyebrow hero-eyebrow">
          <span>BlueNova Tech</span> Digital studio · Modasa · Ahmedabad
        </p>
        <h1 className="h1">
          <span className="line"><span>Brands people</span></span>
          <span className="line">
            <span>
              <em>stop</em> scrolling for.
            </span>
          </span>
        </h1>
        <p className="hero-sub">
          A digital marketing and website development agency in Gujarat. We run social media, shoot reels,
          build websites and manage ads for hospitals, manufacturers, retailers and food brands. One team takes
          care of all of it.
        </p>
        <div className="hero-ctas">
          <a href="#contact" className="btn">
            Start a project <Arrow />
          </a>
          <a href="#work" className="btn btn-ghost">
            See our work
          </a>
        </div>
        <p className="hero-hint mono">Click the field to set off a nova</p>
      </div>

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
