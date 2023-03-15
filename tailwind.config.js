/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "off-white": "#ECE8E1",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
