import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Link from 'next/link';
import { IconCheck } from '../components/Icons';

export const metadata = {
  title: 'About | Club',
  description:
    'The story behind Club, born from a gap in how schools prepare young people for life after graduation.',
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          label="Our Story"
          title="Born from a gap. Built for the next generation."
          lede="Most schools teach students what to know. Club teaches them who to be."
        />

        {/* Section 1 The Problem */}
        <section className="sec">
          <div className="wrap">
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
                <div>
                  <span className="label">The Problem</span>
                  <h2
                    className="display"
                    style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px', marginBottom: '24px' }}
                  >
                    Most students graduate without learning how to lead themselves.
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '16px' }}>
                    School curricula are built around knowledge delivery, exams, grades, and content. They measure what a student can recall, not who they are becoming. The habits, mindset, and community that determine long-term success fall entirely outside the classroom.
                  </p>
                  <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>
                    The result is a generation of graduates who are academically capable but personally underprepared, without a peer network, a consistent routine, or a sense of their own leadership potential. That is the gap Club was built to close.
                  </p>
                </div>

                <div
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '24px',
                    }}
                  >
                    The data
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {[
                      {
                        stat: '70%',
                        text: 'of students report feeling unprepared for life after school',
                      },
                      {
                        stat: '1 in 5',
                        text: 'has a trusted adult mentor outside of their family',
                      },
                      {
                        stat: '0',
                        text: 'Most school clubs are social, not developmental, leaving a structured growth gap',
                      },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'flex-start' }}>
                        <div
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: i === 1 ? '22px' : '32px',
                            lineHeight: 1,
                            letterSpacing: '-0.03em',
                            color: 'var(--accent)',
                            flex: '0 0 auto',
                            paddingTop: '2px',
                          }}
                        >
                          {item.stat}
                        </div>
                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px', lineHeight: '1.55' }}>
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 2 The Solution */}
        <section className="sec" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">The Solution</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px', marginBottom: '20px' }}
                >
                  A structured programme that lives inside your school.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: '1.65', maxWidth: '38em' }}>
                  Club is embedded in schools and runs as a weekly chapter meeting, combining habit systems, peer leadership, and digital literacy into one cohesive programme, no extra infrastructure required.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="cards">
                {[
                  {
                    num: '01',
                    title: 'Habit Systems',
                    body: 'Students track daily habits that compound into identity. From sleep and study routines to fitness and reflection, consistency builds character over a school term.',
                  },
                  {
                    num: '02',
                    title: 'Peer Leadership',
                    body: 'Elected student leads run each chapter with faculty support. Members practice real accountability, facilitation, and decision-making at the school level.',
                  },
                  {
                    num: '03',
                    title: 'Digital Literacy',
                    body: 'Practical tech skills for the real world, using AI tools responsibly, digital communication, and basic problem-solving with technology that school doesn\'t cover.',
                  },
                ].map((card) => (
                  <div key={card.num} className="card">
                    <span className="card-num">{card.num}</span>
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3 The Initiative */}
        <section className="sec">
          <div className="wrap">
            <Reveal>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '56px', alignItems: 'start' }}>
                <div>
                  <span className="label">The Initiative</span>
                  <h2
                    className="display"
                    style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px', marginBottom: '24px' }}
                  >
                    Part of something bigger.
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7', marginBottom: '16px' }}>
                    The Mikaelson Initiative is a pan-African organisation focused on education, technology, and opportunity. It was founded on the belief that the continent's next generation of leaders is already in secondary schools, they simply need the right environment to emerge.
                  </p>
                  <p style={{ color: 'var(--muted)', fontSize: '16px', lineHeight: '1.7' }}>
                    Club is one of its flagship programmes, designed to scale across secondary schools on the continent. By embedding within existing school structures, the Club reaches students where they already are, making leadership development accessible to every student, not just a privileged few.
                  </p>
                </div>

                <div
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '40px',
                    background: 'var(--surface)',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '12px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      marginBottom: '28px',
                    }}
                  >
                    Club Values
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {[
                      { value: 'Unity', desc: 'We are stronger together than apart. Every chapter, every student, every continent.' },
                      { value: 'Mutual Support', desc: 'We hold each other accountable and lift each other up, that is the foundation of the club.' },
                      { value: 'Shared Progress', desc: 'Individual growth compounds into community advancement. Our success is collective.' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                        <div
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            background: 'var(--accent-soft)',
                            color: 'var(--accent-ink)',
                            display: 'grid',
                            placeItems: 'center',
                            flex: '0 0 auto',
                            marginTop: '2px',
                          }}
                        >
                          <IconCheck size={14} />
                        </div>
                        <div>
                          <p style={{ margin: '0 0 4px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: '16px' }}>
                            {item.value}
                          </p>
                          <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px', lineHeight: '1.55' }}>
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
                  Ready to bring the club to your school?
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '36em', margin: '0 auto 32px' }}>
                  We partner with secondary schools across Africa to launch chapters that transform student culture.
                </p>
                <div className="cta-actions">
                  <Link href="/apply" className="btn btn-turquoise">
                    Apply as a School
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Contact Us
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
