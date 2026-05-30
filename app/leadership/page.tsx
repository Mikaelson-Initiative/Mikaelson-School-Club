import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'Meet the elected student officers and faculty advisors leading the Mikaelson School Club network across Africa.',
  openGraph: {
    title: 'Leadership | Mikaelson School Club',
    description: 'The students and advisors leading the Mikaelson School Club network.',
  },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

const OFFICERS = [
  { name: 'Mikaelson Initiative', role: 'Founder & Executive Director', bio: 'Driving the vision to equip every African secondary school student with the mindset and tools to lead.', email: 'hello@mikaelsoninitiative.org' },
  { name: 'Programme Director', role: 'Head of Programmes', bio: 'Designs and oversees the weekly curriculum, chapter playbooks, and member assessment systems.', email: 'hello@mikaelsoninitiative.org' },
  { name: 'Partnerships Lead', role: 'Head of Partnerships', bio: 'Builds relationships with schools, sponsors, and community organisations that power each chapter.', email: 'hello@mikaelsoninitiative.org' },
  { name: 'Operations Lead', role: 'Head of Operations', bio: 'Manages chapter logistics, champion training, and cross-network communications.', email: 'hello@mikaelsoninitiative.org' },
];

const ADVISORS = [
  { name: 'Advisory Board', role: 'Strategic Advisor', dept: 'Leadership & Education', bio: 'A council of educators, business leaders, and alumni who guide programme strategy and quality.' },
  { name: 'School Liaison Officer', role: 'School Relations', dept: 'Partnerships', bio: 'The direct point of contact for principals and teachers onboarding new chapters.' },
];

export default function LeadershipPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Our Team"
        title="The team behind the movement."
        lede="Mikaelson School Club is built and run by a dedicated team committed to one mission — giving every African secondary school student the habits, mindset, and community to lead."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">01 · Core Team</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              Who we are
            </h2>
          </Reveal>
          <div className="people">
            {OFFICERS.map((o, i) => (
              <Reveal delay={i * 90} key={o.name}>
                <div className="person">
                  <div className="person-avatar">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--accent-ink)' }}>
                      {o.name.charAt(0)}
                    </span>
                  </div>
                  <h3>{o.name}</h3>
                  <div className="role">{o.role}</div>
                  <p>{o.bio}</p>
                  <a className="email" href={`mailto:${o.email}`}>{o.email}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)', paddingTop: 72 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">02 · Advisors</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              Our advisors
            </h2>
          </Reveal>
          <div className="advisors">
            {ADVISORS.map((a, i) => (
              <Reveal delay={i * 100} key={a.name}>
                <div className="advisor">
                  <div className="advisor-avatar">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--accent-ink)' }}>
                      {a.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, margin: 0 }}>{a.name}</h3>
                    <div className="role" style={{ color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', margin: '6px 0 2px', fontWeight: 700 }}>{a.role}</div>
                    <div className="muted" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 10 }}>{a.dept}</div>
                    <p className="muted" style={{ margin: 0, fontSize: 14.5 }}>{a.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <span className="label nodash" style={{ justifyContent: 'center', display: 'flex' }}>
                Applications open each September
              </span>
              <h2 className="display" style={{ marginTop: 14, fontSize: 'clamp(30px,4vw,48px)' }}>
                Interested in leading?
              </h2>
              <p>
                We&apos;re always looking for passionate students to join the leadership team and run new chapters.
                Step up and we&apos;ll give you the playbook.
              </p>
              <div className="cta-actions">
                <Link href="/get-involved" className="btn btn-primary">
                  Apply for leadership <IconArrow size={16} className="arr" />
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
