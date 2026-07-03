export const themeConfig = {
  colors: {
    bg: "#FAFAF7",
    text: "#111827",
    muted: "#6B7280",
    primary: "#2563EB",
    secondary: "#7C3AED",
    dark: "#0B0F19",
    white: "#FFFFFF",
    border: "#E5E7EB",
    ink: "#111827",
    paper: "#FAFAF7",
    surface: "#ffffff",
    line: "#E5E7EB",
    night: "#0B0F19",
    clay: "#2563EB",
    sand: "#DBEAFE",
    sage: "#7C3AED",
    cream: "#F8FAFC",
    brandBg: "#FFFFFF",
    bodyWarm: "#FAFAF7",
    tickerBg: "#0B0F19",
    tickerText: "#FFFFFF",
    brandText: "#111827",
    fieldBorder: "#E5E7EB",
    textStrong: "#111827",
    textDeep: "#0B0F19",
    footerBg: "#0B0F19",
    success: "#047857",
    danger: "#8a332e",
    mediaBg: "#F3F4F6",
    blue: "#2563EB",
    gold: "#7C3AED",
    red: "#DC2626",
  },
  shadows: {
    default: "0 24px 70px rgba(17, 24, 39, 0.12)",
  },
  fonts: {
    body: "\"Inter\", \"Manrope\", \"Poppins\", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    brand: "\"Inter\", \"Manrope\", ui-sans-serif, system-ui, sans-serif",
  },
};

export function applyThemeVariables(theme = themeConfig) {
  const root = document.documentElement;
  root.style.setProperty("--color-bg", theme.colors.bg);
  root.style.setProperty("--color-text", theme.colors.text);
  root.style.setProperty("--color-muted", theme.colors.muted);
  root.style.setProperty("--color-primary", theme.colors.primary);
  root.style.setProperty("--color-secondary", theme.colors.secondary);
  root.style.setProperty("--color-dark", theme.colors.dark);
  root.style.setProperty("--color-white", theme.colors.white);
  root.style.setProperty("--color-border", theme.colors.border);
  root.style.setProperty("--ink", theme.colors.ink);
  root.style.setProperty("--muted", theme.colors.muted);
  root.style.setProperty("--paper", theme.colors.paper);
  root.style.setProperty("--surface", theme.colors.surface);
  root.style.setProperty("--line", theme.colors.line);
  root.style.setProperty("--night", theme.colors.night);
  root.style.setProperty("--clay", theme.colors.clay);
  root.style.setProperty("--sand", theme.colors.sand);
  root.style.setProperty("--sage", theme.colors.sage);
  root.style.setProperty("--cream", theme.colors.cream);
  root.style.setProperty("--brand-bg", theme.colors.brandBg);
  root.style.setProperty("--body-warm", theme.colors.bodyWarm);
  root.style.setProperty("--ticker-bg", theme.colors.tickerBg);
  root.style.setProperty("--ticker-text", theme.colors.tickerText);
  root.style.setProperty("--brand-text", theme.colors.brandText);
  root.style.setProperty("--field-border", theme.colors.fieldBorder);
  root.style.setProperty("--text-strong", theme.colors.textStrong);
  root.style.setProperty("--text-deep", theme.colors.textDeep);
  root.style.setProperty("--footer-bg", theme.colors.footerBg);
  root.style.setProperty("--success", theme.colors.success);
  root.style.setProperty("--danger", theme.colors.danger);
  root.style.setProperty("--media-bg", theme.colors.mediaBg);
  root.style.setProperty("--blue", theme.colors.blue);
  root.style.setProperty("--gold", theme.colors.gold);
  root.style.setProperty("--red", theme.colors.red);
  root.style.setProperty("--shadow", theme.shadows.default);
  root.style.setProperty("--font-body", theme.fonts.body);
  root.style.setProperty("--font-brand", theme.fonts.brand);
}
