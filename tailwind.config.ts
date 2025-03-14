import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bordeaux: "#7A2F2F",
        beige: "#F5E6C8",
        gold: "#D4A373",
        darkBordeaux: "#5E1E1E",
        lightBordeaux: "#A33F3F",
      },
    },
  },
  plugins: [],
};
export default config;
