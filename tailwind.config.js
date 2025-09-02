/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./app/layouts/**/*.vue",
    "./app/global/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/app.vue",
    "./app/plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app/*.vue",
  ],
  theme: {
    extend: {
      transitionDuration: {
        DEFAULT: "300ms",
      },
      colors: {
        // base color
        primary: {
          DEFAULT: "#865bea", // light mode
          dark: "#42045d", // dark mode
        },
        harmony1: {
          DEFAULT: "#5beab2",
          dark: "#045d42",
        },
        harmony2: {
          DEFAULT: "#ea865b",
          dark: "#5d2104",
        },
        gold: {
          DEFAULT: "#ad8b30",
          dark: "#3a2c0a",
        },
        goldContrast: {
          DEFAULT: "#306aad",
          dark: "#0a1e3a",
        },
      },
    },
  },
  darkMode: "class",
};
