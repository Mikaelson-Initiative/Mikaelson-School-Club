export default function CTASection() {
  return (
    <section className="py-section-gap px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto text-center">
      <div className="bg-surface-container-highest border border-outline-variant py-24 px-8 rounded-[2rem] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/20 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-container/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="font-display-lg text-display-lg mb-stack-lg max-w-3xl mx-auto text-on-surface">
            Ready to Start Your <br /> Growth Journey?
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
            Mikaelson Initiative brings together students who are committed to growth, leadership, and creating meaningful impact
            in their schools and communities.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-gutter">
            <button className="bg-primary text-on-primary px-12 py-5 rounded-lg font-bold font-headline-md text-headline-md hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95">
              Join the Club
            </button>
            <button className="border-2 border-outline hover:border-primary text-primary px-12 py-5 rounded-lg font-bold font-headline-md text-headline-md transition-all hover:bg-surface-container-low active:scale-95">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
