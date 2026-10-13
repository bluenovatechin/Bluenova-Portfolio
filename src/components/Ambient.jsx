import { useEffect } from 'react';
import { prefersReducedMotion } from '../utils';

// Page-wide backdrop: drifting aurora blobs, film grain, a glow that
// follows the cursor, and a scroll progress bar. All decorative.
export default function Ambient() {
  useEffect(() => {
    let raf = 0;
    let mx = 50;
    let my = 30;

    const paint = () => {
      raf = 0;
      // set on <html> so the progress bar (outside this layer) can read them too
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      doc.style.setProperty('--scroll', max > 0 ? (window.scrollY / max).toFixed(4) : '0');
      doc.style.setProperty('--mx', `${mx}%`);
      doc.style.setProperty('--my', `${my}%`);
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e) => {
      mx = (e.clientX / window.innerWidth) * 100;
      my = (e.clientY / window.innerHeight) * 100;
      queue();
    };

    paint();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
    if (!prefersReducedMotion()) window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', queue);
      window.removeEventListener('resize', queue);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return (
    <>
      <div className="ambient" aria-hidden="true">
        <div className="ambient-aurora">
          <i />
          <i />
          <i />
        </div>
        <div className="ambient-cursor" />
        <div className="ambient-grain" />
      </div>
      <div className="scroll-progress" aria-hidden="true" />
    </>
  );
}
