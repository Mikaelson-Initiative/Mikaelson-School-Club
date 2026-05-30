import Reveal from './Reveal';
import { IconCalendar, IconTrack, IconCompass, IconGlobe } from './Icons';

const STEPS = [
  { Icon: IconCalendar, t: 'Weekly huddle', d: 'Every chapter meets to set intentions, review wins, and hold each other accountable.' },
  { Icon: IconTrack, t: 'Habit tracking', d: 'Members log daily habits in a shared system — streaks turn intention into identity.' },
  { Icon: IconCompass, t: 'Skill lab', d: 'Hands-on sessions on leadership, communication, and digital tools led by Champions.' },
  { Icon: IconGlobe, t: 'Community project', d: 'Each term, chapters ship a real project that serves their school or neighbourhood.' },
];

export default function SystemSection() {
  return (
    <section className="sec" id="system">
      <div className="wrap">
        <Reveal>
          <span className="label">03 · How a chapter runs</span>
          <h2 className="display sec-head" style={{ fontSize: 'clamp(30px,4vw,46px)', marginTop: 16, marginBottom: 12 }}>
            A weekly rhythm that compounds.
          </h2>
          <p className="muted sec-head" style={{ fontSize: 17, marginBottom: 42 }}>
            The club isn&apos;t an event — it&apos;s an operating system. Here&apos;s the loop every chapter
            runs, week after week.
          </p>
        </Reveal>
        <div className="rhythm">
          {STEPS.map((s, i) => (
            <Reveal delay={i * 90} key={s.t}>
              <div className="step">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="step-n">0{i + 1}</span>
                  <span style={{ color: 'var(--accent-ink)' }}><s.Icon size={20} /></span>
                </div>
                <h4>{s.t}</h4>
                <p>{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
