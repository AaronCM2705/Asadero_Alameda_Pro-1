/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A0A",
        primary: "#ffb779",
        "primary-container": "#cd7f32",
        "on-primary": "#4c2700",
        "on-primary-container": "#432200",
        surface: "#0A0A0A",
        "on-surface": "#e2e2e2",
        "surface-container-low": "#1b1b1b",
        "surface-container": "#151515",
        "surface-container-highest": "#353535",
        "surface-container-lowest": "#050505",
        "surface-bright": "#222222",
        "on-surface-variant": "#d8c2b2",
        secondary: "#cdc6b8",
        "secondary-container": "#4d493e",
        error: "#ffb4ab",
      },
      fontFamily: {
        body: ["Be Vietnam Pro", "sans-serif"],
        headline: ["Playfair Display", "serif"],
        label: ["Be Vietnam Pro", "sans-serif"],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
