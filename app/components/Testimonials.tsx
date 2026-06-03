import Reveal from './Reveal';

const QUOTES = [
  {
    q: "I used to wait to be picked. Now I run our chapter's project and three of my friends joined because of it.",
    nm: 'Amara O.',
    rl: 'JSS 2 · Lagos',
  },
  {
    q: "The habit tracking changed how my students show up, to the club and to class. It's the most useful thing we've added all year.",
    nm: 'Mr. Ndlovu',
    rl: 'Teacher mentor · Soweto',
  },
  {
    q: 'We brought Mikaelson in to build culture. What we got back was a generation of students who hold themselves accountable.',
    nm: 'Mrs. Adeyemi',
    rl: 'Head of School · Abuja',
  },
];

export default function Testimonials() {
  return (
    <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]">
      <div className="max-w-[1180px] mx-auto px-8 max-sm:px-[18px] xs:px-4">
        <Reveal>
          <span className="label-dash font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center">
            04 · Proof
          </span>
          <h2
            className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-4 max-w-[720px]"
            style={{ fontSize: 'clamp(30px,4vw,46px)', marginBottom: 42 }}
          >
            What changes when students lead.
          </h2>
        </Reveal>

        {/* Testimonials grid: 3 cols → 2 cols tablet → 1 col mobile */}
        <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
          {QUOTES.map((t, i) => (
            <Reveal delay={i * 110} key={t.nm}>
              <div className="bg-surface border border-line rounded-[22px] p-[30px] flex flex-col gap-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-[5px] hover:shadow-[0_28px_54px_-34px_rgba(0,0,0,.4)]">
                {/* Quote mark */}
                <div className="font-display text-accent-2 text-[44px] leading-[0.6] h-[22px]">
                  &ldquo;
                </div>
                <blockquote className="font-display m-0 text-[16.5px] leading-[1.55] font-medium">
                  {t.q}
                </blockquote>
                {/* Person */}
                <div className="flex items-center gap-[13px] mt-auto">
                  <div className="bg-[var(--surface-2)] border border-line w-[46px] h-[46px] rounded-full overflow-hidden shrink-0 grid place-items-center">
                    <span className="font-mono text-[14px] font-bold text-accent-ink">
                      {t.nm.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-[14.5px]">{t.nm}</div>
                    <div className="font-mono text-muted text-[13px]">{t.rl}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
