import { notFound } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { IconArrow } from '../../components/Icons';
import { WRAP } from '../../lib/tw';

export const dynamic = 'force-dynamic';

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let post: any = null;
  try {
    const listRes = await fetch('https://dev.to/api/articles/latest?username=mikaelsonschoolclub', { 
      cache: 'no-store',
      headers: { 'Origin': `https://nocache${Date.now()}.mikaelsoninitiative.org` }
    });
    if (listRes.ok) {
      const list = await listRes.json();
      const match = list.find((p: any) => p.slug === slug);
      
      if (match && match.id) {
        const res = await fetch(`https://dev.to/api/articles/${match.id}`, { 
          cache: 'no-store',
          headers: { 'Origin': `https://nocache${Date.now()}.mikaelsoninitiative.org` }
        });
        if (res.ok) {
          post = await res.json();
        }
      }
    }
  } catch (err) {
    console.error("Failed to fetch post", err);
  }

  if (!post) {
    return notFound();
  }

  const category = post.tags?.[0] || 'Update';

  return (
    <div className="bg-[#f9f7f3] min-h-screen">
      <Header />
      
      <article className="pt-24 pb-32">
        <div className="max-w-[800px] mx-auto px-6 w-full">
          {/* Back button */}
          <Link href="/blog" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-[#6e675c] hover:text-[#003e45] transition-colors mb-12 border border-[#e7e0d4] rounded-full px-4 py-2 hover:bg-white hover:border-[#003e45]">
            <IconArrow size={14} className="rotate-180" /> Back to stories
          </Link>

          {/* Article Header */}
          <header className="mb-14">
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-[#003e45] border border-[#003e45]/20 bg-[#003e45]/5 inline-flex items-center gap-[7px] text-[11px] tracking-[0.07em] uppercase py-[5px] px-[11px] rounded-full font-bold">
                <span className="w-[6px] h-[6px] rounded-full bg-current" />
                {category}
              </span>
              <span className="text-[12px] font-mono text-[#6e675c] uppercase tracking-[0.05em]">{post.readable_publish_date}</span>
            </div>
            
            <h1 className="font-display font-[800] text-[#201d16] tracking-[-0.02em] leading-[1.1]" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
              {post.title}
            </h1>
            
            <div className="mt-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#e7e0d4]">
                {post.user?.profile_image && (
                  <img src={post.user.profile_image} alt={post.user.name} className="w-full h-full object-cover" />
                )}
              </div>
              <div>
                <div className="font-bold text-[#201d16] text-[15px]">{post.user?.name || 'Mikaelson School Club'}</div>
                <div className="text-[12px] font-mono text-[#6e675c] uppercase tracking-widest">{post.user?.twitter_username ? `@${post.user.twitter_username}` : 'Author'}</div>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          {post.cover_image && (
            <div className="mb-14 rounded-3xl overflow-hidden bg-[#e7e0d4] border border-[#e7e0d4] aspect-[21/9]">
              <img src={post.cover_image} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Markdown Content */}
          <div className="prose prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#003e45] prose-a:font-semibold prose-img:rounded-2xl prose-img:border prose-img:border-[#e7e0d4]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.body_markdown}
            </ReactMarkdown>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
