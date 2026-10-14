import { useEffect, useRef } from 'react';

// Page-wide backdrop: subtle aurora gradient background and a smooth scroll progress bar.
export default function Ambient() {
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const bar = barRef.current;

    const updateScroll = () => {
      raf = 0;
      if (!bar) return;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max).toFixed(4) : '0';
      bar.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(updateScroll);
    };

    raf = requestAnimationFrame(updateScroll);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
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
      </div>
      <div ref={barRef} className="scroll-progress" aria-hidden="true" />
    </>
  );
}
