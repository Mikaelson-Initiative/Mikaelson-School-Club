import Header from '../components/Header';
import Footer from '../components/Footer';
import PageHero from '../components/PageHero';
import Reveal from '../components/Reveal';
import { IconArrow, IconMail } from '../components/Icons';
import Link from 'next/link';

import { WRAP, LABEL } from '../lib/tw';
const LINK_ARROW = 'font-mono text-accent-ink text-[12.5px] tracking-[0.06em] uppercase no-underline inline-flex items-center gap-[7px] font-bold [&_.arr]:transition-transform [&_.arr]:duration-200 hover:[&_.arr]:translate-x-[4px]';

export const revalidate = 0; // force dynamic so updates show instantly

export default async function BlogPage() {
  let posts: any[] = [];
  try {
    const res = await fetch('https://dev.to/api/articles?username=mikaelsonschoolclub');
    if (res.ok) {
      const data = await res.json();
      posts = data.map((post: any) => ({
        category: post.tags[0] || 'Update',
        title: post.title,
        author: post.user?.name || 'Mikaelson School Club',
        excerpt: post.description,
        slug: post.slug,
        coverImage: post.cover_image,
        publishedAt: post.readable_publish_date
      }));
    }
  } catch (err) {
    console.error("Failed to fetch posts from dev.to", err);
  }

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
                <Reveal delay={i * 90} key={post.slug}>
                  <Link href={`/blog/${post.slug}`} className="block h-full no-underline text-current">
                    <div className="bg-surface border border-line rounded-[22px] h-full overflow-hidden transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-[6px] hover:shadow-[0_30px_60px_-34px_rgba(0,0,0,.4)] hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--line))] flex flex-col">
                      {post.coverImage ? (
                        <div className="h-[180px] bg-[var(--surface-2)] overflow-hidden shrink-0">
                          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                        </div>
                      ) : (
                        <div className="bg-[var(--surface-2)] h-[180px] flex flex-col items-center justify-center gap-3 shrink-0">
                          <span className="font-mono text-[11px] tracking-[.08em] uppercase text-muted">No Image</span>
                        </div>
                      )}
                      
                      <div className="p-[26px] flex flex-col flex-1">
                        <div className="flex items-center justify-between mb-[14px]">
                          <span className="font-mono text-muted border border-line inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold">
                            <span className="w-[6px] h-[6px] rounded-full bg-current" />
                            {post.category}
                          </span>
                          <span className="text-[11px] font-mono text-muted uppercase tracking-[0.05em]">{post.publishedAt}</span>
                        </div>
                        
                        <h4 className="font-display font-semibold text-[18px] m-0 mb-[10px] tracking-[-0.01em] leading-[1.3] text-[#201d16]">{post.title}</h4>
                        <p className="text-[#6e675c] text-[14.5px] m-0 mb-[16px] flex-1">{post.excerpt}</p>
                        
                        <div className="mt-auto pt-4 border-t border-[#e7e0d4] flex items-center justify-between">
                          <div className="font-mono text-[11px] text-[#6e675c] uppercase tracking-[.06em]">{post.author}</div>
                          <span className={`${LINK_ARROW}`}>
                            Read more <IconArrow size={14} className="arr" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
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
