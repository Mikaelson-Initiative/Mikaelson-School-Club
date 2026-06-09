import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Activities',
  description: 'Upcoming and past events from Mikaelson School Club, workshops, networking sessions, career fairs, and community projects.',
  openGraph: { title: 'Events & Activities | Mikaelson School Club', description: 'Join us for engaging events throughout the year.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import EventsList from '../components/EventsList';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC } from '../lib/tw';

export default function EventsPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Events"
        title="Events & Activities."
        lede="Join us for workshops, networking sessions, community projects, and career events throughout the year."
      />

      {/* Live events (managed from the admin dashboard) */}
      <EventsList />

      {/* CTA */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div
                className="absolute rounded-full pointer-events-none w-[300px] h-[300px]"
                style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }}
              />
              <div
                className="absolute rounded-full pointer-events-none w-[300px] h-[300px]"
                style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }}
              />
              <h2
                className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4"
                style={{ fontSize: 'clamp(28px,4vw,46px)' }}
              >
                Want to host or propose an event?
              </h2>
              <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">
                Chapter members can propose community projects and sessions each term. Get in touch with your Champion or our team.
              </p>
              <div className="flex gap-[14px] justify-center flex-wrap">
                <Link
                  href="/contact"
                  className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
                >
                  Get in touch <IconArrow size={16} className="arr" />
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
