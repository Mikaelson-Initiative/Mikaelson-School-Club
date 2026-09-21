'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { BTN_PRIMARY } from './lib/tw';

export default function GlobalPageError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[var(--bg)] grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-display font-[800] text-[32px] text-site-text m-0 mb-3">
          Something went wrong.
        </h1>
        <p className="text-muted text-[15px] mb-7 max-w-[36em]">
          Sorry about that — our team has been notified. You can try again, or head back to the homepage.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <button onClick={reset} className={BTN_PRIMARY}>
            Try again
          </button>
          <Link href="/" className="font-body font-semibold text-[15px] text-site-text underline underline-offset-4">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
