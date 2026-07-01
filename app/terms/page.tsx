import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms and conditions for using the Mikaelson School Club website and participating in the programme.',
  openGraph: { title: 'Terms of Use | Mikaelson School Club', description: 'Terms of Use for the Mikaelson School Club website.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

import { WRAP, LABEL } from '../lib/tw';

const SECTIONS = [
  { heading: 'Acceptance of Terms', content: (<p>By accessing or using this website, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the site.</p>) },
  { heading: 'Use of the Website', content: (<p>This website is provided for informational purposes and to facilitate applications to the Mikaelson School Club programme. You may not use the site for any unlawful purpose, to distribute harmful content, or to attempt to gain unauthorised access to any part of the site or its systems.</p>) },
  { heading: 'Intellectual Property', content: (<p>All content on this website, including text, graphics, logos, and design, is the property of the Mikaelson Initiative and is protected by applicable copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without written permission.</p>) },
  { heading: 'Programme Participation', content: (<p>Schools and students who join the Mikaelson School Club programme do so under a separate participation agreement, which governs the rights and obligations of programme participants. These Terms of Use apply to the website only and do not constitute an offer to participate in the programme.</p>) },
  { heading: 'Limitation of Liability', content: (<p>The Mikaelson Initiative provides this website on an &quot;as is&quot; basis. We make no warranties, express or implied, regarding the accuracy or completeness of the content. To the fullest extent permitted by law, the Mikaelson Initiative is not liable for any indirect, incidental, or consequential losses arising from your use of this website.</p>) },
  { heading: 'Changes to Terms', content: (<p>We may update these Terms of Use from time to time. Changes will be posted on this page with an updated date. Where changes are significant, we will notify users by email where contact details are held. Your continued use of the site after changes are posted constitutes your acceptance of the updated terms.</p>) },
  { heading: 'Contact', content: (<p>For any questions about these Terms of Use, please contact us at{' '}<a href="mailto:msc@mikaelsoninitiative.org" className="text-accent-ink">msc@mikaelsoninitiative.org</a>.</p>) },
];

export default function TermsPage() {
  return (
    <>
      <Header />

      <section className="relative pt-[150px] pb-12 max-sm:pt-[92px]">
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Legal</span>
            <h1 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-3" style={{ fontSize: 'clamp(36px,5vw,62px)' }}>
              Terms of Use
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
