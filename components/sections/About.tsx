import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { Quote } from "lucide-react";
import { about, profile } from "@/data/content";
import { FloatingKeywords } from "@/components/ui/FloatingKeywords";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase, viewportReveal } from "@/lib/utils";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: viewportReveal,
  transition: { duration: 0.7, ease: motionEase, delay },
});

const slideIn = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: viewportReveal,
  transition: { duration: 0.75, ease: motionEase, delay },
});

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.92", "start 0.38"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.55, 1], [18, 6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.45, 1], [0.42, 0.82, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [36, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.985, 1]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  const content = (
    <>
      <div className="about-text-col">
        <h2 className="about-eyebrow">{about.eyebrow}</h2>
        <p className="about-intro">{about.intro}</p>
        <blockquote className="about-quote-card">
          <Quote className="about-quote-icon" aria-hidden="true" strokeWidth={1.5} />
          <p className="about-quote-text">&ldquo;{about.quote}&rdquo;</p>
        </blockquote>
      </div>

      <div className="about-photo-col">
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
      </div>
    </>
  );

  return (
    <section id="about" ref={sectionRef} className="about-section relative overflow-hidden">
      <div className="about-banner" aria-hidden="true" />

      {reduced ? (
        <>
          <FloatingKeywords />
          <div className="relative z-10 section-padding">
            <div className="container-main">
              <div className="about-grid">
                <div className="about-text-col">
                  <motion.h2 className="about-eyebrow" {...fadeUp(0)}>
                    {about.eyebrow}
                  </motion.h2>
                  <motion.p className="about-intro" {...fadeUp(0.08)}>
                    {about.intro}
                  </motion.p>
                  <motion.blockquote className="about-quote-card" {...slideIn(0.22)}>
                    <Quote className="about-quote-icon" aria-hidden="true" strokeWidth={1.5} />
                    <p className="about-quote-text">&ldquo;{about.quote}&rdquo;</p>
                  </motion.blockquote>
                </div>
                <motion.div className="about-photo-col" {...fadeUp(0.12)}>
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
        </>
      ) : (
        <motion.div
          className="about-reveal"
          style={{ filter, opacity, y, scale }}
        >
          <FloatingKeywords />
          <div className="relative z-10 section-padding">
            <div className="container-main">
              <div className="about-grid">{content}</div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
