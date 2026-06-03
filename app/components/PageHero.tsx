import Reveal from './Reveal';

interface PageHeroProps {
  label: string;
  title: string;
  lede: string;
}

export default function PageHero({ label, title, lede }: PageHeroProps) {
  return (
    <section className="relative pt-[150px] pb-[6px] max-sm:pt-[92px]" id="top">
      <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
        <Reveal>
          <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
            {label}
          </span>
        </Reveal>
        <Reveal delay={70}>
          <h1 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 mb-0" style={{ fontSize: 'clamp(40px, 5.4vw, 68px)' }}>
            {title}
          </h1>
        </Reveal>
        <Reveal delay={130}>
          <p className="text-muted text-[19px] max-w-[34em] mt-5 mb-0">
            {lede}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
