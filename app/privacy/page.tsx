import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How Mikaelson School Club collects, stores, and uses personal data, including student data consent and your rights.',
  openGraph: { title: 'Privacy Policy | Mikaelson School Club', description: 'Privacy Policy, how we handle your data.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

import { WRAP, LABEL } from '../lib/tw';

const SECTIONS = [
  { heading: 'Information We Collect', content: (<><p>We collect the following types of information:</p><ul><li>Contact details submitted through school applications and enquiry forms (name, email address, school name)</li><li>Student participation data (attendance, habit tracking) only with explicit school and parent/guardian consent</li><li>Usage data from this website, including pages visited and time spent, collected via standard web analytics</li></ul></>) },
  { heading: 'How We Use Your Information', content: (<><p>We use information we collect to:</p><ul><li>Process applications and contact schools about the programme</li><li>Run the programme and track chapter progress and outcomes</li><li>Improve the website and the quality of our communications</li></ul><p>We do not use your information for advertising or share it with marketing third parties.</p></>) },
  { heading: 'Data Storage', content: (<p>All data is stored securely using industry-standard encryption. We do not share personal data with third parties without consent, except where required by law. Data is retained only for as long as necessary to fulfil the purposes described in this policy.</p>) },
  { heading: 'Student Data', content: (<p>We collect student participation data, including attendance and habit tracking, only with explicit consent from the school and the student&apos;s parent or guardian. Students are never identified by name in public reporting. Aggregate and anonymised data may be used to report programme outcomes to partners and funders.</p>) },
  { heading: 'Your Rights', content: (<p>You have the right to request access to, correction of, or deletion of personal data we hold about you at any time. To exercise these rights, please email{' '}<a href="mailto:hello@mikaelsoninitiative.org" className="text-accent-ink">hello@mikaelsoninitiative.org</a>. We will respond within 14 days.</p>) },
  { heading: 'Contact', content: (<p>For any privacy-related enquiries, please contact us at{' '}<a href="mailto:hello@mikaelsoninitiative.org" className="text-accent-ink">hello@mikaelsoninitiative.org</a>.</p>) },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />

      <section className="relative pt-[150px] pb-12 max-sm:pt-[92px]">
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Legal</span>
            <h1 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-3" style={{ fontSize: 'clamp(36px,5vw,62px)' }}>
              Privacy Policy
            </h1>
            <p className="font-mono text-muted text-[13px] tracking-[.04em]">Last updated: May 2026</p>
          </Reveal>
        </div>
      </section>

      <section className="relative pb-[92px] max-sm:pb-[56px]">
        <div className={WRAP}>
          <div className="max-w-[720px] mx-auto">
            {SECTIONS.map((sec, i) => (
              <Reveal key={sec.heading} delay={i * 50}>
                <div>
                  <h2 className="font-display font-semibold text-[22px] mt-8 mb-3 tracking-[-0.01em]">{sec.heading}</h2>
                  <div className="text-muted text-[16px] leading-[1.7]">{sec.content}</div>
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
