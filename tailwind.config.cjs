/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkBg: "#121212",
        cardBg: "#393839",
        textPrimary: "#e4e5e4",
        textSecondary: "#aeafae",
        purple: "#ba87fc",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
