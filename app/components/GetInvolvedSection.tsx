'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import Counter from './Counter';
import { IconArrow, IconCheck } from './Icons';
import Link from 'next/link';

const AUDIENCES = [
  {
    key: 'students',
    tab: 'Students',
    h: 'Join a chapter at your school.',
    p: 'Become part of a community that takes your growth seriously. Build habits, lead projects, and graduate with skills school doesn\'t teach.',
    bullets: ['Weekly sessions with your peers', 'A habit system that actually sticks', 'Real leadership experience for your CV'],
    cta: 'Join the Club',
    stat: 480,
    ss: '+',
    sl: 'students already in',
  },
  {
    key: 'schools',
    tab: 'Schools',
    h: 'Start a chapter on your campus.',
    p: 'Bring a structured leadership and habit programme into your school with full facilitation support. We handle the system — you watch your culture shift.',
    bullets: ['Turnkey curriculum & Champion training', 'Measurable engagement reporting', 'Zero setup cost to pilot a chapter'],
    cta: 'Bring us to your school',
    stat: 9,
    ss: '',
    sl: 'partner schools',
  },
  {
    key: 'mentors',
    tab: 'Mentors',
    h: 'Become a Champion.',
    p: 'Teachers and student leaders: train with us to facilitate a chapter. We give you the playbook, the tools, and a community of fellow Champions.',
    bullets: ['Facilitator training & certification', 'Ready-to-run session plans', 'A network of mentors across cities'],
    cta: 'Train as a Champion',
    stat: 30,
    ss: '+',
    sl: 'trained Champions',
  },
  {
    key: 'sponsors',
    tab: 'Sponsors',
    h: 'Partner with the movement.',
    p: 'Fund chapters, sponsor a school, or back the digital-literacy programme. Every contribution is tied to transparent, measurable student outcomes.',
    bullets: ['Sponsor a chapter for a full year', 'Quarterly impact reporting', 'Co-branded community projects'],
    cta: 'Partner with us',
    stat: 5,
    ss: '',
    sl: 'cities reached',
  },
];

export default function GetInvolvedSection() {
  const [tab, setTab] = useState('students');
  const a = AUDIENCES.find((x) => x.key === tab)!;

  return (
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
            <Link href="/get-involved" className="btn btn-primary">
              {a.cta} <IconArrow size={16} className="arr" />
            </Link>
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
  );
}
