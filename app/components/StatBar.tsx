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
    <div className="wrap" style={{ marginTop: -30, marginBottom: 10, position: 'relative', zIndex: 2 }}>
      <Reveal>
        <div className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <div className="stat-num">
                <Counter to={s.n} suffix={s.s} />
              </div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
