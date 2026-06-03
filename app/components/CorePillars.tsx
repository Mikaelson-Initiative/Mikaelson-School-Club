import Reveal from './Reveal';
import { IconArrow, IconBuild, IconLead, IconDigital } from './Icons';
import Link from 'next/link';

const PILLARS = [
  {
    Icon: IconBuild,
    n: '01',
    t: 'Habit Building',
    d: 'The foundation layer where systems and identity are shaped. We help students develop the consistency required to excel academically and personally.',
    cta: 'Learn daily systems',
  },
  {
    Icon: IconLead,
    n: '02',
    t: 'Leadership',
    d: 'Beyond simple management, we teach students to influence with purpose, foster collaboration, and spark initiative within their school community.',
    cta: 'Lead your peers',
  },
  {
    Icon: IconDigital,
    n: '03',
    t: 'Digital Literacy',
    d: 'Equipping students with the technical mindset and digital tools to thrive in an increasingly tech-forward global economy.',
    cta: 'Master technology',
  },
];

export default function CorePillars() {
  return (
    <section
      className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px] bg-[var(--surface-2)]"
      id="pillars"
    >
      <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
        <Reveal>
          <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
            02 · The Three Pillars
          </span>
          <h2
            className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 max-w-[720px]"
            style={{ fontSize: 'clamp(30px,4vw,46px)', marginBottom: 44 }}
          >
            One system, three disciplines.
          </h2>
        </Reveal>

        {/* Cards grid: 3 cols → 2 cols tablet → 1 col mobile */}
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[22px]">
          {PILLARS.map((p, i) => (
            <Reveal delay={i * 110} key={p.t}>
              <div className="bg-surface border border-line rounded-[22px] p-8 relative overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))]">
                <span className="font-mono text-muted absolute top-[26px] right-[30px] text-[13px]">
                  {p.n}
                </span>
                <div className="bg-accent-soft text-accent-ink w-[52px] h-[52px] grid place-items-center mb-[22px] rounded-[13px]">
                  <p.Icon size={26} />
                </div>
                <h3 className="font-display font-semibold text-[22px] m-0 mb-[10px] tracking-[-0.01em]">
                  {p.t}
                </h3>
                <p className="text-muted text-[15px] m-0 mb-[22px]">{p.d}</p>
                <Link
                  href="/get-involved"
                  className="font-mono text-accent-ink text-[12.5px] tracking-[0.06em] uppercase no-underline inline-flex items-center gap-[7px] font-bold [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[4px]"
                >
                  {p.cta} <IconArrow size={15} className="arr" />
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
