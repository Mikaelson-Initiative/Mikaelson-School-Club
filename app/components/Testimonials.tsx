import Reveal from './Reveal';

const QUOTES = [
  {
    q: "I used to wait to be picked. Now I run our chapter's project and three of my friends joined because of it.",
    nm: 'Amara O.',
    rl: 'Grade 11 · Lagos',
  },
  {
    q: 'The habit tracking changed how my students show up — to the club and to class. It\'s the most useful thing we\'ve added all year.',
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
    <section className="sec">
      <div className="wrap">
        <Reveal>
          <span className="label">04 · Proof</span>
          <h2 className="display sec-head" style={{ fontSize: 'clamp(30px,4vw,46px)', marginTop: 16, marginBottom: 42 }}>
            What changes when students lead.
          </h2>
        </Reveal>
        <div className="tgrid">
          {QUOTES.map((t, i) => (
            <Reveal delay={i * 110} key={t.nm}>
              <div className="tcard">
                <div className="qmark">&ldquo;</div>
                <blockquote>{t.q}</blockquote>
                <div className="tperson">
                  <div className="tavatar">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700, color: 'var(--accent-ink)' }}>
                      {t.nm.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="nm">{t.nm}</div>
                    <div className="rl">{t.rl}</div>
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
