import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { ExperienceEntry } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn, motionEase } from "@/lib/utils";

interface ExperienceCardProps {
  item: ExperienceEntry;
  isHighlighted?: boolean;
}

export function ExperienceCard({ item, isHighlighted = false }: ExperienceCardProps) {
  const reduced = usePrefersReducedMotion();

  return (
    <motion.article
      className={cn("exp-card", isHighlighted && "exp-card--highlighted")}
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-5% 0px" }}
      transition={{ duration: 0.5, ease: motionEase }}
      whileHover={!reduced ? { y: -8 } : undefined}
    >
      <header className="exp-card-top">
        <div className={cn("exp-card-icon", item.logoUrl && "exp-card-icon--logo")}>
          {item.logoUrl ? (
            <img
              src={item.logoUrl}
              alt={`${item.company} logo`}
              className="exp-card-logo-img"
              loading="lazy"
            />
          ) : (
            <span className="exp-card-initials" aria-hidden="true">
              {item.initials}
            </span>
          )}
        </div>
        <p className="exp-card-role">{item.role}</p>
        <h3 className="exp-card-company">{item.company}</h3>
        <p className="exp-card-date">{item.date}</p>
      </header>

      <div className="exp-card-middle">
        <h4 className="exp-card-project">{item.projectTitle}</h4>
        <ul className="exp-card-bullets">
          {item.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>
      </div>

      <footer className="exp-card-bottom">
        <div className="exp-card-tech">
          {item.tech.map((tech) => (
            <span key={tech} className="exp-card-chip">
              {tech}
            </span>
          ))}
        </div>

        <div className="exp-card-badges">
          {item.metrics.map((metric) => (
            <span key={metric} className="exp-card-badge">
              {metric}
            </span>
          ))}
        </div>

        {(item.githubLink ||
          item.websiteLink ||
          item.reportLink ||
          item.paperLink ||
          item.projectLink) && (
          <div className="exp-card-actions">
            {item.reportLink && !item.paperLink && (
              <a
                href={item.reportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="exp-card-resource-btn group"
              >
                <span>Technical Report</span>
                <ArrowUpRight className="exp-card-resource-btn-icon" aria-hidden="true" />
              </a>
            )}
            {item.paperLink && (
              <a
                href={item.paperLink}
                target="_blank"
                rel="noopener noreferrer"
                className="exp-card-resource-btn group"
              >
                <span>Research Paper</span>
                <ArrowUpRight className="exp-card-resource-btn-icon" aria-hidden="true" />
              </a>
            )}
            {item.githubLink && (
              <a
                href={item.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="exp-card-resource-btn group"
              >
                <span>GitHub</span>
                <ArrowUpRight className="exp-card-resource-btn-icon" aria-hidden="true" />
              </a>
            )}
            {item.websiteLink && (
              <a
                href={item.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="exp-card-resource-btn group"
              >
                <span>Website</span>
                <ArrowUpRight className="exp-card-resource-btn-icon" aria-hidden="true" />
              </a>
            )}
            {item.projectLink && (
              <Link to={item.projectLink} className="exp-card-resource-btn group">
                <span>{item.projectLabel ?? "View Project"}</span>
                <ArrowUpRight className="exp-card-resource-btn-icon" aria-hidden="true" />
              </Link>
            )}
          </div>
        )}
      </footer>
    </motion.article>
  );
}
