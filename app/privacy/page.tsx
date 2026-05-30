import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'How Mikaelson School Club collects, stores, and uses personal data — including student data consent and your rights.',
  openGraph: {
    title: 'Privacy Policy | Mikaelson School Club',
    description: 'Privacy Policy — how we handle your data.',
  },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const SECTIONS = [
  {
    heading: 'Information We Collect',
    content: (
      <>
        <p>We collect the following types of information:</p>
        <ul>
          <li>Contact details submitted through school applications and enquiry forms (name, email address, school name)</li>
          <li>Student participation data (attendance, habit tracking) only with explicit school and parent/guardian consent</li>
          <li>Usage data from this website, including pages visited and time spent, collected via standard web analytics</li>
        </ul>
      </>
    ),
  },
  {
    heading: 'How We Use Your Information',
    content: (
      <>
        <p>We use information we collect to:</p>
        <ul>
          <li>Process applications and contact schools about the programme</li>
          <li>Run the programme and track chapter progress and outcomes</li>
          <li>Improve the website and the quality of our communications</li>
        </ul>
        <p>We do not use your information for advertising or share it with marketing third parties.</p>
      </>
    ),
  },
  {
    heading: 'Data Storage',
    content: (
      <p>
        All data is stored securely using industry-standard encryption. We do not share personal data with third parties
        without consent, except where required by law. Data is retained only for as long as necessary to fulfil the
        purposes described in this policy.
      </p>
    ),
  },
  {
    heading: 'Student Data',
    content: (
      <p>
        We collect student participation data — including attendance and habit tracking — only with explicit consent
        from the school and the student&apos;s parent or guardian. Students are never identified by name in public reporting.
        Aggregate and anonymised data may be used to report programme outcomes to partners and funders.
      </p>
    ),
  },
  {
    heading: 'Your Rights',
    content: (
      <p>
        You have the right to request access to, correction of, or deletion of personal data we hold about you at any time.
        To exercise these rights, please email{' '}
        <a href="mailto:hello@mikaelsoninitiative.org" style={{ color: 'var(--accent-ink)' }}>
          hello@mikaelsoninitiative.org
        </a>
        . We will respond within 14 days.
      </p>
    ),
  },
  {
    heading: 'Contact',
    content: (
      <p>
        For any privacy-related enquiries, please contact us at{' '}
        <a href="mailto:hello@mikaelsoninitiative.org" style={{ color: 'var(--accent-ink)' }}>
          hello@mikaelsoninitiative.org
        </a>
        .
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <section style={{ padding: '150px 0 48px', position: 'relative' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Legal</span>
            <h1 className="display" style={{ fontSize: 'clamp(36px,5vw,62px)', margin: '16px 0 12px' }}>
              Privacy Policy
            </h1>
            <p className="muted" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, letterSpacing: '.04em' }}>
              Last updated: May 2026
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div style={{ maxWidth: 720, margin: '0 auto' }}>
            {SECTIONS.map((sec, i) => (
              <Reveal key={sec.heading} delay={i * 50}>
                <div>
                  <h2 style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 22,
                    margin: '32px 0 12px',
                    letterSpacing: '-0.01em',
                  }}>
                    {sec.heading}
                  </h2>
                  <div className="muted" style={{ fontSize: 16, lineHeight: 1.7 }}>
                    {sec.content}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
