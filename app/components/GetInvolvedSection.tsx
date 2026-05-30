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

function Modal({ audienceKey, onClose }: { audienceKey: string; onClose: () => void }) {
  const form = FORMS[audienceKey];
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
            <h3>You&apos;re on the list.</h3>
            <p>We&apos;ve received your details and will be in touch within 3 working days.</p>
          </div>
        ) : (
          <>
            <p className="modal-label">{form.label}</p>
            <h2>{form.heading}</h2>
            <p className="modal-sub">{form.sub}</p>
            <form onSubmit={handleSubmit}>
              {form.fields.map((f) => (
                <div className="modal-field" key={f.name}>
                  <label htmlFor={f.name}>{f.label}</label>
                  {f.type === 'select' ? (
                    <select
                      id={f.name}
                      required
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
                      value={values[f.name] || ''}
                      onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                    />
                  ) : (
                    <input
                      id={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      required={!f.label.includes('optional')}
                      value={values[f.name] || ''}
                      onChange={(e) => setValues({ ...values, [f.name]: e.target.value })}
                    />
                  )}
                </div>
              ))}
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

export default function GetInvolvedSection() {
  const [tab, setTab] = useState('students');
  const [modalOpen, setModalOpen] = useState(false);
  const a = AUDIENCES.find((x) => x.key === tab)!;

  return (
    <>
      <section className="sec" id="involved" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">05 · Get involved</span>
            <h2 className="display sec-head" style={{ fontSize: 'clamp(30px,4vw,46px)', marginTop: 16, marginBottom: 4 }}>
              There&apos;s a way in for everyone.
            </h2>
            <div className="tabs">
              {AUDIENCES.map((x) => (
                <button
                  key={x.key}
                  className={`tab ${tab === x.key ? 'active' : ''}`}
                  onClick={() => setTab(x.key)}
                >
                  {x.tab}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="involve-panel" key={tab}>
            <div>
              <span className="label nodash" style={{ color: 'var(--muted)' }}>For {a.tab}</span>
              <h3>{a.h}</h3>
              <p>{a.p}</p>
              <ul className="involve-bullets">
                {a.bullets.map((b) => (
                  <li key={b}>
                    <span className="ck"><IconCheck size={18} /></span>
                    {b}
                  </li>
                ))}
              </ul>
              <button className="btn btn-primary" onClick={() => setModalOpen(true)}>
                {a.cta} <IconArrow size={16} className="arr" />
              </button>
            </div>
            <div className="involve-aside">
              <div className="big"><Counter to={a.stat} suffix={a.ss} /></div>
              <div className="muted" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 10 }}>
                {a.sl}
              </div>
              <div style={{ height: 1, background: 'var(--line)', margin: '24px 0' }} />
              <p className="muted" style={{ fontSize: 14.5, margin: 0 }}>
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
