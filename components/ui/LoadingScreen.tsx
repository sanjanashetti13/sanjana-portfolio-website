"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSplash } from "@/components/layout/SplashContext";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase } from "@/lib/utils";

const WELCOME_HOLD_MS = 2000;
const TRANSITION_MS = 900;

function SplashLoader() {
  return (
    <div className="flex w-[min(72vw,220px)] flex-col items-center gap-4">
      <div className="flex items-center gap-2">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="h-2 w-2 rounded-full"
            style={{
              background: i === 1 ? "#e879f9" : i === 0 ? "#a78bfa" : "#c084fc",
            }}
            animate={{ opacity: [0.35, 1, 0.35], y: [0, -5, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.14,
            }}
          />
        ))}
      </div>

      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-[var(--line)]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: "linear-gradient(90deg, #7c5cff 0%, #e879f9 55%, #f0abfc 100%)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: WELCOME_HOLD_MS / 1000, ease: motionEase }}
        />
        <motion.div
          className="absolute inset-y-0 w-1/3 rounded-full opacity-70"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
          }}
          animate={{ x: ["-120%", "320%"] }}
          transition={{ duration: 1.15, repeat: Infinity, ease: "linear" }}
        />
      </div>
    </div>
  );
}

export function LoadingScreen() {
  const { phase, setPhase, splashActive } = useSplash();
  const reduced = usePrefersReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (splashActive) setMounted(true);
  }, [splashActive]);

  useEffect(() => {
    if (!splashActive || reduced) return;
    if (phase !== "welcome") return;

    const timer = window.setTimeout(() => setPhase("transition"), WELCOME_HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reduced, setPhase, splashActive]);

  useEffect(() => {
    if (!splashActive || reduced) return;
    if (phase !== "transition") return;

    const timer = window.setTimeout(() => setPhase("complete"), TRANSITION_MS);
    return () => window.clearTimeout(timer);
  }, [phase, reduced, setPhase, splashActive]);

  useEffect(() => {
    if (!splashActive || !reduced) return;
    const timer = window.setTimeout(() => setPhase("complete"), 300);
    return () => window.clearTimeout(timer);
  }, [reduced, setPhase, splashActive]);

  if (!splashActive || !mounted) return null;

  const showWelcome = phase === "welcome";

  return (
    <AnimatePresence>
      <div className="pointer-events-none fixed inset-0 z-[300]">
        <motion.div
          className="absolute inset-0 bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "transition" ? 0 : 1 }}
          transition={{ duration: 0.65, ease: motionEase }}
        />

        <motion.div
          className="absolute inset-0 z-[301] flex flex-col items-center justify-center gap-10 px-6"
          initial={false}
          animate={{
            opacity: phase === "transition" ? 0 : 1,
            y: phase === "transition" ? -12 : 0,
          }}
          transition={{ duration: 0.55, ease: motionEase }}
        >
          <AnimatePresence>
            {showWelcome && (
              <motion.h1
                className="w-full max-w-[90vw] text-center font-display text-[clamp(24px,5vw,42px)] font-semibold tracking-tight text-[var(--ink)]"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.55, ease: motionEase }}
              >
                Welcome to my Portfolio
              </motion.h1>
            )}
          </AnimatePresence>

          {showWelcome && <SplashLoader />}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
