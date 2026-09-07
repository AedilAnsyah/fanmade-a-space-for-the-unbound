import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      /* ───────────────────────────────────────────────
       * COLOR TOKENS — grouped by layer
       * ─────────────────────────────────────────────── */
      colors: {
        /* Constant — muncul di kedua lapisan */
        "book-red": {
          DEFAULT: "#B33A3A",
          glow: "#D8534F",
        },

        /* REALITY layer — nuansa siang/senja/nostalgia */
        reality: {
          bg: "#F4E9D8",
          "bg-secondary": "#E8D5B7",
          text: "#2B2018",
          "text-muted": "#6B5D4A", /* darkened from #8C7B65 for WCAG AA (4.8:1) */
          "accent-warm": "#C9633E",
          "accent-green": "#7A8B69",
        },

        /* DIVE layer — nuansa alam bawah sadar */
        dive: {
          bg: "#0A0E27",
          "bg-secondary": "#151B3D",
          text: "#EDEBFA",
          "text-muted": "#8A88B0",
          "accent-psychic": "#6C63FF",
          "accent-glow": "#35D4C7",
        },

        /* Tint per karakter (CSS var --dive-accent di-swap di runtime,
           tapi kita tetap daftarkan di sini untuk utility class) */
        tint: {
          atma: "#F2A65A",
          raya: "#6C63FF",
          nirmala: "#E94F9C",
        },
      },

      /* ───────────────────────────────────────────────
       * FONT FAMILIES — exposed via CSS variables
       * ─────────────────────────────────────────────── */
      fontFamily: {
        /* REALITY */
        "reality-heading": ["var(--font-special-elite)", "cursive"],
        "reality-body": ["var(--font-lora)", "serif"],
        /* DIVE */
        "dive-heading": ["var(--font-pixelify-sans)", "monospace"],
        "dive-body": ["var(--font-plus-jakarta-sans)", "sans-serif"],
      },

      /* ───────────────────────────────────────────────
       * ANIMATIONS — reusable keyframes
       * ─────────────────────────────────────────────── */
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px 2px var(--dive-accent, #6C63FF)" },
          "50%": { boxShadow: "0 0 20px 6px var(--dive-accent, #6C63FF)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "glow-pulse": "glow-pulse 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
