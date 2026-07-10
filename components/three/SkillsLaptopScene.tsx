import { Suspense, useEffect, useState, type RefObject } from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { LaptopFigure } from "./LaptopFigure";

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.82} color="#eef2f8" />
      <directionalLight color="#ffffff" intensity={1.25} position={[2, 5, 6]} />
      <directionalLight color="#c5d4e8" intensity={0.55} position={[-4, 2, -2]} />
      <pointLight color="#ffffff" intensity={1.6} position={[2, 2, 5]} />
      <pointLight color="#dde7f2" intensity={1.8} position={[-3, 1, 4]} />
      <pointLight color="#bec7d0" intensity={1.1} position={[4, 0, 2]} />
      <pointLight color="#8fa3b8" intensity={0.9} position={[0, -1.5, 3]} />
    </>
  );
}

function hasWebGL(): boolean {
  if (typeof window === "undefined") return true;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

interface SkillsLaptopSceneProps {
  className?: string;
  openProgressRef?: RefObject<number>;
}

export function SkillsLaptopScene({ className, openProgressRef }: SkillsLaptopSceneProps) {
  const [webgl, setWebgl] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (!webgl || reduced) {
    return (
      <div
        className={cn("skills-laptop-fallback", className)}
        aria-hidden="true"
      />
    );
  }

  return (
    <div className={cn("skills-laptop-scene pointer-events-none h-full w-full", className)}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.75]}
        camera={{ fov: 28, position: [0, 0.42, 5.8], near: 0.1, far: 100 }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <StudioLights />
          <LaptopFigure openProgressRef={openProgressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
