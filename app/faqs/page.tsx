import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

const FAQ_GROUPS = [
  {
    label: '01 · For Schools',
    heading: 'For Schools',
    faqs: [
      {
        q: 'How much does it cost to run a chapter?',
        a: 'There is no cost to pilot a chapter. We ask for a minimum one-term commitment and a designated Champion. Sponsorship and grant funding are available for schools that cannot self-fund after the pilot.',
      },
      {
        q: 'How long does it take to set up?',
        a: 'Most chapters are running within one school term from application. Champion training takes one day, and we provide everything else.',
      },
      {
        q: 'What does the school need to provide?',
        a: 'A weekly 45-minute session slot, a room, one Champion (teacher or senior student), and promotion of the club to interested students.',
      },
      {
        q: 'How many students do we need?',
        a: 'We ask for a minimum of 10 enrolled members to run a viable chapter. Most chapters start with 15-30.',
      },
    ],
  },
  {
    label: '02 · For Students',
    heading: 'For Students',
    faqs: [
      {
        q: 'Do I need to be a good student to join?',
        a: 'No. The club is for any student who wants to grow — not just high achievers. Many of our most active members start with low confidence.',
      },
      {
        q: 'What if I miss sessions?',
        a: 'Life happens. We ask for consistent effort, not perfection. The habit system is designed to restart, not punish.',
      },
      {
        q: 'Can I take on a leadership role?',
        a: 'Yes. Leadership roles are elected each term and open to all members. The exec team runs the chapter with support from the Champion.',
      },
    ],
  },
  {
    label: '03 · For Parents',
    heading: 'For Parents',
    faqs: [
      {
        q: 'Is this safe for my child?',
        a: 'Yes. All activities are school-based, supervised, and governed by safeguarding policies. We do not collect student data without explicit consent.',
      },
      {
        q: 'Will this distract from academics?',
        a: 'The club is designed to improve academic habits, not compete with them. Members report better focus and time management after one term.',
      },
    ],
  },
];

export default function FAQsPage() {
  return (
    <>
      <Header />
      <PageHero
        label="FAQs"
        title="Questions we get asked a lot."
        lede="From principals, students, parents, and partners. If your question isn't here, reach out."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          {FAQ_GROUPS.map((group, gi) => (
            <Reveal key={group.label} delay={gi * 60}>
              <div style={{ marginBottom: gi < FAQ_GROUPS.length - 1 ? 64 : 0 }}>
                <span className="label" style={{ marginBottom: 10, display: 'inline-flex' }}>{group.label}</span>
                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 'clamp(22px,2.6vw,32px)', margin: '10px 0 32px', letterSpacing: '-0.01em' }}>
                  {group.heading}
                </h3>
                <div style={{ maxWidth: 760 }}>
                  {group.faqs.map((item, i) => (
                    <div
                      key={item.q}
                      style={{
                        borderBottom: i < group.faqs.length - 1 ? '1px solid var(--line)' : 'none',
                        paddingBottom: i < group.faqs.length - 1 ? 24 : 0,
                        marginBottom: i < group.faqs.length - 1 ? 24 : 0,
                      }}
                    >
                      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>
                        {item.q}
                      </div>
                      <div style={{ color: 'var(--muted)', fontSize: 16, lineHeight: 1.6 }}>
                        {item.a}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <Reveal>
            <div className="cta-band">
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <h2 className="display" style={{ fontSize: 'clamp(28px,4vw,46px)' }}>
                Still have questions?
              </h2>
              <p>Our team is happy to answer any question not covered here. Reach out and we&apos;ll get back to you promptly.</p>
              <div className="cta-actions">
                <Link href="/contact" className="btn btn-turquoise">
                  Contact us <IconArrow size={16} className="arr" />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
