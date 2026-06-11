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
          primary: "#06070D",
          secondary: "#0A0D18",
          card: "#0E1120",
        },
        border: {
          DEFAULT: "rgba(255,255,255,0.07)",
          light: "rgba(255,255,255,0.12)",
        },
        accent: {
          violet: "#7C3AED",
          purple: "#A855F7",
          light: "#A78BFA",
          gold: "#D4A853",
        },
        text: {
          primary: "#F2F1F8",
          secondary: "#9CA0B3",
          muted: "#5F6577",
        },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body: ["Figtree", "sans-serif"],
        serif: ['"Instrument Serif"', "serif"],
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
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
        "aurora-drift": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(40px, -30px) scale(1.08)" },
          "66%": { transform: "translate(-30px, 20px) scale(0.96)" },
        },
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        float: "float 7s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "scroll-left": "scroll-left 32s linear infinite",
        "scroll-right": "scroll-right 32s linear infinite",
        aurora: "aurora-drift 14s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
