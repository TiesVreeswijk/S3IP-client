/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',                 // Include the main HTML file
    './src/**/*.{js,jsx,ts,tsx}',
    './public/**/*.{html,js}',// Include all React components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
