import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: true,
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
