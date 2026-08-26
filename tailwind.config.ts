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
        volcanic: {
          DEFAULT: "#0F1D1A",
          50: "#E8EDEB",
          100: "#C5D1CD",
          200: "#95A8A1",
          300: "#657E75",
          400: "#3A5A4E",
          500: "#1F3D2F",
          600: "#1A3328",
          700: "#152B22",
          800: "#12241D",
          900: "#0F1D1A",
          950: "#0A1412",
        },
        gold: {
          DEFAULT: "#E8B34B",
          50: "#FDF4E1",
          100: "#F9E2B3",
          200: "#F3CD80",
          300: "#EDB953",
          400: "#E8B34B",
          500: "#D4A03A",
          600: "#B88C34",
          700: "#9A752E",
          800: "#7C5F28",
          900: "#5E4822",
        },
        stone: {
          DEFAULT: "#D9CDB8",
          50: "#F4F0E8",
          100: "#E9E1D3",
          200: "#D9CDB8",
          300: "#C5BFB0",
          400: "#A99A8A",
          500: "#8A7A6A",
          600: "#6C5E50",
          700: "#4E4238",
          800: "#302A24",
          900: "#1A1A17",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        gold: "0 4px 24px -4px rgba(232, 179, 75, 0.2)",
        card: "0 2px 12px rgba(0, 0, 0, 0.2)",
        cardHover: "0 12px 40px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;