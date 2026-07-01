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

const HARDCODED_OFFICERS: { name: string; role: string; img?: string; linkedin?: string }[] = [
  { name: 'Michael Olukayode', role: 'Team Lead', img: '/team/Michael%20Olukayode.jpg', linkedin: 'https://www.linkedin.com/in/michael-olukayode-73890b214/' },
  { name: 'Boluwatife Adeleke', role: 'Project Manager', img: '/team/Boluwatife%20Mercy%20Adeleke.jpeg', linkedin: 'https://www.linkedin.com/in/boluwatifemercyadeleke/' },
  { name: 'Irene Ezechi', role: 'Program Manager', img: '/team/Irene%20Ezechi.jpg', linkedin: 'https://www.linkedin.com/in/ireneezechi/' },
  { name: 'Mariam Jimoh', role: 'ESG and Impact', img: '/team/Mariam%20Jimoh.jpeg', linkedin: 'https://www.linkedin.com/in/jimohmariamajoke/' },
  { name: 'Bright Temitope Ayegbusi', role: 'Visuals and Designs', img: '/team/Ayegbusi%20Bright%20Temitope.jpg' },
  { name: 'Feranmi Oluwole', role: 'Operations Manager', img: '/team/Feranmi%20Oluwole.JPG', linkedin: 'https://www.linkedin.com/in/feranmi-oluwole-675712339/' },
  { name: 'Theresa Asiedu Gyamfi', role: 'GRC and Policy Engineer', img: '/team/Asiedu%20Gyamfi.jpg', linkedin: 'https://www.linkedin.com/in/theresa-gyamfi/' },
  { name: 'Esther Adeoye', role: 'Social Media Manager', img: '/team/Adeoye%20Esther.jpg', linkedin: 'https://www.linkedin.com/in/adeoye-esther-4151a62b8/' },
  { name: 'Ariyo Aresa', role: 'Front-end Engineer', img: '/team/AriyoAresa.avif', linkedin: 'https://www.linkedin.com/in/ariyoaresa/' },
  { name: 'Ayomide Idowu', role: 'Visuals and Designs', img: '/team/Ayomide%20Idowu.jpg', linkedin: 'https://www.linkedin.com/in/ayomide-idowu-4a852623a/' },
  { name: 'Happiness Obochi', role: 'Team Member', img: '/team/Happiness%20Obochi.jpg', linkedin: 'https://www.linkedin.com/in/happinessobochi/' },
];

const ADVISORS = [
  { name: 'Advisory Board', role: 'Strategic Advisor', dept: 'Leadership & Education', bio: 'A council of educators, business leaders, and alumni who guide programme strategy and quality.' },
  { name: 'School Liaison Officer', role: 'School Relations', dept: 'Partnerships', bio: 'The direct point of contact for principals and teachers onboarding new chapters.' },
];

export default function LeadershipPage() {
  const [officers, setOfficers] = useState(HARDCODED_OFFICERS);

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
              img: member.avatarUrl,
              linkedin: member.linkedinUrl,
            }));
            
            // Merge dynamically fetched officers, retaining hardcoded images if missing
            const merged = dynamicOfficers.map((doff: any) => {
              const match = HARDCODED_OFFICERS.find(h => h.name === doff.name);
              return match ? { ...doff, img: doff.img || match.img } : doff;
            });
            
            setOfficers(merged);
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
          <div className="grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-5">
            {officers.map((o, i) => (
              <Reveal delay={i * 60} key={o.name}>
                <div className="bg-surface border border-line rounded-[22px] py-[26px] px-[22px] text-center transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-36px_rgba(0,0,0,.45)] hover:border-[color-mix(in_srgb,var(--accent)_35%,var(--line))]">
                  <div className="bg-[var(--surface-2)] border-2 border-accent-soft w-[80px] h-[80px] rounded-full overflow-hidden mx-auto mb-[14px] grid place-items-center">
                    {o.img ? (
                      <Image
                        src={o.img}
                        alt={o.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="font-mono text-[20px] font-bold text-accent-ink">{o.name.charAt(0)}</span>
                    )}
                  </div>
                  <h3 className="font-display font-semibold text-[16px] m-0">{o.name}</h3>
                  <div className="font-mono text-accent-ink text-[11px] uppercase tracking-[0.06em] font-bold my-[6px]">{o.role}</div>
                  <a
                    className="inline-flex items-center justify-center text-muted hover:text-accent-ink transition-colors duration-200 mt-1"
                    href={o.linkedin || TEAM_LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${o.name} on LinkedIn`}
                  >
                    <IconLinkedin size={18} />
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
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
