import { useState } from 'react';
import { clients } from '../data/site';
import { SectionHead, Arrow } from '../lib';
import { asset } from '../utils';

const sectors = ['All', ...new Set(clients.map((c) => c.sector))];

export default function Clients() {
  const [filter, setFilter] = useState('All');
  const list = filter === 'All' ? clients : clients.filter((c) => c.sector === filter);

  return (
    <section className="section section-light" id="clients">
      <div className="wrap">
        <SectionHead
          index="03"
          label="Clients"
          title={
            <>
              The accounts we <em>run</em>, every day.
            </>
          }
        >
          We manage these brands' Instagram accounts every month. Open any of them to see the work.
        </SectionHead>

        <div className="filters" role="group" aria-label="Filter clients by sector">
          {sectors.map((s) => {
            const count = s === 'All' ? clients.length : clients.filter((c) => c.sector === s).length;
            return (
              <button
                key={s}
                aria-pressed={filter === s}
                className={filter === s ? 'active' : ''}
                onClick={() => setFilter(s)}
              >
                {s} <span className="mono">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="roster">
          <div className="roster-head mono" aria-hidden="true">
            <span>#</span>
            <span>Brand</span>
            <span>Sector</span>
            <span>What we do</span>
            <span>Instagram</span>
          </div>
          {list.map((c, i) => (
            <a
              key={c.handle}
              className="roster-row"
              href={`https://www.instagram.com/${c.handle}`}
              target="_blank"
              rel="noreferrer"
            >
              <span className="mono roster-i">{String(i + 1).padStart(2, '0')}</span>
              <span className="roster-name">
                {c.logo ? <img src={asset(c.logo)} alt={`${c.name} logo`} className="roster-logo" width="46" height="46" loading="lazy" decoding="async" /> : <i className="roster-mono">{initials(c.name)}</i>}
                <span>
                  <b>{c.name}</b>
                  <small>{c.field}</small>
                </span>
              </span>
              <span className="roster-sector">{c.sector}</span>
              <span className="roster-work">
                {c.work.map((w) => (
                  <em key={w}>{w}</em>
                ))}
              </span>
              <span className="roster-handle mono">
                @{c.handle} <Arrow />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function initials(name) {
  return name
    .split(/\s+/)
    .filter((w) => /^[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('');
}
