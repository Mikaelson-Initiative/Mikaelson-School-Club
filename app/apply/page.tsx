'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Link from 'next/link';

const labelStyle: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 12,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  marginBottom: 8,
  display: 'block',
  color: 'var(--accent-ink)',
  fontWeight: 700,
};

const inputStyle: React.CSSProperties = {
  border: '1px solid var(--line)',
  borderRadius: 'var(--radius)',
  padding: '12px 16px',
  fontFamily: 'var(--font-body)',
  width: '100%',
  background: 'white',
  color: 'var(--text)',
  fontSize: 15,
  outline: 'none',
  transition: 'border-color .2s',
};

const STEPS = [
  { n: '01', text: 'We review your application' },
  { n: '02', text: 'We schedule a 30-min call' },
  { n: '03', text: 'We run Champion training' },
  { n: '04', text: 'Your chapter launches' },
];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />

      <PageHero
        label="Apply"
        title="Bring Mikaelson to your school."
        lede="Complete this short form and we'll be in touch within 3 working days to discuss next steps."
      />

      <section className="sec">
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 0.72fr',
              gap: 56,
              alignItems: 'start',
            }}
          >
            {/* Left — Form */}
            <div>
              {submitted ? (
                <div
                  style={{
                    background: 'var(--accent-soft)',
                    border: '1px solid var(--accent-2)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '40px 36px',
                    textAlign: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 12,
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: 'var(--accent-ink)',
                      fontWeight: 700,
                    }}
                  >
                    Application received
                  </span>
                  <h2
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 700,
                      fontSize: 'clamp(22px,2.6vw,30px)',
                      letterSpacing: '-0.02em',
                      margin: '16px 0 12px',
                      color: 'var(--text)',
                    }}
                  >
                    We&apos;ll be in touch within 3 working days.
                  </h2>
                  <p style={{ color: 'var(--muted)', fontSize: 16, margin: 0 }}>
                    Keep an eye on your inbox. If you have any urgent questions, email{' '}
                    <a
                      href="mailto:hello@mikaelsoninitiative.org"
                      style={{ color: 'var(--accent-ink)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      hello@mikaelsoninitiative.org
                    </a>
                    .
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>School Name</label>
                    <input style={inputStyle} type="text" name="school" required placeholder="e.g. Accra Academy" />
                  </div>

                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input style={inputStyle} type="text" name="name" required placeholder="First and last name" />
                  </div>

                  <div>
                    <label style={labelStyle}>Your Role</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }} name="role">
                      <option value="">Select your role</option>
                      <option>Principal</option>
                      <option>Deputy Principal</option>
                      <option>Head of Student Affairs</option>
                      <option>Teacher</option>
                      <option>Student</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label style={labelStyle}>Email Address</label>
                    <input
                      style={inputStyle}
                      type="email"
                      name="email"
                      required
                      placeholder="you@yourschool.edu"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Phone Number</label>
                    <input style={inputStyle} type="tel" name="phone" placeholder="+233 000 000 000" />
                  </div>

                  <div>
                    <label style={labelStyle}>City &amp; Country</label>
                    <input
                      style={inputStyle}
                      type="text"
                      name="location"
                      required
                      placeholder="e.g. Accra, Ghana"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Approximate number of students interested</label>
                    <input
                      style={inputStyle}
                      type="number"
                      name="students"
                      min={1}
                      placeholder="e.g. 25"
                    />
                  </div>

                  <div>
                    <label style={labelStyle}>Tell us about your school and why you want to run a Mikaelson chapter</label>
                    <textarea
                      style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                      name="message"
                      rows={4}
                      placeholder="Tell us a bit about your school, the students you're thinking of, and what motivated you to apply..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-turquoise"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                  >
                    Submit Application &rarr;
                  </button>
                </form>
              )}
            </div>

            {/* Right — Info box */}
            <div
              style={{
                background: 'var(--surface-2)',
                border: '1px solid var(--line)',
                borderRadius: 'var(--radius-lg)',
                padding: 32,
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--accent-ink)',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: 20,
                }}
              >
                What happens next
              </span>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {STEPS.map((s) => (
                  <div key={s.n} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 13,
                        fontWeight: 700,
                        color: 'var(--accent-ink)',
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {s.n}
                    </span>
                    <p style={{ margin: 0, fontSize: 15, color: 'var(--text)', lineHeight: 1.5 }}>{s.text}</p>
                  </div>
                ))}
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--line)', margin: '28px 0' }} />

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.14em',
                  color: 'var(--accent-ink)',
                  fontWeight: 700,
                  display: 'block',
                  marginBottom: 10,
                }}
              >
                Questions?
              </span>
              <p style={{ margin: 0, fontSize: 14.5, color: 'var(--muted)', lineHeight: 1.65 }}>
                Email us at{' '}
                <a
                  href="mailto:hello@mikaelsoninitiative.org"
                  style={{ color: 'var(--accent-ink)', textDecoration: 'none', fontWeight: 600 }}
                >
                  hello@mikaelsoninitiative.org
                </a>{' '}
                or use the{' '}
                <Link href="/contact" style={{ color: 'var(--accent-ink)', textDecoration: 'none', fontWeight: 600 }}>
                  contact form
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
