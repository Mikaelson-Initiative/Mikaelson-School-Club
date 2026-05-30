import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Leadership',
  description:
    'Meet the elected student officers and faculty advisors leading the Club network across Africa.',
  openGraph: {
    title: 'Leadership | Club',
    description: 'The students and advisors leading the Club network.',
  },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import VolunteerModal from '../components/VolunteerModal';

const OFFICERS = [
  { name: 'Michael Olukayode', role: 'Team Lead', email: 'michael@mikaelsoninitiative.org', img: '/team/Michael%20Olukayode.jpg' },
  { name: 'Boluwatife Adeleke', role: 'Project Manager', email: 'boluwatife@mikaelsoninitiative.org', img: '/team/Boluwatife%20Mercy%20Adeleke.jpeg' },
  { name: 'Irene Ezechi', role: 'Program Manager', email: 'irene@mikaelsoninitiative.org', img: '/team/Irene%20Ezechi.jpg' },
  { name: 'Mariam Jimoh', role: 'ESG and Impact', email: 'mariam@mikaelsoninitiative.org', img: '/team/Mariam%20Jimoh.jpeg' },
  { name: 'Bright Temitope Ayegbusi', role: 'Visuals and Designs', email: 'bright@mikaelsoninitiative.org', img: '/team/Ayegbusi%20Bright%20Temitope.jpg' },
  { name: 'Feranmi Oluwole', role: 'Operations Manager', email: 'feranmi@mikaelsoninitiative.org', img: '/team/Feranmi%20Oluwole.JPG' },
  { name: 'Theresa Asiedu Gyamfi', role: 'GRC and Policy Engineer', email: 'theresa@mikaelsoninitiative.org', img: '/team/Asiedu%20Gyamfi.png' },
  { name: 'Esther Adeoye', role: 'Social Media Manager', email: 'esther@mikaelsoninitiative.org', img: '/team/Adeoye%20Esther.jpg' },
  { name: 'Ariyo Aresa', role: 'Front-end Engineer', email: 'ariyo@mikaelsoninitiative.org', img: '/team/Ariyo%20Aresa.jpg' },
  { name: 'Blessing Olusola', role: 'Technical Writer', email: 'blessing@mikaelsoninitiative.org', img: '/team/Blessing%20Olusola.jpeg' },
  { name: 'Ayomide Idowu', role: 'Visuals and Designs', email: 'ayomide@mikaelsoninitiative.org', img: '/team/Ayomide%20Idowu.jpg' },
];

const ADVISORS = [
  { name: 'Advisory Board', role: 'Strategic Advisor', dept: 'Leadership & Education', bio: 'A council of educators, business leaders, and alumni who guide programme strategy and quality.' },
  { name: 'School Liaison Officer', role: 'School Relations', dept: 'Partnerships', bio: 'The direct point of contact for principals and teachers onboarding new chapters.' },
];

export default function LeadershipPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Our Team"
        title="The team behind the movement."
        lede="Club is built and run by a dedicated team committed to one mission, giving every African secondary school student the habits, mindset, and community to lead."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">01 · Core Team</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              Who we are
            </h2>
          </Reveal>
          <div className="people">
            {OFFICERS.map((o, i) => (
              <Reveal delay={i * 90} key={o.name}>
                <div className="person">
                  <div className="person-avatar">
                    {o.img ? (
                      <img src={o.img} alt={o.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700, color: 'var(--accent-ink)' }}>
                        {o.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3>{o.name}</h3>
                  <div className="role">{o.role}</div>
                  <a className="email" href={`mailto:${o.email}`}>{o.email}</a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)', paddingTop: 72 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">02 · Advisors</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              Our advisors
            </h2>
          </Reveal>
          <div className="advisors">
            {ADVISORS.map((a, i) => (
              <Reveal delay={i * 100} key={a.name}>
                <div className="advisor">
                  <div className="advisor-avatar">
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 18, fontWeight: 700, color: 'var(--accent-ink)' }}>
                      {a.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 19, margin: 0 }}>{a.name}</h3>
                    <div className="role" style={{ color: 'var(--accent-ink)', fontFamily: 'var(--font-mono)', fontSize: 12, textTransform: 'uppercase', letterSpacing: '.06em', margin: '6px 0 2px', fontWeight: 700 }}>{a.role}</div>
                    <div className="muted" style={{ fontFamily: 'var(--font-mono)', fontSize: 12, marginBottom: 10 }}>{a.dept}</div>
                    <p className="muted" style={{ margin: 0, fontSize: 14.5 }}>{a.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <span className="label nodash" style={{ justifyContent: 'center', display: 'flex' }}>
                Applications open each September
              </span>
              <h2 className="display" style={{ marginTop: 14, fontSize: 'clamp(30px,4vw,48px)' }}>
                Interested in leading?
              </h2>
              <p>
                We&apos;re always looking for passionate students to join the leadership team and run new chapters.
                Step up and we&apos;ll give you the playbook.
              </p>
              <VolunteerModal />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
