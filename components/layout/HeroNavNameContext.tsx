"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type RefObject,
} from "react";
import { useLocation } from "react-router-dom";
import { useHeroNameDock } from "@/lib/useHeroNameDock";

type HeroNavNameContextValue = {
  heroNameRef: RefObject<HTMLHeadingElement | null>;
  navNameRef: RefObject<HTMLSpanElement | null>;
  isHome: boolean;
  registerHero: () => void;
  unregisterHero: () => void;
};

const HeroNavNameContext = createContext<HeroNavNameContextValue | null>(null);

export function HeroNavNameProvider({ children }: { children: ReactNode }) {
  const heroNameRef = useRef<HTMLHeadingElement>(null);
  const navNameRef = useRef<HTMLSpanElement>(null);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [heroReady, setHeroReady] = useState(false);

  const registerHero = useCallback(() => setHeroReady(true), []);
  const unregisterHero = useCallback(() => setHeroReady(false), []);

  useHeroNameDock(heroNameRef, navNameRef, isHome && heroReady, isHome);

  return (
    <HeroNavNameContext.Provider
      value={{ heroNameRef, navNameRef, isHome, registerHero, unregisterHero }}
    >
      {children}
    </HeroNavNameContext.Provider>
  );
}

export function useHeroNavName() {
  const context = useContext(HeroNavNameContext);
  if (!context) {
    throw new Error("useHeroNavName must be used within HeroNavNameProvider");
  }
  return context;
}
