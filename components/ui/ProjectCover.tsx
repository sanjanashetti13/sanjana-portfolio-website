import type { Project } from "@/data/content";
import { cn } from "@/lib/utils";

interface ProjectCoverProps {
  project: Project;
  className?: string;
}

export function ProjectCover({ project, className }: ProjectCoverProps) {
  return (
    <div className={cn("proj-cover proj-cover--icon", className)} aria-hidden="true">
      <div className="proj-cover-placeholder">
        <span className="proj-cover-placeholder-title">{project.title}</span>
      </div>
    </div>
  );
}
