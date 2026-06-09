'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Link from 'next/link';

const FIELD_INPUT = 'bg-white border border-line rounded-[14px] font-body text-site-text py-3 px-4 text-[15px] w-full box-border outline-none transition-[border-color] duration-200 focus:border-accent-2';
const LABEL_CLS = 'font-mono text-accent-ink text-[12px] tracking-[0.08em] uppercase font-bold block mb-2';

const STEPS = [
  { n: '01', text: 'We review your application' },
  { n: '02', text: 'We schedule a 30-min call' },
  { n: '03', text: 'We run Champion training' },
  { n: '04', text: 'Your chapter launches' },
];

export default function ApplyPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <Header />
      <PageHero label="Apply" title="Bring Mikaelson School Club to your school." lede="Complete this short form and we'll be in touch within 3 working days to discuss next steps." />

      <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]">
        <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
          {/* Grid: form | sidebar */}
          <div className="grid items-start max-md:grid-cols-1 gap-10 md:[grid-template-columns:1fr_0.7fr]">

            {/* Form */}
            <div>
              {submitted ? (
                <div className="bg-accent-soft border border-accent-2 rounded-[22px] p-[40px] text-center">
                  <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-accent-ink font-bold">Application received</span>
                  <h2 className="font-display font-bold tracking-[-0.02em] mt-4 mb-3" style={{ fontSize: 'clamp(22px,2.6vw,30px)' }}>We&apos;ll be in touch within 3 working days.</h2>
                  <p className="text-muted text-[16px] m-0">
                    Keep an eye on your inbox. If you have any urgent questions, email{' '}
                    <a href="mailto:hello@mikaelsoninitiative.org" className="text-accent-ink font-semibold">hello@mikaelsoninitiative.org</a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  {[
                    { label: 'School Name', name: 'school', type: 'text', placeholder: 'e.g. Accra Academy' },
                    { label: 'Your Name', name: 'name', type: 'text', placeholder: 'First and last name' },
                    { label: 'Email Address', name: 'email', type: 'email', placeholder: 'you@yourschool.edu' },
                    { label: 'Phone Number', name: 'phone', type: 'tel', placeholder: '+233 000 000 000' },
                    { label: 'City & Country', name: 'location', type: 'text', placeholder: 'e.g. Accra, Ghana' },
                  ].map((f) => (
                    <div key={f.name}>
                      <label className={LABEL_CLS}>{f.label}</label>
                      <input className={FIELD_INPUT} type={f.type} name={f.name} required={f.name !== 'phone'} placeholder={f.placeholder} />
                    </div>
                  ))}
                  <div>
                    <label className={LABEL_CLS}>Your Role</label>
                    <select className={FIELD_INPUT + ' appearance-none cursor-pointer'} name="role">
                      <option value="">Select your role</option>
                      <option>Principal</option>
                      <option>Deputy Principal</option>
                      <option>Head of Student Affairs</option>
                      <option>Teacher</option>
                      <option>Student</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Approximate number of students interested</label>
                    <input className={FIELD_INPUT} type="number" name="students" min={1} placeholder="e.g. 25" />
                  </div>
                  <div>
                    <label className={LABEL_CLS}>Tell us about your school and why you want to run a Club chapter</label>
                    <textarea className={FIELD_INPUT + ' resize-y leading-[1.6]'} name="message" rows={4} placeholder="Tell us a bit about your school, the students you're thinking of, and what motivated you to apply..." />
                  </div>
                  <button
                    type="submit"
                    className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center justify-center gap-[9px] whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] mt-1 w-full"
                  >
                    Submit Application →
                  </button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] p-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink font-bold block mb-5">What happens next</span>
              <div className="flex flex-col gap-4">
                {STEPS.map((s) => (
                  <div key={s.n} className="flex gap-4 items-start">
                    <span className="font-mono text-[13px] font-bold text-accent-ink shrink-0 mt-px">{s.n}</span>
                    <p className="m-0 text-[15px] leading-[1.5]">{s.text}</p>
                  </div>
                ))}
              </div>
              <hr className="border-none border-t border-line my-7" />
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent-ink font-bold block mb-[10px]">Questions?</span>
              <p className="m-0 text-[14.5px] text-muted leading-[1.65]">
                Email us at{' '}
                <a href="mailto:hello@mikaelsoninitiative.org" className="text-accent-ink font-semibold no-underline">hello@mikaelsoninitiative.org</a>
                {' '}or use the{' '}
                <Link href="/contact" className="text-accent-ink font-semibold no-underline">contact form</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
