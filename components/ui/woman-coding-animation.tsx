import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

type WomanCodingAnimationProps = {
  className?: string;
};

const HERO_ILLUSTRATION_SRC = "/animations/hero-woman-laptop.png";

const entranceEase = [0.22, 1, 0.36, 1] as const;

export function WomanCodingAnimation({ className }: WomanCodingAnimationProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={cn("relative z-10", className)}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: entranceEase, delay: 0.4 }}
    >
      <motion.img
        src={HERO_ILLUSTRATION_SRC}
        alt=""
        className="h-auto w-[min(20rem,72vw)] object-contain md:w-[min(24rem,36vw)] lg:w-[min(28rem,32vw)]"
        animate={
          reducedMotion
            ? undefined
            : {
                y: [0, -18, 0],
                scale: [1, 1.035, 1],
                rotate: [-0.6, 0.6, -0.6],
              }
        }
        transition={
          reducedMotion
            ? undefined
            : {
                duration: 3.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1,
              }
        }
        aria-hidden="true"
      />

      {!reducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-[10%] bottom-[5%] h-[20%] rounded-full bg-purple-500/30 blur-2xl"
          animate={{ opacity: [0.3, 0.75, 0.3], scale: [0.9, 1.12, 0.9] }}
          transition={{
            duration: 3.8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
}
