import {
  Award,
  BookOpen,
  Check,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { ProjectHighlightPill } from "@/data/content";
import { cn } from "@/lib/utils";

const variantIcons: Record<NonNullable<ProjectHighlightPill["variant"]>, LucideIcon> = {
  default: Check,
  award: Award,
  research: BookOpen,
  accent: Sparkles,
};

interface ProjectHighlightPillsProps {
  pills: ProjectHighlightPill[];
  className?: string;
}

export function ProjectHighlightPills({ pills, className }: ProjectHighlightPillsProps) {
  if (!pills.length) return null;

  return (
    <div className={cn("project-highlight-pills", className)}>
      {pills.map((pill) => {
        const variant = pill.variant ?? "default";
        const Icon = variantIcons[variant];

        return (
          <span
            key={pill.label}
            className={cn(
              "project-highlight-pill",
              variant !== "default" && `project-highlight-pill--${variant}`
            )}
          >
            <Icon className="project-highlight-pill__icon" aria-hidden="true" strokeWidth={2.25} />
            {pill.label}
          </span>
        );
      })}
    </div>
  );
}
