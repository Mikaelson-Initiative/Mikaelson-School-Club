import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Partners & Sponsors',
  description: 'Organisations supporting the Club, technology partners, educational partners, and programme sponsors.',
  openGraph: { title: 'Partners & Sponsors | Club', description: 'Partners and sponsors backing the next generation of African leaders.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck, IconGlobe, IconDigital, IconCompass, IconLead } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';
const BTN_P = 'font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]';

const PARTNERS = [
  { name: 'Sahara Tech Group', cat: 'Technology Partner', Icon: IconDigital, d: 'Provides mentorship and internship opportunities for members interested in tech.' },
  { name: 'Ubuntu Community Foundation', cat: 'Community Partner', Icon: IconGlobe, d: 'Collaborates with us on service projects and community initiatives.' },
  { name: 'PanAfrican Education Network', cat: 'Educational Partner', Icon: IconCompass, d: 'Offers scholarships and educational resources for chapter members.' },
  { name: 'Young Leaders Council', cat: 'Leadership Partner', Icon: IconLead, d: 'Provides leadership training and professional development programmes.' },
];

const TIERS = [
  { tier: 'Platinum', companies: [{ name: 'Apex Capital' }] },
  { tier: 'Gold', companies: [{ name: 'BrightFuture Education' }, { name: 'Unity Bank' }] },
  { tier: 'Silver', companies: [{ name: 'Local Business Hub' }, { name: 'Innovation Labs' }, { name: 'Horizon Ventures' }] },
];

const BENEFITS = [
  { h: 'Partner benefits', items: ['Brand visibility across chapters', 'Direct student engagement', 'Quarterly impact reporting'] },
  { h: 'Sponsorship tiers', items: ['Platinum', 'Gold', 'Silver'] },
  { h: 'Collaboration', items: ['Mentorship & internships', 'Co-branded projects', 'Event sponsorship'] },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <PageHero label="Partners & Sponsors" title="The people who back the next generation." lede="Every chapter is powered by organisations that share our commitment to student development. Their support is tied to transparent, measurable outcomes." />

      {/* Partners */}
      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Our partners</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>Who we work with</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-5">
            {PARTNERS.map((p, i) => (
              <Reveal delay={i * 90} key={p.name}>
                <div className="bg-surface border border-line rounded-[22px] py-[26px] px-[30px] flex items-start gap-5 max-sm:flex-col transition-[transform,border-color] duration-200 hover:-translate-y-[2px] hover:border-accent">
                  <div className="bg-accent-soft text-accent-ink w-[52px] h-[52px] grid place-items-center rounded-[14px] shrink-0"><p.Icon size={26} /></div>
                  <div>
                    {/* Category badge */}
                    <span className="font-mono text-muted border border-line inline-flex items-center text-[11px] tracking-[0.07em] uppercase py-[4px] px-[10px] rounded-full font-bold mb-[10px]">{p.cat}</span>
                    <h3 className="font-display font-semibold text-[20px] m-0 mt-[10px] mb-2">{p.name}</h3>
                    <p className="text-muted m-0 text-[14.5px]">{p.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors by tier */}
      <section className={`${SEC} bg-[var(--surface-2)]`} style={{ paddingTop: 72 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Our sponsors</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>By tier</h2>
          </Reveal>
          {TIERS.map((t, ti) => (
            <Reveal delay={ti * 80} key={t.tier}>
              <div className="mb-8">
                {/* Tier header */}
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="font-display font-semibold text-[20px] m-0">{t.tier}</h3>
                  <span className="font-mono text-accent-ink border border-accent-2 bg-accent-soft text-[11px] tracking-[.07em] uppercase py-[5px] px-[11px] rounded-full font-bold">
                    {t.companies.length} partner{t.companies.length > 1 ? 's' : ''}
                  </span>
                  <div className="flex-1 h-px bg-line" />
                </div>
                {/* Sponsor grid */}
                <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${Math.min(3, t.companies.length)}, 1fr)` }}>
                  {t.companies.map((c) => (
                    <div key={c.name} className="bg-surface border border-line rounded-[14px] py-[24px] px-[20px] text-center flex flex-col items-center gap-3">
                      <div className="bg-accent-soft text-accent-ink w-[44px] h-[44px] rounded-full grid place-items-center">
                        <span className="font-mono text-[13px] font-bold text-accent-ink">{c.name.charAt(0)}</span>
                      </div>
                      <h4 className="font-display font-semibold text-[16px] m-0">{c.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Become a partner CTA */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }} />
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }} />
              <span className={LABEL}>Become a partner</span>
              <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-3 max-w-[16em]" style={{ fontSize: 'clamp(28px,3.6vw,44px)' }}>Invest in measurable youth impact.</h2>
              <p className="text-muted m-0 mb-8">We partner with organisations that share our commitment to student development and community growth.</p>

              {/* Benefits grid */}
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-8 mb-8">
                {BENEFITS.map((b) => (
                  <div key={b.h}>
                    <h4 className="font-display font-semibold text-[16px] m-0 mb-3">{b.h}</h4>
                    <ul className="list-none p-0 flex flex-col gap-2 m-0">
                      {b.items.map((item) => (
                        <li key={item} className="flex items-center gap-[10px] text-muted text-[14.5px]">
                          <span className="text-accent-2 shrink-0"><IconCheck size={17} /></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="flex gap-[14px] flex-wrap">
                <Link href="/contact" className={BTN_P}>
                  Talk to us about partnering <IconArrow size={16} className="arr" />
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
