import { IconGlobe, IconMail, IconLink } from './Icons';
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
            <div style={{ display: 'flex', gap: 12, marginTop: 20, color: 'var(--muted)' }}>
              <IconGlobe size={20} />
              <IconMail size={20} />
              <IconLink size={20} />
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
