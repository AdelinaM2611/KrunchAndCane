import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        leaf: {
          green: "#0F8A3C",
          deep: "#0B5D2A",
        },
        sugarcane: {
          yellow: "#FFD24A",
        },
        orange: {
          accent: "#FF8A00",
        },
        cream: {
          DEFAULT: "#FFF7E6",
          light: "#FFFBF0",
        },
      },
    },
  },
  plugins: [],
};

export default config;


