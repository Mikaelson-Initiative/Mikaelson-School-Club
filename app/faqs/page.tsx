import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQs',
  description: 'Answers to the most common questions from schools, students, and parents about the Mikaelson School Club programme.',
  openGraph: { title: 'FAQs | Mikaelson School Club', description: 'Common questions about Mikaelson School Club answered.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

import { WRAP, LABEL } from '../lib/tw';

const FAQ_GROUPS = [
  {
    label: '01 · For Schools', heading: 'For Schools',
    faqs: [
      { q: 'How much does it cost to run a chapter?', a: 'There is no cost to pilot a chapter. We ask for a minimum one-term commitment and a designated Champion. Sponsorship and grant funding are available for schools that cannot self-fund after the pilot.' },
      { q: 'How long does it take to set up?', a: 'Most chapters are running within one school term from application. Champion training takes one day, and we provide everything else.' },
      { q: 'What does the school need to provide?', a: 'A weekly 45-minute session slot, a room, one Champion (teacher or senior student), and promotion of the club to interested students.' },
      { q: 'How many students do we need?', a: 'We ask for a minimum of 10 enrolled members to run a viable chapter. Most chapters start with 15-30.' },
    ],
  },
  {
    label: '02 · For Students', heading: 'For Students',
    faqs: [
      { q: 'Do I need to be a good student to join?', a: 'No. The club is for any student who wants to grow, not just high achievers. Many of our most active members start with low confidence.' },
      { q: 'What if I miss sessions?', a: 'Life happens. We ask for consistent effort, not perfection. The habit system is designed to restart, not punish.' },
      { q: 'Can I take on a leadership role?', a: 'Yes. Leadership roles are elected each term and open to all members. The exec team runs the chapter with support from the Champion.' },
    ],
  },
  {
    label: '03 · For Parents', heading: 'For Parents',
    faqs: [
      { q: 'Is this safe for my child?', a: 'Yes. All activities are school-based, supervised, and governed by safeguarding policies. We do not collect student data without explicit consent.' },
      { q: 'Will this distract from academics?', a: 'The club is designed to improve academic habits, not compete with them. Members report better focus and time management after one term.' },
    ],
  },
];

export default function FAQsPage() {
  return (
    <>
      <Header />
      <PageHero label="FAQs" title="Questions we get asked a lot." lede="From principals, students, parents, and partners. If your question isn't here, reach out." />

      <section className="relative pt-14 pb-[92px] max-sm:pb-[56px]">
        <div className={WRAP}>
          {FAQ_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 60}>
              <div className={gi < FAQ_GROUPS.length - 1 ? 'mb-16' : ''}>
                <span className={`${LABEL} mb-[10px]`}>{group.label}</span>
                <h3
                  className="font-display font-bold tracking-[-0.01em] mt-[10px] mb-8"
                  style={{ fontSize: 'clamp(22px,2.6vw,32px)' }}
                >
                  {group.heading}
                </h3>
                <div className="max-w-[760px]">
                  {group.faqs.map((item, i) => (
                    <div
                      key={item.q}
                      className={i < group.faqs.length - 1 ? 'border-b border-line pb-6 mb-6' : ''}
                    >
                      <div className="font-display font-semibold text-[18px] mb-2">{item.q}</div>
                      <div className="text-muted text-[16px] leading-[1.6]">{item.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative pb-[92px] max-sm:pb-[56px]">
        <div className={WRAP}>
          <Reveal>
            {/* CTA Band */}
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }} />
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }} />
              <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>Still have questions?</h2>
              <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">Our team is happy to answer any question not covered here. Reach out and we&apos;ll get back to you promptly.</p>
              <div className="flex gap-[14px] justify-center flex-wrap">
                <Link
                  href="/contact"
                  className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
                >
                  Contact us <IconArrow size={16} className="arr" />
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
