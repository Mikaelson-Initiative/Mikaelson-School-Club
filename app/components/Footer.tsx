import { IconGlobe, IconMail, IconInstagram } from './Icons';
import Link from 'next/link';

const COLS = [
  {
    h: 'About',
    links: [
      ['About Us', '/about'],
      ['The Programme', '/programme'],
      ['Our Team', '/team'],
      ['Impact & Results', '/impact'],
    ],
  },
  {
    h: 'Get Involved',
    links: [
      ['For Schools', '/for-schools'],
      ['For Students', '/for-students'],
      ['Apply Now', '/apply'],
      ['Chapters', '/chapters'],
    ],
  },
  {
    h: 'Resources',
    links: [
      ['Blog & Stories', '/blog'],
      ['FAQs', '/faqs'],
      ['Partners', '/partners'],
      ['Contact', '/contact'],
    ],
  },
  {
    h: 'Legal',
    links: [
      ['Privacy Policy', '/privacy'],
      ['Terms of Use', '/terms'],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="brand" href="/">
              <img
                className="brand-logo"
                src="/MSC%20logo.png"
                alt="Mikaelson School Club"
              />
              <span className="brand-name">Mikaelson School Club</span>
            </Link>
            <p className="foot-about">
              Build excellence through trusted leadership.
            </p>
            <div className="foot-socials">
              <a href="https://instagram.com/mikaelsonschoolclub" aria-label="Instagram" target="_blank" rel="noopener noreferrer"><IconInstagram size={20} /></a>
              <a href="mailto:hello@mikaelsoninitiative.org" aria-label="Email"><IconMail size={20} /></a>
              <a href="https://mikaelsoninitiative.org" aria-label="Website" target="_blank" rel="noopener noreferrer"><IconGlobe size={20} /></a>
            </div>
          </div>
          {COLS.map((c) => (
            <div className="foot-col" key={c.h}>
              <h6 style={{ color: 'var(--accent-2)' }}>{c.h}</h6>
              {c.links.map(([label, href]) => (
                <Link key={label} href={href}>{label}</Link>
              ))}
            </div>
          ))}
        </div>
        <div className="foot-bottom">
          <span>© 2026 Mikaelson School Club. Empowering African youth through habit &amp; leadership.</span>
          <span style={{ fontFamily: 'var(--font-mono)' }}>Built for the next generation of African leaders.</span>
        </div>
      </div>
    </footer>
  );
}
