import type { CSSProperties } from "react";
import { ArrowUpRight, ClipboardList, FileText, Github, Globe } from "lucide-react";
import type { Project } from "@/data/content";
import { ProjectHighlightPills } from "@/components/ui/ProjectHighlightPills";
import { getProjectTheme } from "@/lib/projectTheme";
import { cn } from "@/lib/utils";

function isValidLink(url: string | null | undefined): url is string {
  return Boolean(url && url !== "#");
}

interface ProjectScrollCardProps {
  project: Project;
  active: boolean;
  onOpen: () => void;
}

export function ProjectScrollCard({ project, active, onOpen }: ProjectScrollCardProps) {
  const theme = getProjectTheme(project);
  const Icon = theme.Icon;
  const hasGithub = isValidLink(project.github);
  const hasDemo = isValidLink(project.demo);
  const hasPaper = isValidLink(project.paper);
  const hasReport = isValidLink(project.report) && !hasPaper;
  const stackPreview = project.stack.slice(0, 6);

  return (
    <article
      data-scroll-card
      className={cn("project-scroll-card", active && "project-scroll-card--active")}
      style={
        {
          "--proj-accent": theme.color,
          "--proj-glow": theme.glow,
        } as CSSProperties
      }
    >
      <div className="project-scroll-card__body">
        <span className="project-scroll-card__icon" aria-hidden="true">
          <Icon strokeWidth={1.75} />
        </span>

        <h3 className="project-scroll-card__title">{project.title}</h3>
        <p className="project-scroll-card__desc">{project.description}</p>

        <ProjectHighlightPills pills={project.highlightPills} />

        {project.highlightNote && (
          <p className="project-scroll-card__note">{project.highlightNote}</p>
        )}

        <div className="project-scroll-card__stack">
          {stackPreview.map((tech) => (
            <span key={tech} className="project-scroll-card__stack-item">
              {tech}
            </span>
          ))}
        </div>

        <div className="project-scroll-card__footer">
          <div className="project-scroll-card__actions">
            {hasGithub && (
              <a
                href={project.github!}
                target="_blank"
                rel="noopener noreferrer"
                className="project-scroll-card__action"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
            )}
            {hasDemo && (
              <a
                href={project.demo!}
                target="_blank"
                rel="noopener noreferrer"
                className="project-scroll-card__action project-scroll-card__action--primary"
                onClick={(e) => e.stopPropagation()}
              >
                <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                Live Demo
              </a>
            )}
            {hasReport && (
              <a
                href={project.report!}
                target="_blank"
                rel="noopener noreferrer"
                className="project-scroll-card__action"
                onClick={(e) => e.stopPropagation()}
              >
                <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                Report
              </a>
            )}
            {hasPaper && (
              <a
                href={project.paper!}
                target="_blank"
                rel="noopener noreferrer"
                className="project-scroll-card__action"
                onClick={(e) => e.stopPropagation()}
              >
                <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                Research Paper
              </a>
            )}
          </div>

          <button
            type="button"
            className="project-scroll-card__open"
            onClick={onOpen}
            aria-label={`View details for ${project.title}`}
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </article>
  );
}
