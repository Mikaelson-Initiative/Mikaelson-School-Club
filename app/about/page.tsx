import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Link from 'next/link';
import { IconCheck } from '../components/Icons';

export const metadata = {
  title: 'About | Club',
  description: 'The story behind Club, born from a gap in how schools prepare young people for life after graduation.',
};

import { WRAP, SEC, LABEL } from '../lib/tw';
const BTN_P = 'font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]';
const BTN_G = 'font-body font-semibold text-[15px] rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]';

const STATS = [
  { stat: '70%', text: 'of students report feeling unprepared for life after school' },
  { stat: '1 in 5', text: 'has a trusted adult mentor outside of their family' },
  { stat: '0', text: 'Most school clubs are social, not developmental, leaving a structured growth gap' },
];

const VALUES = [
  { value: 'Unity', desc: 'We are stronger together than apart. Every chapter, every student, every continent.' },
  { value: 'Mutual Support', desc: 'We hold each other accountable and lift each other up, that is the foundation of the club.' },
  { value: 'Shared Progress', desc: 'Individual growth compounds into community advancement. Our success is collective.' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero label="Our Story" title="Born from a gap. Built for the next generation." lede="Most schools teach students what to know. Club teaches them who to be." />

        {/* Section 1: The Problem */}
        <section className={SEC}>
          <div className={WRAP}>
            <Reveal>
              <div className="grid items-start max-md:grid-cols-1 gap-12" style={{ gridTemplateColumns: '1fr 0.85fr' }}>
                <div>
                  <span className={LABEL}>The Problem</span>
                  <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px] mb-6" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>Most students graduate without learning how to lead themselves.</h2>
                  <p className="text-muted text-[16px] leading-[1.7] mb-4">School curricula are built around knowledge delivery, exams, grades, and content. They measure what a student can recall, not who they are becoming. The habits, mindset, and community that determine long-term success fall entirely outside the classroom.</p>
                  <p className="text-muted text-[16px] leading-[1.7] m-0">The result is a generation of graduates who are academically capable but personally underprepared, without a peer network, a consistent routine, or a sense of their own leadership potential. That is the gap Club was built to close.</p>
                </div>
                <div className="bg-[var(--surface-2)] border border-line rounded-[22px] p-9">
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-6">The data</p>
                  <div className="flex flex-col gap-6">
                    {STATS.map((item, i) => (
                      <div key={i} className="flex gap-[18px] items-start">
                        <div className="font-display font-[800] leading-[1] tracking-[-0.03em] text-accent shrink-0 pt-[2px]" style={{ fontSize: i === 1 ? 22 : 32 }}>{item.stat}</div>
                        <p className="m-0 text-muted text-[15px] leading-[1.55]">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Section 2: The Solution */}
        <section className={`${SEC} bg-[var(--surface-2)]`}>
          <div className={WRAP}>
            <Reveal>
              <div className="mb-12">
                <span className={LABEL}>The Solution</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px] mb-5" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>A structured programme that lives inside your school.</h2>
                <p className="text-muted text-[17px] leading-[1.65] max-w-[38em] m-0">Club is embedded in schools and runs as a weekly chapter meeting, combining habit systems, peer leadership, and digital literacy into one cohesive programme, no extra infrastructure required.</p>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[22px]">
                {[
                  { num: '01', title: 'Habit Systems', body: "Students track daily habits that compound into identity. From sleep and study routines to fitness and reflection, consistency builds character over a school term." },
                  { num: '02', title: 'Peer Leadership', body: 'Elected student leads run each chapter with faculty support. Members practice real accountability, facilitation, and decision-making at the school level.' },
                  { num: '03', title: 'Digital Literacy', body: "Practical tech skills for the real world, using AI tools responsibly, digital communication, and basic problem-solving with technology that school doesn't cover." },
                ].map((card) => (
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

        {/* Section 3: The Initiative */}
        <section className={SEC}>
          <div className={WRAP}>
            <Reveal>
              <div className="grid items-start max-md:grid-cols-1 gap-12" style={{ gridTemplateColumns: '1fr 0.85fr' }}>
                <div>
                  <span className={LABEL}>The Initiative</span>
                  <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[18px] mb-6" style={{ fontSize: 'clamp(30px,3.8vw,46px)' }}>Part of something bigger.</h2>
                  <p className="text-muted text-[16px] leading-[1.7] mb-4">The Mikaelson Initiative is a pan-African organisation focused on education, technology, and opportunity. It was founded on the belief that the continent&apos;s next generation of leaders is already in secondary schools, they simply need the right environment to emerge.</p>
                  <p className="text-muted text-[16px] leading-[1.7] m-0">Club is one of its flagship programmes, designed to scale across secondary schools on the continent. By embedding within existing school structures, the Club reaches students where they already are, making leadership development accessible to every student, not just a privileged few.</p>
                </div>
                <div className="bg-surface border border-line rounded-[22px] p-10">
                  <p className="font-mono text-[12px] tracking-[0.1em] uppercase text-muted mb-7">Club Values</p>
                  <div className="flex flex-col gap-5">
                    {VALUES.map((item) => (
                      <div key={item.value} className="flex gap-4 items-start">
                        <div className="bg-accent-soft text-accent-ink w-7 h-7 rounded-full grid place-items-center shrink-0 mt-[2px]"><IconCheck size={14} /></div>
                        <div>
                          <p className="m-0 mb-1 font-display font-semibold text-[16px]">{item.value}</p>
                          <p className="m-0 text-muted text-[14px] leading-[1.55]">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
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
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,4vw,48px)' }}>Ready to bring the club to your school?</h2>
                <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">We partner with secondary schools across Africa to launch chapters that transform student culture.</p>
                <div className="flex gap-[14px] justify-center flex-wrap">
                  <Link href="/apply" className={BTN_P}>Apply as a School</Link>
                  <Link href="/contact" className={BTN_G}>Contact Us</Link>
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
