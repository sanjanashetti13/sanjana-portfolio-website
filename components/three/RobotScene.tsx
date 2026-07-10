import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { RobotFigure } from "./RobotFigure";

interface RobotSceneProps {
  confused?: boolean;
  className?: string;
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#e8e4f5" />
      <directionalLight
        color="#ffffff"
        intensity={0.85}
        position={[3, 5, 6]}
        castShadow={false}
      />
      <pointLight color="#ffffff" intensity={0.6} position={[2, 3, 5]} />
      <pointLight color="#a78bff" intensity={1.8} position={[-4, 2, -3]} />
      <pointLight color="#e879f9" intensity={1.5} position={[4, 1, -2]} />
      <pointLight color="#e879f9" intensity={0.5} position={[0, 2, 3]} />
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

export function RobotScene({ confused = false, className }: RobotSceneProps) {
  const [webgl, setWebgl] = useState(true);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (!webgl || reduced) {
    return (
      <img
        src="/avatar/robot.png"
        alt="Sanjana Shetti robot avatar"
        className={cn("h-full w-full object-contain", className)}
      />
    );
  }

  return (
    <div className={cn("robot-scene pointer-events-none", className)} aria-hidden="true">
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        camera={{ fov: 24, position: [0, 0.55, 6.4], near: 0.1, far: 100 }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <StudioLights />
          <RobotFigure confused={confused} reducedMotion={reduced} />
        </Suspense>
      </Canvas>
    </div>
  );
}
