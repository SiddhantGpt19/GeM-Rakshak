import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        // Core Neutral Canvas
        "off-white": "#F8FAFC",      // Crisp Slate-50 (Light Canvas)
        "dark-navy": "#0B0F19",      // Executive Slate-950 (Dark Canvas)
        "deep-navy": "#111827",      // Elevated Card Surface (Dark Slate-900)
        "soft-beige": "#FFFFFF",     // Pure White Card Surface (Light)
        "warm-beige": "#E2E8F0",     // Slate-200 Hairline Borders (Light)
        "crisp-white": "#F8FAFC",    // Crisp Foreground
        "muted-gray": "#94A3B8",     // Slate-400 Crisp Secondary Text

        // Primary Institutional Brand (Authoritative Gov Blue)
        "gov-blue": {
          DEFAULT: "#1D4ED8",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },

        // Backward-compatible humanized mappings:
        // lavender now maps to clean, trustworthy royal blue / indigo
        lavender: {
          DEFAULT: "#2563EB",
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#172554",
        },

        // coral-orange now maps to dignified crimson / alert red
        "coral-orange": {
          DEFAULT: "#DC2626",
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
        },

        // mint-green now maps to legitimate verified emerald
        "mint-green": {
          DEFAULT: "#059669",
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
        },
      },
      boxShadow: {
        "enterprise-sm": "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        "enterprise-md": "0 4px 6px -1px rgba(0, 0, 0, 0.08), 0 2px 4px -2px rgba(0, 0, 0, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
