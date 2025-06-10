/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: '#ff5252',
        PrimaryText: '#ffffff',
        linkHover: '#5ab2e1',
        buttonColor:'#2376ab'
      },
      backgroundColor: {
        primary: '#419fd9'
      }
    },
  },
  plugins: [],
}
