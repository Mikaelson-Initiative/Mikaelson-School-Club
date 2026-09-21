'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import SponsorModal from '../components/SponsorModal';
import { IconArrow, IconCheck } from '../components/Icons';
import { WRAP, SEC, LABEL, BTN_PRIMARY, CARD } from '../lib/tw';

const STUDENT_PRICE_NGN = 15_000;
const CHAPTER_STUDENT_COUNT = 40;
const CHAPTER_PRICE_NGN = STUDENT_PRICE_NGN * CHAPTER_STUDENT_COUNT;

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

const TIERS = [
  {
    label: 'Sponsor a Student',
    price: formatNaira(STUDENT_PRICE_NGN),
    unit: 'per student, per year',
    points: [
      "A full year in their chapter's leadership programme",
      'Weekly habit-building sessions',
      'A community that takes their growth seriously',
    ],
  },
  {
    label: 'Sponsor a Chapter',
    price: formatNaira(CHAPTER_PRICE_NGN),
    unit: `covers all ${CHAPTER_STUDENT_COUNT} students, per year`,
    points: [
      'Fund an entire chapter for a full year',
      'Your name attached to a real, named school',
      'Quarterly impact reporting on that chapter',
    ],
  },
];

export default function SponsorPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Header />
      <PageHero
        label="Sponsor"
        title="Fund a student's leadership journey."
        lede={`Did you know that by sponsoring ${formatNaira(STUDENT_PRICE_NGN)}, you're funding one student's full year in the Mikaelson School Club programme?`}
      />

      <section className={SEC} style={{ paddingTop: 40 }}>
        <div className={WRAP}>
          <Reveal>
            <button onClick={() => setModalOpen(true)} className={`${BTN_PRIMARY} [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]`}>
              Sponsor now <IconArrow size={16} className="arr" />
            </button>
          </Reveal>
        </div>
      </section>

      {/* Pricing tiers */}
      <section className={`${SEC} bg-[var(--surface-2)]`} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>How it works</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>
              Two ways to sponsor
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {TIERS.map((t, i) => (
              <Reveal delay={i * 90} key={t.label}>
                <div className={CARD}>
                  <div className="font-display font-bold text-[20px] text-site-text mb-1">{t.label}</div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-display font-[800] text-[34px] text-site-text tracking-[-0.02em]">{t.price}</span>
                  </div>
                  <div className="text-muted text-[13px] font-mono uppercase tracking-[0.06em] mb-5">{t.unit}</div>
                  <ul className="list-none p-0 flex flex-col gap-3 m-0">
                    {t.points.map((p) => (
                      <li key={p} className="flex items-start gap-[11px] text-[15px]">
                        <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={18} /></span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={180}>
            <div className="mt-8">
              <button onClick={() => setModalOpen(true)} className={`${BTN_PRIMARY} [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]`}>
                Sponsor now <IconArrow size={16} className="arr" />
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

      {modalOpen && <SponsorModal onClose={() => setModalOpen(false)} />}
    </>
  );
}
