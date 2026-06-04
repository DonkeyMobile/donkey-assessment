import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        paper: "oklch(0.972 0.008 78)",
        surface: "oklch(0.995 0.004 80)",
        ink: "oklch(0.245 0.008 60)",
        "ink-soft": "oklch(0.46 0.012 62)",
        faint: "oklch(0.62 0.012 64)",
        line: "oklch(0.905 0.010 72)",
        charcoal: "oklch(0.205 0.006 58)",
        "charcoal-soft": "oklch(0.28 0.007 58)",
        accent: "var(--accent)",
        terracotta: "oklch(0.585 0.108 45)",
        "terracotta-dark": "oklch(0.505 0.103 43)",
        amber: "oklch(0.765 0.105 72)",
        "amber-soft": "oklch(0.86 0.06 78)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(40,30,20,0.04), 0 8px 24px -12px rgba(60,45,30,0.18)",
        lift: "0 2px 4px rgba(40,30,20,0.05), 0 18px 40px -16px rgba(60,45,30,0.28)",
      },
      keyframes: {
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        rise: { "0%": { transform: "translateY(10px)" }, "100%": { transform: "translateY(0)" } },
        "scale-in": { "0%": { transform: "scale(0.985)" }, "100%": { transform: "scale(1)" } },
        "hero-in": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in .35s ease both",
        rise: "rise .45s cubic-bezier(.2,.7,.3,1) both",
        "scale-in": "scale-in .25s cubic-bezier(.2,.7,.3,1) both",
        "hero-in": "hero-in .8s cubic-bezier(.22,.61,.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
