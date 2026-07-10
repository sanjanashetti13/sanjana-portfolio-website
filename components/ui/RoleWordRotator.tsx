"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile } from "@/data/content";
import { usePrefersReducedMotion } from "@/lib/hooks";
import { motionEase } from "@/lib/utils";

export function RoleWordRotator() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % profile.roles.length);
    }, 2600);
    return () => clearInterval(interval);
  }, [reduced]);

  const currentRole = profile.roles[index];

  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className="font-body text-role-word italic text-[var(--violet)]">An</span>
      <div className="relative min-h-[1.2em] overflow-hidden">
        {reduced ? (
          <span className="gradient-text font-display text-role-word">{currentRole}</span>
        ) : (
          <AnimatePresence mode="wait">
            <motion.span
              key={currentRole}
              className="gradient-text font-display text-role-word inline-block"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease: motionEase }}
            >
              {currentRole}
            </motion.span>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
