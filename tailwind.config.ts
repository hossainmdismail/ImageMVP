import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        sky: "var(--color-sky)",
        sand: "var(--color-sand)",
        ember: "var(--color-ember)",
        leaf: "var(--color-leaf)"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(10, 18, 32, 0.18)"
      },
      backgroundImage: {
        "hero-radial":
          "radial-gradient(circle at top left, rgba(255, 150, 92, 0.28), transparent 32%), radial-gradient(circle at top right, rgba(89, 169, 255, 0.18), transparent 28%), linear-gradient(160deg, rgba(255,255,255,0.96), rgba(244,247,251,0.92))"
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        rise: "rise 600ms ease forwards"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        },
        rise: {
          from: { opacity: "0", transform: "translateY(18px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      }
    }
  },
  plugins: []
};

export default config;
