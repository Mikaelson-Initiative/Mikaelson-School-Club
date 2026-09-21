'use client';

import { useEffect, useRef } from 'react';

interface BaseModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Shared modal shell: backdrop, container, close button, scroll, animation.
 * Import this in place of the local Modal components in each feature file.
 */
export default function BaseModal({ onClose, children }: BaseModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Focus trap: move focus into the modal on open, and keep Tab/Shift+Tab
  // cycling within it so keyboard/screen-reader users can't tab into the
  // obscured page behind the backdrop.
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusables = () => Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    (focusables()[0] ?? panel).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const els = focusables();
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener('keydown', onKeyDown);
    return () => {
      panel.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center p-6 bg-[rgba(8,14,12,.6)] backdrop-blur-[6px]"
      style={{ animation: 'modalFadeIn .22s ease' }}
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        ref={panelRef}
        tabIndex={-1}
        className="bg-surface text-site-text border border-line rounded-[22px] max-w-[460px] w-full p-10 relative max-h-[90vh] overflow-y-auto max-sm:p-[28px] max-sm:px-5 xs:p-6 xs:px-4 outline-none"
        style={{ animation: 'modalFadeIn .28s ease' }}
      >
        <button
          className="text-muted absolute top-4 right-[18px] bg-transparent border-none cursor-pointer text-[20px] leading-none transition-colors duration-150 hover:text-site-text"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
