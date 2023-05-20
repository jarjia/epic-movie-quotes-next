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
        large: { min: '1680px' },
      },
      backdropBlur: {
        'landing-blur': '3px',
      },
      backgroundPosition: {
        'landing-back-img': 'center',
      },
      borderRadius: {
        'form-radius': '10px',
      },
      colors: {
        'default-btn': '#E31221',
        hover: '#CC0E10',
        active: '#B80D0F',
        title: '#DDCCAA',
        'form-back': '#222030',
        'form-small-title': '#6C757D',
        'form-required': '#DC3545',
        placeholder: '#6C757D',
        input: '#CED4DA',
        'ring-offset-color': 'rgba(13, 110, 253, 0.25)',
        link: '#0D6EFD',
        'valid-form': '#198754',
      },
      fontSize: {
        h1: '60px',
        'quote-size': '45px',
        'form-title': '32px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base',
    }),
  ],
};
