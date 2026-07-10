import type { Project } from "@/data/content";
import { ProjectShowcaseCard } from "@/components/ui/ProjectShowcaseCard";

interface FeaturedProjectCardProps {
  project: Project;
  index?: number;
}

export function FeaturedProjectCard({ project, index = 0 }: FeaturedProjectCardProps) {
  return <ProjectShowcaseCard project={project} index={index} size="featured" />;
}
