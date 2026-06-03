'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  ['About Us', '/about'],
  ['Club Programme', '/programme'],
  ['Partners', '/partners'],
  ['Chapters', '/chapters'],
  ['Our Team', '/leadership'],
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Nav bar */}
      <nav
        className={[
          'fixed top-0 left-0 right-0 z-50 bg-(--bg) border-b border-line',
          'transition-[background,box-shadow,border-color,padding] duration-300',
          scrolled
            ? 'backdrop-blur-[14px] shadow-nav-scrolled bg-[color-mix(in_srgb,var(--bg)_95%,transparent)]'
            : '',
        ].join(' ')}
      >
        <div
          className={[
            'flex items-center justify-between max-w-7xl mx-auto px-4 max-sm:px-4.5',
            'transition-[padding] duration-300 py-3'
          ].join(' ')}
        >
          {/* Brand */}
          <Link
            className="flex items-center gap-2.75 font-display font-bold text-[18px] tracking-[-0.01em] no-underline text-site-text"
            href="/"
          >
            <img
              className="h-8.75 w-8.75 block object-contain"
              src="/MSC%20logo.png"
              alt="Mikaelson School Club"
            />
            <span className="font-display font-bold text-[14px] tracking-[-0.01em] whitespace-nowrap text-accent-ink mobile:hidden md:flex">
              Mikaelson School Club
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="flex items-center gap-[30px] max-md:hidden">
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={[
                  'no-underline text-[14.5px] font-medium relative transition-colors duration-200',
                  pathname === href ? 'text-site-text' : 'text-muted hover:text-site-text',
                ].join(' ')}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="flex items-center gap-4 max-md:hidden">
            <Link
              href="/partners"
              className="font-body font-bold text-[14px] border-none rounded-full px-[22px] py-[11px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]"
            >
              Sponsor a Chapter
            </Link>
          </div>

          {/* Burger button (mobile only) */}
          <button
            className={[
              'flex md:hidden flex-col gap-[5px] border-none cursor-pointer p-[6px] shrink-0 bg-transparent',
            ].join(' ')}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className="block w-[22px] h-[2.5px] rounded-[2px] bg-site-text transition-transform duration-200"
              style={menuOpen ? { transform: 'translateY(7.5px) rotate(45deg)' } : {}}
            />
            <span
              className={[
                'block w-[22px] h-[2.5px] rounded-[2px] bg-site-text transition-[transform,opacity] duration-200',
                menuOpen ? 'opacity-0 scale-x-0' : '',
              ].join(' ')}
            />
            <span
              className="block w-[22px] h-[2.5px] rounded-[2px] bg-site-text transition-transform duration-200"
              style={menuOpen ? { transform: 'translateY(-7.5px) rotate(-45deg)' } : {}}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <>
          <div className="fixed inset-0 z-[48] max-sm:bg-[rgba(0,0,0,0.25)]" onClick={() => setMenuOpen(false)} />
          <div
            className="fixed top-0 left-0 right-0 flex flex-col z-[49] pt-[76px] px-8 pb-7 max-sm:pt-[68px] max-sm:px-[18px] max-sm:pb-6 bg-[var(--bg)] border-b border-line shadow-[0_12px_40px_-20px_rgba(0,0,0,.15)]"
            style={{ animation: 'mobileNavIn .22s ease' }}
          >
            {NAV_LINKS.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={[
                  'no-underline text-[16px] font-medium py-[13px] block border-b border-line text-site-text transition-colors duration-200 hover:text-accent-ink',
                  pathname === href ? 'text-accent-ink font-bold' : '',
                ].join(' ')}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/partners"
              className="mt-5 flex w-full justify-center box-border font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]"
              onClick={() => setMenuOpen(false)}
            >
              Sponsor a Chapter
            </Link>
          </div>
        </>
      )}
    </>
  );
}
