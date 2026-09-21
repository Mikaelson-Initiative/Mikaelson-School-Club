'use client';

import { useEffect } from 'react';

// Catches errors in the root layout itself, which app/error.tsx cannot —
// this replaces the whole document, so it must render its own html/body.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled root layout error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: '#ffffff', color: '#201d16', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: '0 0 12px' }}>Something went wrong.</h1>
            <p style={{ color: '#6e675c', marginBottom: 24 }}>
              Sorry about that — our team has been notified.
            </p>
            <button
              onClick={reset}
              style={{
                background: '#5ce1e6',
                color: '#003e45',
                fontWeight: 700,
                border: 'none',
                borderRadius: 999,
                padding: '12px 26px',
                cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
