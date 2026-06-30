'use client';

import { useState } from 'react';
import BaseModal from './BaseModal';
import { IconArrow } from './Icons';
import { BTN_PRIMARY } from '../lib/tw';

const FIELD_INPUT =
  'bg-[var(--surface-2)] border-[1.5px] border-line rounded-[14px] font-body text-site-text py-[13px] px-4 text-[15px] w-full box-border outline-none transition-[border-color] duration-200 focus:border-accent-2';

function Modal({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <BaseModal onClose={onClose}>
      {submitted ? (
        <div className="text-center py-5">
          <div className="bg-accent-soft text-accent-ink w-[58px] h-[58px] rounded-full grid place-items-center mx-auto mb-[18px] text-[26px]">✓</div>
          <h3 className="font-display font-bold text-[22px] m-0 mb-[10px]">Application received.</h3>
          <p className="text-muted m-0 text-[15px]">We&apos;ll review your submission and be in touch within 5 working days.</p>
        </div>
      ) : (
        <>
          <p className="font-mono text-accent-ink text-[11px] tracking-[0.18em] uppercase mb-3">Volunteer with us</p>
          <h2 className="font-display font-extrabold tracking-[-0.02em] m-0 mb-[10px] text-[28px]">Join the team.</h2>
          <p className="text-muted text-[14.5px] m-0 mb-7">Tell us about yourself and the role you&apos;d like to play in building the movement.</p>
          <form onSubmit={handleSubmit}>
            {[
              { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'e.g. Amara Okafor' },
              { name: 'email', label: 'Email Address', type: 'email' as const, placeholder: 'you@example.com' },
              { name: 'phone', label: 'Phone Number (optional)', type: 'tel' as const, placeholder: '+234 800 000 0000' },
            ].map((f) => (
              <div className="flex flex-col gap-[6px] mb-4" key={f.name}>
                <label htmlFor={f.name} className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">{f.label}</label>
                <input
                  id={f.name}
                  type={f.type}
                  placeholder={f.placeholder}
                  required={!f.label.includes('optional')}
                  className={FIELD_INPUT}
                  value={values[f.name] || ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    setValues(prev => ({ ...prev, [f.name]: value }));
                  }}
                />
              </div>
            ))}
            <div className="flex flex-col gap-[6px] mb-4">
              <label htmlFor="role" className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">Role you&apos;re interested in</label>
              <select
                id="role"
                required
                className={FIELD_INPUT + ' appearance-none cursor-pointer'}
                value={values.role || ''}
                onChange={(e) => {
                  const { value } = e.target;
                  setValues(prev => ({ ...prev, role: value }));
                }}
              >
                <option value="" disabled>Select a role…</option>
                {[
                  'Programme & Curriculum', 'Operations', 'Partnerships & Outreach',
                  'Social Media & Communications', 'Design & Visuals', 'Engineering & Tech',
                  'ESG & Impact Reporting', 'Policy & Governance', 'Other',
                ].map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </div>
            {[
              { name: 'why', label: 'Why do you want to volunteer?', placeholder: 'Tell us what drives you and what you hope to contribute...' },
              { name: 'experience', label: 'Relevant experience (optional)', placeholder: 'Any past work, projects, or skills that are relevant...' },
            ].map((f) => (
              <div className="flex flex-col gap-[6px] mb-4" key={f.name}>
                <label htmlFor={f.name} className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase">{f.label}</label>
                <textarea
                  id={f.name}
                  placeholder={f.placeholder}
                  className={FIELD_INPUT + ' resize-y min-h-[90px]'}
                  value={values[f.name] || ''}
                  onChange={(e) => {
                    const { value } = e.target;
                    setValues(prev => ({ ...prev, [f.name]: value }));
                  }}
                />
              </div>
            ))}
            <button
              type="submit"
              className={`${BTN_PRIMARY} w-full justify-center mt-2 [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]`}
            >
              Submit application <IconArrow size={16} className="arr" />
            </button>
          </form>
        </>
      )}
    </BaseModal>
  );
}

export default function VolunteerModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex gap-[14px] justify-center flex-wrap">
        <button
          className={`${BTN_PRIMARY} [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]`}
          onClick={() => setOpen(true)}
        >
          Apply to volunteer <IconArrow size={16} className="arr" />
        </button>
      </div>
      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  );
}
