/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          100: "#e0f2fe",
          500: "#3b82f6",
          700: "#1e3a8a",
        },
      },
    },
  },
  plugins: [],
};
