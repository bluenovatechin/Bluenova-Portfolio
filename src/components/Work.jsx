import { websites } from '../data/site';
import { SectionHead, Reveal, Arrow } from '../lib';
import { asset } from '../utils';

export default function Work() {
  return (
    <section className="section" id="work">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Selected work"
          title={
            <>
              Websites that <em>work</em> as hard as the business.
            </>
          }
        >
          Hospitals, manufacturers and retailers across Gujarat. We designed and built each of these from scratch.
        </SectionHead>

        <div className="work-grid">
          {websites.map((site, i) => {
            const href = site.url || site.instagram;
            const Media = href ? 'a' : 'div';
            const linkProps = href ? { href, target: '_blank', rel: 'noreferrer' } : {};
            return (
              <Reveal as="article" key={site.client} className="work-card" delay={(i % 2) * 90}>
                <Media className="work-media" {...linkProps}>
                  <div className="browser">
                    <div className="browser-bar">
                      <span />
                      <span />
                      <span />
                      <em className="mono">{site.url ? site.url.replace(/^https?:\/\/(www\.)?/, '') : site.client}</em>
                    </div>
                    <img
                      src={asset(site.image)}
                      srcSet={`${asset(site.image.replace('.webp', '-800.webp'))} 800w, ${asset(site.image)} 1600w`}
                      sizes="(max-width: 900px) calc(100vw - 64px), 560px"
                      alt={`Homepage of the ${site.client} website, designed and developed by BlueNova Tech`}
                      loading="lazy"
                      decoding="async"
                      width="1600"
                      height="760"
                    />
                  </div>
                </Media>
                <div className="work-meta">
                  <div className="work-top">
                    <img
                      className="work-logo"
                      src={asset(site.logo)}
                      alt={`${site.client} logo`}
                      width="44"
                      height="44"
                      loading="lazy"
                      decoding="async"
                    />
                    <div>
                      <h3>{site.client}</h3>
                      <span className="mono work-sector">
                        {site.sector} · {site.city}
                      </span>
                    </div>
                  </div>
                  <p>{site.summary}</p>
                  <div className="work-foot">
                    <ul className="tags">
                      {site.scope.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    {href && (
                      <a href={href} target="_blank" rel="noreferrer" className="link">
                        {site.url ? 'Visit site' : 'Instagram'} <Arrow />
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
