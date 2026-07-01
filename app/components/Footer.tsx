import { IconGlobe, IconMail, IconInstagram } from './Icons';
import Link from 'next/link';
import Image from 'next/image';

const COLS = [
  {
    h: 'About',
    links: [
      ['About Us', '/about'],
      ['The Programme', '/programme'],
      ['Our Team', '/leadership'],
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
      ['Events', '/events'],
      ['Resources', '/resources'],
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
    <footer className="border-t border-line py-16 pb-10">
      <div className="max-w-295 mx-auto px-8 max-sm:px-4.5 xs:px-4">
        {/* Footer grid: 1.4fr 1fr 1fr 1fr 0.7fr → 2col tablet → 1col mobile */}
        <div
          className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:[grid-template-columns:1.4fr_1fr_1fr_1fr_0.7fr]"
        >
          {/* Brand column */}
          <div>
            <Link
              className="flex items-center gap-2.75 font-display font-bold text-[18px] tracking-[-0.01em] no-underline text-site-text"
              href="/"
            >
            <Image
                className="h-8.75 w-8.75 block object-contain"
                src="/MSC logo.png"
                alt="Mikaelson School Club"
                width={35}
                height={35}
              />
              <span className="font-display font-bold text-[14px] tracking-[-0.01em] whitespace-nowrap text-accent-ink mobile:hidden md:flex">
                Mikaelson School Club
              </span>
            </Link>
            <p className="text-muted text-[14.5px] max-w-[26em] mt-4.5 mb-0">
              Build excellence through trusted leadership.
            </p>
            <div className="flex gap-3.5 mt-5">
              <a
                href="https://instagram.com/mikaelsonschoolclub"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors duration-200 hover:text-accent-ink"
              >
                <IconInstagram size={20} />
              </a>
              <a
                href="mailto:msc@mikaelsoninitiative.org"
                aria-label="Email"
                className="text-muted transition-colors duration-200 hover:text-accent-ink"
              >
                <IconMail size={20} />
              </a>
              <a
                href="https://mikaelsoninitiative.org"
                aria-label="Website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors duration-200 hover:text-accent-ink"
              >
                <IconGlobe size={20} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {COLS.map((c) => (
            <div key={c.h}>
              <h6 className="font-mono text-accent-2 text-[12px] tracking-widest uppercase m-0 mb-4">
                {c.h}
              </h6>
              {c.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="text-site-text block opacity-80 no-underline text-[14.5px] mb-2.75 transition-[opacity,color] duration-200 hover:text-accent-ink hover:opacity-100"
                >
                  {label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-line text-muted flex justify-between items-center text-[13px] mt-14 pt-6.5 max-sm:flex-col max-sm:gap-2.5 max-sm:text-center">
          <span>© 2026 Mikaelson School Club. Empowering African youth through habit &amp; leadership.</span>
          <span className="font-mono">Built for the next generation of African leaders.</span>
        </div>
      </div>
    </footer>
  );
}
