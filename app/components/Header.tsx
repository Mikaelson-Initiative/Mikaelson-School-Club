'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center px-margin-mobile md:px-margin-desktop max-w-[1440px] mx-auto bg-surface/90 backdrop-blur-md transition-all duration-300 ${
        isScrolled ? 'shadow-lg h-16' : 'shadow-elevation-1 h-20'
      }`}
    >
      <div className="flex items-center gap-stack-md">
        <div className="h-10 w-10 bg-primary rounded-lg flex items-center justify-center text-on-primary font-bold">
          M
        </div>
        <span className="text-headline-md font-headline-md font-bold text-primary hidden sm:block">
          Mikaelson School Club
        </span>
      </div>

      <nav className="hidden md:flex gap-10">
        <Link href="/" className="text-primary font-bold border-b-2 border-primary pb-1 font-label-md text-label-md">
          Home
        </Link>
        <Link
          href="#"
          className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md"
        >
          Chapters
        </Link>
        <Link
          href="#"
          className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md"
        >
          Leadership
        </Link>
        <Link
          href="#"
          className="text-secondary font-medium hover:text-primary transition-colors duration-200 font-label-md text-label-md"
        >
          Digital Literacy
        </Link>
      </nav>

      <button className="bg-primary-container text-on-primary-container px-8 py-3 rounded-lg font-bold font-label-md text-label-md hover:opacity-80 active:opacity-60 transition-opacity">
        Join Club
      </button>
    </header>
  );
}
