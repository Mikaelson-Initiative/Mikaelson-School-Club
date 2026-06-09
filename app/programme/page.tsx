import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Link from 'next/link';
import { IconBuild, IconLead, IconDigital, IconCheck } from '../components/Icons';

export const metadata = {
  title: 'The Programme | Mikaelson School Club',
  description: 'How the Mikaelson School Club programme works, a weekly rhythm that builds habits, leadership, and digital fluency term by term.',
};

import { WRAP, SEC, LABEL } from '../lib/tw';

const RHYTHM_STEPS = [
  { n: 'Monday', title: 'Check-in', body: "Members log last week's habits and set goals for the week. Takes five minutes, the discipline is in showing up and being honest." },
  { n: 'Wednesday', title: 'Huddle', body: '45-minute session led by the student exec: a skill segment, habit review, and group discussion. The heart of the chapter week.' },
  { n: 'Friday', title: 'Reflection', body: 'A personal journal prompt or accountability pair check-in. Students close the week with intention, not just relief.' },
  { n: 'Monthly', title: 'Project', body: 'Every month, the chapter ships something real: a community action, presentation, or skill showcase. Progress you can point to.' },
];

const GAINS = [
  'Leadership experience for CV and university applications',
  'Peer accountability network that lasts beyond school',
  'Digital skills and confidence for the real world',
  'A habit system that sticks, not just a school-term experiment',
  'Certificate of completion awarded each term',
];

export default function ProgrammePage() {
  return (
    <>
      <Header />
      <main>
        <PageHero label="How It Works" title="A system, not just a club." lede="the club programme runs on a weekly rhythm that compounds, building habits, leadership, and digital fluency term by term." />

        {/* Section 1: Three Pillars */}
        <section className={SEC}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>The Three Pillars</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px]" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>One system, three disciplines.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[22px]">
                {[
                  { Icon: IconBuild, num: '01', title: 'Habit Systems', body: "Every member tracks personal habits weekly. From sleep and exercise to study routines, we help students build consistency that carries through exams and beyond." },
                  { Icon: IconLead, num: '02', title: 'Community & Leadership', body: 'Chapters are student-led. Members vote on a student exec team, run projects, and hold each other accountable, practicing real leadership at school level.' },
                  { Icon: IconDigital, num: '03', title: 'Digital Thinking', body: "Sessions include practical tech: using AI tools responsibly, digital communication, and basic problem-solving with technology, skills school doesn't cover." },
                ].map((card) => (
                  <div key={card.num} className="bg-surface border border-line rounded-[22px] py-[30px] px-[26px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                    <div className="bg-accent-soft text-accent-ink w-[44px] h-[44px] grid place-items-center rounded-[12px] mb-5"><card.Icon size={22} /></div>
                    <span className="font-mono text-accent-2 text-[13px] font-bold tracking-[0.06em]">{card.num}</span>
                    <h3 className="font-display font-semibold text-[19px] m-0 mt-2 mb-[10px]">{card.title}</h3>
                    <p className="text-muted text-[15px] m-0 leading-[1.6]">{card.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 2: Weekly Rhythm */}
        <section className={`${SEC} bg-[var(--surface-2)]`}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>03 · The Weekly Rhythm</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px] mb-4" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>What a chapter week looks like.</h2>
                <p className="text-muted text-[17px] leading-[1.65] max-w-[36em] m-0">Each week is structured to build momentum without overwhelming students. Small, consistent actions compound into real change.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[18px]">
                {RHYTHM_STEPS.map((s, i) => (
                  <div key={s.n} className="bg-surface border border-line rounded-[14px] py-[28px] px-[24px] transition-[background,border-color] duration-200 hover:border-accent">
                    <span className="font-mono text-accent-ink text-[13px] font-bold">{s.n}</span>
                    <h4 className="font-display font-semibold text-[18px] mt-[14px] mb-2">{s.title}</h4>
                    <p className="text-muted text-[14px] m-0">{s.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3: Outcomes */}
        <section className={SEC}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>What Students Gain</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px]" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>Outcomes that matter beyond the classroom.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid items-center max-md:grid-cols-1 gap-12 md:[grid-template-columns:1fr_0.85fr]">
                <ul className="list-none p-0 flex flex-col gap-3 m-0">
                  {GAINS.map((item) => (
                    <li key={item} className="flex items-start gap-[11px] text-[15px]">
                      <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={16} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                {/* Testimonial */}
                <div className="bg-surface border border-line rounded-[22px] p-[30px] flex flex-col gap-5">
                  <div className="font-display text-accent-2 text-[44px] leading-[0.6] h-[22px]">&ldquo;</div>
                  <blockquote className="font-display m-0 text-[16.5px] leading-[1.55] font-medium">
                    Before this club I had no idea what I was capable of. Now I&rsquo;m running sessions and three of my classmates have applied to the exec team.
                  </blockquote>
                  <div className="flex items-center gap-[13px] mt-auto">
                    <div className="bg-[var(--surface-2)] border border-line w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 grid place-items-center">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" style={{ color: 'var(--muted)' }}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" /></svg>
                    </div>
                    <div>
                      <div className="font-semibold text-[14.5px]">Amara</div>
                      <div className="font-mono text-muted text-[13px]">JSS 2 · Lagos</div>
                    </div>
                  </div>
                </div>
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
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Join a chapter or start one.</h2>
                <p className="text-muted text-[18px] max-w-[34em] mx-auto mt-0 mb-8">Whether you&rsquo;re a student who wants to grow or a school that wants to offer more, there is a place for you in the programme.</p>
                <div className="flex gap-[14px] justify-center flex-wrap">
                  <Link href="/apply" className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]">Apply Now</Link>
                  <Link href="/for-schools" className="font-body font-semibold text-[15px] rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]">Learn more for schools</Link>
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
