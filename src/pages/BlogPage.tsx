import { Link } from "react-router-dom";
import { SEO } from "@/components/layout/SEO";
import { blogPosts } from "@/data/content";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";
import { formatDate } from "@/lib/utils";

export function BlogPage() {
  return (
    <section className="section-padding pt-[110px]">
      <SEO
        title="Blog — Sanjana Shetti"
        description="Thoughts on full-stack development, AI systems, and engineering."
      />

      <div className="container-main max-w-3xl">
        <RevealOnScroll>
          <h1 className="font-display text-section-title text-[var(--ink)]">Blog</h1>
          <p className="mt-4 text-body text-[var(--ink-dim)]">
            Notes on building production systems.
          </p>
        </RevealOnScroll>

        {blogPosts.length === 0 ? (
          <RevealOnScroll delay={0.1}>
            <p className="mt-12 text-body text-[var(--ink-faint)]">
              Nothing published yet — check back soon.
            </p>
          </RevealOnScroll>
        ) : (
          <div className="mt-12 space-y-8">
            {blogPosts.map((post) => (
              <RevealOnScroll key={post.slug}>
                <article className="border-b border-[var(--line)] pb-8">
                  <time className="text-[13px] text-[var(--ink-faint)]">
                    {formatDate(post.date)}
                  </time>
                  <h2 className="mt-2 font-display text-[22px] font-bold text-[var(--ink)]">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="transition-colors hover:text-[var(--violet)]"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mt-2 text-body text-[var(--ink-dim)]">{post.excerpt}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
