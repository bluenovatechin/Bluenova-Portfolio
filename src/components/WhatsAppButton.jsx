import { useEffect, useState } from 'react';
import { waLink } from '../utils';

// Floating WhatsApp shortcut. Shows after the hero, hides while the contact section is on screen.
export default function WhatsAppButton() {
  const [show, setShow] = useState(false);
  const href = waLink('Hi BlueNova, I found you through your portfolio and would like to discuss a project.');

  useEffect(() => {
    const contact = document.getElementById('contact');
    let contactVisible = false;
    let raf = 0;
    const update = () => setShow(window.scrollY > window.innerHeight * 0.8 && !contactVisible);
    const onScroll = () => {
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          update();
        });
      }
    };
    const io = new IntersectionObserver(([entry]) => {
      contactVisible = entry.isIntersecting;
      update();
    });
    if (contact) io.observe(contact);
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  if (!href) return null;

  return (
    <a
      className={`wa-float ${show ? 'is-shown' : ''}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with BlueNova Tech on WhatsApp"
      tabIndex={show ? 0 : -1}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 29l8.27-2.15a12.1 12.1 0 0 0 3.77.6h.01C22.68 27.45 28 22.09 28 15.48 28 8.87 22.68 3 16.04 3Zm0 22.4h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-4.9 1.27 1.31-4.77-.24-.39a9.9 9.9 0 0 1-1.53-5.32c0-5.5 4.5-9.96 10.05-9.96 5.53 0 9.86 4.46 9.86 9.97 0 5.5-4.4 10.82-9.07 10.82Zm5.5-7.46c-.3-.15-1.78-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.27-.46-2.42-1.48-.9-.8-1.5-1.78-1.67-2.08-.18-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.62-.93-2.22-.24-.58-.5-.5-.68-.51h-.58c-.2 0-.53.07-.8.37-.28.3-1.05 1.02-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.22 5.13 4.52.72.31 1.28.5 1.71.63.72.23 1.38.2 1.9.12.58-.09 1.78-.72 2.03-1.42.25-.7.25-1.3.18-1.42-.08-.13-.28-.2-.58-.35Z"
        />
      </svg>
    </a>
  );
}
