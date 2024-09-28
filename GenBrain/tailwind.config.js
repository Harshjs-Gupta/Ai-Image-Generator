/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-thin::-webkit-scrollbar": {
          width: "6px",
        },
        ".scrollbar-thin::-webkit-scrollbar-track": {
          "background-color": "transparent", // Light background
        },
        ".scrollbar-thin::-webkit-scrollbar-thumb": {
          "background-color": "rgb(26, 25, 40)", // Light orange thumb
          "border-radius": "10px",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
