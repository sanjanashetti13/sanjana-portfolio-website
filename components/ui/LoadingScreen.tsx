"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/content";
import { GlowOrb } from "@/components/ui/GlowOrb";
import { motionEase } from "@/lib/utils";

const SPLASH_KEY = "portfolio-loaded";
const SPLASH_MS = 700;

function shouldShowSplash(): boolean {
  if (typeof window === "undefined") return false;
  return !sessionStorage.getItem(SPLASH_KEY);
}

export function LoadingScreen() {
  const [visible, setVisible] = useState(shouldShowSplash);

  useEffect(() => {
    if (!visible) return;

    sessionStorage.setItem(SPLASH_KEY, "true");
    const timer = window.setTimeout(() => setVisible(false), SPLASH_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex items-center justify-center bg-[var(--bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: motionEase }}
        >
          <GlowOrb size={340} color="violet" opacity={0.18} className="left-1/4 top-1/4 -translate-x-1/2" />
          <GlowOrb size={460} color="pink" opacity={0.12} className="right-1/4 top-1/3 translate-x-1/2" />
          <motion.div
            className="relative z-10 flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[var(--line)] font-display text-[13px] font-semibold text-[var(--ink)]"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: motionEase }}
          >
            {profile.initials}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
