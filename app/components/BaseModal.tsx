'use client';

import { useEffect } from 'react';

interface BaseModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Shared modal shell: backdrop, container, close button, scroll, animation.
 * Import this in place of the local Modal components in each feature file.
 */
export default function BaseModal({ onClose, children }: BaseModalProps) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center p-6 bg-[rgba(8,14,12,.6)] backdrop-blur-[6px]"
      style={{ animation: 'modalFadeIn .22s ease' }}
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-surface text-site-text border border-line rounded-[22px] max-w-[460px] w-full p-10 relative max-h-[90vh] overflow-y-auto max-sm:p-[28px] max-sm:px-5 xs:p-6 xs:px-4"
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
