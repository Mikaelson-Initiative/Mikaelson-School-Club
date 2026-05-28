export default function ChampionSection() {
  return (
    <section className="py-section-gap bg-surface-container-low overflow-hidden relative">
      <div className="px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-container/20 rounded-full blur-3xl"></div>
            <div className="aspect-square rounded-2xl overflow-hidden border-2 border-primary-container/10 p-4 bg-white/50 backdrop-blur-sm shadow-inner">
              <div
                className="w-full h-full object-cover rounded-xl transition-all duration-700 bg-gradient-to-br from-primary-container/20 to-primary/10"
                style={{
                  backgroundImage: `url('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-primary-container text-on-primary-container p-6 rounded-xl shadow-2xl">
              <span className="font-headline-md text-headline-md block font-bold italic">&quot;Leading by example.&quot;</span>
            </div>
          </div>

          <div>
            <span className="font-label-md text-label-md text-primary mb-stack-sm block uppercase tracking-widest font-bold">
              The Mentor
            </span>
            <h2 className="font-headline-lg text-headline-lg mb-stack-lg text-on-surface">Meet Your Club Champion</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-stack-lg">
              Every Mikaelson School Club is anchored by a dedicated Champion—a student leader or teacher trained to facilitate
              our systems and nurture the club&apos;s growth. They are the catalyst for transformation, ensuring every member is
              held accountable to their potential.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container transition-colors">
                <span className="text-primary mt-1 text-xl">✓</span>
                <div>
                  <h4 className="font-bold text-on-surface font-body-md text-body-md">Personal Mentorship</h4>
                  <p className="text-on-secondary-container">Direct guidance on navigating school and leadership challenges.</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-4 rounded-lg hover:bg-surface-container transition-colors">
                <span className="text-primary mt-1 text-xl">✓</span>
                <div>
                  <h4 className="font-bold text-on-surface font-body-md text-body-md">Accountability Hub</h4>
                  <p className="text-on-secondary-container">The focal point for tracking habit progress and growth milestones.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
