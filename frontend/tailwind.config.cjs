/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'dodgerblue', // #646cff
        'dark-tertiary': 'rgb(37, 38, 43)',
        'dark-secondary': '#1a1b1e',
        'dark': '#141517', // #0e0216
        'dark-text': 'rgb(193, 194, 197)'
      },
      fontFamily: {
        'default': "'Quicksand', sans-serif",
        'heading': '"Space Mono", monospace'  
      },
    },
  },
  plugins: [
    // require('@tailwindcss/forms')
  ],
}