import { Link, useParams, Navigate } from "react-router-dom";
import { SEO } from "@/components/layout/SEO";
import { projects } from "@/data/content";
import { Chip } from "@/components/ui/Chip";
import { ProjectActions } from "@/components/ui/ProjectActions";
import { RevealOnScroll } from "@/components/ui/RevealOnScroll";

export function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/404" replace />;

  return (
    <article className="section-padding pt-[110px]">
      <SEO title={`${project.title} — Sanjana Shetti`} description={project.description} />

      <div className="container-main max-w-3xl">
        <RevealOnScroll>
          <Link
            to="/#projects"
            className="text-[13px] text-[var(--violet)] transition-colors hover:text-[var(--pink)]"
          >
            ← Back to projects
          </Link>
          {project.imageUrl && (
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              width={800}
              height={450}
              loading="lazy"
              className="mt-8 w-full rounded-[var(--radius-card)] border border-[var(--line)] object-cover"
            />
          )}
          <p className="mt-8 font-display text-[10.5px] font-semibold uppercase tracking-[0.14em] text-[var(--violet)]">
            {project.tag}
          </p>
          <h1 className="font-display text-section-title mt-3 text-[var(--ink)]">
            {project.title}
          </h1>
          <ProjectActions project={project} className="mt-5" />
          {project.badge && (
            <span className="mt-4 inline-flex rounded-[var(--radius-pill)] border border-[var(--ok)] px-3 py-1 text-[11px] text-[var(--ok)]">
              {project.badge}
            </span>
          )}
          <p className="mt-6 text-lead text-[var(--ink-dim)]">{project.description}</p>
          {project.highlights.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--violet)]">
                Key Impact
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-[var(--ink-dim)]">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--violet)]">
                Tags
              </h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6">
            <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--violet)]">
              Tech Stack
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </div>
          {project.metrics && project.metrics.length > 0 && (
            <div className="mt-6">
              <h2 className="font-display text-[13px] font-semibold uppercase tracking-[0.12em] text-[var(--violet)]">
                Metrics
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-body text-[var(--ink-dim)]">
                {project.metrics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="mt-16 space-y-10">
            {project.problem && (
              <section>
                <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">Problem</h2>
                <p className="mt-3 text-body text-[var(--ink-dim)]">{project.problem}</p>
              </section>
            )}
            {project.solution && (
              <section>
                <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">Solution</h2>
                <p className="mt-3 text-body text-[var(--ink-dim)]">{project.solution}</p>
              </section>
            )}
            {project.impact && (
              <section>
                <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">Impact</h2>
                <p className="mt-3 text-body text-[var(--ink-dim)]">{project.impact}</p>
              </section>
            )}
            <section>
              <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">Challenges</h2>
              <p className="mt-3 text-body text-[var(--ink-dim)]">{project.challenges}</p>
            </section>
            <section>
              <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">Learnings</h2>
              <p className="mt-3 text-body text-[var(--ink-dim)]">{project.learnings}</p>
            </section>
            <section>
              <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">Timeline</h2>
              <p className="mt-3 text-body text-[var(--ink-dim)]">{project.timeline}</p>
            </section>
            {project.screenshots.length > 0 && (
              <section>
                <h2 className="font-display text-[20px] font-bold text-[var(--ink)]">
                  Screenshots
                </h2>
                <div className="mt-4 grid gap-4">
                  {project.screenshots.map((src) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${project.title} screenshot`}
                      width={800}
                      height={450}
                      loading="lazy"
                      className="rounded-[var(--radius-card)] border border-[var(--line)]"
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </article>
  );
}
