import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMouseParallax } from "@/components/three/useMouseParallax";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

interface InteractiveRobotAvatarProps {
  src: string;
  alt: string;
  className?: string;
  /** Extra tilt for 404 page */
  confused?: boolean;
}

export function InteractiveRobotAvatar({
  src,
  alt,
  className,
  confused = false,
}: InteractiveRobotAvatarProps) {
  const { mouse, isTouch } = useMouseParallax();
  const reduced = usePrefersReducedMotion();

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const translateY = useMotionValue(0);

  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 20 });
  const springY = useSpring(translateY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    if (reduced) return;

    let raf = 0;
    const start = performance.now();
    let currentX = 0;
    let currentY = 0;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;

      const targetRotY = isTouch ? 0 : mouse.x * 0.35;
      const targetRotX = isTouch ? 0 : mouse.y * 0.12;

      currentY += (targetRotY - currentY) * 0.04;
      currentX += (targetRotX - currentX) * 0.04;

      const idleSwayY = Math.sin(elapsed * 0.4) * 0.05;
      const idleBob = Math.sin(elapsed * 1.1) * 0.05;

      const confusedRotY = confused ? 0.25 : 0;
      const confusedRotX = confused ? -0.15 : 0;

      rotateY.set((currentY + idleSwayY + confusedRotY) * (180 / Math.PI));
      rotateX.set(-(currentX + confusedRotX) * (180 / Math.PI));
      translateY.set(idleBob * 12);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [mouse, isTouch, reduced, confused, rotateX, rotateY, translateY]);

  if (reduced) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn("h-full w-full object-contain", className)}
      />
    );
  }

  return (
    <div
      className={cn("flex h-full w-full items-center justify-center", className)}
      style={{ perspective: "900px" }}
    >
      <motion.img
        src={src}
        alt={alt}
        draggable={false}
        className="h-full w-full max-h-full object-contain drop-shadow-[0_24px_60px_rgba(124,92,255,0.22)]"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          y: springY,
          transformStyle: "preserve-3d",
        }}
      />
    </div>
  );
}

export function AvatarFallbackImage({
  className,
  src = "/avatar/robot.png",
  alt = "Sanjana Shetti avatar",
}: {
  className?: string;
  src?: string;
  alt?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn("h-full w-full object-contain", className)}
    />
  );
}
