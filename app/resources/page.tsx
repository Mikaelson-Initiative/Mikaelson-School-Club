import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Documents, links, and tools for Club members, handbooks, session templates, and useful links.',
  openGraph: { title: 'Resources | Club', description: 'Documents and tools for club members.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';

const DOCUMENTS = [
  { title: 'Club Constitution', description: 'Official bylaws and governance structure', format: 'PDF', date: 'Updated May 2026' },
  { title: 'Meeting Minutes – May 2026', description: 'Summary of monthly leadership meeting', format: 'PDF', date: 'May 28, 2026' },
  { title: 'Member Handbook', description: 'Guide for new and existing members', format: 'PDF', date: 'Updated March 2026' },
  { title: 'Event Planning Template', description: 'Template for organising club events', format: 'Google Doc', date: 'Updated April 2026' },
];

const USEFUL_LINKS = [
  {
    category: 'School Resources',
    links: [
      { name: 'School Website', url: '#' },
      { name: 'Student Portal', url: '#' },
      { name: 'Academic Calendar', url: '#' },
      { name: 'Campus Map', url: '#' },
    ],
  },
  {
    category: 'External Resources',
    links: [
      { name: 'Leadership Development', url: '#' },
      { name: 'Career Exploration', url: '#' },
      { name: 'Community Service', url: '#' },
      { name: 'Online Learning', url: '#' },
    ],
  },
  {
    category: 'Club Tools',
    links: [
      { name: 'Club Calendar', url: '#' },
      { name: 'Member Directory', url: '#' },
      { name: 'Event Registration', url: '#' },
      { name: 'Feedback Form', url: '#' },
    ],
  },
];

const FAQS = [
  { q: 'When are club meetings held?', a: 'We meet every Tuesday at 3:30 PM in Room 301. Everyone is welcome!' },
  { q: 'Do I need prior experience to join?', a: 'No! We welcome members of all experience levels. Come as you are.' },
  { q: 'Are there membership fees?', a: 'Membership is free for all students at our school.' },
  { q: 'How can I get involved in leadership?', a: 'Leadership positions open each fall. Check our Get Involved page for more details.' },
];

export default function ResourcesPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Resources"
        title="Documents, links & tools."
        lede="Everything members need to stay informed, prepared, and connected."
      />

      {/* Documents */}
      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Club documents</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              Official documents.
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[22px]">
            {DOCUMENTS.map((doc, i) => (
              <Reveal delay={i * 80} key={doc.title}>
                <div className="bg-surface border border-line rounded-[22px] py-[26px] px-[28px] flex items-start justify-between gap-5 transition-[transform,border-color] duration-200 hover:border-accent hover:-translate-y-[2px] max-sm:flex-col">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-semibold text-[17px] m-0 mb-1">{doc.title}</h3>
                    <p className="text-muted text-[14px] m-0 mb-3">{doc.description}</p>
                    <span className="font-mono text-muted text-[11px] uppercase tracking-[.06em]">{doc.date}</span>
                  </div>
                  <div className="flex flex-col items-end gap-3 max-sm:items-start max-sm:flex-row max-sm:items-center">
                    <span className="font-mono text-accent-ink border border-accent-2 bg-accent-soft text-[11px] tracking-[.07em] uppercase py-[5px] px-[11px] rounded-full font-bold whitespace-nowrap">
                      {doc.format}
                    </span>
                    <button className="font-mono text-[12px] tracking-[.04em] uppercase text-muted border border-line rounded-full py-[7px] px-4 font-bold transition-[border-color,color] duration-200 hover:border-accent hover:text-site-text cursor-not-allowed opacity-50 whitespace-nowrap">
                      Coming soon
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Useful links */}
      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Useful links</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              Helpful links.
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8">
            {USEFUL_LINKS.map((section, si) => (
              <Reveal delay={si * 80} key={section.category}>
                <div>
                  <h3 className="font-display font-semibold text-[18px] m-0 mb-5">{section.category}</h3>
                  <ul className="list-none p-0 flex flex-col gap-3 m-0">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.url}
                          className="font-mono text-[13px] tracking-[.04em] text-accent-ink no-underline inline-flex items-center gap-[7px] font-bold transition-opacity duration-150 hover:opacity-75 [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
                        >
                          {link.name} <IconArrow size={12} className="arr" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>FAQ</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              Quick answers.
            </h2>
          </Reveal>
          <div className="max-w-[760px] flex flex-col gap-0">
            {FAQS.map((item, i) => (
              <Reveal delay={i * 60} key={item.q}>
                <details className={`group ${i < FAQS.length - 1 ? 'border-b border-line' : ''} py-5 cursor-pointer`}>
                  <summary className="font-display font-semibold text-[17px] list-none flex items-center justify-between gap-4 select-none">
                    {item.q}
                    <span className="text-accent-ink text-[20px] font-bold shrink-0 transition-transform duration-200 group-open:rotate-45">+</span>
                  </summary>
                  <p className="text-muted text-[15.5px] leading-[1.65] mt-3 mb-0">{item.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div className="mt-10">
              <Link
                href="/faqs"
                className="font-mono text-[13px] tracking-[.04em] uppercase text-accent-ink no-underline inline-flex items-center gap-[7px] font-bold [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
              >
                See all FAQs <IconArrow size={13} className="arr" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
