import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import type { RefObject } from "react";
import { grayPanel, silverRing, whiteGloss, whiteSoft } from "./robotMaterials";
import { lerp } from "./useRobotMouse";

const SCREEN_CLOSED = -Math.PI / 2;
const SCREEN_OPEN = 0;

const laptopBody = new THREE.MeshPhysicalMaterial({
  color: "#6b7585",
  roughness: 0.22,
  metalness: 0.88,
  clearcoat: 0.65,
  clearcoatRoughness: 0.08,
  emissive: "#1e2633",
  emissiveIntensity: 0.22,
});

const laptopDeck = new THREE.MeshPhysicalMaterial({
  color: "#4f5868",
  roughness: 0.28,
  metalness: 0.82,
  clearcoat: 0.5,
  emissive: "#151b24",
  emissiveIntensity: 0.12,
});

const screenBezel = new THREE.MeshPhysicalMaterial({
  color: "#9aa5b5",
  roughness: 0.16,
  metalness: 0.75,
  clearcoat: 0.55,
});

const screenGlow = new THREE.MeshStandardMaterial({
  color: "#f7faff",
  emissive: "#dce8f8",
  emissiveIntensity: 0,
  roughness: 0.08,
  metalness: 0.02,
});

const editorBg = new THREE.MeshStandardMaterial({
  color: "#1a2230",
  emissive: "#121a28",
  emissiveIntensity: 0,
  roughness: 0.35,
  transparent: true,
  opacity: 0,
});

const codeLine = new THREE.MeshStandardMaterial({
  color: "#eef3fa",
  emissive: "#b8cce4",
  emissiveIntensity: 0,
  roughness: 0.14,
  transparent: true,
  opacity: 0,
});

const codeLineDim = new THREE.MeshStandardMaterial({
  color: "#b8c8dc",
  emissive: "#7f97b4",
  emissiveIntensity: 0,
  roughness: 0.18,
  transparent: true,
  opacity: 0,
});

const accentLine = new THREE.MeshStandardMaterial({
  color: "#ffb7c5",
  emissive: "#ff9fb2",
  emissiveIntensity: 0,
  roughness: 0.12,
  transparent: true,
  opacity: 0,
});

const cursorDot = new THREE.MeshStandardMaterial({
  color: "#ffffff",
  emissive: "#ffffff",
  emissiveIntensity: 0,
  transparent: true,
  opacity: 0,
});

const underGlow = new THREE.MeshStandardMaterial({
  color: "#dde7f2",
  emissive: "#8fa3b8",
  emissiveIntensity: 0.55,
  transparent: true,
  opacity: 0.35,
});

const CODE_LINES = [
  { width: 1.15, x: -0.2, y: 0.32, material: codeLine },
  { width: 0.92, x: -0.08, y: 0.18, material: codeLineDim },
  { width: 1.02, x: -0.14, y: 0.04, material: accentLine },
  { width: 0.78, x: 0.02, y: -0.1, material: codeLineDim },
  { width: 0.88, x: -0.04, y: -0.24, material: codeLine },
  { width: 0.62, x: 0.12, y: -0.38, material: codeLineDim },
];

const LID_HEIGHT = 1.42;
const LID_CENTER_Y = LID_HEIGHT / 2;

function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

function setScreenVisibility(progress: number) {
  const glow = easeOutCubic(Math.max(0, (progress - 0.35) / 0.65));
  const content = easeOutCubic(Math.max(0, (progress - 0.5) / 0.5));

  screenGlow.emissiveIntensity = 2.8 * glow;
  editorBg.emissiveIntensity = 0.65 * glow;
  editorBg.opacity = glow;

  codeLine.emissiveIntensity = 1.75 * content;
  codeLine.opacity = content;
  codeLineDim.emissiveIntensity = 1.1 * content;
  codeLineDim.opacity = content;
  accentLine.emissiveIntensity = 1.4 * content;
  accentLine.opacity = content;
  cursorDot.emissiveIntensity = 2.4 * content;
  cursorDot.opacity = content;
}

interface LaptopFigureProps {
  openProgressRef?: RefObject<number>;
}

export function LaptopFigure({ openProgressRef }: LaptopFigureProps) {
  const rigRef = useRef<THREE.Group>(null);
  const lidRef = useRef<THREE.Group>(null);
  const cursorRef = useRef<THREE.Mesh>(null);
  const smoothOpen = useRef(openProgressRef?.current ?? 0);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const target = openProgressRef?.current ?? 1;
    smoothOpen.current = lerp(smoothOpen.current, target, 0.14);
    const open = easeOutCubic(smoothOpen.current);

    if (lidRef.current) {
      lidRef.current.rotation.x = THREE.MathUtils.lerp(SCREEN_CLOSED, SCREEN_OPEN, open);
    }

    setScreenVisibility(open);

    if (rigRef.current) {
      rigRef.current.rotation.y = Math.sin(t * 0.35) * 0.04;
      rigRef.current.rotation.x = Math.sin(t * 0.48) * 0.015;
      rigRef.current.position.y = Math.sin(t * 0.7) * 0.03;
    }

    if (cursorRef.current) {
      cursorRef.current.visible = open > 0.82 && Math.floor(t * 1.8) % 2 === 0;
    }
  });

  return (
    <group ref={rigRef} scale={1.15}>
      <RoundedBox
        args={[2.35, 0.1, 1.55]}
        radius={0.03}
        smoothness={4}
        material={laptopBody}
        position={[0, 0, 0]}
      />
      <RoundedBox
        args={[1.55, 0.02, 0.9]}
        radius={0.015}
        smoothness={4}
        material={laptopDeck}
        position={[0, 0.065, 0.12]}
      />
      <RoundedBox
        args={[0.42, 0.015, 0.28]}
        radius={0.01}
        smoothness={4}
        material={grayPanel}
        position={[0, 0.072, 0.42]}
      />

      <group position={[0, 0.05, -0.74]}>
        <group ref={lidRef} rotation={[SCREEN_CLOSED, 0, 0]}>
          <RoundedBox
            args={[2.2, LID_HEIGHT, 0.07]}
            radius={0.04}
            smoothness={4}
            material={whiteGloss}
            position={[0, LID_CENTER_Y, -0.02]}
          />
          <RoundedBox
            args={[2.05, 1.28, 0.04]}
            radius={0.03}
            smoothness={4}
            material={screenBezel}
            position={[0, LID_CENTER_Y, 0.01]}
          />

          <mesh
            position={[0, LID_CENTER_Y, 0.036]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={editorBg}
          >
            <planeGeometry args={[1.9, 1.14]} />
          </mesh>

          <mesh
            position={[0, LID_CENTER_Y, 0.038]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={screenGlow}
          >
            <planeGeometry args={[1.88, 1.12]} />
          </mesh>

          {CODE_LINES.map((line, index) => (
            <mesh
              key={index}
              material={line.material}
              position={[line.x, LID_CENTER_Y + line.y, 0.041]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[line.width, 0.055]} />
            </mesh>
          ))}

          <mesh
            position={[-0.55, LID_CENTER_Y + 0.88, 0.042]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={whiteSoft}
          >
            <planeGeometry args={[0.22, 0.055]} />
          </mesh>
          <mesh
            position={[-0.55, LID_CENTER_Y + 0.74, 0.042]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={codeLineDim}
          >
            <planeGeometry args={[0.16, 0.04]} />
          </mesh>
          <mesh
            ref={cursorRef}
            position={[0.34, LID_CENTER_Y + 0.04, 0.043]}
            rotation={[-Math.PI / 2, 0, 0]}
            material={cursorDot}
          >
            <planeGeometry args={[0.035, 0.11]} />
          </mesh>
        </group>
      </group>

      <RoundedBox
        args={[2.42, 0.04, 0.12]}
        radius={0.02}
        smoothness={4}
        material={silverRing}
        position={[0, -0.05, 0.78]}
      />

      <mesh position={[0, -0.12, 0.2]} rotation={[-Math.PI / 2, 0, 0]} material={underGlow}>
        <circleGeometry args={[1.65, 48]} />
      </mesh>
    </group>
  );
}
