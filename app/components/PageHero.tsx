import Reveal from './Reveal';

interface PageHeroProps {
  label: string;
  title: string;
  lede: string;
}

export default function PageHero({ label, title, lede }: PageHeroProps) {
  return (
    <section className="page-hero" id="top">
      <div className="wrap">
        <Reveal><span className="label">{label}</span></Reveal>
        <Reveal delay={70}><h1 className="display">{title}</h1></Reveal>
        <Reveal delay={130}><p className="lede">{lede}</p></Reveal>
      </div>
    </section>
  );
}
