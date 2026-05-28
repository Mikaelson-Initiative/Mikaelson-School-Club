import { ReactNode } from 'react';

interface PillarCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  ctaText: string;
}

export default function PillarCard({ icon, title, description, ctaText }: PillarCardProps) {
  return (
    <div className="bg-surface-container-lowest border border-outline-variant p-10 rounded-xl group hover:border-primary-container transition-all duration-300 hover:shadow-xl hover:shadow-primary-container/5">
      <div className="mb-8 text-primary">{icon}</div>
      <h3 className="font-headline-md text-headline-md mb-stack-md text-on-surface">{title}</h3>
      <p className="text-on-surface-variant font-body-md text-body-md mb-8">{description}</p>
      <div className="text-primary font-label-md text-label-md flex items-center gap-2 group-hover:translate-x-2 transition-transform cursor-pointer">
        {ctaText} <span>→</span>
      </div>
    </div>
  );
}
