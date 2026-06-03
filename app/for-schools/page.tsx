import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Link from 'next/link';
import { IconCheck } from '../components/Icons';

export const metadata = {
  title: 'For Schools | Club',
  description: 'Bring a structured leadership programme to your school, we provide the system, training, and support. You provide the students and the space.',
};

import { WRAP, SEC, LABEL } from '../lib/tw';
const BTN_P = 'font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]';
const BTN_G = 'font-body font-semibold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]';

const CARDS = [
  { num: '01', title: 'Turnkey Curriculum', body: 'A full term-by-term session plan, facilitator guides, and student workbooks, ready to use from day one. No curriculum design required.' },
  { num: '02', title: 'Champion Training', body: 'We certify one or two staff or student leads to run the chapter independently. Champions are equipped with everything they need in a focused training programme.' },
  { num: '03', title: 'Tracking Dashboard', body: 'A simple tool to monitor attendance, habit streaks, and chapter progress. Principals and Champions get clear visibility without administrative overhead.' },
  { num: '04', title: 'Ongoing Support', body: 'Access to our programme team for troubleshooting, coaching, and resources throughout the term. You are never left to figure it out alone.' },
];

const COMMITMENT = [
  { stat: 'Zero', label: 'setup cost to pilot the programme' },
  { stat: '1 term', label: 'minimum commitment to get started' },
  { stat: 'Full', label: 'handover after Champion training is complete' },
  { stat: 'Monthly', label: 'check-in with our programme team included' },
];

const ELIGIBILITY = [
  { n: '01', title: 'Secondary school', body: 'Any secondary school on the African continent is eligible to apply, public, private, rural, or urban. The programme is built to adapt.' },
  { n: '02', title: '10+ interested students', body: 'We ask for a minimum cohort to make the chapter viable. In practice, most schools launch with 20–40 students in the first term.' },
  { n: '03', title: 'One committed adult', body: 'A teacher or staff member willing to support the Champion and attend the training. This person does not need to run sessions, just show up.' },
];

const APPLY_STEPS = [
  { n: '01', title: 'Apply', body: "Submit your school's interest form. Tell us a bit about your school, your students, and who would serve as Champion." },
  { n: '02', title: 'We review', body: 'Our team reviews your application and follows up within one week. We may schedule a short call to discuss fit and expectations.' },
  { n: '03', title: 'Champion training', body: 'Your Champion completes a focused training programme. They receive all materials, the session plan, and direct support from our team.' },
  { n: '04', title: 'Chapter launch', body: 'Your first session goes live. Our team supports the launch and stays in contact monthly for the remainder of the term.' },
];

export default function ForSchoolsPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero label="For Schools" title="Plug a leadership programme into your school, without building it yourself." lede="We provide the system, the training, and the support. You provide the students and the space." />

        {/* Section 1: What we provide */}
        <section className={SEC}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>What we provide</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px]" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>Everything your school needs to run a successful chapter.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[22px]">
                {CARDS.map((card) => (
                  <div key={card.num} className="bg-surface border border-line rounded-[22px] py-[30px] px-[26px] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                    <span className="font-mono text-accent-2 text-[13px] font-bold tracking-[0.06em]">{card.num}</span>
                    <h3 className="font-display font-semibold text-[19px] m-0 mt-2 mb-[10px]">{card.title}</h3>
                    <p className="text-muted text-[15px] m-0 leading-[1.6]">{card.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 2: What we ask of you */}
        <section className={`${SEC} bg-[var(--surface-2)]`}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>What we ask of you</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px]" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>A light commitment with measurable returns.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid items-start max-md:grid-cols-1 gap-12" style={{ gridTemplateColumns: '1fr 0.85fr' }}>
                <ul className="list-none p-0 flex flex-col gap-3 m-0">
                  {['A weekly 45-minute session slot in the school timetable', 'Space for students to meet, a classroom is perfectly fine', 'One faculty or student Champion willing to be trained', 'Promotion of the club to interested students at launch'].map((item) => (
                    <li key={item} className="flex items-start gap-[11px] text-[15px]">
                      <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={16} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-surface border border-line rounded-[22px] p-9">
                  <div className="flex flex-col gap-[22px]">
                    {COMMITMENT.map((item) => (
                      <div key={item.stat} className="flex gap-[18px] items-baseline">
                        <span className="font-display font-[800] text-[28px] tracking-[-0.03em] text-accent shrink-0">{item.stat}</span>
                        <span className="text-muted text-[15px] leading-[1.4]">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 3: Eligibility */}
        <section className={SEC}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>Eligibility</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px] mb-4" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>Is your school a good fit?</h2>
                <p className="text-muted text-[17px] leading-[1.65] max-w-[36em] m-0">We welcome schools at every stage, from those with no leadership programme to those looking to formalise what already exists.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[18px]">
                {ELIGIBILITY.map((s) => (
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

        {/* Section 4: How to apply */}
        <section className={`${SEC} bg-[var(--surface-2)]`}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>How to apply</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px]" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>From interest to launch in four steps.</h2>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[18px]">
                {APPLY_STEPS.map((s) => (
                  <div key={s.n} className="bg-surface border border-line rounded-[14px] py-[28px] px-[24px] transition-[background,border-color] duration-200 hover:border-accent">
                    <span className="font-mono text-accent-ink text-[13px] font-bold">{s.n}</span>
                    <h4 className="font-display font-semibold text-[18px] mt-[14px] mb-2">{s.title}</h4>
                    <p className="text-muted text-[14px] m-0">{s.body}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={160}>
              <p className="font-mono text-[13px] tracking-[0.04em] text-muted text-center mt-7">Most chapters launch within one school term.</p>
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
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Start a chapter at your school.</h2>
                <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">Join the growing network of schools across Africa building the next generation of leaders.</p>
                <div className="flex gap-[14px] justify-center flex-wrap">
                  <Link href="/apply" className={BTN_P}>Apply Now</Link>
                  <Link href="/contact" className={BTN_G}>Ask a question</Link>
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
