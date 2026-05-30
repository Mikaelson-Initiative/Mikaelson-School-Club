import Reveal from './Reveal';
import { IconMentor, IconTrack } from './Icons';

export default function ChampionSection() {
  return (
    <section className="sec" id="champion" style={{ background: 'var(--surface-2)' }}>
      <div className="wrap champ">
        <Reveal>
          <div className="champ-photo">
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDauqArztxIGERMHMiRFE8-XSFuJK8JjnKJvgDDWAsxdna8uSBMZ1QmRfqbAxv0mzDvha1qu3YcHBnYdJryjjVBjborDkFwWw6bfzS0MHu4Sxc6yJ-SxKXWf5bw5q7hEW5HHjoLXBNmnD3cH-tvCAqq-hyWYE8wry-AqmAFicEn6acSpTl0mMsLSO2HvfnFGVKnjGeBzJD9Eq3aFrowMRHIYvEGlquUmsPm4GfVNN1pNALP-dwR_hqSoGWoY9FlSaPc2cV5IcVOeew')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div className="quote-chip">&ldquo;Leading by example.&rdquo;</div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <span className="label">Chapter of the Month</span>
          <h2 className="display" style={{ fontSize: 'clamp(28px,3.6vw,42px)', margin: '16px 0 18px' }}>
            Chapter of the Month &amp; Their Champion
          </h2>
          <p className="muted" style={{ fontSize: 17, margin: 0 }}>
            Each month we spotlight a standout chapter and the student Champion at its heart.
            This chapter has gone above and beyond — building culture, holding members accountable,
            and modelling what Mikaelson leadership looks like in practice.
          </p>
          <div style={{ marginTop: 26 }}>
            <div className="feat">
              <div className="feat-ico"><IconMentor size={20} /></div>
              <div>
                <h5>Personal mentorship</h5>
                <p>Direct guidance on navigating school and leadership challenges.</p>
              </div>
            </div>
            <div className="feat">
              <div className="feat-ico"><IconTrack size={20} /></div>
              <div>
                <h5>Accountability hub</h5>
                <p>The focal point for tracking habit progress and growth milestones.</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
