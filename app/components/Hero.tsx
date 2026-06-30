import Reveal from './Reveal';
import { IconArrow } from './Icons';
import Link from 'next/link';
import Image from 'next/image';
import { BTN_PRIMARY, BTN_GHOST } from '../lib/tw';

export default function Hero() {
  return (
    // `<section>` not `<header>` — the nav already provides the page header landmark
    <section
      className="relative pt-34 pb-24 overflow-hidden max-md:pt-30 max-md:pb-18 max-sm:pt-24 max-sm:pb-14"
      id="top"
    >
      {/* Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/*
          Using next/image with `fill` + `priority` so Next.js:
          - Generates a <link rel="preload"> for the LCP image
          - Serves WebP/AVIF instead of PNG
          - Adds a srcset for different viewports
        */}
        <Image
          src="/hero-v3.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right max-md:opacity-50"
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
                className={`${BTN_PRIMARY} mb-3 max-sm:justify-center [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]`}
              >
                Apply for a Chapter <IconArrow size={16} className="arr" />
              </Link>
              <Link
                href="/#pillars"
                className={`${BTN_GHOST} max-sm:justify-center`}
              >
                Explore Programs
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
