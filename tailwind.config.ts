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
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
      },
      colors: {
        ivory: "#FAF6EE",
        forest: {
          50: "#EEF5F1",
          100: "#D7E6DE",
          200: "#AECCBD",
          300: "#7FB29C",
          400: "#4F9179",
          500: "#37715C",
          600: "#2F5D4A",
          700: "#264A3C",
          800: "#1B3A2F",
          900: "#142C23",
          950: "#0F211C",
        },
        teak: {
          50: "#FBF5EE",
          100: "#F4E5D3",
          200: "#E7C9A4",
          300: "#D9AB73",
          400: "#CB8F4F",
          500: "#C07A3E",
          600: "#A8652F",
          700: "#8A5228",
          800: "#6F4222",
          900: "#573520",
        },
        clay: {
          500: "#C07A3E",
          600: "#A8652F",
          700: "#9C4A2E",
        },
        sand: {
          50: "#F7F2E8",
          100: "#F1EAE0",
          200: "#E8DECB",
          300: "#D9CBB0",
        },
        ink: {
          400: "#8A7F72",
          500: "#5C544A",
          600: "#3A332C",
          900: "#201A15",
        },
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      boxShadow: {
        card: "0 2px 8px rgba(32, 26, 21, 0.06)",
        cardHover: "0 12px 32px rgba(32, 26, 21, 0.12)",
      },
    },
  },
  plugins: [],
} satisfies Config;
