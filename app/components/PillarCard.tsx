import MaterialIcon from './MaterialIcon';

interface PillarCardProps {
  icon: string;
  title: string;
  description: string;
  ctaText: string;
}

export default function PillarCard({ icon, title, description, ctaText }: PillarCardProps) {
  return (
    <div className="bg-white border border-[#141d23]/10 p-10 rounded-xl group hover:border-[#00adb5]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#00adb5]/5 flex flex-col h-full">
      <div className="mb-8 text-[#00adb5] w-12 h-12 rounded-lg bg-[#f0f9fa] flex items-center justify-center">
        <MaterialIcon icon={icon} className="text-[24px]" />
      </div>
      <h3 className="font-headline-md text-headline-md mb-stack-md text-on-surface">{title}</h3>
      <p className="text-on-surface-variant font-body-md text-body-md mb-8 grow leading-relaxed">{description}</p>
      <div className="text-[#00696c] hover:text-[#00adb5] transition-colors font-body-md text-sm font-semibold flex items-center gap-2 cursor-pointer mt-auto">
        <span>{ctaText}</span>
        <span className="transform group-hover:translate-x-1.5 transition-transform duration-300 flex items-center">
          <MaterialIcon icon="arrow_forward" className="text-[18px]" />
        </span>
      </div>
    </div>
  );
}
