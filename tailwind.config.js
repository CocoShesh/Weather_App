/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "city-bg": "url('/bg-city.jpg')",
      },
    },
  },
  plugins: [],
};
