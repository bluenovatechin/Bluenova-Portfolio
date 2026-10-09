import { useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../utils';

const statement =
  'Most businesses juggle a photographer, an editor, a web developer and an ads agency. BlueNova replaces the juggling. We plan it, shoot it, build it and run it, so there is one team responsible for how you show up online.';

// Words brighten one by one as the paragraph scrolls through the viewport.
export default function Intro() {
  const ref = useRef(null);
  const words = statement.split(' ');
  const [lit, setLit] = useState(0);

  useEffect(() => {
    // with reduced motion, CSS shows every word lit
    if (prefersReducedMotion()) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh * 0.85 - r.top) / (r.height + vh * 0.35);
      setLit(Math.round(Math.min(1, Math.max(0, progress)) * words.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [words.length]);

  return (
    <section className="intro" id="about">
      <div className="wrap intro-grid">
        <p className="eyebrow">
          <span>00</span> Who we are
        </p>
        <p className="intro-text" ref={ref}>
          {words.map((word, i) => (
            <span key={i} className={i < lit ? 'on' : ''}>
              {word}{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
