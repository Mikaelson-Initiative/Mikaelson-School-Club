export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/90 to-transparent z-10"></div>
        <div
          className="w-full h-full object-cover bg-gradient-to-br from-primary-container/10 to-surface"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1400&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </div>

      <div className="relative z-20 w-full px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto py-24">
        <div className="max-w-3xl">
          <span className="inline-block py-1 px-4 mb-stack-lg border border-primary text-primary font-label-md text-label-md rounded-full bg-primary/5">
            EST. 2024
          </span>
          <h1 className="font-display-lg text-display-lg mb-stack-lg leading-tight text-on-surface">
            Every student <br /> <span className="text-primary italic">can lead.</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-xl">
            We&apos;re building the next generation of African leaders by equipping students with practical leadership skills,
            personal growth systems, and digital literacy.
          </p>
          <div className="flex flex-col sm:flex-row gap-gutter">
            <button className="bg-primary-container text-on-primary-container px-10 py-4 rounded-lg font-bold font-headline-md text-headline-md active:scale-95 transition-all shadow-lg shadow-primary-container/20 hover:shadow-xl">
              Join the Club
            </button>
            <button className="border-2 border-outline text-primary px-10 py-4 rounded-lg font-bold font-headline-md text-headline-md active:scale-95 transition-all hover:bg-surface-container-low">
              Explore Programs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
