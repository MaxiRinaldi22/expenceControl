/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "back-main-color": "#001D3D",
        "component-color": "#000814",
      },
    },
  },
  plugins: [],
};
