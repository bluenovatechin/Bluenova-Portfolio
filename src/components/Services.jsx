import { useState } from 'react';
import { services } from '../data/site';
import { SectionHead, Reveal } from '../lib';

export default function Services() {
  const [open, setOpen] = useState(services[0].id);

  return (
    <section className="section" id="services">
      <div className="wrap">
        <SectionHead
          index="01"
          label="What we do"
          title={
            <>
              Six services. <em>One</em> team.
            </>
          }
        >
          Hire us for one service or all six. Each one works better when the same people handle the others.
        </SectionHead>

        <ul className="svc-list">
          {services.map((s, i) => {
            const isOpen = open === s.id;
            return (
              <Reveal as="li" key={s.id} delay={i * 50} className={`svc ${isOpen ? 'is-open' : ''}`}>
                <h3 className="svc-heading">
                  <button
                    className="svc-row"
                    aria-expanded={isOpen}
                    aria-controls={`svc-${s.id}`}
                    onClick={() => setOpen(isOpen ? null : s.id)}
                  >
                    <span className="svc-num mono">{String(i + 1).padStart(2, '0')}</span>
                    <span className="svc-title">{s.title}</span>
                    <span className="svc-line">{s.line}</span>
                    <span className="svc-plus" aria-hidden="true" />
                  </button>
                </h3>
                <div className="svc-body" id={`svc-${s.id}`} inert={!isOpen}>
                  <div>
                    <ul className="chips">
                      {s.deliverables.map((d) => (
                        <li key={d}>{d}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
