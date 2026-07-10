import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  projectFilters,
  projects,
  type Project,
  type ProjectFilter,
} from "@/data/content";
import { ProjectDetailModal } from "@/components/ui/ProjectDetailModal";
import { ProjectCircularShowcase } from "@/components/ui/ProjectCircularShowcase";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, motionEase, viewportReveal } from "@/lib/utils";

function matchesSearch(project: Project, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  const haystack = [
    project.title,
    project.description,
    project.typeBadge,
    project.typeLabel ?? "",
    project.tag,
    project.category,
    ...project.filters,
    ...project.highlights,
    ...project.stack,
    ...(project.tags ?? []),
    ...(project.metrics ?? []),
  ]
    .join(" ")
    .toLowerCase();
  return haystack.includes(q);
}

function matchesFilter(project: Project, filter: ProjectFilter): boolean {
  if (filter === "All") return true;
  return project.filters.includes(filter);
}

export function Projects() {
  const reduced = usePrefersReducedMotion();
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    const filtered = projects.filter(
      (project) => matchesFilter(project, activeFilter) && matchesSearch(project, searchQuery)
    );
    return [...filtered].sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });
  }, [activeFilter, searchQuery]);

  const hasResults = filteredProjects.length > 0;

  const headerMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.7, ease: motionEase },
      };

  return (
    <section id="projects" className="projects-section">
      <div className="projects-shell">
        <motion.header className="projects-header projects-header--scroll" {...headerMotion}>
          <div className="projects-header-copy">
            <h2 className="projects-title projects-title--scroll">My Projects</h2>
            <p className="projects-subtitle projects-subtitle--scroll">
              Drag left or right to browse projects. Click a card to explore details.
            </p>
          </div>
        </motion.header>

        <motion.div
          className="projects-toolbar"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportReveal}
          transition={{ duration: 0.55, ease: motionEase, delay: 0.08 }}
        >
          <div className="projects-filters" role="tablist" aria-label="Filter projects">
            {projectFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                className={cn(
                  "projects-filter-chip",
                  activeFilter === filter && "projects-filter-chip--active"
                )}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>

          <label className="projects-search">
            <Search className="projects-search-icon" aria-hidden="true" />
            <input
              type="search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search by project, technology, or keywords…"
              className="projects-search-input"
              aria-label="Search projects"
            />
          </label>
        </motion.div>

        <div className="projects-showcase">
          {hasResults ? (
            <ProjectCircularShowcase
              key={`${activeFilter}-${searchQuery}`}
              projects={filteredProjects}
              onSelect={setSelectedProject}
            />
          ) : (
            <p className="projects-empty">
              No projects match your search. Try another filter or keyword.
            </p>
          )}
        </div>
      </div>

      <ProjectDetailModal
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedProject(null);
        }}
      />
    </section>
  );
}
