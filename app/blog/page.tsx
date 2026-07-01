'use client';

import { useState, useEffect } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconMail } from '../components/Icons';
import Link from 'next/link';

import { WRAP, LABEL } from '../lib/tw';
const LINK_ARROW = 'font-mono text-accent-ink text-[12.5px] tracking-[0.06em] uppercase no-underline inline-flex items-center gap-[7px] font-bold [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[4px]';

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch('/api/blog');
        if (res.ok) {
          const data = await res.json();
          // Assuming data is an array or object containing posts. In route.ts it returns `result` which is paginated.
          // Wait, let's check `src/app/api/blog/route.ts` - it calls `getPublicPosts`.
          // `getPublicPosts` typically returns { posts, total, page, limit }.
          if (data && data.posts && data.posts.length > 0) {
            const dynamicPosts = data.posts.map((post: any) => ({
              category: post.category?.name || 'Update',
              title: post.title,
              author: post.author?.name || 'Mikaelson School Club',
              excerpt: post.excerpt || post.content?.substring(0, 100) + '...',
              slug: post.slug
            }));
            
            // Merge dynamically fetched posts, combining with hardcoded ones or just replacing.
            // Since blog posts change often, it's usually better to just replace if we have data.
            setPosts(dynamicPosts);
          } else {
            setPosts([]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch posts", err);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <PageHero label="Stories" title="Voices from the club." lede="Student spotlights, session recaps, facilitator reflections, and programme updates." />

      <section className="relative pt-14 pb-[92px] max-sm:pb-[56px]">
        <div className={WRAP}>
          <Reveal>
            <span className={LABEL}>Latest</span>
            <h2 className="font-display font-[800] tracking-[-0.02em] leading-[1.04] mt-[14px] mb-9" style={{ fontSize: 'clamp(26px,3.2vw,38px)' }}>
              From our chapters.
            </h2>
          </Reveal>
          {posts.length === 0 ? (
            <div className="text-muted text-[15px] col-span-full">
              No stories published yet. Check back soon for updates from our chapters.
            </div>
          ) : (
            <div className="grid grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1 gap-[22px]">
              {posts.map((post: any, i: number) => (
                <Reveal delay={i * 90} key={post.title}>
                  <div className="bg-surface border border-line rounded-[22px] overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))]">
                    {/* Card image placeholder */}
                    <div className="bg-[var(--surface-2)] h-[180px] flex flex-col items-center justify-center gap-3 rounded-t-[22px]">
                      <span className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">Coming soon</span>
                    </div>
                    <div className="p-[26px]">
                      {/* Badge */}
                      <span className="font-mono text-muted border border-line inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold mb-[14px]">
                        <span className="w-[6px] h-[6px] rounded-full bg-current" />
                        {post.category}
                      </span>
                      <h4 className="font-display font-semibold text-[18px] m-0 mb-[10px] tracking-[-0.01em] leading-[1.3]">{post.title}</h4>
                      <p className="text-muted text-[14.5px] m-0 mb-[6px]">{post.excerpt}</p>
                      <div className="font-mono text-[11px] text-muted uppercase tracking-[.06em] mb-[18px]">{post.author}</div>
                      <span className={`${LINK_ARROW} opacity-45`}>
                        Read more <IconArrow size={14} className="arr" />
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-[92px] max-sm:py-[56px] bg-[var(--surface-2)]">
        <div className={WRAP}>
          <Reveal>
            <div className="text-center max-w-[560px] mx-auto">
              <span className={`${LABEL} justify-center flex mb-4`}>Stay updated</span>
              <p className="text-[18px] text-muted m-0 mb-7">Stories are published as chapters run. Subscribe to receive updates.</p>
              <Link
                href="mailto:msc@mikaelsoninitiative.org?subject=Subscribe"
                className="font-body font-bold text-[16px] border-none rounded-full px-8 py-4 cursor-pointer inline-flex items-center gap-[9px] no-underline whitespace-nowrap bg-accent-2 text-accent-ink shadow-[0_12px_0_-2px_var(--accent-ink)] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_var(--accent-ink)]"
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
