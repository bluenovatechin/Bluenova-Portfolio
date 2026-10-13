import { faqs } from '../data/site';
import { SectionHead } from '../lib';

export default function Faq() {
  return (
    <section className="section" id="faq">
      <div className="wrap faq-grid">
        <SectionHead index="05" label="FAQ" title={<>Good <em>questions</em>.</>} />
        <div className="faq-list">
          {faqs.map((f, i) => (
            <details key={f.q} className="faq" open={i === 0}>
              <summary>
                <span>{f.q}</span>
                <i aria-hidden="true" />
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
