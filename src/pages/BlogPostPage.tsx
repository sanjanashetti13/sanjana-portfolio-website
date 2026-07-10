import { Link, useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { SEO } from "@/components/layout/SEO";
import { blogPosts } from "@/data/content";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatDate } from "@/lib/utils";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) return <Navigate to="/404" replace />;

  return (
    <article className="section-padding pt-[110px]">
      <SEO title={`${post.title} — Sanjana Shetti`} description={post.excerpt} />

      <div className="container-main max-w-3xl">
        <RevealOnScroll>
          <Link
            to="/blog"
            className="text-[13px] text-[var(--violet)] transition-colors hover:text-[var(--pink)]"
          >
            ← Back to blog
          </Link>
          <time className="mt-8 block text-[13px] text-[var(--ink-faint)]">
            {formatDate(post.date)}
          </time>
          <h1 className="font-display text-section-title mt-3 text-[var(--ink)]">{post.title}</h1>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <div className="prose prose-invert mt-10 max-w-none text-body text-[var(--ink-dim)]">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}
