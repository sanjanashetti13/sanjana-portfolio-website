import { motion } from "framer-motion";
import type { Project } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, motionEase } from "@/lib/utils";
import { ProjectActions } from "@/components/ui/ProjectActions";
import { ProjectCover } from "@/components/ui/ProjectCover";

interface ProjectShowcaseCardProps {
  project: Project;
  index: number;
  size?: "featured" | "standard";
}

function formatTeamSize(size: number): string {
  return size === 1 ? "Solo" : `Team of ${size}`;
}

export function ProjectShowcaseCard({
  project,
  index,
  size = "standard",
}: ProjectShowcaseCardProps) {
  const reduced = usePrefersReducedMotion();
  const isFeatured = size === "featured";
  const typeLabel = project.typeLabel ?? project.typeBadge;

  return (
    <motion.article
      layout
      layoutId={project.slug}
      className={cn("proj-card h-full", isFeatured && "proj-card--featured")}
      initial={reduced ? false : { opacity: 0, y: 32 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{
        duration: 0.55,
        ease: motionEase,
        delay: reduced ? 0 : index * 0.07,
      }}
      whileHover={
        reduced
          ? undefined
          : {
              y: -8,
              scale: 1.01,
              transition: { duration: 0.28, ease: motionEase },
            }
      }
    >
      <ProjectCover project={project} />

      <div className={cn("proj-card-body", isFeatured && "proj-card-body--featured")}>
        <div className="proj-card-head">
          <div className="proj-card-badges">
            {isFeatured && project.badge === "FEATURED" && (
              <span className="proj-card-badge proj-card-badge--featured">Featured</span>
            )}
            <span className="proj-card-badge">{project.typeBadge}</span>
            {typeLabel !== project.typeBadge && (
              <span className="proj-card-badge proj-card-badge--muted">{typeLabel}</span>
            )}
          </div>

          <h3 className={cn("proj-card-title", isFeatured && "proj-card-title--featured")}>
            {project.title}
          </h3>

          <p className="proj-card-desc">{project.description}</p>
        </div>

        {project.highlights.length > 0 && (
          <div className="proj-card-impact">
            <p className="proj-card-impact-label">Key Impact</p>
            <ul className="proj-card-impact-list">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="proj-card-lower">
          <div className="proj-card-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="proj-card-chip">
                {tech}
              </span>
            ))}
          </div>

          <ProjectActions project={project} />

          <footer className="proj-card-footer">
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{formatTeamSize(project.teamSize)}</span>
            <span aria-hidden="true">·</span>
            <span>{project.context}</span>
          </footer>
        </div>
      </div>
    </motion.article>
  );
}
