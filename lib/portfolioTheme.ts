import portfolioThemeJson from "@/data/portfolio-theme.json";
import { darkenHex, hexToRgba, isLightColor } from "@/lib/uiTheme/colorUtils";
import type { UiThemeConfig } from "@/lib/uiTheme/types";

const FONT_STACKS: Record<UiThemeConfig["font"], string> = {
  inter: '"Inter", system-ui, sans-serif',
  manrope: '"Manrope", system-ui, sans-serif',
  satoshi: '"Satoshi", system-ui, sans-serif',
  "space-grotesk": '"Space Grotesk", system-ui, sans-serif',
  "general-sans": '"General Sans", system-ui, sans-serif',
  poppins: '"Poppins", system-ui, sans-serif',
};

const FONT_LINKS: Partial<Record<UiThemeConfig["font"], string>> = {
  manrope:
    "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap",
  poppins:
    "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  satoshi:
    "https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap",
  "general-sans":
    "https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap",
};

const GLOW_MAP: Record<UiThemeConfig["glow"], number> = {
  off: 0,
  low: 0.12,
  medium: 0.28,
  high: 0.48,
};

const SPACING_MAP: Record<UiThemeConfig["spacing"], string> = {
  compact: "64px",
  comfortable: "88px",
  luxury: "120px",
};

const SPEED_MAP: Record<UiThemeConfig["animationSpeed"], string> = {
  fast: "0.18s",
  normal: "0.32s",
  slow: "0.55s",
};

export const PORTFOLIO_THEME = portfolioThemeJson as UiThemeConfig;

export const PORTFOLIO_LIGHT_THEME: UiThemeConfig = {
  ...PORTFOLIO_THEME,
  presetId: "graphite-ice-light",
  colors: {
    background: "#f5f8fc",
    backgroundSoft: "#e8edf3",
    surface: "#ffffff",
    surface2: "#dfe6ef",
    accent: "#3d5268",
    accentSecondary: "#d4788a",
    text: "#141a22",
    textDim: "#4a5568",
    textFaint: "#6b7280",
  },
};

function ensureFontLink(font: UiThemeConfig["font"]) {
  const href = FONT_LINKS[font];
  if (!href) return;
  const id = `portfolio-theme-font-${font}`;
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.id = id;
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

function buttonRadius(style: UiThemeConfig["buttonStyle"], cardRadius: number): string {
  switch (style) {
    case "square":
      return "4px";
    case "rounded":
      return `${Math.max(8, Math.round(cardRadius * 0.65))}px`;
    case "pill":
    default:
      return "999px";
  }
}

export function applyPortfolioTheme(config: UiThemeConfig) {
  const root = document.documentElement;
  const { colors } = config;
  const glowStrength = GLOW_MAP[config.glow];
  const accentDeep = darkenHex(colors.accent, 0.14);
  const lightBg = isLightColor(colors.background);

  ensureFontLink(config.font);

  root.style.setProperty("--bg", colors.background);
  root.style.setProperty("--bg-soft", colors.backgroundSoft);
  root.style.setProperty("--surface", colors.surface);
  root.style.setProperty("--surface-2", colors.surface2);
  root.style.setProperty("--card-bg", colors.surface);
  root.style.setProperty("--violet", colors.accent);
  root.style.setProperty("--violet-deep", accentDeep);
  root.style.setProperty("--pink", colors.accentSecondary);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-secondary", colors.accentSecondary);
  root.style.setProperty("--ink", colors.text);
  root.style.setProperty("--ink-dim", colors.textDim);
  root.style.setProperty("--ink-faint", colors.textFaint);
  root.style.setProperty("--line", hexToRgba(colors.accent, lightBg ? 0.2 : 0.16));
  root.style.setProperty(
    "--nav-bg",
    lightBg ? hexToRgba(colors.background, 0.82) : hexToRgba(colors.background, 0.72)
  );
  root.style.setProperty(
    "--gradient-primary",
    `linear-gradient(90deg, ${colors.accent}, ${colors.accentSecondary})`
  );
  root.style.setProperty(
    "--gradient-button",
    `linear-gradient(135deg, ${colors.surface} 0%, ${colors.surface2} 100%)`
  );
  root.style.setProperty("--radius-card", `${config.radius}px`);
  root.style.setProperty("--radius-pill", buttonRadius(config.buttonStyle, config.radius));
  root.style.setProperty("--section-padding-y", SPACING_MAP[config.spacing]);
  root.style.setProperty("--transition-base", SPEED_MAP[config.animationSpeed]);
  root.style.setProperty("--glow-strength", String(glowStrength));
  root.style.setProperty("--glow-button", hexToRgba(colors.accent, glowStrength));
  root.style.setProperty("--glow-card", hexToRgba(colors.accent, glowStrength * 0.75));
  root.style.setProperty("--glow-robot", hexToRgba(colors.accent, glowStrength * 1.1));
  root.style.setProperty(
    "--glow-robot-secondary",
    hexToRgba(colors.accentSecondary, glowStrength * 0.85)
  );
  root.style.setProperty("--glow-text", hexToRgba(colors.accent, glowStrength * 0.9));
  root.style.setProperty("--scrollbar-thumb", hexToRgba(colors.accent, lightBg ? 0.45 : 0.35));
  root.style.setProperty("--font-display", FONT_STACKS[config.font]);
  root.style.setProperty("--font-body", FONT_STACKS.inter);

  root.dataset.buttonStyle = config.buttonStyle;
  root.dataset.glowLevel = config.glow;
  root.dataset.uiSpacing = config.spacing;
  root.classList.toggle("light", lightBg);
  root.classList.toggle("dark", !lightBg);
}
