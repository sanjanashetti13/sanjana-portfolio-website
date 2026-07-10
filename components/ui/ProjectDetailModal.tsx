import type { CSSProperties, ReactNode } from "react";
import type { Project } from "@/data/content";
import { getProjectLabel, getProjectTheme } from "@/lib/projectTheme";
import { ProjectActions } from "@/components/ui/ProjectActions";
import { ProjectHighlightPills } from "@/components/ui/ProjectHighlightPills";
import { Chip } from "@/components/ui/Chip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectDetailModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function formatTeamSize(size: number): string {
  return size === 1 ? "Solo" : `Team of ${size}`;
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="proj-detail-section">
      <h3 className="proj-detail-section__title">{title}</h3>
      {children}
    </section>
  );
}

export function ProjectDetailModal({ project, open, onOpenChange }: ProjectDetailModalProps) {
  if (!project) return null;

  const theme = getProjectTheme(project);
  const label = getProjectLabel(project);
  const Icon = theme.Icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="proj-detail-modal max-h-[min(90vh,860px)] overflow-y-auto p-0 sm:max-w-2xl">
        {project.imageUrl && (
          <div className="proj-detail-modal__cover">
            <img src={project.imageUrl} alt="" loading="lazy" />
          </div>
        )}
        <div
          className="proj-detail-modal__hero"
          style={
            {
              "--proj-accent": theme.color,
              "--proj-glow": theme.glow,
            } as CSSProperties
          }
        >
          <span className="proj-detail-modal__icon" aria-hidden="true">
            <Icon strokeWidth={1.75} />
          </span>
          <DialogHeader className="proj-detail-modal__header">
            <p className="proj-detail-modal__eyebrow">{label}</p>
            <DialogTitle className="proj-detail-modal__title">{project.title}</DialogTitle>
            {project.badge && (
              <span className="proj-detail-modal__badge">{project.badge}</span>
            )}
            <ProjectActions project={project} className="proj-detail-modal__links" />
            <DialogDescription className="proj-detail-modal__desc">
              {project.description}
            </DialogDescription>
            <ProjectHighlightPills
              pills={project.highlightPills}
              className="proj-detail-modal__pills"
            />
            {project.highlightNote && (
              <p className="proj-detail-modal__note">{project.highlightNote}</p>
            )}
          </DialogHeader>
        </div>

        <div className="proj-detail-modal__body">
          <p className="proj-detail-modal__meta">
            {project.year} · {formatTeamSize(project.teamSize)} · {project.context}
          </p>

          {project.highlights.length > 0 && (
            <DetailSection title="Key Impact">
              <ul className="proj-detail-list">
                {project.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailSection>
          )}

          {project.tags && project.tags.length > 0 && (
            <DetailSection title="Tags">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Chip key={tag}>{tag}</Chip>
                ))}
              </div>
            </DetailSection>
          )}

          <DetailSection title="Tech Stack">
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <Chip key={tech}>{tech}</Chip>
              ))}
            </div>
          </DetailSection>

          {project.metrics && project.metrics.length > 0 && (
            <DetailSection title="Metrics">
              <ul className="proj-detail-list">
                {project.metrics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </DetailSection>
          )}

          {project.problem && (
            <DetailSection title="Problem">
              <p className="proj-detail-copy">{project.problem}</p>
            </DetailSection>
          )}

          {project.solution && (
            <DetailSection title="Solution">
              <p className="proj-detail-copy">{project.solution}</p>
            </DetailSection>
          )}

          {project.impact && (
            <DetailSection title="Impact">
              <p className="proj-detail-copy">{project.impact}</p>
            </DetailSection>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
