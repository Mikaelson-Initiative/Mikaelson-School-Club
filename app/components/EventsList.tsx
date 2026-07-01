'use client';

import { useEffect, useState, FormEvent } from 'react';
import Reveal from './Reveal';
import { IconArrow } from './Icons';
import { WRAP, SEC, LABEL } from '../lib/tw';
import { loadEvents, SEED_EVENTS, type EventItem } from '../lib/events';

export default function EventsList() {
  const [events, setEvents] = useState<EventItem[]>(SEED_EVENTS);
  const [loading, setLoading] = useState(true);
  
  const [registeringFor, setRegisteringFor] = useState<EventItem | null>(null);
  const [regForm, setRegForm] = useState({ name: '', email: '', schoolName: '' });
  const [regStatus, setRegStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [regError, setRegError] = useState('');

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!registeringFor) return;
    
    setRegStatus('submitting');
    setRegError('');
    
    try {
      const res = await fetch(`/api/events/${registeringFor.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }
      
      setRegStatus('success');
      setTimeout(() => {
        setRegisteringFor(null);
        setRegStatus('idle');
        setRegForm({ name: '', email: '', schoolName: '' });
      }, 3000);
    } catch (err: any) {
      setRegStatus('error');
      setRegError(err.message);
    }
  }

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mappedEvents = data.map((e: any) => ({
              ...e,
              type: e.isPast ? 'past' : 'upcoming',
              date: new Date(e.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
              category: e.category || 'Other',
              registrationUrl: e.registrationUrl || '',
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
                      {event.registrationUrl ? (
                        <a href={event.registrationUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[12.5px] tracking-[0.06em] uppercase inline-flex items-center gap-[7px] font-bold text-accent-2 hover:opacity-80 transition-opacity">
                          External Register <IconArrow size={13} />
                        </a>
                      ) : (
                        <button onClick={() => {
                          setRegisteringFor(event);
                          setRegStatus('idle');
                          setRegError('');
                        }} className="font-mono text-[12.5px] tracking-[0.06em] uppercase inline-flex items-center gap-[7px] font-bold text-accent-2 hover:opacity-80 transition-opacity cursor-pointer">
                          Register Here <IconArrow size={13} />
                        </button>
                      )}
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

      {/* Registration Modal Overlay */}
      {registeringFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-md rounded-[24px] p-8 shadow-2xl relative">
            <button 
              onClick={() => setRegisteringFor(null)}
              className="absolute top-6 right-6 text-muted hover:text-accent-ink transition-colors"
            >
              ✕
            </button>
            <h3 className="font-display font-bold text-[24px] mb-2 leading-tight">Register for<br/>{registeringFor.title}</h3>
            <p className="text-muted text-[14px] mb-6">Fill out your details below to secure your spot.</p>

            {regStatus === 'success' ? (
              <div className="bg-[#e0f6f7] text-[#003e45] p-5 rounded-xl border border-[#b2e5e7] flex flex-col items-center text-center">
                <span className="text-[32px] mb-2">🎉</span>
                <p className="font-bold mb-1">Registration Complete!</p>
                <p className="text-[13px] opacity-80">We&apos;ve sent a confirmation email to {regForm.email}. See you there!</p>
              </div>
            ) : (
              <form onSubmit={handleRegister} className="flex flex-col gap-4">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 ml-1 text-accent-ink">Name <span className="text-red-500">*</span></label>
                  <input required value={regForm.name} onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))} className="w-full bg-[var(--surface-2)] border border-line rounded-xl px-4 py-3 text-[14px] outline-none focus:border-accent-2 transition-colors" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 ml-1 text-accent-ink">Email Address <span className="text-red-500">*</span></label>
                  <input required type="email" value={regForm.email} onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} className="w-full bg-[var(--surface-2)] border border-line rounded-xl px-4 py-3 text-[14px] outline-none focus:border-accent-2 transition-colors" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider font-bold mb-1.5 ml-1 text-accent-ink">School Name</label>
                  <input value={regForm.schoolName} onChange={e => setRegForm(f => ({ ...f, schoolName: e.target.value }))} className="w-full bg-[var(--surface-2)] border border-line rounded-xl px-4 py-3 text-[14px] outline-none focus:border-accent-2 transition-colors" placeholder="Optional" />
                </div>
                {regError && <div className="text-red-600 text-[13px] mt-1 bg-red-50 p-3 rounded-lg border border-red-100">{regError}</div>}
                <button disabled={regStatus === 'submitting'} type="submit" className="mt-2 w-full bg-accent-2 text-white font-mono uppercase tracking-widest text-[13px] font-bold py-4 rounded-xl hover:bg-accent transition-colors disabled:opacity-50">
                  {regStatus === 'submitting' ? 'Submitting...' : 'Confirm Registration'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
