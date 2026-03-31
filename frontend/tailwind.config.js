/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        body: ["Manrope", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        astreon: {
          bg: "var(--astreon-bg)",
          "bg-alt": "var(--astreon-bg-alt)",
          surface: "var(--astreon-surface)",
          "surface-hover": "var(--astreon-surface-hover)",
          border: "var(--astreon-border)",
          accent: "var(--astreon-accent)",
          text: "var(--astreon-text-primary)",
          "text-muted": "var(--astreon-text-secondary)",
        },
        animus: {
          bg: "var(--animus-bg)",
          "bg-soft": "var(--animus-bg-soft)",
          surface: "var(--animus-surface)",
          border: "var(--animus-border)",
          text: "var(--animus-text)",
          "text-muted": "var(--animus-text-muted)",
          accent: "var(--animus-accent)",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        border: "hsl(var(--border))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "pulse-status": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "pulse-status": "pulse-status 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
