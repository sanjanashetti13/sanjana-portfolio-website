"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  applyPortfolioTheme,
  PORTFOLIO_LIGHT_THEME,
  PORTFOLIO_THEME,
} from "@/lib/portfolioTheme";

export function PortfolioThemeSync() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    applyPortfolioTheme(resolvedTheme === "light" ? PORTFOLIO_LIGHT_THEME : PORTFOLIO_THEME);
  }, [resolvedTheme, mounted]);

  return null;
}
