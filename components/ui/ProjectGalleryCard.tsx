import { motion } from "framer-motion";
import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/data/content";
import { getProjectLabel, getProjectTheme } from "@/lib/projectTheme";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase } from "@/lib/utils";

interface ProjectGalleryCardProps {
  project: Project;
  index: number;
  onSelect: (project: Project) => void;
}

export function ProjectGalleryCard({ project, index, onSelect }: ProjectGalleryCardProps) {
  const reduced = usePrefersReducedMotion();
  const theme = getProjectTheme(project);
  const label = getProjectLabel(project);
  const Icon = theme.Icon;

  return (
    <motion.button
      type="button"
      layout
      className="proj-gallery-card"
      onClick={() => onSelect(project)}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      exit={reduced ? undefined : { opacity: 0, scale: 0.98 }}
      transition={{
        duration: 0.45,
        ease: motionEase,
        delay: reduced ? 0 : index * 0.04,
      }}
      whileHover={reduced ? undefined : { y: -4, transition: { duration: 0.22 } }}
      aria-label={`View details for ${project.title}`}
    >
      <span
        className="proj-gallery-card__icon"
        style={
          {
            "--proj-accent": theme.color,
            "--proj-glow": theme.glow,
          } as CSSProperties
        }
      >
        <Icon className="proj-gallery-card__icon-svg" aria-hidden="true" strokeWidth={1.75} />
      </span>

      <h3 className="proj-gallery-card__title">{project.title}</h3>

      <div className="proj-gallery-card__footer">
        <span className="proj-gallery-card__tag">{label}</span>
        <ArrowRight className="proj-gallery-card__arrow" aria-hidden="true" strokeWidth={1.75} />
      </div>
    </motion.button>
  );
}
