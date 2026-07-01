'use client';

import { useEffect, useState } from 'react';
import Reveal from './Reveal';
import { IconArrow } from './Icons';
import { WRAP, SEC, LABEL } from '../lib/tw';
import { loadEvents, SEED_EVENTS, type EventItem } from '../lib/events';

export default function EventsList() {
  const [events, setEvents] = useState<EventItem[]>(SEED_EVENTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedEvents = data.map((e: any) => ({
              ...e,
              type: e.isPast ? 'past' : 'upcoming',
              date: new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              category: e.category || 'Other',
            }));
            setEvents(mappedEvents);
          }
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const upcoming = events.filter((e) => e.type === 'upcoming');
  const past = events.filter((e) => e.type === 'past');

  return (
    <>
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
          {upcoming.length === 0 ? (
            <p className="text-muted text-[15px]">No upcoming events right now — check back soon.</p>
          ) : (
            <div className="grid grid-cols-3 max-md:grid-cols-1 gap-[22px]">
              {upcoming.map((event, i) => (
                <Reveal delay={i * 90} key={event.id}>
                  <div className="bg-surface border border-line rounded-[22px] overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                    <div className="bg-accent-soft h-[6px]" />
                    <div className="p-[26px]">
                      <span className="font-mono text-muted border border-line inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold mb-4">
                        <span className="w-[6px] h-[6px] rounded-full bg-accent-2" />
                        {event.category}
                      </span>
                      <h3 className="font-display font-semibold text-[19px] m-0 mb-3 tracking-[-0.01em]">{event.title}</h3>
                      <div className="flex flex-col gap-[6px] mb-4">
                        <div className="font-mono text-[12px] text-accent-ink tracking-[.04em]">
                          <span className="font-bold">{event.date}</span>
                          {event.time && <span className="text-muted ml-2">· {event.time}</span>}
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
          )}
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
          {past.length === 0 ? (
            <p className="text-muted text-[15px]">No past events recorded yet.</p>
          ) : (
            <div className="max-w-[720px] flex flex-col gap-0">
              {past.map((event, i) => (
                <Reveal delay={i * 70} key={event.id}>
                  <div className={`flex items-start gap-5 py-6 ${i < past.length - 1 ? 'border-b border-line' : ''}`}>
                    <div className="bg-accent-soft text-accent-ink font-mono text-[11px] font-bold uppercase tracking-[.08em] py-[6px] px-[10px] rounded-[8px] shrink-0 mt-[2px] whitespace-nowrap">
                      Past
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-[18px] m-0 mb-1">{event.title}</h3>
                      <div className="flex gap-4 font-mono text-[12px] text-muted tracking-[.04em] flex-wrap">
                        <span>{event.date}</span>
                        {event.attendees && (
                          <span className="flex items-center gap-1">
                            <span>👥</span> {event.attendees}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
