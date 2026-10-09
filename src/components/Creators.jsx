import { SectionHead, Reveal, Arrow } from '../lib';
import { mailLink, waLink } from '../utils';

const sides = [
  {
    who: 'For brands',
    title: 'Reach new customers through creators they already follow.',
    points: [
      'We match you with creators whose audience fits your customers',
      'We write the scripts, approve the edits and keep every post on-brand',
      'You get one invoice and one report at the end',
    ],
    cta: 'Plan a campaign',
    msg: 'Hi BlueNova, we are a brand interested in a creator campaign.',
  },
  {
    who: 'For creators',
    title: 'Get paid brand work without chasing it.',
    points: [
      'Paid briefs from brands that suit your niche',
      'We handle contracts, payments and deadlines',
      'Our editors can help polish your raw footage',
    ],
    cta: 'Join the network',
    msg: 'Hi BlueNova, I am a creator and would like to join your network. My profile: ',
  },
];

export default function Creators() {
  return (
    <section className="section" id="creators">
      <div className="wrap">
        <SectionHead
          index="04"
          label="Creator network"
          title={
            <>
              Brands meet <em>creators</em>.
            </>
          }
        >
          We connect local businesses with local creators and run each campaign from start to finish.
        </SectionHead>

        <div className="duo">
          {sides.map((s, i) => (
            <Reveal key={s.who} className="duo-card" delay={i * 100}>
              <p className="mono duo-who">{s.who}</p>
              <h3>{s.title}</h3>
              <ul>
                {s.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <a
                className="link"
                href={waLink(s.msg) || mailLink(`${s.who}: creator network`, s.msg)}
                target="_blank"
                rel="noreferrer"
              >
                {s.cta} <Arrow />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
