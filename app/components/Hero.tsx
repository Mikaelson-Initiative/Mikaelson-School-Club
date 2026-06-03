import Reveal from './Reveal';
import { IconArrow } from './Icons';
import Link from 'next/link';

export default function Hero() {
  return (
    <header
      className="relative pt-34 pb-24 overflow-hidden max-md:pt-30 max-md:pb-18 max-sm:pt-24 max-sm:pb-14"
      id="top"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 bg-cover bg-no-repeat bg-position-[center_right] max-md:opacity-50"
          style={{ backgroundImage: "url('/hero-v3.png')" }}
        />
        {/* Fade overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, var(--bg) 0%, var(--bg) 22%, color-mix(in srgb, var(--bg) 30%, transparent) 42%, transparent 60%), linear-gradient(0deg, var(--bg) 0.5%, transparent 16%)',
          }}
        />
      </div>

      <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4 relative z-[1]">
        <div className="max-w-[540px] max-md:max-w-full">
          <Reveal>
            <span className="font-mono text-muted bg-surface border border-line inline-flex items-center gap-[9px] whitespace-nowrap text-[12px] tracking-[0.12em] rounded-full py-[7px] px-[14px]">
              <span className="bg-accent-2 w-[6px] h-[6px] rounded-full" />
              EST. 2026 · YOUTH LEADERSHIP
            </span>
          </Reveal>

          <Reveal delay={70}>
            <h1
              className="font-display font-extrabold tracking-[-0.02em] leading-[1.04] m-0 mt-5.5 max-sm:text-[38px] xs:text-[38px]"
              style={{ fontSize: 'clamp(44px, 6vw, 78px)' }}
            >
              Every student<br />can <span className="text-accent-2 italic">lead.</span>
            </h1>
          </Reveal>

          <Reveal delay={130}>
            <p className="text-muted text-[18px] max-w-[30em] mt-[26px] mb-[34px] max-sm:text-[15.5px] max-sm:mt-[18px] max-sm:mb-6 xs:text-[15px]">
              We&apos;re building the next generation of African leaders by equipping students
              with practical leadership skills, personal growth systems, and digital literacy.
            </p>
            <div className="flex gap-4 flex-wrap max-sm:flex-col max-sm:items-stretch max-sm:gap-[10px]">
              <Link
                href="/apply"
                className="font-body mb-3 font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] max-sm:justify-center [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
              >
                Apply for a Chapter <IconArrow size={16} className="arr" />
              </Link>
              <Link
                href="/#pillars"
                className="font-body font-semibold text-[15px] rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px] max-sm:justify-center"
              >
                Explore Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
