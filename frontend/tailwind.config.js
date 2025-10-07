/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
 // tailwind.config.js
theme: {
  extend: {
    typography: (theme) => ({
      DEFAULT: {
        css: {
          color: theme("colors.gray.900"),
          a: {
            color: theme("colors.indigo.600"),
            "&:hover": { color: theme("colors.indigo.500") },
          },
          h1: { fontWeight: "800", fontSize: "2.5rem" },
          h2: { fontWeight: "700" },
        },
      },
      fontFamily: {
      sora: ['Sora', 'sans-serif'],
    },
    }),
  },
},

  plugins: [],
};
