import Reveal from './Reveal';
import Counter from './Counter';

const STATS = [
  { n: 12, s: '', label: 'Active chapters' },
  { n: 480, s: '+', label: 'Students engaged' },
  { n: 9, s: '', label: 'Partner schools' },
  { n: 94, s: '%', label: 'Stay through the year' },
];

export default function StatBar() {
  return (
    <div
      className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4 relative z-[2]"
      style={{ marginTop: -30, marginBottom: 10 }}
    >
      <Reveal>
        {/* Stats grid: 4 cols desktop → 2 cols tablet → 1 col mobile */}
        <div className="grid grid-cols-4 max-md:grid-cols-2 max-sm:grid-cols-1 gap-px overflow-hidden bg-line border border-line rounded-[22px]">
          {STATS.map((s) => (
            <div key={s.label} className="bg-surface py-[34px] px-[28px]">
              <div
                className="font-display font-[800] leading-none tracking-[-0.03em] text-site-text"
                style={{ fontSize: 'clamp(38px, 5vw, 58px)' }}
              >
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="font-mono text-muted text-[12px] tracking-[0.08em] uppercase mt-3">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
