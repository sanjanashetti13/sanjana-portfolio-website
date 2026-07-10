import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { RobotFigure } from "./RobotFigure";
import { getRobotRigTargetY, scrollRobotLift } from "@/lib/scrollRobotZones";
import { lerp } from "./useRobotMouse";

interface ScrollRobotSceneProps {
  scrollRef: RefObject<number>;
  confused?: boolean;
  className?: string;
}

function StudioLights() {
  return (
    <>
      <ambientLight intensity={0.55} color="#e8e4f5" />
      <directionalLight color="#ffffff" intensity={0.85} position={[3, 5, 6]} />
      <pointLight color="#ffffff" intensity={0.6} position={[2, 3, 5]} />
      <pointLight color="#a78bff" intensity={1.8} position={[-4, 2, -3]} />
      <pointLight color="#e879f9" intensity={1.5} position={[4, 1, -2]} />
      <pointLight color="#e879f9" intensity={0.5} position={[0, 2, 3]} />
    </>
  );
}

function ScrollRobotRig({
  scrollRef,
  confused,
}: {
  scrollRef: RefObject<number>;
  confused?: boolean;
}) {
  const rigRef = useRef<THREE.Group>(null);
  const currentY = useRef(0);
  const currentRotY = useRef(0);
  const currentRotZ = useRef(0);
  const currentScale = useRef(1);

  useFrame((state) => {
    if (!rigRef.current) return;
    const p = scrollRef.current ?? 0;
    const t = state.clock.elapsedTime;
    const zoneLift = scrollRobotLift(p);

    const targetY = getRobotRigTargetY(p) + Math.sin(t * 0.5) * 0.05;
    const targetRotY = Math.sin(p * Math.PI) * 0.12;
    const targetRotZ = Math.sin(p * Math.PI * 2) * 0.08;
    const targetScale = 1 - p * 0.06 + zoneLift * 0.1;

    currentY.current = lerp(currentY.current, targetY, 0.05);
    currentRotY.current = lerp(currentRotY.current, targetRotY, 0.05);
    currentRotZ.current = lerp(currentRotZ.current, targetRotZ, 0.05);
    currentScale.current = lerp(currentScale.current, targetScale, 0.05);

    rigRef.current.position.y = currentY.current;
    rigRef.current.rotation.y = currentRotY.current;
    rigRef.current.rotation.z = currentRotZ.current;
    rigRef.current.scale.setScalar(currentScale.current);
  });

  return (
    <group ref={rigRef}>
      <RobotFigure confused={confused} />
    </group>
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

export function ScrollRobotScene({
  scrollRef,
  confused = false,
  className,
}: ScrollRobotSceneProps) {
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
        className={cn("h-full w-full object-contain object-bottom", className)}
      />
    );
  }

  return (
    <div className={cn("robot-scene pointer-events-none h-full w-full", className)}>
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 2]}
        camera={{ fov: 24, position: [0, 0.72, 6.4], near: 0.1, far: 100 }}
        style={{ background: "transparent" }}
        frameloop="always"
      >
        <Suspense fallback={null}>
          <StudioLights />
          <ScrollRobotRig scrollRef={scrollRef} confused={confused} />
        </Suspense>
      </Canvas>
    </div>
  );
}
