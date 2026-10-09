import { useEffect, useState } from 'react';
import { brand } from '../data/site';
import { BrandMark } from '../lib';

const links = [
  { href: '#services', label: 'Services' },
  { href: '#work', label: 'Work' },
  { href: '#clients', label: 'Clients' },
  { href: '#process', label: 'Process' },
  { href: '#faq', label: 'FAQ' },
];

function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: brand.timezone,
    }).format(new Date());
  const [time, setTime] = useState(fmt);
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 15000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export function Logo() {
  return (
    <a href="#top" className="logo" aria-label={`${brand.name} home`}>
      <BrandMark size={26} className="logo-mark" />
      <span>
        Blue<b>Nova</b>
      </span>
    </a>
  );
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const time = useClock();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="wrap nav-inner">
        <Logo />
        <nav className="nav-links" id="primary-nav" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className="nav-mobile-cta" onClick={() => setOpen(false)}>
            Start a project
          </a>
        </nav>
        <div className="nav-right">
          <span className="nav-clock mono" title={`Local time in ${brand.location}`} suppressHydrationWarning>
            <i className="pulse-dot" /> {brand.location.split(',')[0]} {time} IST
          </span>
          <a href="#contact" className="btn btn-sm">
            Start a project
          </a>
          <button
            className="nav-toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
