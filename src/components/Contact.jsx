import { useState } from 'react';
import { brand, services } from '../data/site';
import { Arrow, Reveal } from '../lib';
import { mailLink, telLink, waLink } from '../utils';

export default function Contact() {
  const [picked, setPicked] = useState([]);
  const [form, setForm] = useState({ name: '', business: '', reach: '', message: '' });
  const [copied, setCopied] = useState(false);

  const toggle = (title) =>
    setPicked((p) => (p.includes(title) ? p.filter((x) => x !== title) : [...p, title]));
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const body = [
    `Name: ${form.name}`,
    `Business: ${form.business}`,
    `Phone / email: ${form.reach}`,
    `Interested in: ${picked.join(', ') || 'Not sure yet'}`,
    '',
    form.message,
  ].join('\n');

  const subject = `New project enquiry: ${form.business || form.name || 'BlueNova'}`;
  const wa = waLink(`Hi BlueNova!\n\n${body}`);

  const onSubmit = (e) => {
    e.preventDefault();
    window.location.href = mailLink(subject, body);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(brand.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${brand.email}`;
    }
  };

  return (
    <section className="section contact" id="contact">
      <div className="contact-glow" aria-hidden="true" />
      <div className="wrap contact-grid">
        <div className="contact-left">
          <p className="eyebrow">
            <span>07</span> Contact
          </p>
          <Reveal as="h2" className="h2 contact-title">
            Let’s make your brand <em>hard to ignore</em>.
          </Reveal>
          <p className="section-lede">
            Tell us a little about your business. We reply within one working day with next steps, and usually a few
            quick ideas too.
          </p>
          <div className="contact-direct">
            <button className="contact-mail" onClick={copyEmail}>
              <span className="mono">{copied ? 'Copied to clipboard' : 'Email — click to copy'}</span>
              <b>{brand.email}</b>
            </button>
            {wa && (
              <a className="contact-mail" href={waLink('Hi BlueNova, I would like to discuss a project.')} target="_blank" rel="noreferrer">
                <span className="mono">WhatsApp</span>
                <b>Chat on {brand.phone}</b>
              </a>
            )}
            <a className="contact-mail" href={telLink()}>
              <span className="mono">Call us</span>
              <b>{brand.phone}</b>
            </a>
          </div>
        </div>

        <form className="form" onSubmit={onSubmit}>
          <fieldset>
            <legend className="mono">What do you need?</legend>
            <div className="pick">
              {services.map((s) => (
                <button
                  type="button"
                  key={s.id}
                  aria-pressed={picked.includes(s.title)}
                  onClick={() => toggle(s.title)}
                >
                  {s.title}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="form-row">
            <label>
              <span className="mono">Your name</span>
              <input required value={form.name} onChange={set('name')} autoComplete="name" />
            </label>
            <label>
              <span className="mono">Business</span>
              <input value={form.business} onChange={set('business')} autoComplete="organization" />
            </label>
          </div>
          <label>
            <span className="mono">Phone or email</span>
            <input required value={form.reach} onChange={set('reach')} />
          </label>
          <label>
            <span className="mono">Anything else?</span>
            <textarea rows={3} value={form.message} onChange={set('message')} placeholder="Goals, timelines, links…" />
          </label>

          <div className="form-actions">
            <button type="submit" className="btn">
              Send via email <Arrow />
            </button>
            {wa && (
              <a className="btn btn-ghost" href={wa} target="_blank" rel="noreferrer">
                Send on WhatsApp
              </a>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
