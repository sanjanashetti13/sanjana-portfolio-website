import type { Project } from "@/data/content";
import type { GalleryItem } from "@/components/ui/circular-gallery";
import { getProjectTheme, getProjectLabel } from "@/lib/projectTheme";

function isValidLink(url: string | null | undefined): url is string {
  return Boolean(url && url !== "#");
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
