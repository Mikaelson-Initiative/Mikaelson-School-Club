import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Students',
  description:
    'What students experience in the Club, weekly sessions, leadership roles, habit tracking, and community projects.',
  openGraph: {
    title: 'For Students | Club',
    description: 'For students, what you will experience, do, and gain in the club.',
  },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import {
  IconArrow,
  IconCheck,
  IconBuild,
  IconLead,
  IconDigital,
  IconGlobe,
} from '../components/Icons';
import Link from 'next/link';

const RHYTHM_STEPS = [
  {
    n: '01',
    title: 'Set your goals',
    body: 'Every week you set habits and intentions, then check back in. Progress is tracked, not assumed.',
  },
  {
    n: '02',
    title: 'Learn something real',
    body: 'Sessions cover leadership, communication, and digital skills, not theory, but things you can use the same day.',
  },
  {
    n: '03',
    title: 'Work with your peers',
    body: 'The club is student-run. You learn by doing with people your own age, not by watching adults demonstrate.',
  },
  {
    n: '04',
    title: 'Ship something',
    body: 'Every month, your chapter delivers a real project or presentation. Something you can point to and say you built it.',
  },
];

const GAINS = [
  'A habit system you actually use',
  'Leadership experience before university',
  'Digital skills and confidence',
  'Accountability partners who push you',
  'A record of what you\'ve done and led',
];

const ROLES = [
  {
    Icon: IconLead,
    title: 'Chapter President',
    body: 'Leads weekly huddles and is the main point of contact with the school. Sets the tone and pace for the whole chapter.',
  },
  {
    Icon: IconBuild,
    title: 'Habits Coordinator',
    body: 'Runs the habit tracking system and keeps members accountable. Celebrates wins and flags when people go quiet.',
  },
  {
    Icon: IconDigital,
    title: 'Digital Lead',
    body: 'Facilitates the digital literacy sessions and manages the chapter\'s online presence and content calendar.',
  },
  {
    Icon: IconGlobe,
    title: 'Community Lead',
    body: 'Coordinates the monthly community project and manages external partnerships with local organisations.',
  },
];

export default function ForStudentsPage() {
  return (
    <>
      <Header />

      <PageHero
        label="For Students"
        title="This isn't a normal school club."
        lede="It's the one that gives you skills, accountability, and a community that actually helps you grow."
      />

      {/* Section 1 Weekly practice */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <span className="label">What you&apos;ll experience</span>
            <h2
              className="display"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', margin: '14px 0 40px', maxWidth: '18em' }}
            >
              A weekly practice that builds over time.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="rhythm">
              {RHYTHM_STEPS.map((s, i) => (
                <div className="step" key={s.n} style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="step-n">{s.n}</span>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2 What you'll gain */}
      <section className="sec" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">What you&apos;ll gain</span>
            <h2
              className="display"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', margin: '14px 0 40px', maxWidth: '18em' }}
            >
              Skills that don&apos;t show up on the timetable.
            </h2>
          </Reveal>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 48,
              alignItems: 'start',
            }}
          >
            <Reveal delay={60}>
              <ul className="involve-bullets">
                {GAINS.map((g) => (
                  <li key={g}>
                    <span className="ck">
                      <IconCheck size={18} />
                    </span>
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              <div className="tcard">
                <div className="qmark">&ldquo;</div>
                <blockquote>
                  I thought I wasn&apos;t a &lsquo;leader&rsquo;. Now I&apos;m running our chapter&apos;s community
                  project and I&apos;ve got three people looking to me for direction.
                </blockquote>
                <div className="tperson">
                  <div className="tavatar">
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontWeight: 700,
                        fontSize: 18,
                        color: 'var(--accent-ink)',
                      }}
                    >
                      K
                    </span>
                  </div>
                  <div>
                    <p className="nm">Kwame</p>
                    <p className="rl">Grade 12 , Accra</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 3 Student Leadership Roles */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <span className="label">Student Leadership Roles</span>
            <h2
              className="display"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', margin: '14px 0 12px', maxWidth: '18em' }}
            >
              The people who run the chapter.
            </h2>
            <p
              className="muted"
              style={{ fontSize: 16, margin: '0 0 36px', maxWidth: '36em' }}
            >
              These roles are elected each term. Anyone can run.
            </p>
          </Reveal>
          <div
            className="cards"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}
          >
            {ROLES.map((r, i) => (
              <Reveal delay={i * 70} key={r.title}>
                <div className="card">
                  <div className="card-ico">
                    <r.Icon size={24} />
                  </div>
                  <h3>{r.title}</h3>
                  <p>{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 Why it matters */}
      <section className="sec" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Why it matters</span>
            <h2
              className="display"
              style={{ fontSize: 'clamp(28px,3.4vw,44px)', margin: '14px 0 28px', maxWidth: '16em' }}
            >
              What changes when students lead.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <p
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: 'var(--text)',
                maxWidth: '52em',
              }}
            >
              Most students are told to wait. Wait until university. Wait until you have a job. Wait until someone gives
              you the title. Club is built on the opposite idea: that leadership is a practice, not a
              reward. Students who go through the programme leave with a documented record of what they did ,
              sessions run, habits tracked, projects delivered. That&apos;s the thing that makes an application stand
              out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <h2 className="display" style={{ fontSize: 'clamp(28px,3.8vw,48px)', margin: '0 auto 14px' }}>
                Find a chapter near you or apply to start one.
              </h2>
              <p>
                Whether there&apos;s already a chapter at your school or you want to be the one to launch it , we
                want to hear from you.
              </p>
              <div className="cta-actions">
                <Link href="/chapters" className="btn btn-turquoise">
                  Find a chapter <IconArrow size={16} className="arr" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Speak to someone
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
