import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { about, profile } from "@/data/content";
import { FloatingKeywords } from "@/components/ui/FloatingKeywords";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase, viewportReveal } from "@/lib/utils";

const fadeUp = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.7, ease: motionEase, delay },
      };

const slideIn = (reduced: boolean, delay = 0) =>
  reduced
    ? {}
    : {
        initial: { opacity: 0, x: -28 },
        whileInView: { opacity: 1, x: 0 },
        viewport: viewportReveal,
        transition: { duration: 0.75, ease: motionEase, delay },
      };

export function About() {
  const reduced = usePrefersReducedMotion();

  return (
    <section id="about" className="about-section relative overflow-hidden">
      <div className="about-banner" aria-hidden="true" />
      <FloatingKeywords />

      <div className="relative z-10 section-padding">
        <div className="container-main">
          <div className="about-grid">
            <div className="about-text-col">
              <motion.h2 className="about-eyebrow" {...fadeUp(reduced, 0)}>
                {about.eyebrow}
              </motion.h2>

              <motion.p className="about-intro" {...fadeUp(reduced, 0.08)}>
                {about.intro}
              </motion.p>

              <motion.blockquote className="about-quote-card" {...slideIn(reduced, 0.22)}>
                <Quote
                  className="about-quote-icon"
                  aria-hidden="true"
                  strokeWidth={1.5}
                />
                <p className="about-quote-text">&ldquo;{about.quote}&rdquo;</p>
              </motion.blockquote>
            </div>

            <motion.div
              className="about-photo-col"
              {...fadeUp(reduced, 0.12)}
            >
              <div className="about-photo-wrap">
                <img
                  src={profile.aboutPhotoUrl}
                  alt={`${profile.name} — professional headshot`}
                  className="about-photo"
                  width={420}
                  height={525}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
