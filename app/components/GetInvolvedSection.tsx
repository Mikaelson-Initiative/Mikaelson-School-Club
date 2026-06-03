'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import Counter from './Counter';
import { IconArrow, IconCheck } from './Icons';

/* ── Form definitions per audience ── */
const FORMS: Record<string, {
  label: string;
  heading: string;
  sub: string;
  fields: { name: string; label: string; type: 'text' | 'email' | 'tel' | 'select' | 'textarea'; placeholder?: string; options?: string[] }[];
}> = {
  students: {
    label: 'Join the movement',
    heading: 'Apply for a chapter at your school.',
    sub: 'Tell us a little about you and we\'ll connect you with the nearest chapter.',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Amara Okafor' },
      { name: 'school', label: 'School Name', type: 'text', placeholder: 'e.g. King\'s College Lagos' },
      { name: 'year', label: 'Year / Grade', type: 'select', options: ['Year 7', 'Year 8', 'Year 9', 'Year 10', 'Year 11', 'Year 12', 'Year 13', 'Other'] },
      { name: 'city', label: 'City', type: 'text', placeholder: 'e.g. Nairobi' },
      { name: 'goal', label: 'What do you hope to gain?', type: 'textarea', placeholder: 'Tell us what excites you about joining...' },
    ],
  },
  schools: {
    label: 'Start a chapter',
    heading: 'Bring the club to your school.',
    sub: 'We handle the system, you watch your school culture shift.',
    fields: [
      { name: 'school', label: 'School Name', type: 'text', placeholder: 'e.g. Greenfield Academy' },
      { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Principal, HOD, or coordinator' },
      { name: 'role', label: 'Your Role', type: 'select', options: ['Principal', 'Vice Principal', 'Head of Department', 'Teacher', 'Administrator', 'Other'] },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'school@example.com' },
      { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+234 800 000 0000' },
      { name: 'city', label: 'City / Country', type: 'text', placeholder: 'e.g. Accra, Ghana' },
      { name: 'size', label: 'Estimated Students Interested', type: 'select', options: ['Under 20', '20–50', '50–100', '100+', 'Not sure yet'] },
    ],
  },
  mentors: {
    label: 'Become a Champion',
    heading: 'Train to run a chapter.',
    sub: 'We give you the playbook, tools, and a network of fellow Champions.',
    fields: [
      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'e.g. Mr. Samuel Adeyemi' },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
      { name: 'role', label: 'I am a…', type: 'select', options: ['Teacher', 'Senior Student / Prefect', 'School Administrator', 'Community Leader', 'Other'] },
      { name: 'school', label: 'School / Organisation', type: 'text', placeholder: 'Where you\'d run the chapter' },
      { name: 'city', label: 'City / Country', type: 'text', placeholder: 'e.g. Kampala, Uganda' },
      { name: 'experience', label: 'Tell us about yourself', type: 'textarea', placeholder: 'Your background and why you want to be a Champion...' },
    ],
  },
  sponsors: {
    label: 'Partner with us',
    heading: 'Back the next generation.',
    sub: 'Every contribution is tied to transparent, measurable student outcomes.',
    fields: [
      { name: 'org', label: 'Organisation / Company', type: 'text', placeholder: 'e.g. Apex Capital' },
      { name: 'name', label: 'Your Name', type: 'text', placeholder: 'Contact person' },
      { name: 'email', label: 'Email Address', type: 'email', placeholder: 'you@company.com' },
      { name: 'phone', label: 'Phone Number (optional)', type: 'tel', placeholder: '+234 800 000 0000' },
      { name: 'support', label: 'How would you like to support?', type: 'select', options: ['Sponsor a full chapter (1 year)', 'Fund the digital literacy programme', 'Event / project sponsorship', 'General partnership', 'Not sure yet'] },
      { name: 'message', label: 'Anything else you\'d like us to know?', type: 'textarea', placeholder: 'Optional...' },
    ],
  },
};

const AUDIENCES = [
  { key: 'students', tab: 'Students', h: 'Join a chapter at your school.', p: 'Become part of a community that takes your growth seriously. Build habits, lead projects, and graduate with skills school doesn\'t teach.', bullets: ['Weekly sessions with your peers', 'A habit system that actually sticks', 'Real leadership experience for your CV'], cta: 'Apply as a Student', stat: 480, ss: '+', sl: 'students already in' },
  { key: 'schools', tab: 'Schools', h: 'Start a chapter on your campus.', p: 'Bring a structured leadership and habit programme into your school with full facilitation support. We handle the system, you watch your culture shift.', bullets: ['Turnkey curriculum & Champion training', 'Measurable engagement reporting', 'Zero setup cost to pilot a chapter'], cta: 'Bring us to your school', stat: 9, ss: '', sl: 'partner schools' },
  { key: 'mentors', tab: 'Mentors', h: 'Become a Champion.', p: 'Teachers and student leaders: train with us to facilitate a chapter. We give you the playbook, the tools, and a community of fellow Champions.', bullets: ['Facilitator training & certification', 'Ready-to-run session plans', 'A network of mentors across cities'], cta: 'Train as a Champion', stat: 30, ss: '+', sl: 'trained Champions' },
  { key: 'sponsors', tab: 'Sponsors', h: 'Partner with the movement.', p: 'Fund chapters, sponsor a school, or back the digital-literacy programme. Every contribution is tied to transparent, measurable student outcomes.', bullets: ['Sponsor a chapter for a full year', 'Quarterly impact reporting', 'Co-branded community projects'], cta: 'Partner with us', stat: 5, ss: '', sl: 'cities reached' },
];

/* ── Shared class strings ── */
const FIELD_INPUT =
  'bg-[var(--surface-2)] border-[1.5px] border-line rounded-[14px] font-body text-site-text py-[13px] px-4 text-[15px] w-full box-border outline-none transition-[border-color] duration-200 focus:border-accent-2';

function Modal({ audienceKey, onClose }: { audienceKey: string; onClose: () => void }) {
  const form = FORMS[audienceKey];
  const [values, setValues] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div
      className="fixed inset-0 z-[200] grid place-items-center p-6 bg-[rgba(8,14,12,.6)] backdrop-blur-[6px]"
      style={{ animation: 'modalFadeIn .22s ease' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="bg-surface text-site-text border border-line rounded-[22px] max-w-[460px] w-full p-10 relative max-h-[90vh] overflow-y-auto max-sm:p-[28px] max-sm:px-5 xs:p-6 xs:px-4"
        style={{ animation: 'modalFadeIn .28s ease' }}
      >
        <button
          className="text-muted absolute top-4 right-[18px] bg-transparent border-none cursor-pointer text-[20px] leading-none transition-colors duration-150 hover:text-site-text"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>

        {submitted ? (
          <div className="text-center py-5">
            <div className="bg-accent-soft text-accent-ink w-[58px] h-[58px] rounded-full grid place-items-center mx-auto mb-[18px] text-[26px]">
              ✓
            </div>
            <h3 className="font-display font-bold text-[22px] m-0 mb-[10px]">You&apos;re on the list.</h3>
            <p className="text-muted m-0 text-[15px]">We&apos;ve received your details and will be in touch within 3 working days.</p>
          </div>
        ) : (
          <>
            <p className="font-mono text-accent-ink text-[11px] tracking-[0.18em] uppercase mb-3">
              {form.label}
            </p>
            <h2
              className="font-display font-extrabold tracking-[-0.02em] m-0 mb-[10px]"
              style={{ fontSize: 'clamp(22px,3vw,28px)' }}
            >
              {form.heading}
            </h2>
            <p className="text-muted text-[14.5px] m-0 mb-7">{form.sub}</p>
            <form onSubmit={handleSubmit}>
              {form.fields.map((f) => (
                <div className="flex flex-col gap-[6px] mb-4" key={f.name}>
                  <label
                    htmlFor={f.name}
                    className="font-mono text-muted text-[11px] tracking-[0.1em] uppercase"
                  >
                    {f.label}
                  </label>
                  {f.type === 'select' ? (
                    <select
                      id={f.name}
                      required
                      className={FIELD_INPUT + ' appearance-none cursor-pointer'}
                      value={values[f.name] || ''}
                      onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                    >
                      <option value="" disabled>Select one…</option>
                      {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  ) : f.type === 'textarea' ? (
                    <textarea
                      id={f.name}
                      placeholder={f.placeholder}
                      className={FIELD_INPUT + ' resize-y min-h-[90px]'}
                      value={values[f.name] || ''}
                      onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      id={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      required={!f.label.includes('optional')}
                      className={FIELD_INPUT}
                      value={values[f.name] || ''}
                      onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] w-full justify-center mt-2 [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
              >
                Submit application <IconArrow size={16} className="arr" />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default function GetInvolvedSection() {
  const [tab, setTab] = useState('students');
  const [modalOpen, setModalOpen] = useState(false);
  const a = AUDIENCES.find((x) => x.key === tab)!;

  return (
    <>
      <section
        className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px] bg-[var(--surface-2)]"
        id="involved"
      >
        <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
          <Reveal>
            <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
              05 · Get involved
            </span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-1 max-w-[720px]"
              style={{ fontSize: 'clamp(30px,4vw,46px)' }}
            >
              There&apos;s a way in for everyone.
            </h2>

            {/* Tabs */}
            <div className="flex gap-2 flex-wrap mt-[30px] mb-[34px]">
              {AUDIENCES.map((x) => (
                <button
                  key={x.key}
                  className={[
                    'font-mono text-[13px] tracking-[0.04em] py-[11px] px-5 rounded-full cursor-pointer font-bold uppercase transition-all duration-[220ms]',
                    tab === x.key
                      ? 'bg-accent text-accent-contrast border border-accent'
                      : 'bg-surface text-muted border border-line hover:text-site-text hover:border-accent',
                  ].join(' ')}
                  onClick={() => setTab(x.key)}
                >
                  {x.tab}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Involve panel: 1fr 0.85fr → 1col tablet */}
          <div
            className="bg-surface border border-line rounded-[22px] grid items-center max-md:grid-cols-1 p-12 max-sm:p-9 xs:p-5"
            style={{ gridTemplateColumns: '1fr 0.85fr', gap: 48 }}
            key={tab}
          >
            <div>
              <span className="font-mono text-muted text-[12px] tracking-[0.18em] uppercase inline-flex items-center gap-2">
                For {a.tab}
              </span>
              <h3
                className="font-display font-semibold mt-[14px] mb-4"
                style={{ fontSize: 'clamp(26px,3vw,36px)' }}
              >
                {a.h}
              </h3>
              <p className="text-muted text-[16px] m-0 mb-6 max-w-[34em]">{a.p}</p>
              <ul className="list-none p-0 flex flex-col gap-3 m-0 mb-7">
                {a.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-[11px] text-[15px]">
                    <span className="text-accent-2 shrink-0 mt-[2px]"><IconCheck size={18} /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <button
                className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
                onClick={() => setModalOpen(true)}
              >
                {a.cta} <IconArrow size={16} className="arr" />
              </button>
            </div>

            {/* Aside stat panel */}
            <div className="bg-[var(--surface-2)] rounded-[14px] p-8">
              <div
                className="font-display font-[800] text-[46px] tracking-[-0.02em] leading-none"
              >
                <Counter to={a.stat} suffix={a.ss} />
              </div>
              <div className="text-muted font-mono text-[13px] uppercase tracking-[0.06em] mt-[10px]">
                {a.sl}
              </div>
              <div className="h-px bg-line my-6" />
              <p className="text-muted text-[14.5px] m-0">
                Not sure where you fit? Reach out and we&apos;ll point you to the right chapter or contact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {modalOpen && <Modal audienceKey={tab} onClose={() => setModalOpen(false)} />}
    </>
  );
}
