'use client';

import { useState } from 'react';
import Link from 'next/link';

const FIELD_INPUT = 'bg-white border border-line rounded-[14px] font-body text-site-text py-[11px] px-[14px] text-[15px] w-full box-border outline-none transition-[border-color] duration-200 focus:border-accent-2';
const FIELD_LABEL = 'font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold block mb-[7px]';

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      type: formData.get('type'),
      message: formData.get('message'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setIsSuccess(true);
      } else {
        setError(result.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setError('A network error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSuccess) {
    return (
      <div className="bg-[var(--surface-2)] border border-line rounded-[22px] p-9 text-center">
        <div className="bg-accent-soft text-accent-ink w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className="font-display font-semibold text-[22px] m-0 mb-3 tracking-[-0.01em]">Message Sent!</h3>
        <p className="text-muted text-[15px] m-0 leading-[1.6]">
          Thank you for reaching out. We have received your message and will respond to the email you provided shortly.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="font-body font-bold text-[14px] border border-line rounded-full px-6 py-3 cursor-pointer mt-8 bg-transparent text-site-text hover:border-site-text transition-colors duration-200"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[var(--surface-2)] border border-line rounded-[22px] p-9">
      <h3 className="font-display font-semibold text-[22px] m-0 mb-2 tracking-[-0.01em]">Send a message</h3>
      <p className="text-muted text-[14.5px] m-0 mb-6 leading-[1.55]">Use the email addresses above or fill in the form below:</p>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-200 rounded-xl p-4 text-[14px] mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className={FIELD_LABEL}>Name</label>
          <input type="text" name="name" required minLength={2} maxLength={100} placeholder="Your name" className={FIELD_INPUT} disabled={isSubmitting} />
        </div>
        <div>
          <label className={FIELD_LABEL}>Email</label>
          <input type="email" name="email" required maxLength={254} placeholder="you@email.com" className={FIELD_INPUT} disabled={isSubmitting} />
        </div>
        <div>
          <label className={FIELD_LABEL}>Type</label>
          <select name="type" required className={FIELD_INPUT + ' appearance-none cursor-pointer'} disabled={isSubmitting}>
            <option value="SCHOOL_ENQUIRY">School enquiry</option>
            <option value="PARTNERSHIP">Partnership</option>
            <option value="MEDIA">Media</option>
            <option value="GENERAL">General</option>
          </select>
        </div>
        <div>
          <label className={FIELD_LABEL}>Message</label>
          <textarea name="message" required minLength={10} maxLength={5000} rows={4} placeholder="Tell us what's on your mind..." className={FIELD_INPUT + ' resize-y leading-[1.6]'} disabled={isSubmitting} />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center justify-center gap-[9px] whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow,opacity] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] mt-1 w-full disabled:opacity-70 disabled:pointer-events-none"
        >
          {isSubmitting ? 'Sending...' : 'Send message'}
        </button>
      </form>

      <p className="font-mono text-[13px] text-muted tracking-[0.02em] mt-4 m-0 text-center">
        Or email{' '}
        <Link href="mailto:msc@mikaelsoninitiative.org" className="text-accent-ink font-bold no-underline hover:underline">msc@mikaelsoninitiative.org</Link>
        {' '}directly.
      </p>
    </div>
  );
}
