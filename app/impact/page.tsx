import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck } from '../components/Icons';
import Link from 'next/link';

const STATS = [
  { value: '—', label: 'Chapters', sub: 'Launching 2025' },
  { value: '—', label: 'Students', sub: 'Enrolling now' },
  { value: '—', label: 'Cities', sub: 'Starting Nigeria & Ghana' },
  { value: '30+', label: 'Champions', sub: 'Trained facilitators' },
];

const REPORTING_ITEMS = [
  'Attendance & retention rates',
  'Habit completion data',
  'Student leadership roles held',
  'Community projects delivered',
  'Post-programme student outcomes',
];

export default function ImpactPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Impact"
        title="What we're building towards."
        lede="We're in our pilot phase. This page will grow as the programme runs — with attendance data, student stories, and outcomes from our early chapters."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Pilot metrics</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              What we&apos;re tracking.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="stats">
              {STATS.map((stat) => (
                <div className="stat" key={stat.label}>
                  <div className="stat-num">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--accent-2)', textTransform: 'uppercase', letterSpacing: '.06em', marginTop: 6 }}>
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Our commitment</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              We report what we measure.
            </h2>
          </Reveal>
          <Reveal delay={70}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
              <div>
                <p style={{ color: 'var(--muted)', fontSize: 16, margin: '0 0 18px' }}>
                  We believe impact reporting only means something when it starts from honest data. From our first chapter, we track attendance at every session, record which habit goals are completed, and follow up with students at the end of each term.
                </p>
                <p style={{ color: 'var(--muted)', fontSize: 16, margin: '0 0 18px' }}>
                  Attendance is tracked per chapter each week. Habit completion rates are reported termly and shared with partner schools. Student case studies are captured with explicit consent and reviewed by our programme team.
                </p>
                <p style={{ color: 'var(--muted)', fontSize: 16, margin: 0 }}>
                  Partner schools receive a quarterly report covering chapter health, student outcomes, and a summary of session themes covered. We do not publish results we cannot stand behind.
                </p>
              </div>
              <div style={{ border: '1px solid var(--line)', borderRadius: 'var(--radius-lg)', padding: '32px 36px' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--accent-ink)', marginBottom: 18 }}>
                  What we will report
                </div>
                <ul className="involve-bullets">
                  {REPORTING_ITEMS.map((item) => (
                    <li key={item}>
                      <span className="ck"><IconCheck size={18} /></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <span className="label">Stories coming soon</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px', textAlign: 'center' }}>
              The first stories are being written.
            </h2>
          </Reveal>
          <Reveal delay={80}>
            <div style={{
              background: 'var(--surface-2)',
              border: '1px solid var(--line)',
              borderRadius: 'var(--radius-lg)',
              padding: 56,
              textAlign: 'center',
              maxWidth: 760,
              margin: '0 auto',
            }}>
              <p style={{ color: 'var(--muted)', fontSize: 18, lineHeight: 1.65, margin: '0 0 28px' }}>
                We&apos;ve deliberately kept this page sparse. Impact pages that fill up with curated quotes before a programme
                has really run are marketing, not evidence. Check back after our first term to see real data, real stories,
                and real outcomes.
              </p>
              <Link href="/contact" style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--accent-ink)', textDecoration: 'none', borderBottom: '1px solid var(--line)', paddingBottom: 2 }}>
                Subscribe to updates →
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>
                Want to see how we measure success?
              </h2>
              <p>Our programme overview explains the outcomes we&apos;re building towards — and how we track them.</p>
              <div className="cta-actions">
                <Link href="/programme" className="btn btn-turquoise">
                  Read the programme overview <IconArrow size={16} className="arr" />
                </Link>
                <Link href="/contact" className="btn btn-ghost">
                  Get in touch
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
