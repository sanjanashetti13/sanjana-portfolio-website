"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { type ReactNode } from "react";
import { motionEase } from "@/lib/utils";

export function PageTransition({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.3, ease: motionEase }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
