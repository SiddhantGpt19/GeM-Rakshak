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
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        "off-white": "#F8FAFC",
        "deep-navy": "#0F172A", // Elevated Card Surface
        "dark-navy": "#090D16", // Deep Obsidian Canvas
        "soft-beige": "#FFFFFF",
        "warm-beige": "#E2E8F0",
        "crisp-white": "#F8FAFC",
        "muted-gray": "#64748B",
        lavender: {
          DEFAULT: "#6366F1",
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6366F1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
        },
        "coral-orange": {
          DEFAULT: "#F4643C",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#F4643C",
          600: "#ea580c",
          700: "#c2410c",
        },
        "mint-green": {
          DEFAULT: "#10B981",
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
        },
      },
      keyframes: {
        "laser-sweep": {
          "0%": { top: "0%", opacity: "0.85" },
          "50%": { top: "95%", opacity: "1" },
          "100%": { top: "0%", opacity: "0.85" },
        },
        "pulse-coral": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(244, 100, 60, 0.6)",
          },
          "50%": {
            boxShadow: "0 0 0 10px rgba(244, 100, 60, 0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "radar-scan": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "laser-sweep": "laser-sweep 3s ease-in-out infinite",
        "pulse-coral": "pulse-coral 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "radar-scan": "radar-scan 6s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
