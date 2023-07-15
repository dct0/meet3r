import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        header: "2rem 1fr 2rem",
      },
    },
  },
  daisyui: {
    themes: true,
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
} satisfies Config;
