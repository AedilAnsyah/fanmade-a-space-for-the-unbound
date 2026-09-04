import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Malam Loka Palette (Default)
        "bg-primary": "#0B1026",
        "bg-secondary": "#161B33",
        "bg-card": "#12182E",
        "brand-primary": "#F4C95D",
        "brand-secondary": "#5B6EE1",
        "brand-accent": "#7FE7D8",
        "text-main": "#F5F3ED",
        "text-muted": "#9CA3C4",

        // Dive Mind Palette (Supernatural / Features)
        "dive-bg": "#050914",
        "dive-card": "#0F172E",
        "dive-accent": "#00E5C7",
        "dive-secondary": "#8C6BFF",
        "dive-pulse": "#FF4D97",
        "dive-text": "#E7F6F2",
      },
      fontFamily: {
        display: ["var(--font-silkscreen)", "monospace"],
        body: ["var(--font-jakarta)", "sans-serif"],
        handwriting: ["var(--font-caveat)", "cursive"],
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      animation: {
        "float-slow": "float 6s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "pixel-spin": "pixelSpin 8s steps(8) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", filter: "drop-shadow(0 0 15px rgba(127, 231, 216, 0.4))" },
          "50%": { opacity: "1", filter: "drop-shadow(0 0 25px rgba(127, 231, 216, 0.8))" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
