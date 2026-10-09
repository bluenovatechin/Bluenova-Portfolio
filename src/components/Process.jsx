import { process } from '../data/site';
import { SectionHead, Reveal } from '../lib';

export default function Process() {
  return (
    <section className="section" id="process">
      <div className="wrap">
        <SectionHead
          index="05"
          label="How we work"
          title={
            <>
              Four steps, <em>every</em> month.
            </>
          }
        />
        <ol className="steps">
          {process.map((p, i) => (
            <Reveal as="li" key={p.title} className="step" delay={i * 110}>
              <span className="step-num mono">{String(i + 1).padStart(2, '0')}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
