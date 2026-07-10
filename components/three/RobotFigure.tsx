import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import * as THREE from "three";
import {
  blackBorder,
  blackFaceplate,
  grayPanel,
  jointBlack,
  pinkAccent,
  pinkEmissive,
  silverRing,
  whiteGloss,
  whiteNose,
  whiteSoft,
} from "./robotMaterials";
import {
  HEAD_X_LIMIT,
  HEAD_Y_LIMIT,
  LERP,
  NECK_FACTOR,
  clamp,
  lerp,
  useMouseNormalized,
} from "./useRobotMouse";

function PinkStrip({
  position,
  size,
  rotation = [0, 0, 0] as [number, number, number],
}: {
  position: [number, number, number];
  size: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <mesh position={position} rotation={rotation} material={pinkAccent}>
      <boxGeometry args={size} />
    </mesh>
  );
}

function RibbedAbdomen({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, i * 0.055 - 0.17, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          material={jointBlack}
          scale={[1 - i * 0.015, 1, 1 - i * 0.02]}
        >
          <torusGeometry args={[0.36, 0.035, 8, 24]} />
        </mesh>
      ))}
    </group>
  );
}

function GlowingEye({
  position,
  scaleRef,
}: {
  position: [number, number, number];
  scaleRef: React.RefObject<THREE.Mesh | null>;
}) {
  return (
    <group position={position}>
      <mesh scale={[2.2, 2.2, 0.35]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#e879f9" transparent opacity={0.12} depthWrite={false} />
      </mesh>
      <mesh scale={[1.5, 1.5, 0.4]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial color="#f0abfc" transparent opacity={0.22} depthWrite={false} />
      </mesh>
      <mesh ref={scaleRef} material={pinkEmissive}>
        <sphereGeometry args={[0.155, 32, 32]} />
      </mesh>
      <mesh scale={0.35}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color="#fdf4ff" />
      </mesh>
    </group>
  );
}

function RoboticHand({ side }: { side: 1 | -1 }) {
  const fingerSpread = side * 0.028;
  return (
    <group position={[0, -0.34, 0.04]}>
      <RoundedBox args={[0.2, 0.14, 0.1]} radius={0.025} smoothness={6} material={jointBlack} />
      {[0, 1, 2, 3].map((i) => (
        <group key={i} position={[fingerSpread * (i - 1.5), -0.1, 0.02]}>
          <mesh position={[0, -0.05, 0]} material={jointBlack}>
            <boxGeometry args={[0.034, 0.1, 0.034]} />
          </mesh>
          <mesh position={[0, -0.13, 0.01]} material={jointBlack}>
            <boxGeometry args={[0.03, 0.07, 0.03]} />
          </mesh>
        </group>
      ))}
      <group position={[side * 0.09, -0.02, 0.03]} rotation={[0, 0, side * 0.4]}>
        <mesh position={[0, -0.05, 0]} material={jointBlack}>
          <boxGeometry args={[0.032, 0.09, 0.032]} />
        </mesh>
      </group>
    </group>
  );
}

function RoboticArm({ side }: { side: 1 | -1 }) {
  const x = side * 0.78;
  return (
    <group position={[x, 1.28, 0]}>
      {/* Shoulder cap */}
      <mesh material={whiteGloss}>
        <sphereGeometry args={[0.24, 24, 24]} />
      </mesh>
      <mesh position={[side * 0.08, -0.02, 0.06]} material={grayPanel}>
        <sphereGeometry args={[0.14, 16, 16]} />
      </mesh>
      <PinkStrip
        position={[side * 0.22, 0.02, 0.04]}
        size={[0.22, 0.045, 0.02]}
        rotation={[0, 0, side * 0.15]}
      />

      {/* Upper arm */}
      <group position={[side * 0.06, -0.28, 0]}>
        <RoundedBox args={[0.22, 0.42, 0.22]} radius={0.08} smoothness={6} material={whiteGloss} />
        <mesh position={[0, -0.26, 0]} material={jointBlack}>
          <sphereGeometry args={[0.09, 16, 16]} />
        </mesh>

        {/* Forearm */}
        <group position={[0, -0.48, 0.02]}>
          <RoundedBox
            args={[0.19, 0.38, 0.19]}
            radius={0.07}
            smoothness={6}
            material={whiteSoft}
            scale={[1, 1, 1]}
          />
          <PinkStrip position={[side * 0.1, 0.02, 0.06]} size={[0.05, 0.18, 0.02]} />
          <mesh position={[0, -0.22, 0]} material={jointBlack}>
            <cylinderGeometry args={[0.06, 0.06, 0.06, 12]} />
          </mesh>
          <RoboticHand side={side} />
        </group>
      </group>
    </group>
  );
}

function RoboticLeg({ side }: { side: 1 | -1 }) {
  const x = side * 0.26;
  return (
    <group position={[x, 0.02, 0]}>
      {/* Thigh */}
      <RoundedBox
        args={[0.34, 0.52, 0.3]}
        radius={0.1}
        smoothness={6}
        material={whiteGloss}
        position={[0, -0.28, 0.02]}
      />
      <PinkStrip position={[side * 0.17, -0.22, 0.08]} size={[0.04, 0.32, 0.02]} />

      {/* Knee */}
      <mesh position={[0, -0.58, 0.04]} material={jointBlack}>
        <sphereGeometry args={[0.11, 16, 16]} />
      </mesh>
      <RoundedBox
        args={[0.3, 0.18, 0.28]}
        radius={0.06}
        smoothness={6}
        material={whiteSoft}
        position={[0, -0.58, 0.1]}
      />
      <mesh position={[0, -0.58, 0.18]} rotation={[0.15, 0, 0]} material={pinkAccent}>
        <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} />
      </mesh>

      {/* Shin */}
      <RoundedBox
        args={[0.26, 0.38, 0.24]}
        radius={0.08}
        smoothness={6}
        material={whiteGloss}
        position={[0, -0.88, 0.04]}
      />

      {/* Boot */}
      <RoundedBox
        args={[0.38, 0.28, 0.48]}
        radius={0.1}
        smoothness={6}
        material={whiteGloss}
        position={[0, -1.18, 0.1]}
      />
      <mesh position={[0, -1.32, 0.08]} material={jointBlack}>
        <boxGeometry args={[0.4, 0.08, 0.52]} />
      </mesh>
      <PinkStrip position={[0, -1.22, 0.3]} size={[0.28, 0.05, 0.02]} />
      <PinkStrip position={[side * 0.16, -1.15, 0.18]} size={[0.04, 0.14, 0.02]} />
    </group>
  );
}

export function RobotFigure({
  confused = false,
  reducedMotion = false,
}: {
  confused?: boolean;
  reducedMotion?: boolean;
}) {
  const bodyRef = useRef<THREE.Group>(null);
  const neckRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Group>(null);
  const rightEyeRef = useRef<THREE.Group>(null);
  const leftEyeScaleRef = useRef<THREE.Mesh>(null);
  const rightEyeScaleRef = useRef<THREE.Mesh>(null);

  const { mouse, isTouch } = useMouseNormalized();
  const reduced = reducedMotion;

  const headY = useRef(0);
  const headX = useRef(0);
  const neckY = useRef(0);
  const neckX = useRef(0);
  const eyeY = useRef(0);
  const eyeX = useRef(0);
  const blinkPhase = useRef(0);
  const nextBlink = useRef(2.5);

  useFrame((state) => {
    if (!bodyRef.current || !neckRef.current || !headRef.current) return;

    const t = state.clock.elapsedTime;

    if (reduced) {
      bodyRef.current.position.y = 0;
      bodyRef.current.scale.set(1, 1, 1);
      headRef.current.rotation.set(confused ? -0.12 : 0, confused ? 0.22 : 0, 0);
      neckRef.current.rotation.set(0, 0, 0);
      return;
    }

    const floatY = Math.sin(t * 1.05) * 0.045;
    const breath = 1 + Math.sin(t * 0.75) * 0.012;
    bodyRef.current.position.y = floatY;
    bodyRef.current.scale.set(1, breath, 1);

    const idleHeadY = Math.sin(t * 0.38) * 0.025;
    const idleHeadX = Math.sin(t * 0.5) * 0.015;

    const mx = isTouch.current ? 0 : mouse.current.x;
    const my = isTouch.current ? 0 : mouse.current.y;

    const targetHeadY = clamp(mx * HEAD_Y_LIMIT + idleHeadY, -HEAD_Y_LIMIT, HEAD_Y_LIMIT);
    const targetHeadX = clamp(-my * HEAD_X_LIMIT + idleHeadX, -HEAD_X_LIMIT, HEAD_X_LIMIT);

    const confusedY = confused ? 0.22 : 0;
    const confusedX = confused ? -0.1 : 0;

    headY.current = lerp(headY.current, targetHeadY + confusedY, LERP);
    headX.current = lerp(headX.current, targetHeadX + confusedX, LERP);

    neckY.current = lerp(neckY.current, headY.current * NECK_FACTOR, LERP);
    neckX.current = lerp(neckX.current, headX.current * NECK_FACTOR, LERP);

    neckRef.current.rotation.y = neckY.current;
    neckRef.current.rotation.x = neckX.current;
    headRef.current.rotation.y = headY.current;
    headRef.current.rotation.x = headX.current;

    const targetEyeY = clamp(mx * 0.12, -0.12, 0.12);
    const targetEyeX = clamp(-my * 0.08, -0.08, 0.08);
    eyeY.current = lerp(eyeY.current, targetEyeY, LERP * 1.5);
    eyeX.current = lerp(eyeX.current, targetEyeX, LERP * 1.5);

    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.rotation.y = eyeY.current;
      leftEyeRef.current.rotation.x = eyeX.current;
      rightEyeRef.current.rotation.y = eyeY.current;
      rightEyeRef.current.rotation.x = eyeX.current;
    }

    blinkPhase.current += state.clock.getDelta();
    if (blinkPhase.current >= nextBlink.current) {
      blinkPhase.current = 0;
      nextBlink.current = 3 + Math.random() * 2.5;
    }

    const blinkT = blinkPhase.current;
    let eyeScaleY = 1;
    if (blinkT < 0.07) eyeScaleY = 1 - (blinkT / 0.07) * 0.94;
    else if (blinkT < 0.14) eyeScaleY = 0.06 + ((blinkT - 0.07) / 0.07) * 0.94;

    if (leftEyeScaleRef.current) leftEyeScaleRef.current.scale.y = eyeScaleY;
    if (rightEyeScaleRef.current) rightEyeScaleRef.current.scale.y = eyeScaleY;
  });

  return (
    <group scale={1.08} position={[0, -1.05, 0]}>
      <group ref={bodyRef}>
        {/* Pelvis */}
        <RoundedBox
          args={[0.82, 0.28, 0.48]}
          radius={0.1}
          smoothness={6}
          material={whiteGloss}
          position={[0, 0.38, 0]}
        />

        <RibbedAbdomen position={[0, 0.62, 0]} />

        {/* Chest — rounded, not boxy */}
        <RoundedBox
          args={[0.88, 0.62, 0.44]}
          radius={0.14}
          smoothness={8}
          material={whiteGloss}
          position={[0, 1.08, 0.02]}
        />
        <RoundedBox
          args={[0.62, 0.42, 0.06]}
          radius={0.04}
          smoothness={4}
          material={grayPanel}
          position={[0, 1.1, 0.24]}
        />
        <PinkStrip position={[-0.1, 1.18, 0.27]} size={[0.045, 0.14, 0.015]} />
        <PinkStrip position={[0, 1.18, 0.27]} size={[0.045, 0.14, 0.015]} />
        <PinkStrip position={[0.1, 1.18, 0.27]} size={[0.045, 0.14, 0.015]} />

        <RoboticArm side={-1} />
        <RoboticArm side={1} />
        <RoboticLeg side={-1} />
        <RoboticLeg side={1} />

        {/* Neck */}
        <group ref={neckRef} position={[0, 1.38, 0]}>
          <mesh material={jointBlack}>
            <cylinderGeometry args={[0.11, 0.13, 0.14, 16]} />
          </mesh>

          <group ref={headRef} position={[0, 0.18, 0]}>
            {/* Helmet — large rounded-square */}
            <RoundedBox
              args={[1.02, 0.94, 0.86]}
              radius={0.22}
              smoothness={10}
              material={whiteGloss}
              position={[0, 0.38, 0]}
            />

            {/* Antennas */}
            {[-0.38, 0.38].map((x) => (
              <group key={x} position={[x, 0.88, -0.05]}>
                <mesh material={whiteSoft}>
                  <capsuleGeometry args={[0.025, 0.12, 4, 8]} />
                </mesh>
                <mesh position={[0, 0.1, 0]} material={silverRing}>
                  <sphereGeometry args={[0.035, 12, 12]} />
                </mesh>
              </group>
            ))}

            {/* Headphone ear pieces */}
            {[-0.56, 0.56].map((x) => (
              <group key={x} position={[x, 0.32, 0]}>
                <mesh material={whiteGloss} rotation={[0, 0, Math.PI / 2]}>
                  <torusGeometry args={[0.14, 0.055, 12, 24]} />
                </mesh>
                <mesh material={silverRing} rotation={[0, 0, Math.PI / 2]}>
                  <torusGeometry args={[0.1, 0.018, 8, 24]} />
                </mesh>
                <PinkStrip position={[x > 0 ? 0.04 : -0.04, 0, 0]} size={[0.025, 0.12, 0.02]} />
              </group>
            ))}

            {/* Faceplate border */}
            <RoundedBox
              args={[0.78, 0.66, 0.06]}
              radius={0.08}
              smoothness={6}
              material={blackBorder}
              position={[0, 0.22, 0.42]}
            />

            {/* Faceplate */}
            <RoundedBox
              args={[0.72, 0.6, 0.04]}
              radius={0.07}
              smoothness={6}
              material={blackFaceplate}
              position={[0, 0.22, 0.46]}
            />

            {/* Nose light */}
            <mesh position={[0, 0.06, 0.5]} material={whiteNose}>
              <sphereGeometry args={[0.022, 12, 12]} />
            </mesh>

            {/* Eyes — ~40% face width each */}
            <group ref={leftEyeRef}>
              <GlowingEye position={[-0.19, 0.24, 0.49]} scaleRef={leftEyeScaleRef} />
            </group>
            <group ref={rightEyeRef}>
              <GlowingEye position={[0.19, 0.24, 0.49]} scaleRef={rightEyeScaleRef} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
