import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { GlowOrb } from "@/components/ui/GlowOrb";

const RobotScene = lazy(() =>
  import("@/components/three/RobotScene").then((m) => ({ default: m.RobotScene }))
);

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-[110px] text-center">
      <GlowOrb size={280} color="violet" opacity={0.15} className="left-1/4 top-1/4" />
      <GlowOrb size={320} color="pink" opacity={0.1} className="right-1/4 top-1/3" />

      <Suspense fallback={null}>
        <RobotScene confused className="h-[35vh] w-full max-w-sm sm:h-[50vh]" />
      </Suspense>

      <h1 className="font-display text-section-title mt-8 text-[var(--ink)]">
        Lost in the pipeline.
      </h1>
      <p className="mt-4 text-body text-[var(--ink-dim)]">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button variant="ghost" className="mt-8" asChild>
        <Link to="/">Back to homepage</Link>
      </Button>
    </section>
  );
}
