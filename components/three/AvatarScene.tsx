"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { AvatarFigure } from "./AvatarFigure";

interface AvatarSceneProps {
  confused?: boolean;
  className?: string;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.9} color="#4a3f66" />
      <pointLight color="#ffffff" intensity={1.1} position={[2, 3, 4]} />
      <pointLight color="#a78bff" intensity={3.2} position={[-3, 1, -2]} />
      <pointLight color="#e879f9" intensity={2.6} position={[3, -1, -2]} />
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

export function AvatarScene({ confused = false, className }: AvatarSceneProps) {
  const [webgl, setWebgl] = useState(true);

  useEffect(() => {
    setWebgl(hasWebGL());
  }, []);

  if (!webgl) {
    return (
      <div className={className}>
        {/* [PLACEHOLDER: static fallback render] */}
        <img
          src="/avatar/fallback.png"
          alt="Sanjana Shetti avatar"
          className="h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 2]}
        camera={{ fov: 32, position: [0, 0.15, 7.2] }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <SceneLights />
          <AvatarFigure confused={confused} />
        </Suspense>
      </Canvas>
    </div>
  );
}
