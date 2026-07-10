import { lazy, Suspense, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { useScrollProgressRef } from "@/lib/scrollProgress";
import { achievementRobotLift, educationRobotLift } from "@/lib/scrollRobotZones";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase } from "@/lib/utils";

const ScrollRobotScene = lazy(() =>
  import("@/components/three/ScrollRobotScene").then((m) => ({
    default: m.ScrollRobotScene,
  }))
);

function easeFade(p: number, fadeStart: number, fadeEnd: number) {
  if (p <= fadeStart) return 1;
  if (p >= fadeEnd) return 0;
  return 1 - (p - fadeStart) / (fadeEnd - fadeStart);
}

function easeFadeIn(p: number, fadeStart: number, fadeEnd: number) {
  if (p <= fadeStart) return 0;
  if (p >= fadeEnd) return 1;
  return (p - fadeStart) / (fadeEnd - fadeStart);
}

export function ScrollRobotBackground() {
  const scrollRef = useScrollProgressRef();
  const robotRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    const tick = () => {
      const p = scrollRef.current ?? 0;
      const el = robotRef.current;

      if (el) {
        let opacity = 0;

        if (p < 0.12) {
          opacity = 0;
        } else if (p < 0.58) {
          opacity = 1;
        } else if (p < 0.66) {
          opacity = easeFade(p, 0.58, 0.66);
        } else if (p < 0.72) {
          opacity = easeFadeIn(p, 0.66, 0.72);
        } else if (p < 0.86) {
          opacity = 1;
        } else if (p < 0.92) {
          opacity = easeFade(p, 0.86, 0.92);
        } else {
          opacity = 0;
        }

        const achievementLift = achievementRobotLift(p);
        const educationLift = educationRobotLift(p);
        const liftVh = achievementLift * 16 + educationLift * 38;

        el.style.opacity = String(opacity);
        el.style.visibility = opacity < 0.02 ? "hidden" : "visible";

        if (desktopQuery.matches) {
          el.style.top = "50%";
          el.style.transform = `translateY(calc(-50% - ${liftVh}vh))`;
          delete el.dataset.anchor;
        } else {
          el.style.top = "";
          delete el.dataset.anchor;
          const mobileLift = achievementLift * 6 + educationLift * 10;
          el.style.transform = mobileLift > 0 ? `translateY(-${mobileLift}vh)` : "";
        }
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollRef, reduced]);

  if (reduced) return null;

  const robotEntrance = {
    initial: { opacity: 0, y: 48 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: motionEase, delay: 0.12 },
  };

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[1] overflow-visible"
      aria-hidden="true"
    >
      <motion.div
        ref={robotRef}
        {...robotEntrance}
        className="scroll-robot-host absolute left-[4%] top-1/2 h-[min(68vh,640px)] w-[min(48vw,520px)] md:h-[min(64vh,600px)] md:w-[min(46vw,500px)] max-lg:left-1/2 max-lg:top-[16%] max-lg:h-[34vh] max-lg:w-[82vw] max-lg:-translate-x-1/2 max-lg:translate-y-0"
      >
        <div
          className="absolute left-1/2 top-[42%] h-[min(380px,50vw)] w-[min(380px,50vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.25] blur-[180px]"
          style={{
            background:
              "radial-gradient(circle, var(--glow-robot) 0%, var(--glow-robot-secondary) 42%, transparent 72%)",
          }}
        />
        <ErrorBoundary>
          <Suspense fallback={null}>
            <ScrollRobotScene scrollRef={scrollRef} className="h-full w-full" />
          </Suspense>
        </ErrorBoundary>
      </motion.div>
    </div>
  );
}
