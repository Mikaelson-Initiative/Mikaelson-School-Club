'use client';

import { use, useEffect, useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Reveal from '@/app/components/Reveal';
import { WRAP, SEC } from '@/app/lib/tw';
import { IconArrow } from '@/app/components/Icons';

export default function RegisterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [regForm, setRegForm] = useState({ name: '', email: '', schoolName: '' });
  const [regStatus, setRegStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [regError, setRegError] = useState('');

  useEffect(() => {
    async function fetchEvent() {
      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          const found = data.find((e: any) => e.id === id);
          if (found) {
            setEvent({
              ...found,
              date: new Date(found.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  async function handleRegister(e: FormEvent) {
    e.preventDefault();
    if (!event) return;
    
    setRegStatus('submitting');
    setRegError('');
    
    try {
      const res = await fetch(`/api/events/${event.id}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(regForm),
      });
      
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }
      
      setRegStatus('success');
    } catch (err: any) {
      setRegStatus('error');
      setRegError(err.message);
    }
  }

  if (loading) {
    return (
      <section className={SEC} style={{ minHeight: '80vh', paddingTop: 120 }}>
        <div className={WRAP}>
          <div className="flex justify-center items-center opacity-50 font-mono tracking-widest text-[12px] uppercase">
            Loading event...
          </div>
        </div>
      </section>
    );
  }

  if (!event) {
    return (
      <section className={SEC} style={{ minHeight: '80vh', paddingTop: 120 }}>
        <div className={WRAP}>
          <div className="text-center">
            <h1 className="font-display font-[800] text-[40px] mb-4">Event Not Found</h1>
            <p className="text-muted text-[16px] mb-8">The event you are looking for does not exist or has been removed.</p>
            <button onClick={() => router.push('/events')} className="font-mono text-[12px] uppercase tracking-widest bg-accent-2 text-white px-6 py-3 rounded-full hover:bg-accent transition-colors font-bold">
              Back to Events
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`${SEC} bg-[var(--surface-2)]`} style={{ minHeight: '100vh', paddingTop: 120 }}>
      <div className={WRAP}>
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Event Details */}
          <Reveal>
            <div>
              <button onClick={() => router.push('/events')} className="font-mono text-[11px] uppercase tracking-widest text-muted hover:text-accent-ink transition-colors mb-10 flex items-center gap-2">
                <span className="rotate-180 inline-block"><IconArrow size={12}/></span> Back to Events
              </button>
              
              <span className="font-mono text-muted border border-line inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold mb-6 bg-surface">
                <span className="w-[6px] h-[6px] rounded-full bg-accent-2" />
                {event.category || 'Workshop'}
              </span>
              
              <h1 className="font-display font-[800] tracking-[-0.03em] leading-[1.05] m-0 mb-6 text-[#1a1a1a]" style={{ fontSize: 'clamp(32px, 4vw, 56px)' }}>
                {event.title}
              </h1>
              
              <p className="text-muted text-[16px] leading-[1.6] mb-8 max-w-[400px]">
                {event.description}
              </p>
              
              <div className="flex flex-col gap-4 font-mono text-[13px] text-accent-ink tracking-[.04em] bg-surface p-6 rounded-2xl border border-line shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-[16px]">🗓️</span>
                  <span><strong>Date:</strong> {event.date}</span>
                </div>
                {event.time && (
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-[16px]">⏰</span>
                    <span><strong>Time:</strong> {event.time}</span>
                  </div>
                )}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center text-[16px]">📍</span>
                  <span><strong>Location:</strong> {event.location}</span>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column: Registration Form */}
          <Reveal delay={100}>
            <div className="bg-surface rounded-[32px] p-8 md:p-10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] border border-line relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-[6px] bg-gradient-to-r from-accent to-accent-2 opacity-80" />
              
              {regStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center text-center py-10">
                  <div className="w-20 h-20 bg-[#e0f6f7] rounded-full flex items-center justify-center text-[40px] mb-6 shadow-inner">🎉</div>
                  <h3 className="font-display font-bold text-[28px] mb-3 text-[#003e45]">You're In!</h3>
                  <p className="text-muted text-[15px] max-w-[280px] mx-auto leading-relaxed mb-8">
                    We've sent a confirmation email to <strong>{regForm.email}</strong>. Check your inbox for details.
                  </p>
                  <button onClick={() => router.push('/events')} className="font-mono text-[12px] uppercase tracking-widest bg-surface border-2 border-[#e7e0d4] text-accent-ink px-8 py-3.5 rounded-full hover:border-[#003e45] transition-colors font-bold">
                    Return to Events
                  </button>
                </div>
              ) : (
                <>
                  <div className="mb-8">
                    <h2 className="font-display font-bold text-[26px] mb-2">Secure your spot</h2>
                    <p className="text-muted text-[14px]">Fill out your details to register for this event.</p>
                  </div>
                  
                  <form onSubmit={handleRegister} className="flex flex-col gap-5">
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.1em] font-bold mb-2 ml-1 text-accent-ink">Full Name <span className="text-red-500">*</span></label>
                      <input 
                        required 
                        value={regForm.name} 
                        onChange={e => setRegForm(f => ({ ...f, name: e.target.value }))} 
                        className="w-full bg-[#f9f8f6] border border-line rounded-2xl px-5 py-3.5 text-[15px] outline-none focus:border-accent-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(92,225,230,0.15)] transition-all" 
                        placeholder="e.g. Jane Doe" 
                      />
                    </div>
                    
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.1em] font-bold mb-2 ml-1 text-accent-ink">Email Address <span className="text-red-500">*</span></label>
                      <input 
                        required 
                        type="email" 
                        value={regForm.email} 
                        onChange={e => setRegForm(f => ({ ...f, email: e.target.value }))} 
                        className="w-full bg-[#f9f8f6] border border-line rounded-2xl px-5 py-3.5 text-[15px] outline-none focus:border-accent-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(92,225,230,0.15)] transition-all" 
                        placeholder="e.g. jane@example.com" 
                      />
                    </div>
                    
                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-[0.1em] font-bold mb-2 ml-1 text-accent-ink">School Name <span className="text-muted font-normal lowercase tracking-normal">(Optional)</span></label>
                      <input 
                        value={regForm.schoolName} 
                        onChange={e => setRegForm(f => ({ ...f, schoolName: e.target.value }))} 
                        className="w-full bg-[#f9f8f6] border border-line rounded-2xl px-5 py-3.5 text-[15px] outline-none focus:border-accent-2 focus:bg-white focus:shadow-[0_0_0_4px_rgba(92,225,230,0.15)] transition-all" 
                        placeholder="e.g. Lincoln High" 
                      />
                    </div>
                    
                    {regError && (
                      <div className="text-red-600 text-[13px] mt-2 bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-2">
                        <span className="text-red-500 mt-0.5">⚠️</span>
                        <span>{regError}</span>
                      </div>
                    )}
                    
                    <button 
                      disabled={regStatus === 'submitting'} 
                      type="submit" 
                      className="mt-4 w-full bg-accent-2 text-white font-mono uppercase tracking-[0.1em] text-[13px] font-bold py-4 rounded-2xl hover:bg-[#003e45] hover:-translate-y-1 hover:shadow-lg transition-all disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none relative overflow-hidden"
                    >
                      {regStatus === 'submitting' ? (
                        <span className="animate-pulse">Processing...</span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Confirm Registration <IconArrow size={14} />
                        </span>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
          
        </div>
      </div>
    </section>
  );
}
