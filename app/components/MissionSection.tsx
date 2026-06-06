import Reveal from './Reveal';

export default function MissionSection() {
  return (
    <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]" id="mission">
      {/* Mission grid: 0.85fr 1.15fr → 1col on tablet */}
      <div
        className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4 grid items-start gap-14 max-md:gap-8 max-md:grid-cols-1 md:[grid-template-columns:0.85fr_1.15fr]"
      >
        <Reveal>
          <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
            01 · Our Mission
          </span>
          <h2
            className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4"
            style={{ fontSize: 'clamp(30px,4vw,46px)' }}
          >
            Nurturing excellence and intentional growth.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="text-[14px] leading-[1.65] m-0">
            Mikaelson School Club is a structured youth-development space inside your school.
            We give students a community where they build discipline through daily habits and
            shared accountability, because leadership isn&apos;t a title.
          </p>
          <p className="text-muted text-[17px] mt-[18px]">
            It&apos;s a series of habits, consistent thinking, and an evolved identity. We make that
            growth measurable, repeatable, and contagious across a whole school.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
