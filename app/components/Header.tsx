'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  ['About Us', '/about'],
  ['The Programme', '/programme'],
  ['Partners', '/partners'],
  ['Chapters', '/chapters'],
  ['Our Team', '/leadership'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link className="brand" href="/">
          <img
            className="brand-logo"
            src="https://lh3.googleusercontent.com/aida/ADBb0ujVnUj0PPhB94whyGrYxqlxQpRrnqyiN4NhqelIY2w1UN5UhJ8wKdu-6vFDM5te40vUUJNXH8hsCI63X7cN9rKLaYLm7e-b4ui3F0-As1ngbaE4kKAvjLUz5wbku06wXNXwCsnCqQcgt0dwfED9fzzNJGdNWlKADZJWfMvN3uO4YScuRQY1tQmVjYcp99G2wBx2bhLRaUymVrij9VesW3OwJfiSZZ0mWHEVM2vE87iBpr57O1ijwQNnqls"
            alt="Mikaelson School Club"
          />
          <span className="brand-name">Mikaelson School Club</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={pathname === href ? 'active' : ''}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-cta">
          <Link href="/apply" className="btn btn-turquoise" style={{ padding: '11px 22px', fontSize: 14 }}>
            Apply Now
          </Link>
        </div>
      </div>
    </nav>
  );
}
