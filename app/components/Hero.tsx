import Reveal from './Reveal';
import { IconArrow } from './Icons';
import Link from 'next/link';

export default function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-bg">
        <div
          className="img"
          style={{ backgroundImage: "url('/hero-v3.png')" }}
        />
        <div className="fade" />
      </div>
      <div className="wrap">
        <div className="hero-content">
          <Reveal>
            <span className="eyebrow-pill">
              <span className="dot" />
              EST. 2024 · YOUTH LEADERSHIP
            </span>
          </Reveal>
          <Reveal delay={70}>
            <h1 className="display">
              Every student<br />can <span className="accent-word">lead.</span>
            </h1>
          </Reveal>
          <Reveal delay={130}>
            <p className="hero-lede">
              We&apos;re building the next generation of African leaders by equipping students
              with practical leadership skills, personal growth systems, and digital literacy.
            </p>
            <div className="hero-actions">
              <Link href="/apply" className="btn btn-primary">
                Apply for a Chapter <IconArrow size={16} className="arr" />
              </Link>
              <Link href="/#pillars" className="btn btn-ghost">
                Explore Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
