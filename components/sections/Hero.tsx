import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { profile } from "@/data/content";
import { Button } from "@/components/ui/Button";
import { ResumeViewer } from "@/components/ui/ResumeViewer";
import { MinimalistHeroPortrait } from "@/components/ui/minimalist-hero";
import { WomanCodingAnimation } from "@/components/ui/woman-coding-animation";
import { useHeroNavName } from "@/components/layout/HeroNavNameContext";
import { useSplash } from "@/components/layout/SplashContext";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase } from "@/lib/utils";

const STAGGER = 0.1;

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { phase, heroRobotRef } = useSplash();
  const { heroNameRef, registerHero, unregisterHero } = useHeroNavName();
  const showContent = phase === "transition" || phase === "complete";
  const showPortrait = phase === "complete";

  useEffect(() => {
    registerHero();
    return unregisterHero;
  }, [registerHero, unregisterHero]);

  const fadeUp = (delay: number, duration = 0.7) =>
    reduced || !showContent
      ? { initial: { opacity: 0 }, animate: { opacity: showContent ? 1 : 0 } }
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration,
            ease: motionEase,
            delay: phase === "transition" ? delay + 0.25 : delay,
          },
        };

  const fadeScale = (delay: number) =>
    reduced || !showContent
      ? { initial: { opacity: 0 }, animate: { opacity: showContent ? 1 : 0 } }
      : {
          initial: { opacity: 0, scale: 0.96 },
          animate: { opacity: 1, scale: 1 },
          transition: {
            duration: 0.7,
            ease: motionEase,
            delay: phase === "transition" ? delay + 0.25 : delay,
          },
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
          <motion.div
            ref={heroRobotRef}
            className="hero-robot"
            initial={false}
            animate={{ opacity: showPortrait ? 1 : 0 }}
            transition={{ duration: 0.35, ease: motionEase }}
          >
            <MinimalistHeroPortrait show={showPortrait}>
              <WomanCodingAnimation />
            </MinimalistHeroPortrait>
          </motion.div>

          <div className="hero-copy">
            <motion.p className="text-hero-greeting" {...fadeUp(STAGGER * 0, 0.65)}>
              Hello! I&apos;m
            </motion.p>

            <motion.div
              className="hero-name-slot"
              initial={reduced ? false : { opacity: 0, y: 20 }}
              animate={reduced ? undefined : { opacity: showContent ? 1 : 0, y: showContent ? 0 : 20 }}
              transition={{
                duration: 0.75,
                ease: motionEase,
                delay: phase === "transition" ? STAGGER * 1 + 0.25 : STAGGER * 1,
              }}
            >
              <h1 ref={heroNameRef} className="text-hero-name hero-name-dock">
                {profile.name}
              </h1>
            </motion.div>

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
