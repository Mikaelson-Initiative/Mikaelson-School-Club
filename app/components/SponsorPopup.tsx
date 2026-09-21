'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SponsorModal from './SponsorModal';

const SEEN_KEY = 'msc_sponsor_popup_seen';
// Never show on the admin dashboard, or on pages that are already part of
// the sponsor flow itself (redundant / mid-transaction).
const EXCLUDED_PREFIXES = ['/admin-login', '/sponsor'];

type Stage = 'hidden' | 'card' | 'icon';

function markSeen() {
  try {
    localStorage.setItem(SEEN_KEY, 'true');
  } catch {
    // ignore — worst case the full card shows again next visit
  }
}

export default function SponsorPopup() {
  const pathname = usePathname();
  const [stage, setStage] = useState<Stage>('hidden');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) {
      setStage('hidden');
      return;
    }
    let seen = false;
    try {
      seen = !!localStorage.getItem(SEEN_KEY);
    } catch {
      // localStorage unavailable (private mode, etc.) — treat as first visit.
    }
    setStage(seen ? 'icon' : 'card');
  }, [pathname]);

  function openModal() {
    markSeen();
    setStage('hidden');
    setModalOpen(true);
  }

  function collapseToIcon() {
    markSeen();
    setStage('icon');
  }

  return (
    <>
      {stage === 'card' && (
        <div
          role="dialog"
          aria-labelledby="sponsor-popup-title"
          className="fixed bottom-[30px] right-[30px] max-sm:right-5 max-sm:bottom-5 max-sm:w-[calc(100%-40px)] w-[400px] bg-surface border border-line rounded-[18px] shadow-[0_20px_50px_-20px_rgba(0,0,0,.3)] p-6 z-[150]"
          style={{ animation: 'modalFadeIn .28s ease' }}
        >
          <button
            onClick={collapseToIcon}
            aria-label="Minimize"
            className="absolute -top-3 -right-3 bg-surface border border-line rounded-full w-8 h-8 grid place-items-center text-muted text-lg font-bold shadow-md cursor-pointer hover:text-site-text hover:bg-[var(--surface-2)] transition-colors"
          >
            ×
          </button>
          <h3 id="sponsor-popup-title" className="font-display font-bold text-[16px] text-accent-ink m-0 mb-2">
            Sponsor a Student
          </h3>
          <div className="flex items-center gap-4 max-sm:flex-col max-sm:items-start">
            <p className="text-muted text-[14px] leading-[1.5] m-0 flex-1">
              Did you know that for ₦15,000, you're funding one student's full year in the programme?
            </p>
            <button
              onClick={openModal}
              className="bg-accent-2 text-accent-ink font-bold text-[13px] rounded-[10px] px-5 py-3 whitespace-nowrap transition-opacity hover:opacity-85 max-sm:w-full cursor-pointer"
            >
              Sponsor now
            </button>
          </div>
        </div>
      )}

      {stage === 'icon' && (
        <button
          onClick={openModal}
          aria-label="Sponsor a student"
          title="Sponsor a student"
          className="fixed bottom-[30px] right-[30px] max-sm:right-5 max-sm:bottom-5 w-14 h-14 rounded-full bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] grid place-items-center cursor-pointer hover:brightness-95 transition-[filter] z-[150]"
          style={{ animation: 'modalFadeIn .28s ease' }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
          </svg>
        </button>
      )}

      {modalOpen && (
        <SponsorModal
          initialType="STUDENT"
          onClose={() => {
            setModalOpen(false);
            setStage('icon');
          }}
        />
      )}
    </>
  );
}
