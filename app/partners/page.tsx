import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconCheck, IconGlobe, IconDigital, IconCompass, IconLead } from '../components/Icons';
import Link from 'next/link';

const PARTNERS = [
  { name: 'Sahara Tech Group', cat: 'Technology Partner', Icon: IconDigital, d: 'Provides mentorship and internship opportunities for members interested in tech.' },
  { name: 'Ubuntu Community Foundation', cat: 'Community Partner', Icon: IconGlobe, d: 'Collaborates with us on service projects and community initiatives.' },
  { name: 'PanAfrican Education Network', cat: 'Educational Partner', Icon: IconCompass, d: 'Offers scholarships and educational resources for chapter members.' },
  { name: 'Young Leaders Council', cat: 'Leadership Partner', Icon: IconLead, d: 'Provides leadership training and professional development programmes.' },
];

const TIERS = [
  { tier: 'Platinum', companies: [{ name: 'Apex Capital' }] },
  { tier: 'Gold', companies: [{ name: 'BrightFuture Education' }, { name: 'Unity Bank' }] },
  { tier: 'Silver', companies: [{ name: 'Local Business Hub' }, { name: 'Innovation Labs' }, { name: 'Horizon Ventures' }] },
];

const BENEFITS = [
  { h: 'Partner benefits', items: ['Brand visibility across chapters', 'Direct student engagement', 'Quarterly impact reporting'] },
  { h: 'Sponsorship tiers', items: ['Platinum', 'Gold', 'Silver'] },
  { h: 'Collaboration', items: ['Mentorship & internships', 'Co-branded projects', 'Event sponsorship'] },
];

export default function PartnersPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Partners & Sponsors"
        title="The people who back the next generation."
        lede="Every chapter is powered by organisations that share our commitment to student development. Their support is tied to transparent, measurable outcomes."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Our partners</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              Who we work with
            </h2>
          </Reveal>
          <div className="partners">
            {PARTNERS.map((p, i) => (
              <Reveal delay={i * 90} key={p.name}>
                <div className="partner">
                  <div className="partner-logo"><p.Icon size={26} /></div>
                  <div>
                    <span className="badge" style={{ marginBottom: 10 }}>{p.cat}</span>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 20, margin: '10px 0 8px' }}>{p.name}</h3>
                    <p className="muted" style={{ margin: '0 0 16px', fontSize: 14.5 }}>{p.d}</p>
                    <a className="link-arrow" href="#">
                      Learn more <IconArrow size={15} className="arr" />
                    </a>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)', paddingTop: 72 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Our sponsors</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 40px' }}>
              By tier
            </h2>
          </Reveal>
          {TIERS.map((t, ti) => (
            <Reveal delay={ti * 80} key={t.tier}>
              <div className="tier">
                <div className="tier-head">
                  <h3>{t.tier}</h3>
                  <span className="badge live">{t.companies.length} partner{t.companies.length > 1 ? 's' : ''}</span>
                  <span className="tier-rule" />
                </div>
                <div
                  className="sponsor-grid"
                  style={{ gridTemplateColumns: `repeat(${Math.min(3, t.companies.length)}, 1fr)` }}
                >
                  {t.companies.map((c) => (
                    <div className="sponsor-logo" key={c.name}>
                      <div className="sponsor-mark">
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--accent-ink)' }}>
                          {c.name.charAt(0)}
                        </span>
                      </div>
                      <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, margin: 0 }}>{c.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal>
            <div className="cta-band" style={{ textAlign: 'left' }}>
              <div className="cta-blob cta-blob-tr" />
              <div className="cta-blob cta-blob-bl" />
              <span className="label">Become a partner</span>
              <h2 className="display" style={{ margin: '14px 0 12px', fontSize: 'clamp(28px,3.6vw,44px)', maxWidth: '16em' }}>
                Invest in measurable youth impact.
              </h2>
              <p style={{ margin: 0 }}>
                We partner with organisations that share our commitment to student development and community growth.
              </p>
              <div className="benefits-grid">
                {BENEFITS.map((b) => (
                  <div key={b.h}>
                    <h4>{b.h}</h4>
                    <ul>
                      {b.items.map((item) => (
                        <li key={item}>
                          <span className="ck"><IconCheck size={17} /></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="cta-actions" style={{ justifyContent: 'flex-start' }}>
                <Link href="/contact" className="btn btn-primary">
                  Talk to us about partnering <IconArrow size={16} className="arr" />
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
