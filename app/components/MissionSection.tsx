export default function MissionSection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto bg-surface">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
        <div className="md:col-span-5">
          <div className="text-primary font-label-md text-label-md mb-stack-sm tracking-widest font-bold">
            01 · OUR MISSION
          </div>
          <h2 className="font-headline-lg text-headline-lg mb-stack-md text-on-surface">
            Nurturing Excellence and Intentional Growth.
          </h2>
          <div className="w-16 h-1 bg-primary-container mb-stack-lg"></div>
        </div>
        <div className="md:col-span-7">
          <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
            Mikaelson School Club is a dedicated youth development space within our school ecosystem. We provide a structured
            community where students build discipline through daily systems and shared accountability. We believe that leadership
            isn&apos;t a title—it&apos;s a series of habits, consistent thinking, and an evolved identity.
          </p>
        </div>
      </div>
    </section>
  );
}
