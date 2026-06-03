import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'The people behind the Club programme, leadership, Champions, and the network building it chapter by chapter.',
  openGraph: { title: 'Our Team | Club', description: 'Meet the team building Club across Africa.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';

const LEADERS = [
  { name: 'Oluwaseun Adeleke', initials: 'OA', role: 'Founder & Director', bio: 'Seun built Club after noticing that the most capable students in his community lacked the structure to channel their potential.', email: 'seun@mikaelsoninitiative.org' },
  { name: 'Amaka Obi', initials: 'AO', role: 'Programme Lead', bio: 'Amaka designs the curriculum and facilitator training. She has 8 years of experience in youth development across West Africa.', email: 'amaka@mikaelsoninitiative.org' },
  { name: 'Kofi Asante', initials: 'KA', role: 'Partnerships', bio: "Kofi manages school partnerships and sponsor relationships. He's based in Accra and leads our West Africa expansion.", email: 'kofi@mikaelsoninitiative.org' },
  { name: 'Zara Mwangi', initials: 'ZM', role: 'Operations', bio: 'Zara keeps chapters running. She coordinates Champions, tracks outcomes, and handles logistics across our active schools.', email: 'zara@mikaelsoninitiative.org' },
];

const CHAMPION_BENEFITS = [
  'Full session facilitation training',
  'Facilitator handbook and session plans',
  'Access to our Champions Slack community',
  'Monthly group coaching calls',
  'A certificate of facilitation',
];

export default function TeamPage() {
  return (
    <>
      <Header />
      <PageHero label="Our Team" title="The people behind the programme." lede="Club is built and run by people who believe deeply in what young Africans can do when given the right system." />

      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Leadership</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>Programme leadership.</h2>
          </Reveal>
          {/* People grid: 4 cols → 2 cols tablet → 1 col mobile */}
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
            {LEADERS.map((person, i) => (
              <Reveal delay={i * 90} key={person.email}>
                <div className="bg-surface border border-line rounded-[22px] py-[30px] px-[26px] text-center transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.45)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                  <div className="bg-[var(--surface-2)] border-2 border-accent-soft w-[92px] h-[92px] rounded-full overflow-hidden mx-auto mb-[18px] grid place-items-center">
                    <span className="font-mono text-[20px] font-bold text-accent-ink">{person.initials}</span>
                  </div>
                  <h3 className="font-display font-semibold text-[19px] m-0">{person.name}</h3>
                  <div className="font-mono text-accent-ink text-[12px] uppercase tracking-[0.06em] font-bold my-[7px]">{person.role}</div>
                  <p className="text-muted text-[14px] m-0 mb-4">{person.bio}</p>
                  <a className="font-mono text-muted border-b border-line text-[12px] no-underline pb-px hover:text-accent-ink hover:border-accent" href={`mailto:${person.email}`}>{person.email}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Champions Network</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-5" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>Our trained chapter facilitators.</h2>
          </Reveal>
          <Reveal delay={60}>
            <div className="grid items-start max-md:grid-cols-1" style={{ gridTemplateColumns: '1fr 0.85fr', gap: 56 }}>
              <div>
                <p className="text-muted text-[17px] m-0 mb-6 max-w-[38em]">
                  Champions are the people who actually run the club inside schools. They can be teachers, student leaders, or recent graduates who have been through our certification programme. We currently have 30+ trained Champions across 6 cities. Each Champion receives:
                </p>
                <ul className="list-none p-0 flex flex-col gap-3 m-0 mb-7">
                  {CHAMPION_BENEFITS.map((b) => (
                    <li key={b} className="flex items-start gap-[11px] text-[15px]">
                      <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={18} /></span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-[var(--surface-2)] rounded-[14px] p-8">
                <div className="font-display font-[800] text-[46px] tracking-[-0.02em] leading-none">30<span className="text-accent-2">+</span></div>
                <div className="font-mono text-muted text-[12px] uppercase tracking-[.08em] mt-[10px]">Trained Champions</div>
                <div className="font-mono text-muted text-[12px] uppercase tracking-[.08em] mt-5">Active in</div>
                <div className="font-display font-[800] text-[38px] tracking-[-0.02em] leading-none mt-1">6<span className="text-accent-2"> cities</span></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }} />
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }} />
              <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>Want to become a Champion?</h2>
              <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">Join our network of trained facilitators and run a Club chapter in your school or community.</p>
              <div className="flex gap-[14px] justify-center flex-wrap">
                <Link href="/apply" className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]">
                  Apply as Champion <IconArrow size={16} className="arr" />
                </Link>
                <Link href="/programme" className="font-body font-semibold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]">
                  Learn about the programme
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
