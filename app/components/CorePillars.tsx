import PillarCard from './PillarCard';

const pillars = [
  {
    title: 'Habit Building',
    description:
      'The foundation layer where systems and identity are shaped. We help you develop the consistency required to excel academically and personally.',
    ctaText: 'Learn Daily Systems',
    icon: '✨',
  },
  {
    title: 'Leadership',
    description:
      'Beyond simple management, we teach students to influence with purpose, foster collaboration, and spark innovation within the school community.',
    ctaText: 'Lead Your Peers',
    icon: '👥',
  },
  {
    title: 'Digital Literacy',
    description:
      'Equipping students with the technical mindset and digital tools necessary to thrive in an increasingly tech-forward global economy.',
    ctaText: 'Master Technology',
    icon: '💻',
  },
];

export default function CorePillars() {
  return (
    <section className="pb-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {pillars.map((pillar) => (
          <PillarCard
            key={pillar.title}
            title={pillar.title}
            description={pillar.description}
            ctaText={pillar.ctaText}
            icon={
              <span className="text-[48px] p-3 bg-surface-container rounded-lg inline-block">{pillar.icon}</span>
            }
          />
        ))}
      </div>
    </section>
  );
}
