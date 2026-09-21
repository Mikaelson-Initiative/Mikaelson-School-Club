'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { WRAP, SEC, BTN_PRIMARY } from '../../lib/tw';

function formatNaira(kobo: number) {
  return `₦${(kobo / 100).toLocaleString('en-NG')}`;
}

interface VerifyResult {
  status: 'SUCCESS' | 'FAILED' | 'PENDING';
  type: 'STUDENT' | 'CHAPTER';
  quantity: number;
  chapterName: string | null;
  amountKobo: number;
  donorName: string;
}

function CallbackContent() {
  const params = useSearchParams();
  const reference = params.get('reference') ?? params.get('trxref');

  const [state, setState] = useState<'loading' | 'done' | 'error'>('loading');
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Genuine async verification call (and its no-reference guard clause) —
    // not a value derivable during render.
    if (!reference) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState('error');
      setError('No payment reference was provided.');
      return;
    }
    fetch(`/api/sponsor/verify?reference=${encodeURIComponent(reference)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error(data.error || 'Could not verify this payment.');
        setResult(data);
        setState('done');
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Could not verify this payment.');
        setState('error');
      });
  }, [reference]);

  return (
    <section className={SEC} style={{ paddingTop: 150, minHeight: '60vh' }}>
      <div className={WRAP}>
        <div className="max-w-[560px] mx-auto text-center bg-surface border border-line rounded-[22px] p-10">
          {state === 'loading' && (
            <>
              <h1 className="font-display font-bold text-[26px] text-site-text mb-2">Confirming your payment…</h1>
              <p className="text-muted text-[15px]">This should only take a moment.</p>
            </>
          )}

          {state === 'error' && (
            <>
              <h1 className="font-display font-bold text-[26px] text-site-text mb-2">We couldn&apos;t confirm that</h1>
              <p className="text-muted text-[15px] mb-6">{error}</p>
              <Link href="/sponsor" className={BTN_PRIMARY}>Try again</Link>
            </>
          )}

          {state === 'done' && result?.status === 'SUCCESS' && (
            <>
              <h1 className="font-display font-bold text-[26px] text-site-text mb-2">Thank you, {result.donorName}! 🎉</h1>
              <p className="text-muted text-[15px] mb-1">
                {result.type === 'STUDENT'
                  ? `You've sponsored ${result.quantity} student${result.quantity > 1 ? 's' : ''}.`
                  : `You've sponsored the full "${result.chapterName}" chapter.`}
              </p>
              <p className="text-muted text-[15px] mb-6">Payment received: {formatNaira(result.amountKobo)}</p>
              <Link href="/" className={BTN_PRIMARY}>Back to home</Link>
            </>
          )}

          {state === 'done' && result?.status !== 'SUCCESS' && (
            <>
              <h1 className="font-display font-bold text-[26px] text-site-text mb-2">Payment not completed</h1>
              <p className="text-muted text-[15px] mb-6">Your payment wasn&apos;t successful, so nothing was charged. Feel free to try again.</p>
              <Link href="/sponsor" className={BTN_PRIMARY}>Try again</Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default function SponsorCallbackPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <CallbackContent />
      </Suspense>
      <Footer />
    </>
  );
}
