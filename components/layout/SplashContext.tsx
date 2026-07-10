"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { useLocation } from "react-router-dom";

const SPLASH_KEY = "portfolio-loaded";

export type SplashPhase = "welcome" | "transition" | "complete";

type SplashContextValue = {
  phase: SplashPhase;
  setPhase: (phase: SplashPhase) => void;
  heroRobotRef: RefObject<HTMLDivElement | null>;
  splashActive: boolean;
};

const SplashContext = createContext<SplashContextValue | null>(null);

function shouldSkipSplash(): boolean {
  if (typeof window === "undefined") return true;
  return !!sessionStorage.getItem(SPLASH_KEY);
}

export function SplashProvider({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const heroRobotRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<SplashPhase>(() =>
    isHome && !shouldSkipSplash() ? "welcome" : "complete"
  );

  useEffect(() => {
    if (!isHome) {
      setPhase("complete");
      return;
    }
    if (!shouldSkipSplash()) {
      setPhase("welcome");
    }
  }, [isHome]);

  useEffect(() => {
    if (phase === "complete" && isHome) {
      sessionStorage.setItem(SPLASH_KEY, "true");
    }
  }, [phase, isHome]);

  const splashActive = isHome && phase !== "complete";

  return (
    <SplashContext.Provider value={{ phase, setPhase, heroRobotRef, splashActive }}>
      {children}
    </SplashContext.Provider>
  );
}

export function useSplash() {
  const ctx = useContext(SplashContext);
  if (!ctx) {
    throw new Error("useSplash must be used within SplashProvider");
  }
  return ctx;
}
