'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

import { WRAP, LABEL } from '../lib/tw';
const BTN_P = 'font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]';

const CHAPTERS = [
  { school: 'Igbobi College', city: 'Lagos, Nigeria', code: 'IC', members: 0, live: false },
  { school: 'St Finbars College', city: 'Lagos, Nigeria', code: 'SF', members: 0, live: false },
  { school: "St Gregory's College", city: 'Lagos, Nigeria', code: 'SG', members: 0, live: false },
  { school: 'Methodist Girls & Boys', city: 'Lagos, Nigeria', code: 'MG', members: 0, live: false },
  { school: 'Dowen College', city: 'Lagos, Nigeria', code: 'DC', members: 0, live: false },
  { school: 'Yabatech Secondary School', city: 'Lagos, Nigeria', code: 'YS', members: 0, live: false },
  { school: "King's College", city: 'Lagos, Nigeria', code: 'KC', members: 0, live: false },
  { school: "Kay's International College", city: 'Lagos, Nigeria', code: 'KI', members: 0, live: false },
  { school: 'Our Lady of Apostles Secondary School', city: 'Yaba, Lagos, Nigeria', code: 'OL', members: 0, live: false },
  { school: 'Cathedral Missionary School (CMS)', city: 'Lagos, Nigeria', code: 'CM', members: 0, live: false },
  { school: 'Capital Grammar', city: 'Abuja, Nigeria', code: 'AB', members: 41, live: true },
  { school: 'Achimota School', city: 'Accra, Ghana', code: 'AC', members: 52, live: true },
  { school: 'Riara Springs', city: 'Nairobi, Kenya', code: 'NB', members: 38, live: true },
  { school: 'Morris Isaacson', city: 'Soweto, South Africa', code: 'SW', members: 47, live: true },
  { school: 'Kibuli Secondary', city: 'Kampala, Uganda', code: 'KM', members: 33, live: true },
  { school: 'Green Hills Academy', city: 'Kigali, Rwanda', code: 'KG', members: 29, live: false },
  { school: 'Feza Boys', city: 'Dar es Salaam, Tanzania', code: 'DS', members: 22, live: false },
];

const COUNTRIES = ['All', 'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Rwanda', 'Tanzania'];

const STEPS = [
  { t: 'Apply', d: 'A teacher or student leader submits a short application for the school.' },
  { t: 'Train', d: 'We certify your Champion and hand over the full chapter playbook.' },
  { t: 'Launch', d: 'Run your first huddle with starter sessions and the habit system.' },
  { t: 'Grow', d: 'Track engagement, ship a community project, and recruit your next cohort.' },
];

export default function ChaptersPage() {
  const [filter, setFilter] = useState('All');
  const list = CHAPTERS.filter((c) => filter === 'All' || c.city.includes(filter));

  return (
    <>
      <Header />
      <PageHero
        label="Our Network"
        title="Chapters across the continent."
        lede="A chapter is a school running the Club system, a community of students building habits, leadership, and digital fluency together. Find one near you, or start your own."
      />

      <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]" style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          {/* Stats bar */}
          <Reveal>
            <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-2 border border-line rounded-[22px] mb-12">
              {[
                { n: 12, s: '', l: 'Active chapters' },
                { n: 9, s: '', l: 'Partner schools' },
                { n: 5, s: '', l: 'Cities' },
                { n: 480, s: '+', l: 'Students' },
              ].map((s) => (
                <div key={s.l} className="py-[26px] px-[24px] text-center">
                  <div className="font-display font-[800] text-[38px] tracking-[-0.03em] leading-none"><Counter to={s.n} suffix={s.s} /></div>
                  <div className="font-mono text-muted text-[12px] uppercase tracking-[.06em] mt-[8px]">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Filter tabs */}
          <Reveal>
            <div className="flex items-center justify-between flex-wrap gap-4 mb-[22px]">
              <span className="font-mono text-muted text-[12px] tracking-[0.18em] uppercase">
                {list.length} chapters {filter !== 'All' ? `in ${filter}` : 'listed'}
              </span>
              <div className="flex gap-2 flex-wrap">
                {COUNTRIES.map((c) => (
                  <button
                    key={c}
                    className={[
                      'font-mono text-[13px] tracking-[0.04em] py-[9px] px-4 rounded-full cursor-pointer font-bold uppercase transition-all duration-[220ms]',
                      filter === c
                        ? 'bg-accent text-accent-contrast border border-accent'
                        : 'bg-surface text-muted border border-line hover:text-site-text hover:border-accent',
                    ].join(' ')}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Chapter list */}
          <div className="flex flex-col gap-3">
            {list.map((c, i) => (
              <Reveal delay={i * 50} key={c.school}>
                <div className="bg-surface border border-line rounded-[14px] py-[18px] px-5 flex items-center gap-4 transition-[transform,border-color] duration-200 hover:border-accent hover:-translate-y-[1px] max-sm:flex-col max-sm:items-start max-sm:gap-3">
                  {/* Code badge */}
                  <div className="font-mono text-[13px] font-bold text-accent-ink bg-accent-soft py-[6px] px-[10px] rounded-[8px] shrink-0">{c.code}</div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display font-semibold text-[16px]">{c.school}</div>
                    <div className="font-mono text-muted text-[12px] uppercase tracking-[.06em]">{c.city}</div>
                  </div>
                  {/* Status badge */}
                  <span className={[
                    'font-mono border inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold shrink-0',
                    c.live ? 'text-accent-ink border-accent-2 bg-accent-soft' : 'text-muted border-line bg-transparent',
                  ].join(' ')}>
                    <span className={`w-[6px] h-[6px] rounded-full ${c.live ? 'bg-accent-2' : 'bg-muted'}`} />
                    {c.live ? 'Active' : 'Launching'}
                  </span>
                  <div className="font-display font-semibold text-[18px] text-right shrink-0 max-sm:text-left">
                    {c.members}<span className="text-muted font-normal text-[13px] ml-1">members</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Start a chapter section */}
      <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px] bg-[var(--surface-2)]">
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Start a chapter</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-2" style={{ fontSize: 'clamp(28px,3.6vw,42px)' }}>Bring Club to your school in four steps.</h2>
            <p className="text-muted text-[17px] mb-[42px]">We handle the system and training, you bring the students. Most chapters launch within a term.</p>
          </Reveal>
          <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[18px]">
            {STEPS.map((s, i) => (
              <Reveal delay={i * 90} key={s.t}>
                <div className="bg-surface border border-line rounded-[14px] py-[28px] px-[24px] transition-[background,border-color] duration-200 hover:border-accent">
                  <span className="font-mono text-accent-ink text-[13px] font-bold">0{i + 1}</span>
                  <h4 className="font-display font-semibold text-[18px] mt-[14px] mb-2">{s.t}</h4>
                  <p className="text-muted text-[14px] m-0">{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-9">
              <Link href="/apply" className={BTN_P}>
                Start a chapter <IconArrow size={16} className="arr" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
