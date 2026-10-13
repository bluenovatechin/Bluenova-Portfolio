import { useEffect } from 'react';
import { prefersReducedMotion } from './utils';

// In-page links (href="#work") scroll to their section without adding "#work" to the address bar.
// The hrefs stay in the HTML, so the links still work without JavaScript and for crawlers.
export default function useHashlessLinks() {
  useEffect(() => {
    const scrollToId = (id, smooth) => {
      const el = document.getElementById(id);
      if (!el) return false;
      el.scrollIntoView({ behavior: smooth && !prefersReducedMotion() ? 'smooth' : 'auto', block: 'start' });
      // move keyboard focus too, so the next Tab continues from the section
      if (!el.matches('a, button, input, select, textarea, [tabindex]')) el.setAttribute('tabindex', '-1');
      el.focus({ preventScroll: true });
      return true;
    };

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;
      const id = decodeURIComponent(link.getAttribute('href').slice(1));
      if (id && scrollToId(id, true)) e.preventDefault();
    };
    document.addEventListener('click', onClick);

    // An old shared link such as /#work still lands on the section; then the address is tidied up.
    if (window.location.hash) {
      const id = decodeURIComponent(window.location.hash.slice(1));
      const { pathname, search } = window.location;
      window.history.replaceState(window.history.state, '', pathname + search);
      requestAnimationFrame(() => scrollToId(id, false));
    }

    return () => document.removeEventListener('click', onClick);
  }, []);
}
