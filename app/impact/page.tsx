import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Impact & Results',
  description: 'How Mikaelson School Club measures and reports impact, attendance, habit data, student stories, and outcomes from our chapters.',
  openGraph: { title: 'Impact & Results | Mikaelson School Club', description: 'Transparent impact reporting from Mikaelson School Club chapters.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';

const STATS = [
  { value: 'TBA', label: 'Chapters', sub: 'Launching 2025' },
  { value: 'TBA', label: 'Students', sub: 'Enrolling now' },
  { value: 'TBA', label: 'Cities', sub: 'Starting Nigeria & Ghana' },
  { value: '30+', label: 'Champions', sub: 'Trained facilitators' },
];

const REPORTING_ITEMS = [
  'Attendance & retention rates',
  'Habit completion data',
  'Student leadership roles held',
  'Community projects delivered',
  'Post-programme student outcomes',
];

export default function ImpactPage() {
  return (
    <>
      <Header />
      <PageHero label="Impact" title="What we're building towards." lede="We're in our pilot phase. This page will grow as the programme runs, with attendance data, student stories, and outcomes from our early chapters." />

      {/* Stats */}
      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Pilot metrics</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>What we&apos;re tracking.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-2 gap-5">
              {STATS.map((stat) => (
                <div key={stat.label} className="bg-surface border border-line rounded-[22px] py-[26px] px-[24px] text-center">
                  <div className="font-display font-[800] text-[38px] tracking-[-0.03em] leading-none">{stat.value}</div>
                  <div className="font-mono text-muted text-[12px] uppercase tracking-[.06em] mt-[8px]">{stat.label}</div>
                  <div className="font-mono text-accent-2 text-[11px] uppercase tracking-[.06em] mt-[6px]">{stat.sub}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Reporting commitment */}
      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Our commitment</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>We report what we measure.</h2>
          </Reveal>
          <Reveal delay={70}>
            <div className="grid items-start max-md:grid-cols-1 gap-12 md:[grid-template-columns:1fr_1fr]">
              <div>
                <p className="text-muted text-[16px] m-0 mb-[18px]">We believe impact reporting only means something when it starts from honest data. From our first chapter, we track attendance at every session, record which habit goals are completed, and follow up with students at the end of each term.</p>
                <p className="text-muted text-[16px] m-0 mb-[18px]">Attendance is tracked per chapter each week. Habit completion rates are reported termly and shared with partner schools. Student case studies are captured with explicit consent and reviewed by our programme team.</p>
                <p className="text-muted text-[16px] m-0">Partner schools receive a quarterly report covering chapter health, student outcomes, and a summary of session themes covered. We do not publish results we cannot stand behind.</p>
              </div>
              <div className="bg-surface border border-line rounded-[22px] p-[32px]">
                <div className="font-mono text-[12px] uppercase tracking-[.1em] text-accent-ink mb-[18px] font-bold">What we will report</div>
                <ul className="list-none p-0 flex flex-col gap-3 m-0">
                  {REPORTING_ITEMS.map((item) => (
                    <li key={item} className="flex items-start gap-[11px] text-[15px]">
                      <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={18} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Coming soon section */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Stories coming soon</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9 text-center" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>The first stories are being written.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] p-14 text-center max-w-[760px] mx-auto max-sm:p-8 xs:p-6">
              <p className="text-muted text-[18px] leading-[1.65] m-0 mb-7">
                We&apos;ve deliberately kept this page sparse. Impact pages that fill up with curated quotes before a programme has really run are marketing, not evidence. Check back after our first term to see real data, real stories, and real outcomes.
              </p>
              <Link href="/contact" className="font-mono text-[13px] text-accent-ink no-underline border-b border-line pb-[2px] hover:border-accent">
                Subscribe to updates →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={SEC} style={{ paddingTop: 0 }}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }} />
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }} />
              <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>Want to see how we measure success?</h2>
              <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">Our programme overview explains the outcomes we&apos;re building towards, and how we track them.</p>
              <div className="flex gap-[14px] justify-center flex-wrap">
                <Link href="/programme" className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]">
                  Read the programme overview <IconArrow size={16} className="arr" />
                </Link>
                <Link href="/contact" className="font-body font-semibold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]">
                  Get in touch
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
