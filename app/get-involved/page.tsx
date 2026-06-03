import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Involved',
  description: 'Multiple ways to join and contribute to the Club community, as a member, committee lead, or volunteer.',
  openGraph: { title: 'Get Involved | Club', description: 'Join the Club community as a member, committee lead, or volunteer.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';

const STEPS = [
  { number: '01', title: 'Attend an Event', description: 'Join us at any of our upcoming events to meet members and learn more about the club.' },
  { number: '02', title: 'Fill Out the Form', description: 'Complete our membership application with your basic information and interests.' },
  { number: '03', title: 'Get Approved', description: 'Our leadership team reviews your application and gets back to you within 5 business days.' },
  { number: '04', title: 'Welcome Aboard!', description: 'Receive your member welcome packet and start attending exclusive member-only sessions.' },
];

const OPPORTUNITIES = [
  {
    title: 'General Member',
    description: 'Participate in all club events and activities.',
    benefits: ['Attend all weekly sessions', 'Network with peers', 'Access programme resources', 'Member certificate each term'],
  },
  {
    title: 'Committee Member',
    description: 'Take on more responsibility and help organise events.',
    benefits: ['Real leadership experience', 'Event planning practice', 'Mentorship from Champions', 'Special recognition'],
  },
  {
    title: 'Volunteer',
    description: 'Contribute your skills to community service projects.',
    benefits: ['Measurable community impact', 'Verified service hours', 'Team collaboration', 'Volunteer certificate'],
  },
];

export default function GetInvolvedPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Get Involved"
        title="Multiple ways to join and contribute."
        lede="Whether you want to show up, step up, or serve, there is a place for you in the club."
      />

      {/* How to join */}
      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>How to join</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              Four steps to becoming a member.
            </h2>
          </Reveal>
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[18px] relative">
            {STEPS.map((step, i) => (
              <Reveal delay={i * 80} key={step.number}>
                <div className="bg-surface border border-line rounded-[14px] py-[28px] px-[24px] transition-[background,border-color] duration-200 hover:border-accent">
                  <span className="font-mono text-accent-ink text-[13px] font-bold">{step.number}</span>
                  <h3 className="font-display font-semibold text-[18px] mt-[14px] mb-2">{step.title}</h3>
                  <p className="text-muted text-[14px] m-0 leading-[1.6]">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Membership levels */}
      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Membership levels</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              Choose your level of involvement.
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[22px]">
            {OPPORTUNITIES.map((opp, i) => (
              <Reveal delay={i * 90} key={opp.title}>
                <div className="bg-surface border border-line rounded-[22px] py-[30px] px-[26px] flex flex-col transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                  <h3 className="font-display font-semibold text-[19px] m-0 mb-2">{opp.title}</h3>
                  <p className="text-muted text-[14.5px] m-0 mb-5">{opp.description}</p>
                  <ul className="list-none p-0 flex flex-col gap-[10px] m-0 mb-7 flex-1">
                    {opp.benefits.map((b) => (
                      <li key={b} className="flex items-start gap-[10px] text-[14.5px]">
                        <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={16} /></span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/apply"
                    className="font-body font-bold text-[14px] border-none rounded-full px-5 py-3 cursor-pointer inline-flex items-center justify-center gap-[8px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_8px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_5px_0_-2px_var(--accent-ink)] mt-auto"
                  >
                    Apply now <IconArrow size={14} />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application form */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div
                className="absolute rounded-full pointer-events-none w-[300px] h-[300px]"
                style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }}
              />
              <div
                className="absolute rounded-full pointer-events-none w-[300px] h-[300px]"
                style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }}
              />
              <span className={LABEL + ' mb-4'}>Apply now</span>
              <h2
                className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-2"
                style={{ fontSize: 'clamp(26px,3.4vw,40px)' }}
              >
                Ready to join?
              </h2>
              <p className="text-muted text-[17px] m-0 mb-8 max-w-[36em]">
                Fill out the membership form and we&apos;ll get back to you within 5 business days.
              </p>
              <form className="grid grid-cols-2 max-md:grid-cols-1 gap-4 max-w-[640px]">
                <div className="flex flex-col gap-[6px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold">First Name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    className="bg-surface border border-line rounded-[14px] font-body text-site-text py-3 px-4 text-[15px] outline-none transition-[border-color] duration-200 focus:border-accent-2"
                  />
                </div>
                <div className="flex flex-col gap-[6px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    className="bg-surface border border-line rounded-[14px] font-body text-site-text py-3 px-4 text-[15px] outline-none transition-[border-color] duration-200 focus:border-accent-2"
                  />
                </div>
                <div className="col-span-2 max-md:col-span-1 flex flex-col gap-[6px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    className="bg-surface border border-line rounded-[14px] font-body text-site-text py-3 px-4 text-[15px] outline-none transition-[border-color] duration-200 focus:border-accent-2"
                  />
                </div>
                <div className="col-span-2 max-md:col-span-1 flex flex-col gap-[6px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold">Year Group</label>
                  <select className="bg-surface border border-line rounded-[14px] font-body text-site-text py-3 px-4 text-[15px] outline-none transition-[border-color] duration-200 focus:border-accent-2 appearance-none cursor-pointer">
                    <option value="">Select year group…</option>
                    <option>JSS 1</option>
                    <option>JSS 2</option>
                    <option>JSS 3</option>
                    <option>SSS 1</option>
                    <option>SSS 2</option>
                    <option>SSS 3</option>
                  </select>
                </div>
                <div className="col-span-2 max-md:col-span-1 flex flex-col gap-[6px]">
                  <label className="font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold">Tell us about your interests</label>
                  <textarea
                    placeholder="What draws you to the club? What would you like to build or contribute?"
                    rows={4}
                    className="bg-surface border border-line rounded-[14px] font-body text-site-text py-3 px-4 text-[15px] outline-none transition-[border-color] duration-200 focus:border-accent-2 resize-y leading-[1.6]"
                  />
                </div>
                <div className="col-span-2 max-md:col-span-1">
                  <button
                    type="submit"
                    className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center justify-center gap-[9px] whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] w-full"
                  >
                    Submit Application <IconArrow size={15} />
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
