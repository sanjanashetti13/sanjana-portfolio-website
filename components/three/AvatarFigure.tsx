"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMouseParallax } from "./useMouseParallax";
import { usePrefersReducedMotion } from "@/lib/hooks";

const skinMaterial = new THREE.MeshStandardMaterial({
  color: "#E9E6EF",
  roughness: 0.55,
  metalness: 0.05,
});

const hairMaterial = new THREE.MeshStandardMaterial({
  color: "#171420",
  roughness: 0.4,
  metalness: 0.1,
});

const darkMaterial = new THREE.MeshStandardMaterial({
  color: "#201C2C",
  roughness: 0.5,
});

export function AvatarFigure({ confused = false }: { confused?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse, isTouch } = useMouseParallax();
  const reduced = usePrefersReducedMotion();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.elapsedTime;

    if (!reduced) {
      if (!isTouch) {
        targetRotation.current.x = mouse.y * 0.12;
        targetRotation.current.y = mouse.x * 0.35;
      }

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotation.current.y + Math.sin(elapsed * 0.4) * 0.05 + (confused ? 0.25 : 0),
        0.04
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotation.current.x + (confused ? -0.15 : 0),
        0.04
      );
      groupRef.current.position.y = 1.1 + Math.sin(elapsed * 1.1) * 0.05;
    } else {
      groupRef.current.rotation.y = confused ? 0.25 : 0;
      groupRef.current.rotation.x = confused ? -0.15 : 0;
      groupRef.current.position.y = 1.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 1.1, 0]}>
      {/* Torso */}
      <mesh position={[0, -2.55, 0]} scale={[1.35, 0.95, 0.85]} material={skinMaterial}>
        <sphereGeometry args={[2.1, 48, 32]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.95, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.42, 0.5, 0.6, 24]} />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.15, 0]} scale={[0.92, 1.05, 0.95]} material={skinMaterial}>
        <sphereGeometry args={[1, 48, 32]} />
      </mesh>

      {/* Jaw taper */}
      <mesh position={[0, -0.42, 0.08]} scale={[0.95, 0.75, 0.88]} material={skinMaterial}>
        <sphereGeometry args={[0.78, 32, 24]} />
      </mesh>

      {/* Ears */}
      <mesh position={[-0.92, 0.1, 0.02]} scale={[0.5, 1, 0.7]} material={skinMaterial}>
        <sphereGeometry args={[0.16, 20, 16]} />
      </mesh>
      <mesh position={[0.92, 0.1, 0.02]} scale={[0.5, 1, 0.7]} material={skinMaterial}>
        <sphereGeometry args={[0.16, 20, 16]} />
      </mesh>

      {/* Hair cap */}
      <mesh position={[0, 0.34, 0]} scale={[0.96, 1.08, 0.99]} material={hairMaterial}>
        <sphereGeometry args={[1.04, 48, 32, 0, Math.PI * 2, 0, 0.62 * Math.PI]} />
      </mesh>

      {/* Hair fringe */}
      <mesh
        position={[0, 0.62, 0.05]}
        rotation={[Math.PI, 0, 0]}
        scale={[0.98, 0.7, 1.02]}
        material={hairMaterial}
      >
        <sphereGeometry args={[1.0, 32, 20, 0, Math.PI * 2, 0, 0.34 * Math.PI]} />
      </mesh>

      {/* Eyes */}
      <mesh position={[-0.32, 0.16, 0.87]} material={darkMaterial}>
        <sphereGeometry args={[0.075, 16, 16]} />
      </mesh>
      <mesh position={[0.32, 0.16, 0.87]} material={darkMaterial}>
        <sphereGeometry args={[0.075, 16, 16]} />
      </mesh>

      {/* Eyebrows */}
      <mesh position={[-0.32, 0.32, 0.85]} rotation={[0, 0, 0.08]} material={hairMaterial}>
        <boxGeometry args={[0.26, 0.05, 0.05]} />
      </mesh>
      <mesh position={[0.32, 0.32, 0.85]} rotation={[0, 0, -0.08]} material={hairMaterial}>
        <boxGeometry args={[0.26, 0.05, 0.05]} />
      </mesh>

      {/* Mouth */}
      <mesh position={[0, -0.28, 0.9]} rotation={[0, 0, Math.PI]} material={darkMaterial}>
        <torusGeometry args={[0.16, 0.02, 8, 24, Math.PI]} />
      </mesh>
    </group>
  );
}
