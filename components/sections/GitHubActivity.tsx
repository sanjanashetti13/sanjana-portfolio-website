import { lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { Github, FileText } from "lucide-react";
import { profile } from "@/data/content";
import { GITHUB_USERNAME } from "@/lib/github";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase, viewportReveal } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { ResumeViewer } from "@/components/ui/ResumeViewer";

const GitHubContributionGraph = lazy(() =>
  import("./GitHubContributionGraph").then((module) => ({
    default: module.GitHubContributionGraph,
  }))
);

export function GitHubActivitySection() {
  const reduced = usePrefersReducedMotion();

  const headerMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.7, ease: motionEase },
      };

  const contentMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.55, ease: motionEase, delay: 0.08 },
      };

  return (
    <section id="github" className="github-section">
      <div className="github-shell">
        <motion.header className="github-header" {...headerMotion}>
          <p className="github-eyebrow">Open Source</p>
          <h2 className="github-title">My GitHub Activity</h2>
          <p className="github-subtitle">
            
          </p>
        </motion.header>

        <motion.div className="github-content" {...contentMotion}>
          <div className="github-graph-card">
            <Suspense fallback={<div className="github-graph-skeleton" aria-hidden="true" />}>
              <GitHubContributionGraph username={GITHUB_USERNAME} />
            </Suspense>
          </div>

          <div className="github-actions">
            <Button asChild variant="primary">
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github size={16} aria-hidden="true" />
                View GitHub Profile
              </a>
            </Button>
            <ResumeViewer
              trigger={
                <Button variant="ghost">
                  <FileText size={16} aria-hidden="true" />
                  View Resume
                </Button>
              }
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
