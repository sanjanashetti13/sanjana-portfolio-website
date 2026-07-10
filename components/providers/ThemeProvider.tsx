"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";
import { PortfolioThemeSync } from "@/components/providers/PortfolioThemeSync";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
      storageKey="portfolio-color-mode"
    >
      <PortfolioThemeSync />
      {children}
    </NextThemesProvider>
  );
}
