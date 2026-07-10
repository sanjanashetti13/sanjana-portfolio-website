import { motion } from "framer-motion";
import { experience } from "@/data/content";
import { ExperienceCard } from "@/components/ui/ExperienceCard";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase, viewportReveal } from "@/lib/utils";

export function ExperienceShowcase() {
  const reduced = usePrefersReducedMotion();

  const rowMotion = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.75, ease: motionEase },
      };

  return (
    <div className="exp-showcase">
      <div className="exp-showcase-glow" aria-hidden="true" />

      <motion.div className="exp-showcase-row" {...rowMotion}>
        {experience.map((item) => (
          <ExperienceCard key={item.org} item={item} />
        ))}
      </motion.div>

      <motion.div className="exp-showcase-carousel" {...rowMotion}>
        {experience.map((item) => (
          <ExperienceCard key={item.org} item={item} />
        ))}
      </motion.div>
    </div>
  );
}
