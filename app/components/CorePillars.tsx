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
    d: 'Beyond simple management — we teach students to influence with purpose, foster collaboration, and spark initiative within their school community.',
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
    <section className="sec" id="pillars" style={{ background: 'var(--surface-2)' }}>
      <div className="wrap">
        <Reveal>
          <span className="label">02 · The Three Pillars</span>
          <h2 className="display sec-head" style={{ fontSize: 'clamp(30px,4vw,46px)', marginTop: 16, marginBottom: 44 }}>
            One system, three disciplines.
          </h2>
        </Reveal>
        <div className="cards">
          {PILLARS.map((p, i) => (
            <Reveal delay={i * 110} key={p.t}>
              <div className="card">
                <span className="card-num">{p.n}</span>
                <div className="card-ico"><p.Icon size={26} /></div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
                <Link href="/get-involved" className="link-arrow">
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
