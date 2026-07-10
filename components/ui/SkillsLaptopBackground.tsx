import { lazy, Suspense, type RefObject } from "react";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";
import { usePrefersReducedMotion } from "@/lib/hooks";

const SkillsLaptopScene = lazy(() =>
  import("@/components/three/SkillsLaptopScene").then((m) => ({
    default: m.SkillsLaptopScene,
  }))
);

interface SkillsLaptopBackgroundProps {
  openProgressRef?: RefObject<number>;
}

export function SkillsLaptopBackground({ openProgressRef }: SkillsLaptopBackgroundProps) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <div className="skills-laptop-fallback" aria-hidden="true" />;
  }

  return (
    <div className="skills-laptop-wrap" aria-hidden="true">
      <div className="skills-laptop-glow" />
      <div className="skills-laptop-pedestal" />
      <ErrorBoundary>
        <Suspense fallback={<div className="skills-laptop-fallback" />}>
          <SkillsLaptopScene
            className="skills-laptop-canvas"
            openProgressRef={openProgressRef}
          />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
