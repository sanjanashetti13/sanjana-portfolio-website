import type { ThemeColors } from "@/lib/uiTheme/types";

export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const normalized = hex.replace("#", "");
  if (![3, 6].includes(normalized.length)) return null;
  const full =
    normalized.length === 3
      ? normalized
          .split("")
          .map((c) => c + c)
          .join("")
      : normalized;
  const num = Number.parseInt(full, 16);
  if (Number.isNaN(num)) return null;
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function hexToRgba(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return `rgba(167, 139, 255, ${alpha})`;
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${alpha})`;
}

export function isLightColor(hex: string): boolean {
  const rgb = hexToRgb(hex);
  if (!rgb) return false;
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
  return luminance > 0.62;
}

export function mixHex(a: string, b: string, amount: number): string {
  const c1 = hexToRgb(a);
  const c2 = hexToRgb(b);
  if (!c1 || !c2) return a;
  const t = Math.min(1, Math.max(0, amount));
  const r = Math.round(c1.r + (c2.r - c1.r) * t);
  const g = Math.round(c1.g + (c2.g - c1.g) * t);
  const bVal = Math.round(c1.b + (c2.b - c1.b) * t);
  return `#${[r, g, bVal].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

export function darkenHex(hex: string, amount = 0.08): string {
  return mixHex(hex, "#000000", amount);
}

export function lightenHex(hex: string, amount = 0.08): string {
  return mixHex(hex, "#ffffff", amount);
}

export function buildThemeColors(input: {
  background: string;
  accent: string;
  surface: string;
  text: string;
  accentSecondary?: string;
  backgroundSoft?: string;
  surface2?: string;
  textDim?: string;
  textFaint?: string;
}): ThemeColors {
  const light = isLightColor(input.background);
  return {
    background: input.background,
    backgroundSoft:
      input.backgroundSoft ??
      (light ? darkenHex(input.background, 0.04) : lightenHex(input.background, 0.05)),
    surface: input.surface,
    surface2:
      input.surface2 ??
      (light ? darkenHex(input.surface, 0.06) : lightenHex(input.surface, 0.08)),
    accent: input.accent,
    accentSecondary: input.accentSecondary ?? input.accent,
    text: input.text,
    textDim:
      input.textDim ??
      (light ? mixHex(input.text, "#6b7280", 0.55) : mixHex(input.text, "#9a93b0", 0.65)),
    textFaint:
      input.textFaint ??
      (light ? mixHex(input.text, "#9ca3af", 0.7) : mixHex(input.text, "#5d5773", 0.7)),
  };
}
