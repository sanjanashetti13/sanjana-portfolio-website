import type { LucideIcon } from "lucide-react";
import {
  Blocks,
  Brain,
  Code2,
  Cpu,
  Database,
  FlaskConical,
  RadioTower,
  Sparkles,
} from "lucide-react";
import type { Project, ProjectTypeBadge } from "@/data/content";

export type ProjectTheme = {
  color: string;
  glow: string;
  Icon: LucideIcon;
};

const SLUG_THEMES: Record<string, ProjectTheme> = {
  "5g-edge-network-security": {
    color: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.38)",
    Icon: RadioTower,
  },
};

const TYPE_THEMES: Record<ProjectTypeBadge, ProjectTheme> = {
  AI: {
    color: "#a78bfa",
    glow: "rgba(167, 139, 255, 0.35)",
    Icon: Sparkles,
  },
  "Full Stack": {
    color: "#60a5fa",
    glow: "rgba(96, 165, 250, 0.35)",
    Icon: Code2,
  },
  Blockchain: {
    color: "#34d399",
    glow: "rgba(52, 211, 153, 0.35)",
    Icon: Blocks,
  },
  Research: {
    color: "#f472b6",
    glow: "rgba(244, 114, 182, 0.35)",
    Icon: FlaskConical,
  },
  "Data Engineering": {
    color: "#22d3ee",
    glow: "rgba(34, 211, 238, 0.35)",
    Icon: Database,
  },
  IoT: {
    color: "#fbbf24",
    glow: "rgba(251, 191, 36, 0.35)",
    Icon: Cpu,
  },
  "Machine Learning": {
    color: "#818cf8",
    glow: "rgba(129, 140, 248, 0.35)",
    Icon: Brain,
  },
};

export function getProjectTheme(project: Project): ProjectTheme {
  return SLUG_THEMES[project.slug] ?? TYPE_THEMES[project.typeBadge] ?? TYPE_THEMES.AI;
}

export function getProjectLabel(project: Project): string {
  return project.typeLabel ?? project.typeBadge;
}
