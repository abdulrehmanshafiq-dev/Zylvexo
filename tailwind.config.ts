import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: "#080B14",
          secondary: "#0E1220",
          card: "#131929",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          light: "rgba(255,255,255,0.12)",
        },
        accent: {
          violet: "#7C3AED",
          purple: "#A855F7",
          gold: "#D4A853",
        },
        text: {
          primary: "#F0F0F8",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        display: ["Syne", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(124,58,237,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(124,58,237,0.6)" },
        },
        "scroll-left": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-right": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scroll-left": "scroll-left 30s linear infinite",
        "scroll-right": "scroll-right 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
