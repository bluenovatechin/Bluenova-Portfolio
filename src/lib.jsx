import { useEffect, useId, useRef, useState } from 'react';
import { MARK_B, MARK_HEX } from './utils';

// Adds the `in` class once the element scrolls into view.
export function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...rest }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function SectionHead({ index, label, title, children }) {
  return (
    <div className="section-head">
      <p className="eyebrow">
        <span>{index}</span> {label}
      </p>
      <Reveal as="h2" className="h2">
        {title}
      </Reveal>
      {children && <Reveal className="section-lede" delay={80}>{children}</Reveal>}
    </div>
  );
}

export function BrandMark({ size = 28, className = '' }) {
  const id = useId();
  return (
    <svg className={className} width={size} height={Math.round(size * 1.11)} viewBox="227 190 446 496" aria-hidden="true">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#1a3fcf" />
          <stop offset="1" stopColor="#0a96e6" />
        </linearGradient>
      </defs>
      <path d={MARK_HEX} fill={`url(#${id})`} />
      {MARK_B.map((d) => (
        <path key={d} d={d} fill="#fff" />
      ))}
    </svg>
  );
}

// Small pointy-top hexagon used as a bullet / separator.
export function Hex({ size = 12, className = '' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 1.5 L21.1 6.75 V17.25 L12 22.5 L2.9 17.25 V6.75 Z" fill="currentColor" />
    </svg>
  );
}

export function Arrow({ className = '' }) {
  return (
    <svg className={`arrow ${className}`} width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 11 L11 3 M4.5 3 H11 V9.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
