import type { Project } from "@/data/content";
import type { GalleryItem } from "@/components/ui/circular-gallery";
import { getProjectTheme, getProjectLabel } from "@/lib/projectTheme";

function isValidLink(url: string | null | undefined): url is string {
  return Boolean(url && url !== "#");
}

function getProjectLinkScore(project: Project): number {
  return [project.github, project.demo, project.paper, project.report].filter(isValidLink).length;
}

/** Keep one entry per slug/title, preferring the version with more links. */
export function dedupeProjects(projects: Project[]): Project[] {
  const bestBySlug = new Map<string, Project>();
  const bestByTitle = new Map<string, Project>();

  for (const project of projects) {
    const normalizedTitle = project.title.trim().toLowerCase();
    const existingSlug = bestBySlug.get(project.slug);
    if (!existingSlug || getProjectLinkScore(project) > getProjectLinkScore(existingSlug)) {
      bestBySlug.set(project.slug, project);
    }

    const existingTitle = bestByTitle.get(normalizedTitle);
    if (!existingTitle || getProjectLinkScore(project) > getProjectLinkScore(existingTitle)) {
      bestByTitle.set(normalizedTitle, project);
    }
  }

  const emitted = new Set<string>();
  return projects.filter((project) => {
    const normalizedTitle = project.title.trim().toLowerCase();
    if (bestBySlug.get(project.slug) !== project) return false;
    if (bestByTitle.get(normalizedTitle) !== project) return false;
    if (emitted.has(project.slug)) return false;
    emitted.add(project.slug);
    return true;
  });
}

export function projectToGalleryItem(project: Project): GalleryItem {
  const theme = getProjectTheme(project);
  const hasPaper = isValidLink(project.paper);
  const hasReport = isValidLink(project.report) && !hasPaper;

  return {
    id: project.slug,
    title: project.title,
    subtitle: getProjectLabel(project),
    cardDescription: project.cardDescription,
    meta: `${project.year} · ${project.context}`,
    accentColor: theme.color,
    glowColor: theme.glow,
    highlightPills: project.highlightPills.slice(0, 5),
    githubUrl: isValidLink(project.github) ? project.github! : null,
    demoUrl: isValidLink(project.demo) ? project.demo! : null,
    paperUrl: hasPaper ? project.paper! : null,
    reportUrl: hasReport ? project.report! : null,
  };
}
export function projectsToGalleryItems(projects: Project[]): GalleryItem[] {
  return projects.map(projectToGalleryItem);
}
