import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";

export const FLOATING_KEYWORDS = [
  "AI",
  "LLMs",
  "RAG",
  "Python",
  "React",
  "FastAPI",
  "Node.js",
  "Microservices",
  "Builder",
  "Problem Solver",
  "Machine Learning",
  "Full Stack",
  "Think",
  "Build",
  "Ship",
  "Innovation",
  "Curiosity",
] as const;

type WordLayout = {
  x: number;
  y: number;
  size: number;
  weight: number;
  color: "white" | "pink";
  blur: number;
  rotate: number;
  axis: "x" | "y";
  duration: number;
  opacity: number;
  drift: number;
  depth: number;
};

/** Positions are % of the full About section — edges & gaps, not behind the photo face */
const WORD_LAYOUTS: WordLayout[] = [
  { x: 6, y: 8, size: 72, weight: 700, color: "pink", blur: 0, rotate: -6, axis: "y", duration: 16, opacity: 0.14, drift: 18, depth: 0.45 },
  { x: 92, y: 6, size: 56, weight: 500, color: "white", blur: 0, rotate: 5, axis: "x", duration: 19, opacity: 0.12, drift: 16, depth: 0.5 },
  { x: 96, y: 32, size: 48, weight: 600, color: "pink", blur: 0, rotate: -4, axis: "y", duration: 14, opacity: 0.13, drift: 14, depth: 0.4 },
  { x: 4, y: 38, size: 64, weight: 500, color: "white", blur: 0, rotate: 4, axis: "x", duration: 18, opacity: 0.11, drift: 20, depth: 0.35 },
  { x: 88, y: 52, size: 44, weight: 700, color: "pink", blur: 1, rotate: -7, axis: "y", duration: 15, opacity: 0.12, drift: 12, depth: 0.55 },
  { x: 8, y: 58, size: 40, weight: 600, color: "white", blur: 0, rotate: 3, axis: "x", duration: 17, opacity: 0.13, drift: 22, depth: 0.4 },
  { x: 94, y: 68, size: 38, weight: 500, color: "pink", blur: 0, rotate: -5, axis: "y", duration: 20, opacity: 0.11, drift: 10, depth: 0.45 },
  { x: 3, y: 72, size: 52, weight: 600, color: "white", blur: 2, rotate: 6, axis: "x", duration: 22, opacity: 0.1, drift: 16, depth: 0.3 },
  { x: 78, y: 12, size: 50, weight: 700, color: "pink", blur: 0, rotate: -3, axis: "y", duration: 13, opacity: 0.15, drift: 14, depth: 0.5 },
  { x: 22, y: 82, size: 34, weight: 500, color: "white", blur: 0, rotate: 4, axis: "x", duration: 21, opacity: 0.12, drift: 18, depth: 0.35 },
  { x: 70, y: 86, size: 32, weight: 600, color: "pink", blur: 0, rotate: -5, axis: "y", duration: 18, opacity: 0.11, drift: 12, depth: 0.4 },
  { x: 48, y: 88, size: 42, weight: 700, color: "white", blur: 0, rotate: 7, axis: "x", duration: 16, opacity: 0.13, drift: 20, depth: 0.45 },
  { x: 58, y: 4, size: 60, weight: 700, color: "pink", blur: 0, rotate: -6, axis: "y", duration: 15, opacity: 0.14, drift: 16, depth: 0.5 },
  { x: 38, y: 6, size: 54, weight: 600, color: "white", blur: 1, rotate: 5, axis: "x", duration: 17, opacity: 0.12, drift: 14, depth: 0.35 },
  { x: 82, y: 78, size: 46, weight: 700, color: "pink", blur: 0, rotate: -2, axis: "y", duration: 14, opacity: 0.13, drift: 10, depth: 0.4 },
  { x: 14, y: 22, size: 42, weight: 500, color: "white", blur: 2, rotate: 6, axis: "x", duration: 19, opacity: 0.1, drift: 18, depth: 0.3 },
  { x: 66, y: 62, size: 58, weight: 600, color: "pink", blur: 0, rotate: -7, axis: "y", duration: 20, opacity: 0.14, drift: 15, depth: 0.55 },
];

function FloatingWord({
  text,
  layout,
  parallaxX,
  parallaxY,
  reduced,
}: {
  text: string;
  layout: WordLayout;
  parallaxX: ReturnType<typeof useSpring>;
  parallaxY: ReturnType<typeof useSpring>;
  reduced: boolean;
}) {
  const x = useTransform(parallaxX, (v) => v * layout.depth);
  const y = useTransform(parallaxY, (v) => v * layout.depth);

  const color =
    layout.color === "pink"
      ? "rgba(255, 183, 197, 1)"
      : "rgba(245, 243, 250, 1)";

  const floatAnimate = reduced
    ? undefined
    : layout.axis === "y"
      ? { y: [0, -layout.drift, 0, layout.drift * 0.6, 0] }
      : { x: [0, layout.drift, 0, -layout.drift * 0.7, 0] };

  const floatTransition = reduced
    ? undefined
    : {
        duration: layout.duration,
        repeat: Infinity,
        ease: "easeInOut" as const,
      };

  return (
    <motion.span
      className="floating-keyword"
      style={{
        left: `${layout.x}%`,
        top: `${layout.y}%`,
        fontSize: layout.size,
        fontWeight: layout.weight,
        color,
        opacity: layout.opacity,
        rotate: layout.rotate,
        filter: layout.blur > 0 ? `blur(${layout.blur}px)` : undefined,
        x,
        y,
      }}
    >
      <motion.span
        className="floating-keyword-inner"
        animate={floatAnimate}
        transition={floatTransition}
      >
        {text}
      </motion.span>
    </motion.span>
  );
}

export function FloatingKeywords() {
  const reduced = usePrefersReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const parallaxX = useSpring(mouseX, { stiffness: 35, damping: 22 });
  const parallaxY = useSpring(mouseY, { stiffness: 35, damping: 22 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(nx * 20);
      mouseY.set(ny * 16);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced, mouseX, mouseY]);

  return (
    <div className="floating-keywords" aria-hidden="true">
      {FLOATING_KEYWORDS.map((word, i) => (
        <FloatingWord
          key={word}
          text={word}
          layout={WORD_LAYOUTS[i] ?? WORD_LAYOUTS[0]}
          parallaxX={parallaxX}
          parallaxY={parallaxY}
          reduced={reduced}
        />
      ))}
    </div>
  );
}
