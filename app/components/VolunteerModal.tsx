'use client';

import { useState } from 'react';
import { IconArrow } from './Icons';

function Modal({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="modal-back" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="Close">×</button>
        {submitted ? (
          <div className="modal-success">
            <div className="check">✓</div>
            <h3>Application received.</h3>
            <p>We&apos;ll review your submission and be in touch within 5 working days.</p>
          </div>
        ) : (
          <>
            <p className="modal-label">Volunteer with us</p>
            <h2>Join the team.</h2>
            <p className="modal-sub">Tell us about yourself and the role you&apos;d like to play in building the movement.</p>
            <form onSubmit={handleSubmit}>
              {[
                { name: 'name', label: 'Full Name', type: 'text' as const, placeholder: 'e.g. Amara Okafor' },
                { name: 'email', label: 'Email Address', type: 'email' as const, placeholder: 'you@example.com' },
                { name: 'phone', label: 'Phone Number (optional)', type: 'tel' as const, placeholder: '+234 800 000 0000' },
              ].map((f) => (
                <div className="modal-field" key={f.name}>
                  <label htmlFor={f.name}>{f.label}</label>
                  <input
                    id={f.name}
                    type={f.type}
                    placeholder={f.placeholder}
                    required={!f.label.includes('optional')}
                    value={values[f.name] || ''}
                    onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                  />
                </div>
              ))}
              <div className="modal-field">
                <label htmlFor="role">Role you&apos;re interested in</label>
                <select
                  id="role"
                  required
                  value={values.role || ''}
                  onChange={(e) => setValues({ ...values, role: e.target.value })}
                >
                  <option value="" disabled>Select a role…</option>
                  {[
                    'Programme & Curriculum',
                    'Operations',
                    'Partnerships & Outreach',
                    'Social Media & Communications',
                    'Design & Visuals',
                    'Engineering & Tech',
                    'ESG & Impact Reporting',
                    'Policy & Governance',
                    'Other',
                  ].map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div className="modal-field">
                <label htmlFor="why">Why do you want to volunteer?</label>
                <textarea
                  id="why"
                  placeholder="Tell us what drives you and what you hope to contribute..."
                  value={values.why || ''}
                  onChange={(e) => setValues({ ...values, why: e.target.value })}
                />
              </div>
              <div className="modal-field">
                <label htmlFor="experience">Relevant experience (optional)</label>
                <textarea
                  id="experience"
                  placeholder="Any past work, projects, or skills that are relevant..."
                  value={values.experience || ''}
                  onChange={(e) => setValues({ ...values, experience: e.target.value })}
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}>
                Submit application <IconArrow size={16} className="arr" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function VolunteerModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="cta-actions">
        <button className="btn btn-primary" onClick={() => setOpen(true)}>
          Apply to volunteer <IconArrow size={16} className="arr" />
        </button>
      </div>
      {open && <Modal onClose={() => setOpen(false)} />}
    </>
  );
}
