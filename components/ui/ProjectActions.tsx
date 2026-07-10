import { ClipboardList, FileText, Github, Globe } from "lucide-react";
import { profile, type Project } from "@/data/content";
import { cn } from "@/lib/utils";

function isValidLink(url: string | null | undefined): url is string {
  return Boolean(url && url !== "#");
}

function getGithubUrl(project: Project): string {
  return isValidLink(project.github) ? project.github! : profile.github;
}

interface ProjectActionsProps {
  project: Project;
  className?: string;
}

export function ProjectActions({ project, className }: ProjectActionsProps) {
  const hasDemo = isValidLink(project.demo);
  const hasPaper = isValidLink(project.paper);
  const hasReport = isValidLink(project.report) && !hasPaper;

  return (
    <div className={cn("proj-actions", className)}>
      <a
        href={getGithubUrl(project)}
        target="_blank"
        rel="noopener noreferrer"
        className="proj-action-btn"
        onClick={(e) => e.stopPropagation()}
      >
        <Github className="h-4 w-4" aria-hidden="true" />
        GitHub
      </a>
      {hasDemo && (
        <a
          href={project.demo!}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-action-btn proj-action-btn--primary"
          onClick={(e) => e.stopPropagation()}
        >
          <Globe className="h-4 w-4" aria-hidden="true" />
          Live Demo
        </a>
      )}
      {hasReport && (
        <a
          href={project.report!}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <ClipboardList className="h-4 w-4" aria-hidden="true" />
          {project.reportLabel ?? "Project Report"}
        </a>
      )}
      {hasPaper && (
        <a
          href={project.paper!}
          target="_blank"
          rel="noopener noreferrer"
          className="proj-action-btn"
          onClick={(e) => e.stopPropagation()}
        >
          <FileText className="h-4 w-4" aria-hidden="true" />
          Research Paper
        </a>
      )}
    </div>
  );
}
