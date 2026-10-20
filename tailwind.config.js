/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f6f8f7',
          100: '#e1eae4',
          200: '#c3d5cb',
          300: '#9bbba9',
          400: '#719c83',
          500: '#4f7f64',
          600: '#3c644e',
          700: '#325040',
          800: '#2a4135',
          900: '#23372d',
          950: '#111d17',
        },
      },
    },
  },
  plugins: [],
};
