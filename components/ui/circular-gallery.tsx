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

function getWrappedIndex(virtualIndex: number, count: number): number {
  return ((virtualIndex % count) + count) % count;
}

function normalizePosition(position: number, count: number): number {
  if (count <= 0) return position;
  const normalized = position % count;
  return normalized < 0 ? normalized + count : normalized;
}

function isInteractiveTarget(target: EventTarget | null): boolean {
  return target instanceof Element && Boolean(target.closest("a, button"));
}

const DRAG_THRESHOLD_PX = 8;

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
    const [isDragging, setIsDragging] = useState(false);
    const [manualActive, setManualActive] = useState(false);
    const animationFrameRef = useRef<number | null>(null);
    const manualTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const positionRef = useRef(0);
    const dragRef = useRef({
      pointerDown: false,
      dragging: false,
      startX: 0,
      startPosition: 0,
    });
    const { width: cardWidth, height: cardHeight, gap } = useCardMetrics();

    positionRef.current = position;

    useEffect(() => {
      if (items.length > 0) {
        setPosition(Math.floor(items.length / 2));
      }
    }, [items]);

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
        setPosition((prev) => normalizePosition(prev - 1, items.length));
        pauseAutoRotate();
      },
      rotateRight: () => {
        setPosition((prev) => normalizePosition(prev + 1, items.length));
        pauseAutoRotate();
      },
    }));

    useEffect(() => {
      if (items.length === 0) return;

      const autoRotate = () => {
        if (!manualActive) {
          setPosition((prev) => normalizePosition(prev + autoRotateSpeed, items.length));
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

    const cardStep = cardWidth + gap;
    const count = items.length;

    const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
      if (count <= 1 || event.button !== 0 || isInteractiveTarget(event.target)) return;

      dragRef.current = {
        pointerDown: true,
        dragging: false,
        startX: event.clientX,
        startPosition: positionRef.current,
      };
    };

    const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current.pointerDown || count <= 1) return;

      const deltaX = event.clientX - dragRef.current.startX;

      if (!dragRef.current.dragging) {
        if (Math.abs(deltaX) < DRAG_THRESHOLD_PX) return;

        dragRef.current.dragging = true;
        setIsDragging(true);
        pauseAutoRotate();
        event.currentTarget.setPointerCapture(event.pointerId);
      }

      const deltaPosition = -deltaX / cardStep;
      setPosition(dragRef.current.startPosition + deltaPosition);
    };

    const finishDrag = (event: React.PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current.pointerDown) return;

      const wasDragging = dragRef.current.dragging;
      dragRef.current.pointerDown = false;
      dragRef.current.dragging = false;
      setIsDragging(false);

      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }

      if (wasDragging) {
        setPosition((prev) => normalizePosition(Math.round(prev), count));
        pauseAutoRotate();
      }
    };

    if (items.length === 0) return null;
    const center = Math.round(position * 1000) / 1000;
    const visibleRadius = Math.min(3, Math.max(2, Math.ceil(count / 2)));
    const virtualStart = Math.floor(center) - visibleRadius;
    const virtualEnd = Math.floor(center) + visibleRadius;
    const virtualSlides: { virtualIndex: number; item: GalleryItem; itemIndex: number }[] = [];

    for (let virtualIndex = virtualStart; virtualIndex <= virtualEnd; virtualIndex += 1) {
      const itemIndex = getWrappedIndex(virtualIndex, count);
      virtualSlides.push({
        virtualIndex,
        item: items[itemIndex],
        itemIndex,
      });
    }

    return (
      <div
        role="region"
        aria-label="Project gallery — drag left or right to browse"
        className={cn("linear-gallery", isDragging && "linear-gallery--dragging", className)}
        {...props}
      >
        <div
          ref={trackRef}
          className="linear-gallery__track"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={finishDrag}
          onPointerCancel={finishDrag}
        >
          {virtualSlides.map(({ virtualIndex, item, itemIndex }) => {
            const relative = virtualIndex - position;
            const absRelative = Math.abs(relative);
            const isActive = absRelative < 0.35;
            const translateX = relative * cardStep;
            const opacity = isActive ? 1 : Math.max(0.52, 1 - absRelative * 0.22);
            const scale = isActive ? 1 : Math.max(0.92, 1 - absRelative * 0.04);

            return (
              <div
                key={`${item.id ?? item.title}-${virtualIndex}`}
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
                        onClick={() => onItemClick?.(item, itemIndex)}
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
