export type GlowLevel = "off" | "low" | "medium" | "high";
export type ButtonStyle = "rounded" | "square" | "pill" | "outline" | "glass";
export type SectionSpacing = "compact" | "comfortable" | "luxury";
export type AnimationSpeed = "fast" | "normal" | "slow";
export type FontFamily =
  | "inter"
  | "manrope"
  | "satoshi"
  | "space-grotesk"
  | "general-sans"
  | "poppins";

export interface ThemeColors {
  background: string;
  backgroundSoft: string;
  surface: string;
  surface2: string;
  accent: string;
  accentSecondary: string;
  text: string;
  textDim: string;
  textFaint: string;
}

export interface UiThemeConfig {
  presetId: string | null;
  colors: ThemeColors;
  radius: number;
  glow: GlowLevel;
  font: FontFamily;
  buttonStyle: ButtonStyle;
  spacing: SectionSpacing;
  animationSpeed: AnimationSpeed;
}
