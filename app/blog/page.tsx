import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog & Stories',
  description:
    'Student spotlights, session recaps, and programme updates from Club chapters across Africa.',
  openGraph: {
    title: 'Blog & Stories | Club',
    description: 'Voices from the club, student stories and chapter updates.',
  },
};

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconMail } from '../components/Icons';
import Link from 'next/link';

const POSTS = [
  {
    category: 'Student Story',
    title: 'How tracking my habits for 30 days changed my relationship with school',
    author: 'Amara O., JSS 2, Lagos',
    excerpt: 'A student shares how the habit tracking system helped her go from inconsistent to her most productive term yet.',
  },
  {
    category: 'Session Recap',
    title: 'What our chapter learned about digital communication this term',
    author: 'Kwame A., Chapter President, Accra',
    excerpt: 'Our digital literacy sessions this term covered AI tools, online communication, and responsible internet use. Here\'s what stuck.',
  },
  {
    category: 'Facilitator Reflection',
    title: 'Running a student leadership club is harder, and more rewarding, than I expected',
    author: 'Mr. Ndlovu, Champion, Soweto',
    excerpt: 'Six months in, our Chapter Champion reflects on what surprised him, what worked, and what he\'d do differently.',
  },
];

export default function BlogPage() {
  return (
    <>
      <Header />
      <PageHero
        label="Stories"
        title="Voices from the club."
        lede="Student spotlights, session recaps, facilitator reflections, and programme updates."
      />

      <section className="sec" style={{ paddingTop: 56 }}>
        <div className="wrap">
          <Reveal>
            <span className="label">Latest</span>
            <h2 className="display" style={{ fontSize: 'clamp(26px,3.2vw,38px)', margin: '14px 0 36px' }}>
              From our chapters.
            </h2>
          </Reveal>
          <div className="cards">
            {POSTS.map((post, i) => (
              <Reveal delay={i * 90} key={post.title}>
                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                  <div style={{
                    background: 'var(--surface-2)',
                    height: 180,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
                    flexDirection: 'column',
                    gap: 12,
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>
                      Coming soon
                    </span>
                  </div>
                  <div style={{ padding: '26px 28px 28px' }}>
                    <div className="badge" style={{ marginBottom: 14 }}>
                      <span className="d" />
                      {post.category}
                    </div>
                    <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 18, margin: '0 0 10px', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
                      {post.title}
                    </h4>
                    <p style={{ color: 'var(--muted)', fontSize: 14.5, margin: '0 0 6px' }}>{post.excerpt}</p>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 18 }}>
                      {post.author}
                    </div>
                    <span className="link-arrow" style={{ opacity: 0.45 }}>
                      Read more <IconArrow size={14} className="arr" />
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="sec" style={{ background: 'var(--surface-2)' }}>
        <div className="wrap">
          <Reveal>
            <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto' }}>
              <span className="label" style={{ justifyContent: 'center', display: 'flex', marginBottom: 16 }}>Stay updated</span>
              <p style={{ fontSize: 18, color: 'var(--muted)', margin: '0 0 28px' }}>
                Stories are published as chapters run. Subscribe to receive updates.
              </p>
              <Link
                href="mailto:hello@mikaelsoninitiative.org?subject=Subscribe"
                className="btn btn-turquoise"
              >
                <IconMail size={16} />
                Subscribe by email
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </>
  );
}
