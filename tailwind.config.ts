import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["Instrument Serif", "serif"],
        body: ["Space Grotesk", "sans-serif"],
      },
      colors: {
        paper: {
          DEFAULT: "#FAFAF7",
          50: "#FDFDFB",
          100: "#F7F7F3",
          200: "#F0EFE9",
        },
        ink: {
          DEFAULT: "#14191A",
          900: "#14191A",
          700: "#3D4648",
          600: "#556062",
          500: "#6B7678",
          400: "#8A9394",
        },
        sand: {
          50: "#F7F6F1",
          DEFAULT: "#EFEEE8",
          100: "#F4F3EE",
          200: "#E7E5DD",
          300: "#D8D5CB",
        },
        volcanic: {
          DEFAULT: "#12382B",
          50: "#E7F0EB",
          100: "#C8DAD0",
          200: "#A0BDAE",
          300: "#6E9A85",
          400: "#4A7D66",
          500: "#2E614A",
          600: "#24503C",
          700: "#1C4030",
          800: "#16352A",
          900: "#122B22",
          950: "#0C1E18",
        },
        gold: {
          DEFAULT: "#C8962C",
          50: "#FBF5E6",
          100: "#F5E6C2",
          200: "#ECD295",
          300: "#E2BC62",
          400: "#D5A93F",
          500: "#C8962C",
          600: "#A87A22",
          700: "#8A621D",
          800: "#6C4C17",
          900: "#4E3610",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        card: "0 1px 3px rgba(20, 25, 26, 0.06)",
        cardHover: "0 12px 40px rgba(20, 25, 26, 0.12)",
        gold: "0 4px 24px -4px rgba(200, 150, 44, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
