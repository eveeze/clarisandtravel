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
          DEFAULT: "#FAF8F4",
          50: "#FFFDF9",
          100: "#F6F3ED",
          200: "#EFEAE1",
        },
        ink: {
          DEFAULT: "#201C18",
          900: "#201C18",
          700: "#433D36",
          600: "#5C554C",
          500: "#746C62",
          400: "#948B7F",
        },
        sand: {
          50: "#F7F5F0",
          DEFAULT: "#EFEBE2",
          100: "#F4F1EA",
          200: "#E6E0D4",
          300: "#D6CFC0",
        },
        volcanic: {
          DEFAULT: "#2A2622",
          50: "#EFEDEA",
          100: "#D8D4CE",
          200: "#B7B1A8",
          300: "#8E877D",
          400: "#6B645B",
          500: "#4F4942",
          600: "#403B35",
          700: "#35312C",
          800: "#2E2A25",
          900: "#262320",
          950: "#1B1917",
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
