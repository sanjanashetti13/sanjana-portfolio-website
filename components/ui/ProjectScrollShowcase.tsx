import { forwardRef, useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Project } from "@/data/content";
import { ProjectScrollCard } from "@/components/ui/ProjectScrollCard";
import { cn } from "@/lib/utils";

interface ProjectScrollShowcaseProps {
  projects: Project[];
  onSelect: (project: Project) => void;
  onActiveIndexChange?: (index: number) => void;
}

export interface ProjectScrollShowcaseRef {
  goPrev: () => void;
  goNext: () => void;
  scrollToIndex: (index: number) => void;
  activeIndex: number;
}

function getMiddleIndex(count: number): number {
  if (count <= 1) return 0;
  return Math.floor((count - 1) / 2);
}

export const ProjectScrollShowcase = forwardRef<ProjectScrollShowcaseRef, ProjectScrollShowcaseProps>(
  ({ projects, onSelect, onActiveIndexChange }, ref) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const initialIndex = useMemo(() => getMiddleIndex(projects.length), [projects.length]);
    const [activeIndex, setActiveIndex] = useState(initialIndex);

    const updateActiveIndex = useCallback(() => {
      const track = trackRef.current;
      if (!track) return;

      const cards = track.querySelectorAll<HTMLElement>("[data-scroll-card]");
      if (!cards.length) return;

      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDistance = Number.POSITIVE_INFINITY;

      cards.forEach((card, index) => {
        const cardCenter = card.offsetLeft + card.offsetWidth / 2;
        const distance = Math.abs(center - cardCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closest = index;
        }
      });

      setActiveIndex(closest);
      onActiveIndexChange?.(closest);
    }, [onActiveIndexChange]);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;

      updateActiveIndex();
      track.addEventListener("scroll", updateActiveIndex, { passive: true });
      window.addEventListener("resize", updateActiveIndex);

      return () => {
        track.removeEventListener("scroll", updateActiveIndex);
        window.removeEventListener("resize", updateActiveIndex);
      };
    }, [projects.length, updateActiveIndex]);

    const scrollToIndex = useCallback((index: number, behavior: ScrollBehavior = "smooth") => {
      const track = trackRef.current;
      if (!track) return;

      const cards = track.querySelectorAll<HTMLElement>("[data-scroll-card]");
      const card = cards[index];
      if (!card) return;

      const target = card.offsetLeft - track.clientWidth / 2 + card.offsetWidth / 2;
      track.scrollTo({ left: target, behavior });
    }, []);

    useLayoutEffect(() => {
      const middle = getMiddleIndex(projects.length);
      setActiveIndex(middle);
      onActiveIndexChange?.(middle);

      const frame = requestAnimationFrame(() => {
        scrollToIndex(middle, "instant");
      });

      return () => cancelAnimationFrame(frame);
    }, [projects, onActiveIndexChange, scrollToIndex]);

    const goPrev = useCallback(
      () => scrollToIndex(Math.max(0, activeIndex - 1)),
      [activeIndex, scrollToIndex]
    );

    const goNext = useCallback(
      () => scrollToIndex(Math.min(projects.length - 1, activeIndex + 1)),
      [activeIndex, projects.length, scrollToIndex]
    );

    useImperativeHandle(
      ref,
      () => ({
        goPrev,
        goNext,
        scrollToIndex,
        activeIndex,
      }),
      [activeIndex, goNext, goPrev, scrollToIndex]
    );

    if (!projects.length) return null;

    return (
      <div className="project-scroll-showcase">
        <div className="project-scroll-viewport">
          <button
            type="button"
            className="project-scroll-arrow project-scroll-arrow--side project-scroll-arrow--prev"
            onClick={goPrev}
            disabled={activeIndex === 0}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            className="project-scroll-track"
            role="region"
            aria-label="Project carousel"
            tabIndex={0}
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") goPrev();
              if (event.key === "ArrowRight") goNext();
            }}
          >
            {projects.map((project, index) => (
              <ProjectScrollCard
                key={project.slug}
                project={project}
                active={index === activeIndex}
                onOpen={() => onSelect(project)}
              />
            ))}
          </div>

          <button
            type="button"
            className="project-scroll-arrow project-scroll-arrow--side project-scroll-arrow--next"
            onClick={goNext}
            disabled={activeIndex >= projects.length - 1}
            aria-label="Next project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="project-scroll-controls">
          <div className="project-scroll-dots" role="tablist" aria-label="Project slides">
            {projects.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Go to ${project.title}`}
                className={cn(
                  "project-scroll-dot",
                  index === activeIndex && "project-scroll-dot--active"
                )}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
);

ProjectScrollShowcase.displayName = "ProjectScrollShowcase";
