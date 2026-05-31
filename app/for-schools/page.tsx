import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Link from 'next/link';
import { IconCheck } from '../components/Icons';

export const metadata = {
  title: 'For Schools | Club',
  description:
    'Bring a structured leadership programme to your school, we provide the system, training, and support. You provide the students and the space.',
};

export default function ForSchoolsPage() {
  return (
    <>
      <Header />

      <main>
        <PageHero
          label="For Schools"
          title="Plug a leadership programme into your school, without building it yourself."
          lede="We provide the system, the training, and the support. You provide the students and the space."
        />

        {/* Section 1 What we provide */}
        <section className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">What we provide</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px' }}
                >
                  Everything your school needs to run a successful chapter.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="cards cards-2">
                {[
                  {
                    num: '01',
                    title: 'Turnkey Curriculum',
                    body: 'A full term-by-term session plan, facilitator guides, and student workbooks, ready to use from day one. No curriculum design required.',
                  },
                  {
                    num: '02',
                    title: 'Champion Training',
                    body: 'We certify one or two staff or student leads to run the chapter independently. Champions are equipped with everything they need in a focused training programme.',
                  },
                  {
                    num: '03',
                    title: 'Tracking Dashboard',
                    body: 'A simple tool to monitor attendance, habit streaks, and chapter progress. Principals and Champions get clear visibility without administrative overhead.',
                  },
                  {
                    num: '04',
                    title: 'Ongoing Support',
                    body: 'Access to our programme team for troubleshooting, coaching, and resources throughout the term. You are never left to figure it out alone.',
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

        {/* Section 2 What we ask of you */}
        <section className="sec" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">What we ask of you</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px' }}
                >
                  A light commitment with measurable returns.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="grid-2col">
                {/* Left checklist */}
                <div>
                  <ul className="involve-bullets">
                    {[
                      'A weekly 45-minute session slot in the school timetable',
                      'Space for students to meet, a classroom is perfectly fine',
                      'One faculty or student Champion willing to be trained',
                      'Promotion of the club to interested students at launch',
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

                {/* Right stat card */}
                <div
                  style={{
                    border: '1px solid var(--line)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '36px',
                    background: 'var(--surface)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
                    {[
                      { stat: 'Zero', label: 'setup cost to pilot the programme' },
                      { stat: '1 term', label: 'minimum commitment to get started' },
                      { stat: 'Full', label: 'handover after Champion training is complete' },
                      { stat: 'Monthly', label: 'check-in with our programme team included' },
                    ].map((item, i) => (
                      <div key={i} style={{ display: 'flex', gap: '18px', alignItems: 'baseline' }}>
                        <span
                          style={{
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: '28px',
                            letterSpacing: '-0.03em',
                            color: 'var(--accent)',
                            flex: '0 0 auto',
                          }}
                        >
                          {item.stat}
                        </span>
                        <span style={{ color: 'var(--muted)', fontSize: '15px', lineHeight: '1.4' }}>
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3 Eligibility */}
        <section className="sec">
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">Eligibility</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px', marginBottom: '16px' }}
                >
                  Is your school a good fit?
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '17px', lineHeight: '1.65', maxWidth: '36em' }}>
                  We welcome schools at every stage, from those with no leadership programme to those looking to formalise what already exists.
                </p>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rhythm">
                {[
                  {
                    n: '01',
                    title: 'Secondary school',
                    body: 'Any secondary school on the African continent is eligible to apply, public, private, rural, or urban. The programme is built to adapt.',
                  },
                  {
                    n: '02',
                    title: '10+ interested students',
                    body: 'We ask for a minimum cohort to make the chapter viable. In practice, most schools launch with 20–40 students in the first term.',
                  },
                  {
                    n: '03',
                    title: 'One committed adult',
                    body: 'A teacher or staff member willing to support the Champion and attend the training. This person does not need to run sessions, just show up.',
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

        {/* Section 4 How to apply */}
        <section className="sec" style={{ background: 'var(--surface-2)' }}>
          <div className="wrap">
            <Reveal>
              <div className="sec-head" style={{ marginBottom: '48px' }}>
                <span className="label">How to apply</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(30px, 3.8vw, 46px)', marginTop: '18px', marginBottom: '16px' }}
                >
                  From interest to launch in four steps.
                </h2>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="rhythm">
                {[
                  {
                    n: '01',
                    title: 'Apply',
                    body: 'Submit your school\'s interest form. Tell us a bit about your school, your students, and who would serve as Champion.',
                  },
                  {
                    n: '02',
                    title: 'We review',
                    body: 'Our team reviews your application and follows up within one week. We may schedule a short call to discuss fit and expectations.',
                  },
                  {
                    n: '03',
                    title: 'Champion training',
                    body: 'Your Champion completes a focused training programme. They receive all materials, the session plan, and direct support from our team.',
                  },
                  {
                    n: '04',
                    title: 'Chapter launch',
                    body: 'Your first session goes live. Our team supports the launch and stays in contact monthly for the remainder of the term.',
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

            <Reveal delay={160}>
              <p
                style={{
                  marginTop: '28px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '13px',
                  letterSpacing: '0.04em',
                  color: 'var(--muted)',
                  textAlign: 'center',
                }}
              >
                Most chapters launch within one school term.
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
                <h2 className="display" style={{ fontSize: 'clamp(28px, 4vw, 48px)', marginBottom: '16px' }}>
                  Start a chapter at your school.
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '18px', maxWidth: '36em', margin: '0 auto 32px' }}>
                  Join the growing network of schools across Africa building the next generation of leaders.
                </p>
                <div className="cta-actions">
                  <Link href="/apply" className="btn btn-turquoise">
                    Apply Now
                  </Link>
                  <Link href="/contact" className="btn btn-ghost">
                    Ask a question
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
