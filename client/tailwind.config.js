module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx,html}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xsm: '300px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        black: {
          100: 'rgba(140, 140, 140, 0.1)',
          300: '#121212',
          400: '#171717',
          700: '#000000'
        },
        header: 'rgba(23, 23, 23,.95)',
        footer: 'rgba(23, 23, 23,.95)',
        white: {
          300: '#f2f2f2'
        }
      },
      minWidth: {
        searchInput: '16rem'
      },
      maxWidth: {
        tagPicker: '30rem'
      }
    }
  },
  plugins: []
};
