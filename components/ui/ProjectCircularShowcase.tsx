import { useCallback, useMemo, useRef, type CSSProperties } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, ClipboardList, FileText, Github, Globe } from "lucide-react";
import type { Project } from "@/data/content";
import { CircularGallery, type CircularGalleryRef, type GalleryItem } from "@/components/ui/circular-gallery";
import { ProjectHighlightPills } from "@/components/ui/ProjectHighlightPills";
import { projectToGalleryItem, projectsToGalleryItems } from "@/lib/projectGallery";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { getProjectTheme } from "@/lib/projectTheme";

function isValidLink(url: string | null | undefined): url is string {
  return Boolean(url && url !== "#");
}

interface ProjectCircularShowcaseProps {
  projects: Project[];
  onSelect: (project: Project) => void;
}

export function ProjectCircularShowcase({ projects, onSelect }: ProjectCircularShowcaseProps) {
  const reduced = usePrefersReducedMotion();
  const galleryRef = useRef<CircularGalleryRef>(null);

  const galleryItems = useMemo(() => projectsToGalleryItems(projects), [projects]);
  const projectBySlug = useMemo(
    () => new Map(projects.map((project) => [project.slug, project])),
    [projects]
  );

  const handleItemClick = useCallback(
    (item: GalleryItem) => {
      const slug = item.id;
      if (!slug) return;
      const project = projectBySlug.get(slug);
      if (project) onSelect(project);
    },
    [onSelect, projectBySlug]
  );

  if (reduced) {
    return (
      <div className="projects-circular-fallback">
        {projects.map((project) => {
          const theme = getProjectTheme(project);
          const hasGithub = isValidLink(project.github);
          const hasDemo = isValidLink(project.demo);
          const hasPaper = isValidLink(project.paper);
          const hasReport = isValidLink(project.report) && !hasPaper;

          return (
            <article
              key={project.slug}
              className="projects-circular-fallback-card"
              style={
                {
                  "--gallery-accent": theme.color,
                  "--gallery-glow": theme.glow,
                  "--proj-accent": theme.color,
                  "--proj-glow": theme.glow,
                } as CSSProperties
              }
            >
              <div className="projects-circular-fallback-copy">
                <h3>{project.title}</h3>
                <p>{project.typeLabel ?? project.typeBadge}</p>
                <p className="projects-circular-fallback-desc">{project.cardDescription}</p>
              </div>

              <ProjectHighlightPills pills={project.highlightPills.slice(0, 5)} />

              <div className="circular-gallery-card__footer">
                <div className="circular-gallery-card__actions">
                  {hasGithub && (
                    <a
                      href={project.github!}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="circular-gallery-card__action"
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
                      className="circular-gallery-card__action circular-gallery-card__action--primary"
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
                      className="circular-gallery-card__action"
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
                      className="circular-gallery-card__action"
                    >
                      <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                      Paper
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  className="circular-gallery-card__open"
                  onClick={() => onSelect(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </article>
          );
        })}
      </div>
    );
  }

  return (
    <div className="projects-circular-viewport">
      <button
        type="button"
        className="projects-circular-nav projects-circular-nav--prev"
        onClick={() => galleryRef.current?.rotateLeft()}
        aria-label="Previous project"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

      <div className="projects-circular-stage">
        <CircularGallery
          ref={galleryRef}
          items={galleryItems}
          onItemClick={handleItemClick}
        />
      </div>

      <button
        type="button"
        className="projects-circular-nav projects-circular-nav--next"
        onClick={() => galleryRef.current?.rotateRight()}
        aria-label="Next project"
      >
        <ChevronRight aria-hidden="true" />
      </button>
    </div>
  );
}
