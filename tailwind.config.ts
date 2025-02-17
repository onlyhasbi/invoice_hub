import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        deepBlue: "#1C2434",
        disabled: "#9D9D9D",
        softBlue: "#F1F5F9",
        reggaLight: "#EFF4FB",
        regga: "#E2E8F0",
      },
    },
  },
  plugins: [
    function ({ addComponents }: PluginAPI) {
      addComponents({
        ".required::after": {
          content: '"*"',
          color: "red",
          marginLeft: "2px",
        },
      });
    },
  ],
};
export default config;
