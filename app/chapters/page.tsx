'use client';

import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import Counter from '../components/Counter';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

const CHAPTERS = [
  { school: 'Igbobi College', city: 'Lagos, Nigeria', code: 'IC', members: 0, live: false },
  { school: 'St Finbars College', city: 'Lagos, Nigeria', code: 'SF', members: 0, live: false },
  { school: "St Gregory's College", city: 'Lagos, Nigeria', code: 'SG', members: 0, live: false },
  { school: 'Methodist Girls & Boys', city: 'Lagos, Nigeria', code: 'MG', members: 0, live: false },
  { school: 'Dowen College', city: 'Lagos, Nigeria', code: 'DC', members: 0, live: false },
  { school: 'Yabatech Secondary School', city: 'Lagos, Nigeria', code: 'YS', members: 0, live: false },
  { school: "King's College", city: 'Lagos, Nigeria', code: 'KC', members: 0, live: false },
  { school: "Kay's International College", city: 'Lagos, Nigeria', code: 'KI', members: 0, live: false },
  { school: 'Our Lady of Apostles Secondary School', city: 'Yaba, Lagos, Nigeria', code: 'OL', members: 0, live: false },
  { school: 'Cathedral Missionary School (CMS)', city: 'Lagos, Nigeria', code: 'CM', members: 0, live: false },
  { school: 'Capital Grammar', city: 'Abuja, Nigeria', code: 'AB', members: 41, live: true },
  { school: 'Achimota School', city: 'Accra, Ghana', code: 'AC', members: 52, live: true },
  { school: 'Riara Springs', city: 'Nairobi, Kenya', code: 'NB', members: 38, live: true },
  { school: 'Morris Isaacson', city: 'Soweto, South Africa', code: 'SW', members: 47, live: true },
  { school: 'Kibuli Secondary', city: 'Kampala, Uganda', code: 'KM', members: 33, live: true },
  { school: 'Green Hills Academy', city: 'Kigali, Rwanda', code: 'KG', members: 29, live: false },
  { school: 'Feza Boys', city: 'Dar es Salaam, Tanzania', code: 'DS', members: 22, live: false },
];

const COUNTRIES = ['All', 'Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Uganda', 'Rwanda', 'Tanzania'];

const STEPS = [
  { t: 'Apply', d: 'A teacher or student leader submits a short application for the school.' },
  { t: 'Train', d: 'We certify your Champion and hand over the full chapter playbook.' },
  { t: 'Launch', d: 'Run your first huddle with starter sessions and the habit system.' },
  { t: 'Grow', d: 'Track engagement, ship a community project, and recruit your next cohort.' },
];

export default function ChaptersPage() {
  const [filter, setFilter] = useState('All');
  const list = CHAPTERS.filter((c) => filter === 'All' || c.city.includes(filter));

  return (
    <>
      <Header />
      <PageHero
        label="Our Network"
        title="Chapters across the continent."
        lede="A chapter is a school running the Club system, a community of students building habits, leadership, and digital fluency together. Find one near you, or start your own."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <div className="stats" style={{ marginBottom: 48 }}>
              {[
                { n: 12, s: '', l: 'Active chapters' },
                { n: 9, s: '', l: 'Partner schools' },
                { n: 5, s: '', l: 'Cities' },
                { n: 480, s: '+', l: 'Students' },
              ].map((s) => (
                <div className="stat" key={s.l}>
                  <div className="stat-num"><Counter to={s.n} suffix={s.s} /></div>
                  <div className="stat-label">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 22 }}>
              <span className="label nodash" style={{ color: 'var(--muted)' }}>
                {list.length} chapters {filter !== 'All' ? `in ${filter}` : 'listed'}
              </span>
              <div className="tabs" style={{ margin: 0 }}>
                {COUNTRIES.map((c) => (
                  <button key={c} className={`tab ${filter === c ? 'active' : ''}`} onClick={() => setFilter(c)}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="chapter-list">
            {list.map((c, i) => (
              <Reveal delay={i * 50} key={c.school}>
                <div className="chapter">
                  <div className="chapter-flag">{c.code}</div>
                  <div>
                    <div className="chapter-name">{c.school}</div>
                    <div className="chapter-city">{c.city}</div>
                  </div>
                  <span className={`badge ${c.live ? 'live' : ''}`}>
                    <span className="d" />
                    {c.live ? 'Active' : 'Launching'}
                  </span>
                  <div className="chapter-members" style={{ textAlign: 'right' }}>
                    {c.members}<span>members</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Start a chapter</span>
            <h2 className="display sec-head" style={{ fontSize: 'clamp(28px,3.6vw,42px)', margin: '16px 0 8px' }}>
              Bring Club to your school in four steps.
            </h2>
            <p className="muted sec-head" style={{ fontSize: 17, marginBottom: 42 }}>
              We handle the system and training, you bring the students. Most chapters launch within a term.
            </p>
          </Reveal>
          <div className="rhythm">
            {STEPS.map((s, i) => (
              <Reveal delay={i * 90} key={s.t}>
                <div className="step">
                  <span className="step-n">0{i + 1}</span>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div style={{ marginTop: 36 }}>
              <Link href="/get-involved" className="btn btn-primary">
                Start a chapter <IconArrow size={16} className="arr" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
