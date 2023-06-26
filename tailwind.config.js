/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin');
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        sm: { max: '915px' },
        mid: { min: '916px', max: '1250px' },
        normal: { min: '1250px', max: '1680px' },
        large: { min: '1680px' },
        huge: { min: '1920px' },
      },
      backdropBlur: {
        'landing-blur': '3px',
      },
      backgroundPosition: {
        'landing-back-img': 'center',
      },
      borderRadius: {
        'form-radius': '10px',
        'movie-radius': '12px',
      },
      padding: {
        'newsfeed-layout': '340px',
        'large-newsfeed-layout': '480px',
        'huge-newsfeed-layout': '580px',
      },
      gridTemplateColumns: {
        'mobile-search-cols': '15% 85%',
        'movie-cols': '55% 45%',
        'quote-card': '32% 68%',
      },
      colors: {
        'default-btn': '#E31221',
        hover: '#CC0E10',
        active: '#B80D0F',
        title: '#DDCCAA',
        'post-bg': '#11101A',
        'form-back': '#222030',
        'form-small-title': '#6C757D',
        'form-required': '#DC3545',
        placeholder: '#6C757D',
        'date-of-notification': '#D9D9D9',
        input: '#CED4DA',
        'ring-offset-color': 'rgba(13, 110, 253, 0.25)',
        link: '#0D6EFD',
        'valid-form': '#198754',
        'notify-color': '#E33812',
        'add-quote-bg': '#24222F',
        'search-bar-border': 'rgba(239, 239, 239, 0.3)',
        'choose-file': '#9747FF',
        'mobile-search': '#12101A',
        'success-message-bg': '#D1E7DD',
        liked: '#F3426C',
        disabled: 'rgba(236, 76, 87, 1)',
      },
      width: {
        profile: '60px',
      },
      height: {
        profile: '60px',
      },
      fontSize: {
        h1: '60px',
        'quote-size': '45px',
        'form-title': '32px',
        'error-page-title': '47px',
        'font-base': '18px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'base',
    }),
    plugin(({ addBase }) => {
      addBase({
        '.scrollbar': {
          overflowY: 'auto',
          scrollbarColor: `#808189 transparent`,
          scrollbarWidth: 'thin',
        },
        '.scrollbar::-webkit-scrollbar': {
          height: '4px',
          width: '6px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#808189',
          borderRadius: '50px',
        },
      });
    }),
  ],
};
