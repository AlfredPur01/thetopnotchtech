import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0A1628",
          blue: "#1B3F8B",
          orange: "#F4622A",
          light: "#F5F7FA",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        display: ["var(--font-plus-jakarta-sans)"],
        sans: ["var(--font-inter)"],
      },
      maxWidth: {
        "7xl": "80rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
