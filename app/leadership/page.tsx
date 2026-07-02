'use client';

import { useState, useEffect } from 'react';


import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import VolunteerModal from '../components/VolunteerModal';
import Image from 'next/image';
import { IconLinkedin } from '../components/Icons';

import { WRAP, SEC, LABEL } from '../lib/tw';

// Fallback used until each member's individual profile URL is added via `linkedin`.
const TEAM_LINKEDIN = 'https://www.linkedin.com/company/mikaelson-initiative';

// Team photos live in this site's /public/team. Legacy records store them as
// absolute URLs on the wrong host, so collapse any ".../team/<file>" to a
// relative path served from here; leave other hosts (e.g. Blob uploads) as-is.
function teamImageSrc(url?: string | null): string | null {
  if (!url) return null;
  try {
    const path = new URL(url, 'https://local').pathname;
    return path.startsWith('/team/') ? path : url;
  } catch {
    return url;
  }
}


const ADVISORS = [
  { name: 'Advisory Board', role: 'Strategic Advisor', dept: 'Leadership & Education', bio: 'A council of educators, business leaders, and alumni who guide programme strategy and quality.' },
  { name: 'School Liaison Officer', role: 'School Relations', dept: 'Partnerships', bio: 'The direct point of contact for principals and teachers onboarding new chapters.' },
];

export default function LeadershipPage() {
  const [officers, setOfficers] = useState<any[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const dynamicOfficers = data.map((member: any) => ({
              name: member.name,
              role: member.role,
              img: teamImageSrc(member.avatarUrl),
              bio: member.bio,
              email: member.email,
              linkedin: member.linkedinUrl,
            }));
            
            setOfficers(dynamicOfficers);
          } else {
            setOfficers([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch team", err);
      }
    }
    fetchTeam();
  }, []);

  return (
    <>
      <Header />
      <PageHero label="Our Team" title="The team behind the movement." lede="Mikaelson School Club is built and run by a dedicated team committed to one mission, giving every African secondary school student the habits, mindset, and community to lead." />

      {/* Officers section */}
      <section className={SEC} style={{ paddingTop: 56 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>01 · Core Team</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>Who we are</h2>
          </Reveal>
          {/* Officers grid: 5 cols → 3 → 2 → 1 */}
          {officers.length === 0 ? (
            <div className="text-muted text-[15px] col-span-full mb-[56px]">
              Team updates coming soon.
            </div>
          ) : (
            <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-6 mb-[92px] max-sm:mb-[56px]">
              {officers.map((o, i) => (
                <Reveal key={o.name} delay={i * 60}>
                  <div className="group h-full bg-surface border border-line rounded-[22px] p-8 flex flex-col items-center text-center transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-[4px] hover:border-accent hover:shadow-[0_30px_60px_-40px_rgba(0,0,0,.35)]">
                    {/* Avatar */}
                    <div className="w-[108px] h-[108px] rounded-full overflow-hidden bg-[var(--surface-2)] border border-line grid place-items-center shrink-0 relative">
                      {o.img ? (
                        <Image src={o.img} alt={o.name} fill className="object-cover" />
                      ) : (
                        <span className="font-display font-bold text-4xl text-muted opacity-30">{o.name.charAt(0)}</span>
                      )}
                    </div>
                    {/* Name */}
                    <h3 className="font-display font-bold text-[22px] m-0 mt-6 mb-2">{o.name}</h3>
                    {/* Role */}
                    <div className="font-mono text-[12px] font-bold uppercase tracking-[0.12em] text-[#40727e] mb-4">{o.role}</div>
                    {/* Bio */}
                    {o.bio && <p className="text-muted text-[15px] leading-[1.6] m-0 mb-5">{o.bio}</p>}
                    {/* LinkedIn */}
                    {o.linkedin && (
                      <a
                        href={o.linkedin || TEAM_LINKEDIN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-auto text-[#0A66C2] opacity-70 hover:opacity-100 transition-opacity"
                        aria-label={`LinkedIn profile for ${o.name}`}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Advisors section */}
      <section className={`${SEC} bg-[var(--surface-2)]`} style={{ paddingTop: 72 }}>
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>02 · Advisors</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>Our advisors</h2>
          </Reveal>
          <div className="flex flex-col gap-5">
            {ADVISORS.map((a, i) => (
              <Reveal delay={i * 100} key={a.name}>
                <div className="bg-surface border border-line rounded-[22px] py-[26px] px-[30px] flex items-center gap-5 max-sm:flex-col max-sm:text-center">
                  <div className="bg-[var(--surface-2)] border-2 border-accent-soft w-[64px] h-[64px] rounded-full grid place-items-center shrink-0">
                    <span className="font-mono text-[18px] font-bold text-accent-ink">{a.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-[19px] m-0">{a.name}</h3>
                    <div className="font-mono text-accent-ink text-[12px] uppercase tracking-[.06em] font-bold my-[6px]">{a.role}</div>
                    <div className="font-mono text-muted text-[12px] mb-[10px]">{a.dept}</div>
                    <p className="text-muted m-0 text-[14.5px]">{a.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA with volunteer modal */}
      <section className={SEC}>
        <div className={WRAP}>
          <Reveal>
            <div className="bg-[var(--surface-2)] border border-line rounded-[22px] text-center relative overflow-hidden px-[56px] py-[72px] max-sm:px-6 max-sm:py-10">
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ top: -110, right: -110, background: 'color-mix(in srgb, var(--accent) 26%, transparent)', filter: 'blur(64px)' }} />
              <div className="absolute rounded-full pointer-events-none w-[300px] h-[300px]" style={{ bottom: -120, left: -120, background: 'color-mix(in srgb, var(--accent-2) 16%, transparent)', filter: 'blur(64px)' }} />
              <span className="font-mono text-accent-ink text-[12px] tracking-[0.18em] uppercase inline-flex items-center justify-center gap-2 mb-4">Applications open each September</span>
              <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mb-4 mt-4" style={{ fontSize: 'clamp(30px,4vw,48px)' }}>Interested in leading?</h2>
              <p className="text-muted text-[18px] max-w-[36em] mx-auto mt-0 mb-8">We&apos;re always looking for passionate students to join the leadership team and run new chapters. Step up and we&apos;ll give you the playbook.</p>
              <VolunteerModal />
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
