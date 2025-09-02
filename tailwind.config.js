/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: '#6D28D9',
        PrimaryText: '#ffffff',
        linkHover: '#6D28D9',
        buttonColor:'#6D28D9'
      },
      backgroundColor: {
        primary: '#419fd9'
      }
    },
  },
  plugins: [],
}
