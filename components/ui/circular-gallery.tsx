import React, {
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  type CSSProperties,
  type HTMLAttributes,
} from "react";
import { ArrowUpRight, ClipboardList, FileText, Github, Globe } from "lucide-react";
import type { ProjectHighlightPill } from "@/data/content";
import { ProjectHighlightPills } from "@/components/ui/ProjectHighlightPills";
import { cn } from "@/lib/utils";

export interface GalleryItem {
  id?: string;
  title: string;
  subtitle: string;
  cardDescription: string;
  meta: string;
  accentColor: string;
  glowColor: string;
  highlightPills: ProjectHighlightPill[];
  githubUrl: string | null;
  demoUrl: string | null;
  paperUrl: string | null;
  reportUrl: string | null;
}

interface CircularGalleryProps extends HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  autoRotateSpeed?: number;
  onItemClick?: (item: GalleryItem, index: number) => void;
}

export interface CircularGalleryRef {
  rotateLeft: () => void;
  rotateRight: () => void;
}

function getRelativeIndex(index: number, position: number, count: number): number {
  let relative = index - position;
  relative = ((relative % count) + count) % count;
  if (relative > count / 2) relative -= count;
  return relative;
}

function useCardMetrics() {
  const [metrics, setMetrics] = useState({ width: 280, height: 370, gap: 32 });

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) {
        setMetrics({ width: 240, height: 280, gap: 24 });
      } else if (window.innerWidth < 1024) {
        setMetrics({ width: 260, height: 290, gap: 28 });
      } else {
        setMetrics({ width: 280, height: 300, gap: 32 });
      }
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return metrics;
}

const CircularGallery = React.forwardRef<CircularGalleryRef, CircularGalleryProps>(
  ({ items, className, autoRotateSpeed = 0.00075, onItemClick, ...props }, ref) => {
    const [position, setPosition] = useState(0);
    const [manualActive, setManualActive] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const { width: cardWidth, height: cardHeight, gap } = useCardMetrics();

    const pauseAutoRotate = () => {
      setManualActive(true);
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
      manualTimeoutRef.current = setTimeout(() => {
        setManualActive(false);
      }, 2800);
    };

    useImperativeHandle(ref, () => ({
      rotateLeft: () => {
        setPosition((prev) => prev - 1);
        pauseAutoRotate();
      },
      rotateRight: () => {
        setPosition((prev) => prev + 1);
        pauseAutoRotate();
      },
    }));

    useEffect(() => {
      if (items.length === 0) return;

      const autoRotate = () => {
        if (!manualActive) {
          setPosition((prev) => prev + autoRotateSpeed);
        }
        animationFrameRef.current = requestAnimationFrame(autoRotate);
      };

      animationFrameRef.current = requestAnimationFrame(autoRotate);

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        if (manualTimeoutRef.current) {
          clearTimeout(manualTimeoutRef.current);
        }
      };
    }, [manualActive, autoRotateSpeed, items.length]);

    if (items.length === 0) return null;

    const cardStep = cardWidth + gap;

    return (
      <div
        role="region"
        aria-label="Project gallery"
        className={cn("linear-gallery", className)}
        {...props}
      >
        <div className="linear-gallery__track">
          {items.map((item, index) => {
            const relative = getRelativeIndex(index, position, items.length);
            const absRelative = Math.abs(relative);
            const isVisible = absRelative <= 1.65;
            const isActive = absRelative < 0.35;
            const translateX = relative * cardStep;
            const opacity = !isVisible ? 0 : isActive ? 1 : Math.max(0.42, 1 - absRelative * 0.38);
            const scale = isActive ? 1 : Math.max(0.9, 1 - absRelative * 0.06);

            return (
              <div
                key={item.id ?? item.title}
                role="group"
                aria-label={item.title}
                className={cn("linear-gallery__slide", isActive && "linear-gallery__slide--active")}
                style={{
                  width: cardWidth,
                  height: cardHeight,
                  transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  zIndex: Math.round(20 - absRelative * 10),
                  pointerEvents: absRelative < 0.75 ? "auto" : "none",
                }}
              >
                <div className="circular-gallery-card group h-full w-full text-left">
                  <div
                    className="circular-gallery-card__inner"
                    style={
                      {
                        "--gallery-accent": item.accentColor,
                        "--gallery-glow": item.glowColor,
                        "--proj-accent": item.accentColor,
                        "--proj-glow": item.glowColor,
                      } as CSSProperties
                    }
                  >
                    <h2 className="circular-gallery-card__title">{item.title}</h2>
                    <p className="circular-gallery-card__subtitle">{item.subtitle}</p>
                    <p className="circular-gallery-card__desc">{item.cardDescription}</p>

                    <ProjectHighlightPills
                      pills={item.highlightPills}
                      className="project-highlight-pills--compact"
                    />

                    <div className="circular-gallery-card__footer">
                      <div className="circular-gallery-card__actions">
                        {item.githubUrl && (
                          <a
                            href={item.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="circular-gallery-card__action"
                          >
                            <Github className="h-3.5 w-3.5" aria-hidden="true" />
                            GitHub
                          </a>
                        )}
                        {item.demoUrl && (
                          <a
                            href={item.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="circular-gallery-card__action circular-gallery-card__action--primary"
                          >
                            <Globe className="h-3.5 w-3.5" aria-hidden="true" />
                            Live Demo
                          </a>
                        )}
                        {item.reportUrl && (
                          <a
                            href={item.reportUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="circular-gallery-card__action"
                          >
                            <ClipboardList className="h-3.5 w-3.5" aria-hidden="true" />
                            Report
                          </a>
                        )}
                        {item.paperUrl && (
                          <a
                            href={item.paperUrl}
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
                        onClick={() => onItemClick?.(item, index)}
                        aria-label={`View details for ${item.title}`}
                      >
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <p className="circular-gallery-card__meta">{item.meta}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export { CircularGallery };
