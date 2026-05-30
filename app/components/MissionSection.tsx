import Reveal from './Reveal';

export default function MissionSection() {
  return (
    <section className="sec" id="mission">
      <div
        className="wrap"
        style={{ display: 'grid', gridTemplateColumns: '0.85fr 1.15fr', gap: 56, alignItems: 'start' }}
      >
        <Reveal>
          <span className="label">01 · Our Mission</span>
          <h2 className="display" style={{ fontSize: 'clamp(30px,4vw,46px)', marginTop: 16 }}>
            Nurturing excellence and intentional growth.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 19, lineHeight: 1.65, margin: 0 }}>
            Mikaelson School Club is a structured youth-development space inside your school.
            We give students a community where they build discipline through daily habits and
            shared accountability — because leadership isn&apos;t a title.
          </p>
          <p className="muted" style={{ fontSize: 17, marginTop: 18 }}>
            It&apos;s a series of habits, consistent thinking, and an evolved identity. We make that
            growth measurable, repeatable, and contagious across a whole school.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
