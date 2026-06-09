import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Students',
  description: 'What students experience in Mikaelson School Club, weekly sessions, leadership roles, habit tracking, and community projects.',
  openGraph: { title: 'For Students | Mikaelson School Club', description: 'For students, what you will experience, do, and gain in the club.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck, IconBuild, IconLead, IconDigital, IconGlobe } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';

const RHYTHM_STEPS = [
  { n: '01', title: 'Set your goals', body: 'Every week you set habits and intentions, then check back in. Progress is tracked, not assumed.' },
  { n: '02', title: 'Learn something real', body: 'Sessions cover leadership, communication, and digital skills, not theory, but things you can use the same day.' },
  { n: '03', title: 'Work with your peers', body: 'The club is student-run. You learn by doing with people your own age, not by watching adults demonstrate.' },
  { n: '04', title: 'Ship something', body: 'Every month, your chapter delivers a real project or presentation. Something you can point to and say you built it.' },
];

const GAINS = [
  'A habit system you actually use',
  'Leadership experience before university',
  'Digital skills and confidence',
  'Accountability partners who push you',
  "A record of what you've done and led",
];

const ROLES = [
  { Icon: IconLead, title: 'Chapter President', body: 'Leads weekly huddles and is the main point of contact with the school. Sets the tone and pace for the whole chapter.' },
  { Icon: IconBuild, title: 'Habits Coordinator', body: 'Runs the habit tracking system and keeps members accountable. Celebrates wins and flags when people go quiet.' },
  { Icon: IconDigital, title: 'Digital Lead', body: "Facilitates the digital literacy sessions and manages the chapter's online presence and content calendar." },
  { Icon: IconGlobe, title: 'Community Lead', body: 'Coordinates the monthly community project and manages external partnerships with local organisations.' },
];

export default function ForStudentsPage() {
  return (
    <>
      <Header />
      <PageHero label="For Students" title="This isn't a normal school club." lede="It's the one that gives you skills, accountability, and a community that actually helps you grow." />

      {/* Section 1: Weekly rhythm */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>What you&apos;ll experience</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10 max-w-[18em]" style={{ fontSize: 'clamp(28px,3.4vw,44px)' }}>A weekly practice that builds over time.</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[18px]">
              {RHYTHM_STEPS.map((s, i) => (
                <div key={s.n} className="bg-surface border border-line rounded-[14px] py-[28px] px-[24px] transition-[background,border-color] duration-200 hover:border-accent" style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="font-mono text-accent-ink text-[13px] font-bold">{s.n}</span>
                  <h4 className="font-display font-semibold text-[18px] mt-[14px] mb-2">{s.title}</h4>
                  <p className="text-muted text-[14px] m-0">{s.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section 2: What you'll gain */}
      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>What you&apos;ll gain</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10 max-w-[18em]" style={{ fontSize: 'clamp(28px,3.4vw,44px)' }}>Skills that don&apos;t show up on the timetable.</h2>
          </Reveal>
          <div className="grid items-center max-md:grid-cols-1 gap-12 md:[grid-template-columns:1fr_0.85fr]">
            <Reveal delay={60}>
              <ul className="list-none p-0 flex flex-col gap-3 m-0">
                {GAINS.map((g) => (
                  <li key={g} className="flex items-start gap-[11px] text-[15px]">
                    <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={18} /></span>
                    {g}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={120}>
              {/* Testimonial card */}
              <div className="bg-surface border border-line rounded-[22px] p-[30px] flex flex-col gap-5">
                <div className="font-display text-accent-2 text-[44px] leading-[0.6] h-[22px]">&ldquo;</div>
                <blockquote className="font-display m-0 text-[16.5px] leading-[1.55] font-medium">
                  I thought I wasn&apos;t a &lsquo;leader&rsquo;. Now I&apos;m running our chapter&apos;s community project and I&apos;ve got three people looking to me for direction.
                </blockquote>
                <div className="flex items-center gap-[13px] mt-auto">
                  <div className="bg-[var(--surface-2)] border border-line w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 grid place-items-center">
                    <span className="font-mono font-bold text-[18px] text-accent-ink">K</span>
                  </div>
                  <div>
                    <div className="font-semibold text-[14.5px]">Kwame</div>
                    <div className="font-mono text-muted text-[13px]">JSS 3, Accra</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Section 3: Leadership roles */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Student Leadership Roles</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-3 max-w-[18em]" style={{ fontSize: 'clamp(28px,3.4vw,44px)' }}>The people who run the chapter.</h2>
            <p className="text-muted text-[16px] m-0 mb-9 max-w-[36em]">These roles are elected each term. Anyone can run.</p>
          </Reveal>
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[22px]">
            {ROLES.map((r, i) => (
              <Reveal delay={i * 70} key={r.title}>
                <div className="bg-surface border border-line rounded-[22px] py-[30px] px-[26px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                  <div className="bg-accent-soft text-accent-ink w-[44px] h-[44px] grid place-items-center rounded-[12px] mb-5"><r.Icon size={24} /></div>
                  <h3 className="font-display font-semibold text-[18px] m-0 mb-[10px]">{r.title}</h3>
                  <p className="text-muted text-[14.5px] m-0 leading-[1.6]">{r.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4: Why it matters */}
      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Why it matters</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-7 max-w-[16em]" style={{ fontSize: 'clamp(28px,3.4vw,44px)' }}>What changes when students lead.</h2>
          </Reveal>
          <Reveal delay={80}>
            <p className="text-[18px] leading-[1.7] max-w-[52em]">
              Most students are told to wait. Wait until university. Wait until you have a job. Wait until someone gives you the title. Mikaelson School Club is built on the opposite idea: that leadership is a practice, not a reward. Students who go through the programme leave with a documented record of what they did, sessions run, habits tracked, projects delivered. That&apos;s the thing that makes an application stand out.
            </p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }} />
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }} />
              <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,3.8vw,48px)' }}>Find a chapter near you or apply to start one.</h2>
              <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">Whether there&apos;s already a chapter at your school or you want to be the one to launch it, we want to hear from you.</p>
              <div className="flex gap-[14px] justify-center flex-wrap">
                <Link href="/chapters" className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]">
                  Find a chapter <IconArrow size={16} className="arr" />
                </Link>
                <Link href="/contact" className="font-body font-semibold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]">
                  Speak to someone
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
