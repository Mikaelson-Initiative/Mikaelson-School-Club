'use client';

import { useEffect, useState } from 'react';
import BaseModal from './BaseModal';
import { IconArrow } from './Icons';
import { BTN_PRIMARY } from '../lib/tw';

const STUDENT_PRICE_NGN = 15_000;
const CHAPTER_STUDENT_COUNT = 40;
const CHAPTER_PRICE_NGN = STUDENT_PRICE_NGN * CHAPTER_STUDENT_COUNT;

const FIELD_INPUT =
  'bg-[var(--surface-2)] border-[1.5px] border-line rounded-[14px] font-body text-site-text py-[13px] px-4 text-[15px] w-full box-border outline-none transition-[border-color] duration-200 focus:border-accent-2';

function formatNaira(n: number) {
  return `₦${n.toLocaleString('en-NG')}`;
}

interface Chapter {
  id: string;
  name: string;
  city: string;
  country: string;
}

type SponsorType = 'STUDENT' | 'CHAPTER';
type Step = 'choice' | 'form';

export default function SponsorModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<Step>('choice');
  const [type, setType] = useState<SponsorType | null>(null);

  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [chapterId, setChapterId] = useState('');

  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [chaptersLoading, setChaptersLoading] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (type !== 'CHAPTER' || chapters.length > 0) return;
    setChaptersLoading(true);
    fetch('/api/schools')
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setChapters(Array.isArray(data) ? data : []))
      .catch(() => setChapters([]))
      .finally(() => setChaptersLoading(false));
  }, [type, chapters.length]);

  function chooseType(t: SponsorType) {
    setType(t);
    setStep('form');
    setError(null);
  }

  function backToChoice() {
    setStep('choice');
    setError(null);
  }

  const amount =
    type === 'CHAPTER' ? CHAPTER_PRICE_NGN : STUDENT_PRICE_NGN * Math.max(1, quantity || 1);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!type) return;
    setError(null);

    if (type === 'CHAPTER' && !chapterId) {
      setError('Please select a chapter to sponsor.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sponsor/initialize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          quantity: type === 'STUDENT' ? quantity : undefined,
          chapterId: type === 'CHAPTER' ? chapterId : undefined,
          donorName,
          donorEmail,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong. Please try again.');
      }

      // Hand off to Paystack's hosted checkout.
      window.location.href = data.authorizationUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  }

  return (
    <BaseModal onClose={onClose}>
      {step === 'choice' && (
        <>
          <h3 className="font-display font-bold text-[26px] text-site-text m-0 mb-2 text-center">
            How would you love to sponsor?
          </h3>
          <p className="text-muted text-[15px] text-center mb-7">
            Every naira goes directly toward running a chapter.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => chooseType('STUDENT')}
              className="text-left bg-[var(--surface-2)] border-[1.5px] border-line rounded-[16px] p-5 transition-[border-color,transform] duration-200 hover:border-accent-2 hover:-translate-y-[2px] cursor-pointer"
            >
              <div className="font-display font-bold text-[18px] text-site-text mb-1">Sponsor a Student</div>
              <div className="text-muted text-[14px]">{formatNaira(STUDENT_PRICE_NGN)} funds one student's leadership journey for a year.</div>
            </button>
            <button
              onClick={() => chooseType('CHAPTER')}
              className="text-left bg-[var(--surface-2)] border-[1.5px] border-line rounded-[16px] p-5 transition-[border-color,transform] duration-200 hover:border-accent-2 hover:-translate-y-[2px] cursor-pointer"
            >
              <div className="font-display font-bold text-[18px] text-site-text mb-1">Sponsor a Chapter</div>
              <div className="text-muted text-[14px]">{formatNaira(CHAPTER_PRICE_NGN)} runs an entire {CHAPTER_STUDENT_COUNT}-student chapter for a year.</div>
            </button>
          </div>
        </>
      )}

      {step === 'form' && type && (
        <>
          <button
            type="button"
            onClick={backToChoice}
            className="text-muted text-[13px] font-mono uppercase tracking-[0.08em] font-bold bg-transparent border-none cursor-pointer p-0 mb-5 inline-flex items-center gap-1 hover:text-site-text"
          >
            ← Back
          </button>
          <h3 className="font-display font-bold text-[24px] text-site-text m-0 mb-1">
            {type === 'STUDENT' ? 'Sponsor a Student' : 'Sponsor a Chapter'}
          </h3>
          <p className="text-muted text-[14.5px] mb-6">
            {type === 'STUDENT'
              ? `${formatNaira(STUDENT_PRICE_NGN)} per student, per year.`
              : `${formatNaira(CHAPTER_PRICE_NGN)} covers all ${CHAPTER_STUDENT_COUNT} students in the chapter for a year.`}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-[6px]">
              <label htmlFor="donorName" className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">Your Name</label>
              <input
                id="donorName"
                type="text"
                required
                className={FIELD_INPUT}
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                placeholder="e.g. Ada Lovelace"
              />
            </div>

            <div className="flex flex-col gap-[6px]">
              <label htmlFor="donorEmail" className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">Email Address</label>
              <input
                id="donorEmail"
                type="email"
                required
                className={FIELD_INPUT}
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            {type === 'STUDENT' && (
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="quantity" className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">Number of Students</label>
                <input
                  id="quantity"
                  type="number"
                  min={1}
                  max={1000}
                  required
                  className={FIELD_INPUT}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                />
              </div>
            )}

            {type === 'CHAPTER' && (
              <div className="flex flex-col gap-[6px]">
                <label htmlFor="chapterId" className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">Chapter</label>
                <select
                  id="chapterId"
                  required
                  className={`${FIELD_INPUT} appearance-none cursor-pointer`}
                  value={chapterId}
                  onChange={(e) => setChapterId(e.target.value)}
                  disabled={chaptersLoading}
                >
                  <option value="" disabled>
                    {chaptersLoading ? 'Loading chapters…' : 'Select a chapter…'}
                  </option>
                  {chapters.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.city}, {c.country}
                    </option>
                  ))}
                </select>
                {!chaptersLoading && chapters.length === 0 && (
                  <p className="text-muted text-[13px] mt-1">No chapters are available to sponsor right now.</p>
                )}
              </div>
            )}

            <div className="bg-[var(--surface-2)] rounded-[14px] p-4 flex items-center justify-between">
              <span className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">Total</span>
              <span className="font-display font-bold text-[22px] text-site-text">{formatNaira(amount)}</span>
            </div>

            {error && (
              <div className="bg-red-50 text-red-600 text-[14px] p-3 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${BTN_PRIMARY} w-full justify-center mt-1 [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px] disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {isSubmitting ? 'Redirecting to payment…' : `Pay ${formatNaira(amount)}`} {!isSubmitting && <IconArrow size={16} className="arr" />}
            </button>
            <p className="text-muted text-[12px] text-center m-0">You'll be securely redirected to Paystack to complete payment.</p>
          </form>
        </>
      )}
    </BaseModal>
  );
}
