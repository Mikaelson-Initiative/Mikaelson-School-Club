import Reveal from './Reveal';
import { IconMentor, IconTrack } from './Icons';

export default function ChampionSection() {
  return (
    <section
      className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px] bg-[var(--surface-2)]"
      id="champion"
    >
      {/* Champ grid: 0.92fr 1.08fr → 1col tablet, gap reduces */}
      <div
        className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4 grid items-center gap-14 max-md:grid-cols-1 max-md:gap-8 md:[grid-template-columns:0.92fr_1.08fr]"
      >
        <Reveal>
          {/* Photo */}
          <div className="relative overflow-hidden rounded-[22px] max-md:max-h-[360px] max-md:[aspect-ratio:16/9]" style={{ aspectRatio: '4/5' }}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('/Champions/Champion_Template.jpg')",
              }}
            />
            {/* Quote chip */}
            <div
              className="font-mono bg-accent-2 text-site-text absolute text-[13px] py-3 px-[18px] rounded-[12px] shadow-[0_18px_36px_-18px_rgba(0,0,0,.5)] max-sm:bottom-[14px] max-sm:right-3"
              style={{ bottom: -18, right: -10 }}
            >
              &ldquo;Leading by example.&rdquo;
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
            Chapter of the Month
          </span>
          <h2
            className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-[18px]"
            style={{ fontSize: 'clamp(28px,3.6vw,42px)' }}
          >
            Chapter of the Month &amp; Their Champion
          </h2>
          <p className="text-muted text-[17px] m-0">
            Each month we spotlight a standout chapter and the student Champion at its heart.
            This chapter has gone above and beyond, building culture, holding members accountable,
            and modelling what Mikaelson School Club leadership looks like in practice.
          </p>

          <div className="mt-[26px]">
            {/* Feature: Personal mentorship */}
            <div className="flex gap-4 mt-[22px]">
              <div className="bg-accent-soft text-accent-ink shrink-0 w-[38px] h-[38px] grid place-items-center rounded-[10px]">
                <IconMentor size={20} />
              </div>
              <div>
                <h5 className="font-display font-semibold text-[16px] m-0 mb-1">Personal mentorship</h5>
                <p className="text-muted m-0 text-[14.5px]">Direct guidance on navigating school and leadership challenges.</p>
              </div>
            </div>

            {/* Feature: Accountability hub */}
            <div className="flex gap-4 mt-[22px]">
              <div className="bg-accent-soft text-accent-ink shrink-0 w-[38px] h-[38px] grid place-items-center rounded-[10px]">
                <IconTrack size={20} />
              </div>
              <div>
                <h5 className="font-display font-semibold text-[16px] m-0 mb-1">Accountability hub</h5>
                <p className="text-muted m-0 text-[14.5px]">The focal point for tracking habit progress and growth milestones.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
