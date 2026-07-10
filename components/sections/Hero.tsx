import { lazy, Suspense, useEffect } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { profile } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { ResumeViewer } from "@/components/ui/ResumeViewer";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useHeroNavName } from "@/components/layout/HeroNavNameContext";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase } from "@/lib/utils";

const RobotScene = lazy(() =>
  import("@/components/three/RobotScene").then((m) => ({ default: m.RobotScene }))
);

const STAGGER = 0.1;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { heroNameRef, registerHero, unregisterHero } = useHeroNavName();

  useEffect(() => {
    registerHero();
    return unregisterHero;
  }, [registerHero, unregisterHero]);

  const fadeUp = (delay: number, duration = 0.7) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration, ease: motionEase, delay },
        };

  const fadeScale = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: { duration: 0.7, ease: motionEase, delay },
        };

  return (
    <section className="hero-section relative flex min-h-screen items-center overflow-hidden pt-20 md:pt-[84px]">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(ellipse 70% 55% at 22% 48%, rgba(124, 92, 255, 0.1), transparent 65%),
            radial-gradient(ellipse 50% 40% at 78% 30%, rgba(232, 121, 249, 0.06), transparent 60%),
            radial-gradient(ellipse 120% 90% at 50% 50%, transparent 35%, rgba(0, 0, 0, 0.45) 100%)
          `,
        }}
      />

      <div className="hero-shell relative z-10 w-full">
        <div className="hero-grid">
          <motion.div className="hero-robot" {...fadeScale(STAGGER * 0)}>
            <div className="hero-robot-glow" aria-hidden="true" />
            <ErrorBoundary>
              <Suspense fallback={null}>
                <RobotScene className="h-full w-full" />
              </Suspense>
            </ErrorBoundary>
          </motion.div>

          <div className="hero-copy">
            <motion.p className="text-hero-greeting" {...fadeUp(STAGGER * 0, 0.65)}>
              Hello! I&apos;m
            </motion.p>

            <div className="hero-name-slot">
              <motion.h1
                ref={heroNameRef}
                className="text-hero-name hero-name-dock"
                initial={reduced ? false : { opacity: 0 }}
                animate={reduced ? undefined : { opacity: 1 }}
                transition={{ duration: 0.75, ease: motionEase, delay: STAGGER * 1 }}
              >
                {profile.name}
              </motion.h1>
            </div>

            <motion.h2 className="text-hero-title" {...fadeUp(STAGGER * 2, 0.75)}>
              <span className="gradient-text">{profile.heroTitle}</span>
            </motion.h2>

            <motion.p className="text-hero-description" {...fadeUp(STAGGER * 3, 0.7)}>
              {profile.tagline}
            </motion.p>

            <motion.div className="hero-cta" {...fadeScale(STAGGER * 4)}>
              <ResumeViewer
                trigger={
                  <Button variant="primary" size="hero" magnetic>
                    <FileText className="h-[18px] w-[18px]" strokeWidth={2} />
                    Resume
                  </Button>
                }
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
