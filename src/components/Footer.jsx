import { areas, brand } from '../data/site';
import { telLink, waLink } from '../utils';
import { Logo } from './Nav';

const year = new Date().getFullYear();

export default function Footer() {
  const socials = [
    brand.instagram && { label: 'Instagram', href: brand.instagram },
    brand.instagramCreators && { label: 'Creator Hub (Instagram)', href: brand.instagramCreators },
    brand.facebook && { label: 'Facebook', href: brand.facebook },
    brand.linkedin && { label: 'LinkedIn', href: brand.linkedin },
  ].filter(Boolean);
  const wa = waLink('Hi BlueNova, I would like to discuss a project.');

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div>
            <Logo />
            <p className="footer-note">
              Digital marketing, social media, reels and website development for businesses in Modasa, Ahmedabad
              and across Gujarat.
            </p>
          </div>
          <nav className="footer-cols" aria-label="Footer">
            <div>
              <p className="mono">Studio</p>
              <a href="#services">Services</a>
              <a href="#work">Work</a>
              <a href="#clients">Clients</a>
              <a href="#process">Process</a>
              <a href={brand.mainSite}>Main website</a>
            </div>
            <div>
              <p className="mono">Areas we serve</p>
              {areas.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
            <div>
              <p className="mono">Contact</p>
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <a href={telLink()}>{brand.phone}</a>
              {wa && (
                <a href={wa} target="_blank" rel="noreferrer">
                  WhatsApp
                </a>
              )}
            </div>
            {socials.length > 0 && (
              <div>
                <p className="mono">Follow us</p>
                {socials.map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer me">
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </nav>
        </div>
        <p className="footer-word" aria-hidden="true">
          BlueNova
        </p>
        <div className="footer-bottom mono">
          <span>© {year} {brand.name}</span>
          <a href="#top">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
