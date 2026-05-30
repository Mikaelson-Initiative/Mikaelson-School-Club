import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck } from '../components/Icons';
import Link from 'next/link';

const LEADERS = [
  {
    name: 'Oluwaseun Adeleke',
    initials: 'OA',
    role: 'Founder & Director',
    bio: 'Seun built Mikaelson School Club after noticing that the most capable students in his community lacked the structure to channel their potential.',
    email: 'seun@mikaelsoninitiative.org',
  },
  {
    name: 'Amaka Obi',
    initials: 'AO',
    role: 'Programme Lead',
    bio: 'Amaka designs the curriculum and facilitator training. She has 8 years of experience in youth development across West Africa.',
    email: 'amaka@mikaelsoninitiative.org',
  },
  {
    name: 'Kofi Asante',
    initials: 'KA',
    role: 'Partnerships',
    bio: "Kofi manages school partnerships and sponsor relationships. He's based in Accra and leads our West Africa expansion.",
    email: 'kofi@mikaelsoninitiative.org',
  },
  {
    name: 'Zara Mwangi',
    initials: 'ZM',
    role: 'Operations',
    bio: 'Zara keeps chapters running. She coordinates Champions, tracks outcomes, and handles logistics across our active schools.',
    email: 'zara@mikaelsoninitiative.org',
  },
];

const CHAMPION_BENEFITS = [
  'Full session facilitation training',
  'Facilitator handbook and session plans',
  'Access to our Champions Slack community',
  'Monthly group coaching calls',
  'A certificate of facilitation',
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Our Team"
        title="The people behind the programme."
        lede="Mikaelson School Club is built and run by people who believe deeply in what young Africans can do when given the right system."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Leadership</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              Programme leadership.
            </h2>
          </Reveal>
          <div className="people">
            {LEADERS.map((person, i) => (
              <Reveal delay={i * 90} key={person.email}>
                <div className="person">
                  <div className="person-avatar">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 20, fontWeight: 700, color: 'var(--accent-ink)' }}>
                      {person.initials}
                    </span>
                  </div>
                  <h3>{person.name}</h3>
                  <div className="role">{person.role}</div>
                  <p>{person.bio}</p>
                  <a className="email" href={`mailto:${person.email}`}>{person.email}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Champions Network</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 20px' }}>
              Our trained chapter facilitators.
            </h2>
          </Reveal>
          <Reveal delay={60}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 0.85fr', gap: 56, alignItems: 'start' }}>
              <div>
                <p style={{ color: 'var(--muted)', fontSize: 17, margin: '0 0 24px', maxWidth: '38em' }}>
                  Champions are the people who actually run the club inside schools. They can be teachers, student leaders,
                  or recent graduates who have been through our certification programme. We currently have 30+ trained
                  Champions across 6 cities. Each Champion receives:
                </p>
                <ul className="involve-bullets">
                  {CHAMPION_BENEFITS.map((benefit) => (
                    <li key={benefit}>
                      <span className="ck"><IconCheck size={18} /></span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="involve-aside">
                <div className="big">30<span className="suffix">+</span></div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)', marginTop: 10 }}>
                  Trained Champions
                </div>
                <div style={{ marginTop: 20, fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--muted)' }}>
                  Active in
                </div>
                <div className="big" style={{ fontSize: 38, marginTop: 4 }}>6<span className="suffix"> cities</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>
                Want to become a Champion?
              </h2>
              <p>
                Join our network of trained facilitators and run a Mikaelson School Club chapter in your school or community.
              </p>
              <div className="cta-actions">
                <Link href="/apply" className="btn btn-turquoise">
                  Apply as Champion <IconArrow size={16} className="arr" />
                </Link>
                <Link href="/programme" className="btn btn-ghost">
                  Learn about the programme
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
