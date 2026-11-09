import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          red: "#D90016",
          "red-hover": "#B80012",
          black: "#101010",
          "off-white": "#F7F6F2",
          sakura: {
            50: "#FFF5F7",
            100: "#FFE4E8",
            200: "#FFCCD5",
            300: "#FFB7C5",
            400: "#FF8DA1",
            500: "#F43F5E",
          },
          fuji: {
            50: "#F0F7FF",
            100: "#E0EFFE",
            200: "#BAE0FD",
            500: "#3B82F6",
          },
          matcha: {
            50: "#F2F9F4",
            100: "#DCF2E2",
            500: "#22C55E",
            600: "#16A34A",
          },
          gold: {
            400: "#FBBF24",
            500: "#F59E0B",
          }
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "var(--font-bensen)", "BenSen", "var(--font-noto-sans-jp)", "sans-serif"],
        japanese: ["var(--font-noto-sans-jp)", "sans-serif"],
        mincho: ["var(--font-shippori-mincho)", "serif"],
        bangla: ["var(--font-bensen)", "BenSen", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
      },
      boxShadow: {
        kawaii: "0 8px 30px rgba(217, 0, 22, 0.08)",
        sakura: "0 10px 25px -5px rgba(255, 183, 197, 0.4)",
        card: "0 4px 20px -2px rgba(16, 16, 16, 0.06)",
        "card-dark": "0 4px 20px -2px rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        petal: {
          "0%": { transform: "translateY(-10px) rotate(0deg)", opacity: "0" },
          "20%": { opacity: "0.8" },
          "100%": { transform: "translateY(100vh) rotate(360deg)", opacity: "0" },
        }
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        petal: "petal 10s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
