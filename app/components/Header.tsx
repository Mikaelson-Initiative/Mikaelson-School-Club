'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { BTN_PRIMARY } from '../lib/tw';

type NavItem = {
  label: string;
  href: string;
  children?: [string, string][];
};

const NAV_ITEMS: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      ['About Us', '/about'],
      ['Our Team', '/leadership'],
      ['Resources', '/resources'],
      ['Contact Us', '/contact'],
    ],
  },
  { label: 'Club Programme', href: '/programme' },
  { label: 'Chapters', href: '/chapters' },
  { label: 'Events', href: '/events' },
  {
    label: 'Get Involved',
    href: '/apply',
    children: [
      ['For Students', '/for-students'],
      ['For Schools', '/for-schools'],
      ['Partners', '/partners'],
      ['Apply Now', '/apply'],
    ],
  },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMobileSub(null);
  }, [pathname]);

  const isItemActive = (item: NavItem) =>
    pathname === item.href || item.children?.some(([, href]) => pathname === href);

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

          {/* Desktop nav links */}
          <div className="flex items-center gap-[30px] max-md:hidden">
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="relative group">
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={false}
                    className={[
                      'font-body bg-transparent border-none cursor-pointer inline-flex items-center gap-[5px] p-0',
                      'text-[14.5px] font-medium transition-colors duration-200',
                      isItemActive(item) ? 'text-site-text' : 'text-muted group-hover:text-site-text',
                    ].join(' ')}
                  >
                    {item.label}
                    <svg
                      className="transition-transform duration-200 group-hover:rotate-180"
                      width="11" height="11" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {/* hover bridge */}
                  <div className="absolute left-0 right-0 top-full h-3" />
                  <div
                    className={[
                      'absolute left-0 top-full mt-3 min-w-[200px] flex flex-col p-2 z-50',
                      'bg-surface border border-line rounded-[14px] shadow-[0_18px_40px_-22px_rgba(0,0,0,.28)]',
                      'opacity-0 invisible translate-y-1 transition-[opacity,transform,visibility] duration-200',
                      'group-hover:opacity-100 group-hover:visible group-hover:translate-y-0',
                    ].join(' ')}
                  >
                    {item.children.map(([label, href]) => (
                      <Link
                        key={href}
                        href={href}
                        className={[
                          'no-underline text-[14px] font-medium px-3 py-[9px] rounded-[9px] transition-colors duration-200',
                          pathname === href
                            ? 'text-accent-ink bg-accent-soft'
                            : 'text-muted hover:text-accent-ink hover:bg-[var(--surface-2)]',
                        ].join(' ')}
                      >
                        {label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'no-underline text-[14.5px] font-medium relative transition-colors duration-200',
                    pathname === item.href ? 'text-site-text' : 'text-muted hover:text-site-text',
                  ].join(' ')}
                >
                  {item.label}
                </Link>
              )
            )}
          </div>

          {/* Desktop CTA */}
          <div className="flex items-center gap-4 max-md:hidden">
            <Link
              href="/partners"
              className={BTN_PRIMARY}
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
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div key={item.label} className="border-b border-line">
                  <button
                    type="button"
                    aria-expanded={mobileSub === item.label}
                    onClick={() => setMobileSub(mobileSub === item.label ? null : item.label)}
                    className={[
                      'font-body bg-transparent border-none cursor-pointer w-full flex items-center justify-between',
                      'text-[16px] font-medium py-[13px] transition-colors duration-200',
                      mobileSub === item.label ? 'text-accent-ink' : 'text-site-text hover:text-accent-ink',
                    ].join(' ')}
                  >
                    {item.label}
                    <svg
                      className="transition-transform duration-200"
                      style={mobileSub === item.label ? { transform: 'rotate(180deg)' } : {}}
                      width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {mobileSub === item.label && (
                    <div className="flex flex-col pb-2 pl-3">
                      {item.children.map(([label, href]) => (
                        <Link
                          key={href}
                          href={href}
                          className={[
                            'no-underline text-[15px] font-medium py-[10px] block transition-colors duration-200',
                            pathname === href ? 'text-accent-ink font-bold' : 'text-muted hover:text-accent-ink',
                          ].join(' ')}
                          onClick={() => setMenuOpen(false)}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    'no-underline text-[16px] font-medium py-[13px] block border-b border-line text-site-text transition-colors duration-200 hover:text-accent-ink',
                    pathname === item.href ? 'text-accent-ink font-bold' : '',
                  ].join(' ')}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}
            <Link
              href="/partners"
              className={`mt-5 flex w-full justify-center ${BTN_PRIMARY}`}
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
