/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        momo: "#f088a8",
        primary: {
          50: "#FDE9EF",
          100: "#F9C8D7",
          200: "#F7B8CB",
          300: "#F5A8C0",
          400: "#F298B4",
          500: "#f088a8",
          600: "#E97296",
          700: "#D85D86",
          800: "#C44A75",
          900: "#B03A66",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
