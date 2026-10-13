import { useState } from 'react';
import { clients, workLabels } from '../data/site';
import { SectionHead, Arrow, Reveal } from '../lib';
import { asset } from '../utils';

const sectors = ['All', ...new Set(clients.map((c) => c.sector))];

// A honeycomb of pointy-top hexagons in three rows (4 · 5 · 4). The brands whose digital
// marketing we run fill the cells; any spare cell stays open as a "your brand here" slot.
const SQ3 = Math.sqrt(3);
const ROWS = [4, 5, 4];
const BOARD_W = 5 * SQ3; // in cell radii
const BOARD_H = 5;

const CELLS = (() => {
  const out = [];
  let b = 0;
  ROWS.forEach((count, row) => {
    for (let col = 0; col < count; col++) {
      const x = (col - (count - 1) / 2) * SQ3;
      const y = (row - 1) * 1.5;
      const pos = {
        left: `${((x - SQ3 / 2 + BOARD_W / 2) / BOARD_W) * 100}%`,
        top: `${((y - 1 + BOARD_H / 2) / BOARD_H) * 100}%`,
      };
      const ring = Math.round(Math.hypot(x, y) / SQ3);
      if (b < clients.length) out.push({ kind: 'brand', ring, brand: b++, pos });
      else out.push({ kind: 'open', ring, pos });
    }
  });
  return out;
})();

export default function Clients() {
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(0);

  const active = clients[hovered ?? selected] ?? clients[0];

  return (
    <section className="section hive-section" id="clients">
      <div className="wrap">
        <SectionHead
          index="02"
          label="Digital marketing clients"
          title={
            <>
              Social media we <em>handle</em>, every single day.
            </>
          }
        >
          We run Instagram, reels and campaigns for {clients.length} brands across Gujarat: hospitals in Modasa,
          manufacturers in Ahmedabad and food brands that people drive out for. Every cell in this hive is an account our
          team plans, designs and posts for.
        </SectionHead>

        <div className="filters" role="group" aria-label="Highlight clients by sector">
          {sectors.map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={filter === s}
              className={filter === s ? 'active' : ''}
              onClick={() => setFilter(s)}
            >
              {s}{' '}
              <span className="mono">{s === 'All' ? clients.length : clients.filter((c) => c.sector === s).length}</span>
            </button>
          ))}
        </div>

        <div className="hive-layout">
          <Reveal className="hive-stage">
            <div className="hive-halo" aria-hidden="true" />

            <ul className="hive-board" aria-label="Brands whose social media BlueNova manages">
              {CELLS.map((cell, i) => {
                const style = { ...cell.pos, '--ring': cell.ring, '--i': i };

                if (cell.kind === 'open') {
                  return (
                    <li key={`open-${i}`} className="cell cell-open" style={style}>
                      <a href="#contact" className="cell-face" aria-label="Your brand here: start a project">
                        <span className="cell-plus" aria-hidden="true">+</span>
                        <b className="mono">Your brand</b>
                      </a>
                    </li>
                  );
                }

                const brand = clients[cell.brand];
                const isActive = active.handle === brand.handle;
                const dim = filter !== 'All' && brand.sector !== filter;
                return (
                  <li
                    key={brand.handle}
                    className={`cell cell-brand ${isActive ? 'is-active' : ''} ${dim ? 'is-dim' : ''}`}
                    style={style}
                  >
                    <button
                      type="button"
                      className="cell-face"
                      aria-pressed={selected === cell.brand}
                      onMouseEnter={() => setHovered(cell.brand)}
                      onMouseLeave={() => setHovered(null)}
                      onFocus={() => setHovered(cell.brand)}
                      onBlur={() => setHovered(null)}
                      onClick={() => setSelected(cell.brand)}
                    >
                      <img
                        src={asset(brand.logo)}
                        alt={`${brand.name} logo, social media managed by BlueNova Tech`}
                        width="160"
                        height="160"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

          </Reveal>

          <aside className="hive-spot" aria-live="polite">
            <div key={active.handle} className="hive-spot-inner">
              <p className="mono hive-spot-type">
                <span className="pulse-dot" /> {active.sector} · {active.field}
              </p>
              <div className="hive-spot-brand">
                <div className="hive-spot-logo">
                  <img src={asset(active.logo)} alt="" width="160" height="160" />
                </div>
                <div>
                  <h3>{active.name}</h3>
                  <p className="mono hive-spot-handle">@{active.handle}</p>
                </div>
              </div>

              <div className="hive-spot-by">
                <span>
                  <b>Handled by BlueNova</b>
                  <small className="mono">Digital marketing partner</small>
                </span>
              </div>

              <ul className="hive-spot-list">
                {active.work.map((w) => (
                  <li key={w}>{workLabels[w] ?? w}</li>
                ))}
              </ul>
              <a className="btn btn-sm" href={`https://www.instagram.com/${active.handle}`} target="_blank" rel="noreferrer">
                See their Instagram <Arrow />
              </a>
            </div>
          </aside>
        </div>

        {/* Plain list of every account, for people who skim and for search engines. */}
        <div className="hive-index">
          <p className="mono">Accounts we manage</p>
          <ul>
            {clients.map((c) => (
              <li key={c.handle}>
                <a href={`https://www.instagram.com/${c.handle}`} target="_blank" rel="noreferrer">
                  <b>{c.name}</b> <span className="mono">@{c.handle}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
