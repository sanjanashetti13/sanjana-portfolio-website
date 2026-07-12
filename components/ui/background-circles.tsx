import { motion } from "framer-motion";
import { useState } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export const COLOR_VARIANTS = {
  primary: {
    border: [
      "border-emerald-500/60",
      "border-cyan-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-emerald-500/30",
    glow: ["#0F766E", "#2DD4BF"],
  },
  secondary: {
    border: [
      "border-violet-500/60",
      "border-fuchsia-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-violet-500/30",
    glow: ["#7C3AED", "#E879F9"],
  },
  tertiary: {
    border: [
      "border-orange-500/60",
      "border-yellow-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-orange-500/30",
    glow: ["#EA580C", "#FACC15"],
  },
  quaternary: {
    border: [
      "border-purple-500/60",
      "border-pink-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-purple-500/30",
    glow: ["#9333EA", "#F472B6"],
  },
  quinary: {
    border: [
      "border-red-500/60",
      "border-rose-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-red-500/30",
    glow: ["#DC2626", "#FB7185"],
  },
  senary: {
    border: [
      "border-blue-500/60",
      "border-sky-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-blue-500/30",
    glow: ["#2563EB", "#38BDF8"],
  },
  septenary: {
    border: [
      "border-gray-500/60",
      "border-gray-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-gray-500/30",
    glow: ["#6B7280", "#9CA3AF"],
  },
  octonary: {
    border: [
      "border-red-500/60",
      "border-rose-400/50",
      "border-slate-600/30",
    ],
    gradient: "from-red-500/30",
    glow: ["#DC2626", "#FB7185"],
  },
} as const;

export type BackgroundCirclesVariant = keyof typeof COLOR_VARIANTS;

interface BackgroundCirclesProps {
  title?: string;
  description?: string;
  className?: string;
  variant?: BackgroundCirclesVariant;
  /** When true, renders only the animated circles (no title/description). */
  backgroundOnly?: boolean;
}

const AnimatedGrid = ({ reducedMotion }: { reducedMotion: boolean }) => (
  <motion.div
    className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_30%,black)]"
    animate={
      reducedMotion
        ? undefined
        : {
            backgroundPosition: ["0% 0%", "100% 100%"],
          }
    }
    transition={{
      duration: 40,
      repeat: Number.POSITIVE_INFINITY,
      ease: "linear",
    }}
  >
    <div className="h-full w-full [background-image:repeating-linear-gradient(100deg,#64748B_0%,#64748B_1px,transparent_1px,transparent_4%)] opacity-20" />
  </motion.div>
);

export function BackgroundCircles({
  title = "Background Circles",
  description = "Optional Description",
  className,
  variant = "quaternary",
  backgroundOnly = false,
}: BackgroundCirclesProps) {
  const reducedMotion = usePrefersReducedMotion();
  const variantStyles = COLOR_VARIANTS[variant];

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        backgroundOnly ? "h-full w-full bg-transparent" : "h-screen w-full bg-white dark:bg-black/5",
        className
      )}
    >
      <AnimatedGrid reducedMotion={reducedMotion} />

      <motion.div className="absolute inset-0">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              "absolute inset-0 rounded-full",
              "border-2 bg-gradient-to-br to-transparent",
              variantStyles.border[i],
              variantStyles.gradient
            )}
            animate={
              reducedMotion
                ? undefined
                : {
                    rotate: 360,
                    scale: [1, 1.05 + i * 0.05, 1],
                    opacity: [0.8, 1, 0.8],
                  }
            }
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full mix-blend-screen",
                `bg-[radial-gradient(ellipse_at_center,${variantStyles.gradient.replace(
                  "from-",
                  ""
                )}/10%,transparent_70%)]`
              )}
            />
          </motion.div>
        ))}
      </motion.div>

      {!backgroundOnly && (
        <motion.div
          className="relative z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1
            className={cn(
              "text-5xl font-bold tracking-tight md:text-7xl",
              "bg-gradient-to-b from-slate-950 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300",
              "drop-shadow-[0_0_32px_rgba(94,234,212,0.4)]"
            )}
          >
            {title}
          </h1>

          <motion.p
            className="mt-6 text-lg text-slate-950 md:text-xl dark:text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {description}
          </motion.p>
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_50%,#000_40%,transparent)]">
        <div
          className="absolute inset-0 blur-[120px]"
          style={{
            background: `radial-gradient(ellipse at center, ${variantStyles.glow[0]}30, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 blur-[80px]"
          style={{
            background: `radial-gradient(ellipse at center, ${variantStyles.glow[1]}26, transparent)`,
          }}
        />
      </div>
    </div>
  );
}

export function DemoCircles() {
  const [currentVariant, setCurrentVariant] =
    useState<BackgroundCirclesVariant>("quaternary");

  const variants = Object.keys(COLOR_VARIANTS) as BackgroundCirclesVariant[];

  function getNextVariant() {
    const currentIndex = variants.indexOf(currentVariant);
    return variants[(currentIndex + 1) % variants.length];
  }

  return (
    <>
      <BackgroundCircles variant={currentVariant} />
      <div className="absolute top-12 right-12">
        <button
          type="button"
          className="z-10 rounded-md bg-slate-950 px-4 py-1 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
          onClick={() => setCurrentVariant(getNextVariant())}
        >
          Change Variant
        </button>
      </div>
    </>
  );
}
