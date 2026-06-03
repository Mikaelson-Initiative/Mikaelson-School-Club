import Reveal from './Reveal';
import { IconCalendar, IconTrack, IconCompass, IconGlobe } from './Icons';

const STEPS = [
  { Icon: IconCalendar, t: 'Weekly huddle', d: 'Every chapter meets to set intentions, review wins, and hold each other accountable.' },
  { Icon: IconTrack, t: 'Habit tracking', d: 'Members log daily habits in a shared system, streaks turn intention into identity.' },
  { Icon: IconCompass, t: 'Skill lab', d: 'Hands-on sessions on leadership, communication, and digital tools led by Champions.' },
  { Icon: IconGlobe, t: 'Community project', d: 'Each term, chapters ship a real project that serves their school or neighbourhood.' },
];

export default function SystemSection() {
  return (
    <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]" id="system">
      <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
        <Reveal>
          <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
            03 · How a chapter runs
          </span>
          <h2
            className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-3 max-w-[720px]"
            style={{ fontSize: 'clamp(30px,4vw,46px)' }}
          >
            A weekly rhythm that compounds.
          </h2>
          <p className="text-muted max-w-[720px] text-[17px] mb-[42px]">
            The club isn&apos;t an event, it&apos;s an operating system. Here&apos;s the loop every chapter
            runs, week after week.
          </p>
        </Reveal>

        {/* Rhythm grid: 4 cols → 2 cols tablet → 1 col mobile */}
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[18px]">
          {STEPS.map((s, i) => (
            <Reveal delay={i * 90} key={s.t}>
              <div className="bg-surface border border-line rounded-[14px] py-[28px] px-[24px] transition-[background,border-color] duration-200 hover:border-accent">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-accent-ink text-[13px] font-bold">0{i + 1}</span>
                  <span className="text-accent-ink"><s.Icon size={20} /></span>
                </div>
                <h4 className="font-display font-semibold text-[18px] mt-[14px] mb-2">
                  {s.t}
                </h4>
                <p className="text-muted text-[14px] m-0">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
