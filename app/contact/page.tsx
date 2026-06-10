import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Mikaelson School Club, general enquiries, school partnerships, sponsorship, and media contact.',
  openGraph: { title: 'Contact | Mikaelson School Club', description: 'Contact Mikaelson School Club for enquiries, partnerships, and media.' },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconMail, IconGlobe, IconCompass, IconInstagram, IconX, IconLinkedin, IconYoutube, IconCalendar, IconArrow } from '../components/Icons';
import Link from 'next/link';

import { WRAP, LABEL } from '../lib/tw';
const FIELD_INPUT = 'bg-white border border-line rounded-[14px] font-body text-site-text py-[11px] px-[14px] text-[15px] w-full box-border outline-none transition-[border-color] duration-200 focus:border-accent-2';
const FIELD_LABEL = 'font-mono text-[11px] uppercase tracking-[0.1em] text-accent-ink font-bold block mb-[7px]';
const BOOKING_URL = 'https://calendar.google.com/appointments/schedules/AcZssZ1JVLcmrQSO15PwdFlP3GVv8YDwb74-Ey_unMB6kNXziUKoGUkWhzc9UsTlPlqp-3JUZvWbfkuo';

const CONTACTS = [
  { Icon: IconMail, title: 'General Enquiries', email: 'hello@mikaelsoninitiative.org', body: 'For questions about the programme, chapters, and membership.' },
  { Icon: IconGlobe, title: 'Partnerships & Sponsors', email: 'partnership@mikaelsoninitiative.org', body: 'For organisations interested in supporting the initiative.' },
  { Icon: IconCompass, title: 'Media', email: 'hello@mikaelsoninitiative.org', body: 'For press, interviews, and coverage requests.' },
];

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com/mikaelsonschoolclub', Icon: IconInstagram },
  { label: 'X', href: '#', Icon: IconX },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/mikaelson-initiative', Icon: IconLinkedin },
  { label: 'YouTube', href: '#', Icon: IconYoutube },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <PageHero label="Get in Touch" title="We'd love to hear from you." lede="Whether you're a school, a student, a potential partner, or media, reach out." />

      <section className="relative py-[92px] max-md:py-[72px] max-sm:py-[56px]">
        <div className={WRAP}>
          <div className="grid items-start max-md:grid-cols-1 gap-12 md:[grid-template-columns:1fr_0.85fr]">

            {/* Left: Contact blocks + socials */}
            <div>
              <Reveal>
                <span className={LABEL}>Contact</span>
                <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] m-0 mt-[14px] mb-8" style={{ fontSize: 'clamp(24px,2.8vw,36px)' }}>Get in touch directly.</h2>
              </Reveal>
              <div className="flex flex-col gap-7">
                {CONTACTS.map((c, i) => (
                  <Reveal delay={i * 80} key={c.email}>
                    <div className="flex gap-4 items-start">
                      <div className="bg-accent-soft text-accent-ink w-[38px] h-[38px] grid place-items-center rounded-[10px] shrink-0">
                        <c.Icon size={20} />
                      </div>
                      <div>
                        <h5 className="font-display font-semibold text-[16px] m-0 mb-1">{c.title}</h5>
                        <a href={`mailto:${c.email}`} className="text-accent-ink font-semibold text-[15px] block mb-1 no-underline hover:underline">{c.email}</a>
                        <p className="text-muted text-[14.5px] m-0">{c.body}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Schedule a call */}
              <Reveal delay={220}>
                <div className="mt-9 bg-[var(--surface-2)] border border-line rounded-[18px] p-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-accent-ink"><IconCalendar size={18} /></span>
                    <h5 className="font-display font-semibold text-[16px] m-0">Prefer to talk?</h5>
                  </div>
                  <p className="text-muted text-[14.5px] m-0 mb-4">Book a free call with our team at a time that suits you.</p>
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[3px]"
                  >
                    Schedule a call <IconArrow size={16} className="arr" />
                  </a>
                </div>
              </Reveal>

              {/* Social row */}
              <Reveal delay={260}>
                <div className="mt-10">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted font-bold m-0 mb-[14px]">Follow us</p>
                  <div className="flex gap-[10px]">
                    {SOCIALS.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        aria-label={s.label}
                        target={s.href.startsWith('http') ? '_blank' : undefined}
                        rel={s.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="bg-accent-soft text-accent-ink w-10 h-10 rounded-full grid place-items-center no-underline transition-[background,transform] duration-200 hover:bg-accent-2 hover:-translate-y-[2px]"
                      >
                        <s.Icon size={18} />
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Contact form */}
            <Reveal delay={100}>
              <div className="bg-[var(--surface-2)] border border-line rounded-[22px] p-9">
                <h3 className="font-display font-semibold text-[22px] m-0 mb-2 tracking-[-0.01em]">Send a message</h3>
                <p className="text-muted text-[14.5px] m-0 mb-6 leading-[1.55]">Use the email addresses above or fill in the form below:</p>

                <form action="mailto:hello@mikaelsoninitiative.org" method="GET" className="flex flex-col gap-4">
                  <div>
                    <label className={FIELD_LABEL}>Name</label>
                    <input type="text" name="name" placeholder="Your name" className={FIELD_INPUT} />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Email</label>
                    <input type="email" name="email" placeholder="you@email.com" className={FIELD_INPUT} />
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Type</label>
                    <select name="subject" className={FIELD_INPUT + ' appearance-none cursor-pointer'}>
                      <option value="School enquiry">School enquiry</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Media">Media</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                  <div>
                    <label className={FIELD_LABEL}>Message</label>
                    <textarea name="body" rows={4} placeholder="Tell us what's on your mind..." className={FIELD_INPUT + ' resize-y leading-[1.6]'} />
                  </div>
                  <button
                    type="submit"
                    className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] cursor-pointer inline-flex items-center justify-center gap-[9px] whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)] mt-1 w-full"
                  >
                    Send message
                  </button>
                </form>

                <p className="font-mono text-[13px] text-muted tracking-[0.02em] mt-4 m-0">
                  Or email{' '}
                  <Link href="mailto:hello@mikaelsoninitiative.org" className="text-accent-ink font-bold no-underline">hello@mikaelsoninitiative.org</Link>
                  {' '}directly.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
