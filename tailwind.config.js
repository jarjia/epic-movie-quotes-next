/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: '625px' },
      },
      backgroundPosition: {
        'landing-back-img': 'center',
      },
      colors: {
        'default-btn': '#E31221',
        hover: '#CC0E10',
        active: '#B80D0F',
        title: '#DDCCAA',
      },
      fontSize: {
        h1: '60px',
        'quote-size': '45px',
      },
    },
  },
  plugins: [],
};
