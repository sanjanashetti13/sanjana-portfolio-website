import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  project: Project;
  className?: string;
}

export function ProjectCover({ project, className }: ProjectCoverProps) {
  const imageSrc = project.imageUrl ?? project.screenshots[0] ?? null;

  return (
    <div className={cn("proj-cover", className)}>
      {imageSrc ? (
        <img src={imageSrc} alt={`${project.title} preview`} loading="lazy" />
      ) : (
        <div className="proj-cover-placeholder" aria-hidden="true">
          <span className="proj-cover-placeholder-title">{project.title}</span>
        </div>
      )}
    </div>
  );
}
