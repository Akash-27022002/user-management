/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      colors: {
        grey: {
          1: "#F2F2F7",
          2: "e5e5e7",
        },
        blue: {
          1: "#007BFF",
        },
      },
    },
  },
  plugins: [],
};
