/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          // Light bronze hover
          DEFAULT: '#b07a3d',
          dark: '#7a5127'
        },
        dark: '#0f172a',
        // Brand bronze from logo (approx.)
        accent: '#976739'
      }
    }
  },
  plugins: []
};