/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',                    // Main HTML file
    './src/**/*.{js,jsx,ts,tsx}',      // All files in the src directory
    './src/components/**/*.{js,jsx}', // Specific directory for components
    './src/pages/**/*.{js,jsx}',      // Specific directory for pages
  ],
  safelist: [
    'bg-red-500', // Background color
    'text-3xl',   // Text size
    'lg:text-4xl', // Responsive text size
    'hover:text-blue-500', // Hover state for text
    'bg-gray-800', // Background color
    'text-sm',     // Small text
    'text-black',  // Text color black
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // Temporarily disable purging
  mode: 'jit', // Use Just-In-Time mode for Tailwind CSS
  purge: false, // This disables purging of unused styles temporarily
};
