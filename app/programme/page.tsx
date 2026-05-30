import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Link from 'next/link';
import { IconBuild, IconLead, IconDigital, IconCheck } from '../components/Icons';

export const metadata = {
  title: 'The Programme | Club',
  description:
    'How the Club programme works, a weekly rhythm that builds habits, leadership, and digital fluency term by term.',
};

export default function ProgrammePage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          label="How It Works"
          title="A system, not just a club."
          lede="the club programme runs on a weekly rhythm that compounds, building habits, leadership, and digital fluency term by term."
        />

        {/* Section 1 Three Pillars */}
        <section className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">The Three Pillars</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px' }}
                >
                  One system, three disciplines.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="cards">
                {[
                  {
                    Icon: IconBuild,
                    num: '01',
                    title: 'Habit Systems',
                    body: 'Every member tracks personal habits weekly. From sleep and exercise to study routines, we help students build consistency that carries through exams and beyond.',
                  },
                  {
                    Icon: IconLead,
                    num: '02',
                    title: 'Community & Leadership',
                    body: 'Chapters are student-led. Members vote on a student exec team, run projects, and hold each other accountable, practicing real leadership at school level.',
                  },
                  {
                    Icon: IconDigital,
                    num: '03',
                    title: 'Digital Thinking',
                    body: 'Sessions include practical tech: using AI tools responsibly, digital communication, and basic problem-solving with technology, skills school doesn\'t cover.',
                  },
                ].map((card) => (
                  <div key={card.num} className="card">
                    <div className="card-ico">
                      <card.Icon size={22} />
                    </div>
                    <span className="card-num">{card.num}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 2 Weekly Rhythm */}
        <section className="sec" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">03 · The Weekly Rhythm</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px', marginBottom: '16px' }}
                >
                  What a chapter week looks like.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: '1.65', maxWidth: '36em' }}>
                  Each week is structured to build momentum without overwhelming students. Small, consistent actions compound into real change.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rhythm">
                {[
                  {
                    n: 'Monday',
                    title: 'Check-in',
                    body: 'Members log last week\'s habits and set goals for the week. Takes five minutes, the discipline is in showing up and being honest.',
                  },
                  {
                    n: 'Wednesday',
                    title: 'Huddle',
                    body: '45-minute session led by the student exec: a skill segment, habit review, and group discussion. The heart of the chapter week.',
                  },
                  {
                    n: 'Friday',
                    title: 'Reflection',
                    body: 'A personal journal prompt or accountability pair check-in. Students close the week with intention, not just relief.',
                  },
                  {
                    n: 'Monthly',
                    title: 'Project',
                    body: 'Every month, the chapter ships something real: a community action, presentation, or skill showcase. Progress you can point to.',
                  },
                ].map((step) => (
                  <div key={step.n} className="step">
                    <span className="step-n">{step.n}</span>
                    <h4>{step.title}</h4>
                    <p>{step.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3 What Students Gain */}
        <section className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">What Students Gain</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px' }}
                >
                  Outcomes that matter beyond the classroom.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start' }}>
                {/* Left outcomes list */}
                <div>
                  <ul className="involve-bullets">
                    {[
                      'Leadership experience for CV and university applications',
                      'Peer accountability network that lasts beyond school',
                      'Digital skills and confidence for the real world',
                      'A habit system that sticks, not just a school-term experiment',
                      'Certificate of completion awarded each term',
                    ].map((item, i) => (
                      <li key={i}>
                        <span className="ck">
                          <IconCheck size={16} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right testimonial */}
                <div className="tcard">
                  <div className="qmark">&ldquo;</div>
                  <blockquote>
                    Before this club I had no idea what I was capable of. Now I&rsquo;m running sessions and three of my classmates have applied to the exec team.
                  </blockquote>
                  <div className="tperson">
                    <div className="tavatar">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: 'var(--muted)' }}>
                        <circle cx="12" cy="8" r="4" />
                        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="nm">Amara</p>
                      <p className="rl">Grade 11 · Lagos</p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* CTA */}
        <section className="sec" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <Reveal>
              <div className="cta-band">
                <div className="cta-blob cta-blob-tr" />
                <div className="cta-blob cta-blob-bl" />
                <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
                  Join a chapter or start one.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '34em', margin: '0 auto 32px' }}>
                  Whether you&rsquo;re a student who wants to grow or a school that wants to offer more, there is a place for you in the programme.
                </p>
                <div className="cta-actions">
                  <Link href="/apply" className="btn btn-turquoise">
                    Apply Now
                  </Link>
                  <Link href="/for-schools" className="btn btn-ghost">
                    Learn more for schools
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
