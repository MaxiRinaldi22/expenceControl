/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "back-main-color": "#243B55",
        "component-color": "#1F2D3D",
      },
    },
  },
  plugins: [],
};
