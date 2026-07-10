import { motion } from "framer-motion";
import { experienceSubtitle } from "@/data/content";
import { CompanyMarquee } from "@/components/ui/CompanyMarquee";
import { ExperienceShowcase } from "@/components/ui/ExperienceShowcase";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase, viewportReveal } from "@/lib/utils";

export function Experience() {
  const reduced = usePrefersReducedMotion();

  const headerMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.7, ease: motionEase },
      };

  return (
    <section id="experience" className="experience-section">
      <div className="experience-shell">
        <motion.header className="experience-header" {...headerMotion}>
          <h2 className="experience-title">Experience</h2>
          <p className="experience-subtitle">{experienceSubtitle}</p>
        </motion.header>

        <CompanyMarquee />
      </div>

      <ExperienceShowcase />
    </section>
  );
}
