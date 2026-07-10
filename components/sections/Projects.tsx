import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import {
  projectFilters,
  projects,
  projectsSubtitle,
  type Project,
  type ProjectFilter,
} from "@/data/content";
import { ProjectGalleryCard } from "@/components/ui/ProjectGalleryCard";
import { ProjectDetailModal } from "@/components/ui/ProjectDetailModal";
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
        <motion.header className="projects-header" {...headerMotion}>
          <p className="projects-eyebrow"></p>
          <h2 className="projects-title">My Projects</h2>
          <p className="projects-subtitle">{projectsSubtitle}</p>
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
          <AnimatePresence mode="wait">
            {hasResults ? (
              <motion.div
                key={`${activeFilter}-${searchQuery}`}
                className="projects-gallery-grid"
                initial={reduced ? false : { opacity: 0 }}
                animate={reduced ? undefined : { opacity: 1 }}
                exit={reduced ? undefined : { opacity: 0 }}
                transition={{ duration: 0.35, ease: motionEase }}
              >
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project, index) => (
                    <ProjectGalleryCard
                      key={project.slug}
                      project={project}
                      index={index}
                      onSelect={setSelectedProject}
                    />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                className="projects-empty"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                No projects match your search. Try another filter or keyword.
              </motion.p>
            )}
          </AnimatePresence>
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
