import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Events & Activities',
  description: 'Upcoming and past events from Club, workshops, networking sessions, career fairs, and community projects.',
  openGraph: { title: 'Events & Activities | Club', description: 'Join us for engaging events throughout the year.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow } from '../components/Icons';
import Link from 'next/link';

import { WRAP, SEC, LABEL } from '../lib/tw';

const UPCOMING = [
  {
    title: 'Monthly Networking Dinner',
    date: 'June 15, 2026',
    time: '6:00 PM – 8:00 PM',
    location: 'School Auditorium',
    description: 'Connect with fellow club members and industry professionals over dinner.',
    cat: 'Networking',
  },
  {
    title: 'Leadership Workshop',
    date: 'June 22, 2026',
    time: '3:30 PM – 5:00 PM',
    location: 'Room 301',
    description: 'Learn essential leadership skills from experienced mentors.',
    cat: 'Workshop',
  },
  {
    title: 'Career Fair',
    date: 'July 10, 2026',
    time: '2:00 PM – 5:00 PM',
    location: 'School Gymnasium',
    description: 'Meet representatives from top companies and explore career opportunities.',
    cat: 'Career',
  },
];

const PAST = [
  { title: 'Orientation Event', date: 'May 1, 2026', attendees: '125 students' },
  { title: 'Spring Volunteer Drive', date: 'April 20, 2026', attendees: '80 volunteers' },
  { title: 'Winter Seminar Series', date: 'March 15, 2026', attendees: '200+ attendees' },
];

export default function EventsPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Events"
        title="Events & Activities."
        lede="Join us for workshops, networking sessions, community projects, and career events throughout the year."
      />

      {/* Upcoming events */}
      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Upcoming</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              What&apos;s coming up.
            </h2>
          </Reveal>
          <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[22px]">
            {UPCOMING.map((event, i) => (
              <Reveal delay={i * 90} key={event.title}>
                <div className="bg-surface border border-line rounded-[22px] overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                  {/* Coloured top strip */}
                  <div className="bg-accent-soft h-[6px]" />
                  <div className="p-[26px]">
                    {/* Category badge */}
                    <span className="font-mono text-muted border border-line inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold mb-4">
                      <span className="w-[6px] h-[6px] rounded-full bg-accent-2" />
                      {event.cat}
                    </span>
                    <h3 className="font-display font-semibold text-[19px] m-0 mb-3 tracking-[-0.01em]">{event.title}</h3>
                    <div className="flex flex-col gap-[6px] mb-4">
                      <div className="font-mono text-[12px] text-accent-ink tracking-[.04em]">
                        <span className="font-bold">{event.date}</span>
                        <span className="text-muted ml-2">· {event.time}</span>
                      </div>
                      <div className="font-mono text-muted text-[12px] tracking-[.04em]">📍 {event.location}</div>
                    </div>
                    <p className="text-muted text-[14.5px] m-0 mb-5 leading-[1.6]">{event.description}</p>
                    <span className="font-mono text-muted text-[12.5px] tracking-[0.06em] uppercase inline-flex items-center gap-[7px] font-bold opacity-40 cursor-not-allowed">
                      Registration soon <IconArrow size={13} />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Past events */}
      <section className={`${SEC} bg-[var(--surface-2)]`}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Archive</span>
            <h2
              className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-10"
              style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}
            >
              Past events.
            </h2>
          </Reveal>
          <div className="max-w-[720px] flex flex-col gap-0">
            {PAST.map((event, i) => (
              <Reveal delay={i * 70} key={event.title}>
                <div className={`flex items-start gap-5 py-6 ${i < PAST.length - 1 ? 'border-b border-line' : ''}`}>
                  <div className="bg-accent-soft text-accent-ink font-mono text-[11px] font-bold uppercase tracking-[.08em] py-[6px] px-[10px] rounded-[8px] shrink-0 mt-[2px] whitespace-nowrap">
                    Past
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[18px] m-0 mb-1">{event.title}</h3>
                    <div className="flex gap-4 font-mono text-[12px] text-muted tracking-[.04em] flex-wrap">
                      <span>{event.date}</span>
                      <span className="flex items-center gap-1">
                        <span>👥</span> {event.attendees}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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
