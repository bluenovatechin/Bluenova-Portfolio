import { brand } from './data/site';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Files in /public, as paths relative to the page, so the site works at any URL
// (github.io/Bluenova-Portfolio/, a custom domain, or a sub-folder). Don't use
// import.meta.env.BASE_URL here: the pre-render build turns it into "/", which breaks sub-folders.
export const asset = (path) => `./${path}`;

export function waLink(text) {
  if (!brand.whatsapp) return null;
  return `https://wa.me/${brand.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telLink = () => `tel:+${brand.whatsapp}`;

export function mailLink(subject, body = '') {
  return `mailto:${brand.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// Path data for the BlueNova mark, shared with the hero canvas. ViewBox: 227 190 446 496.
export const MARK_HEX =
  'M430 204 Q450 194 470 204 L650 304 Q664 312 664 328 L664 546 Q664 562 650 570 L470 670 Q450 680 430 670 L250 570 Q236 562 236 546 L236 328 Q236 312 250 304 Z';
export const MARK_B = [
  'M335 298 H462 C512 298 540 340 520 388 L484 452 L432 366 L335 534 Z',
  'M350 577 L432 428 L484 514 L520 444 C566 470 566 577 494 577 Z',
];
