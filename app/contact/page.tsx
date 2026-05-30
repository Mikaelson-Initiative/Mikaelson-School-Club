import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Mikaelson School Club — general enquiries, school partnerships, sponsorship, and media contact.',
  openGraph: {
    title: 'Contact | Mikaelson School Club',
    description: 'Contact Mikaelson School Club for enquiries, partnerships, and media.',
  },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconMail, IconGlobe, IconCompass } from '../components/Icons';
import Link from 'next/link';

const CONTACTS = [
  {
    Icon: IconMail,
    title: 'General Enquiries',
    email: 'hello@mikaelsoninitiative.org',
    body: 'For questions about the programme, chapters, and membership.',
  },
  {
    Icon: IconGlobe,
    title: 'Partnerships & Sponsors',
    email: 'partners@mikaelsoninitiative.org',
    body: 'For organisations interested in supporting the initiative.',
  },
  {
    Icon: IconCompass,
    title: 'Media',
    email: 'media@mikaelsoninitiative.org',
    body: 'For press, interviews, and coverage requests.',
  },
];

const SOCIALS = [
  { label: 'X', href: '#' },
  { label: 'in', href: '#' },
  { label: 'ig', href: '#' },
  { label: 'yt', href: '#' },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <PageHero
        label="Get in Touch"
        title="We'd love to hear from you."
        lede="Whether you're a school, a student, a potential partner, or media — reach out."
      />

      <section className="sec">
        <div className="wrap">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 64,
              alignItems: 'start',
            }}
          >
            {/* Left — Contact blocks + socials */}
            <div>
              <Reveal>
                <span className="label">Contact</span>
                <h2
                  className="display"
                  style={{ fontSize: 'clamp(24px,2.8vw,36px)', margin: '14px 0 32px' }}
                >
                  Get in touch directly.
                </h2>
              </Reveal>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {CONTACTS.map((c, i) => (
                  <Reveal delay={i * 80} key={c.email}>
                    <div className="feat">
                      <div className="feat-ico">
                        <c.Icon size={20} />
                      </div>
                      <div>
                        <h5>{c.title}</h5>
                        <a
                          href={`mailto:${c.email}`}
                          style={{
                            color: 'var(--accent-ink)',
                            textDecoration: 'none',
                            fontWeight: 600,
                            fontSize: 15,
                            display: 'block',
                            marginBottom: 4,
                          }}
                        >
                          {c.email}
                        </a>
                        <p>{c.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Social row */}
              <Reveal delay={260}>
                <div style={{ marginTop: 40 }}>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      textTransform: 'uppercase',
                      letterSpacing: '0.14em',
                      color: 'var(--muted)',
                      fontWeight: 700,
                      margin: '0 0 14px',
                    }}
                  >
                    Follow us
                  </p>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'var(--accent-soft)',
                          color: 'var(--accent-ink)',
                          display: 'grid',
                          placeItems: 'center',
                          fontFamily: 'var(--font-mono)',
                          fontSize: 13,
                          fontWeight: 700,
                          textDecoration: 'none',
                          transition: 'background .2s, transform .2s',
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right — Simple contact form (mailto fallback, no JS required) */}
            <Reveal delay={100}>
              <div
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--line)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 36,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 22,
                    margin: '0 0 8px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  Send a message
                </h3>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: 14.5,
                    margin: '0 0 24px',
                    lineHeight: 1.55,
                  }}
                >
                  Use the email addresses above or fill in the form below:
                </p>

                <form
                  action="mailto:hello@mikaelsoninitiative.org"
                  method="GET"
                  style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
                >
                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-ink)',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: 7,
                      }}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your name"
                      style={{
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        padding: '11px 14px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 15,
                        width: '100%',
                        background: 'white',
                        color: 'var(--text)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-ink)',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: 7,
                      }}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      placeholder="you@email.com"
                      style={{
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        padding: '11px 14px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 15,
                        width: '100%',
                        background: 'white',
                        color: 'var(--text)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-ink)',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: 7,
                      }}
                    >
                      Type
                    </label>
                    <select
                      name="subject"
                      style={{
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        padding: '11px 14px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 15,
                        width: '100%',
                        background: 'white',
                        color: 'var(--text)',
                        outline: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="School enquiry">School enquiry</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Media">Media</option>
                      <option value="General">General</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 11,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: 'var(--accent-ink)',
                        fontWeight: 700,
                        display: 'block',
                        marginBottom: 7,
                      }}
                    >
                      Message
                    </label>
                    <textarea
                      name="body"
                      rows={4}
                      placeholder="Tell us what&apos;s on your mind..."
                      style={{
                        border: '1px solid var(--line)',
                        borderRadius: 'var(--radius)',
                        padding: '11px 14px',
                        fontFamily: 'var(--font-body)',
                        fontSize: 15,
                        width: '100%',
                        background: 'white',
                        color: 'var(--text)',
                        outline: 'none',
                        resize: 'vertical',
                        lineHeight: 1.6,
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-turquoise"
                    style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
                  >
                    Send message
                  </button>
                </form>

                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    margin: '16px 0 0',
                    fontFamily: 'var(--font-mono)',
                    letterSpacing: '0.02em',
                  }}
                >
                  Or email{' '}
                  <Link
                    href="/contact"
                    style={{ color: 'var(--accent-ink)', textDecoration: 'none', fontWeight: 700 }}
                  >
                    hello@mikaelsoninitiative.org
                  </Link>{' '}
                  directly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
