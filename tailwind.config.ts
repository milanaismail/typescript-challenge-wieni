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
        bordeaux: "#310E10",
        beige: "#F7E7CE",
        darkGreen: "#272e24",
        darkOlive: "#55423d",
        darkOlive50: "rgba(85, 66, 61, 0.5)",
        highlight: "#8C6A5D",
      },
    },
  },
  plugins: [],
};
export default config;
