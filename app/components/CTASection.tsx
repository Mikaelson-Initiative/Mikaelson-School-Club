import Reveal from './Reveal';
import { IconArrow } from './Icons';
import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]">
      <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
        <Reveal>
          {/* CTA Band */}
          <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10 xs:px-[18px] xs:py-8">
            {/* Blobs */}
            <div
              className="absolute rounded-full pointer-events-none w-[300px] h-[300px]"
              style={{
                top: -110, right: -110,
                background: 'color-mix(in srgb, var(--accent) 26%, transparent)',
                filter: 'blur(64px)',
              }}
            />
            <div
              className="absolute rounded-full pointer-events-none w-[300px] h-[300px]"
              style={{
                bottom: -120, left: -120,
                background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)',
                filter: 'blur(64px)',
              }}
            />

            <span className="font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center justify-center gap-2">
              Ready when you are
            </span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] max-w-[14em] mx-auto mt-0 mb-[18px]"
              style={{ fontSize: 'clamp(34px,5vw,58px)' }}
            >
              Ready to start your growth journey?
            </h2>
            <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">
              The Mikaelson Initiative brings together students committed to growth, leadership,
              and creating meaningful impact in their schools and communities.
            </p>
            <div className="flex gap-[14px] justify-center flex-wrap">
              <Link
                href="/get-involved"
                className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
              >
                Join the Club <IconArrow size={16} className="arr" />
              </Link>
              <Link
                href="/contact"
                className="font-body font-semibold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-transparent text-site-text border-[1.5px] border-line transition-[transform,box-shadow,border-color,color] duration-200 hover:border-accent hover:text-accent-ink hover:-translate-y-[2px]"
              >
                Contact us
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
