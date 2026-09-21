'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import SponsorModal from './SponsorModal';

const DISMISS_KEY = 'msc_hide_sponsor_popup';
// Never show on the admin dashboard, or on pages that are already part of
// the sponsor flow itself (redundant / mid-transaction).
const EXCLUDED_PREFIXES = ['/admin-login', '/sponsor'];

export default function SponsorPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    try {
      if (localStorage.getItem(DISMISS_KEY)) return;
    } catch {
      // localStorage unavailable (private mode, etc.) — just show the popup.
    }
    if (EXCLUDED_PREFIXES.some((p) => pathname.startsWith(p))) return;
    setVisible(true);
  }, [pathname]);

  function dismiss() {
    setVisible(false);
    try {
      localStorage.setItem(DISMISS_KEY, 'true');
    } catch {
      // ignore — worst case it shows again next visit
    }
  }

  if (!visible && !modalOpen) return null;

  return (
    <>
      {visible && (
        <div
          role="dialog"
          aria-labelledby="sponsor-popup-title"
          className="fixed bottom-[30px] right-[30px] max-sm:right-5 max-sm:bottom-5 max-sm:w-[calc(100%-40px)] w-[400px] bg-surface border border-line rounded-[18px] shadow-[0_20px_50px_-20px_rgba(0,0,0,.3)] p-6 z-[150]"
          style={{ animation: 'modalFadeIn .28s ease' }}
        >
          <button
            onClick={dismiss}
            aria-label="Close"
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
              onClick={() => { setVisible(false); setModalOpen(true); }}
              className="bg-accent-2 text-accent-ink font-bold text-[13px] rounded-[10px] px-5 py-3 whitespace-nowrap transition-opacity hover:opacity-85 max-sm:w-full cursor-pointer"
            >
              Sponsor now
            </button>
          </div>
        </div>
      )}

      {modalOpen && (
        <SponsorModal
          initialType="STUDENT"
          onClose={() => {
            setModalOpen(false);
            dismiss();
          }}
        />
      )}
    </>
  );
}
