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
          500: '#1a1d24',
          700: '#000000'
        },
        primary: 'rgba(23, 23, 23,.95)',
        secondary: '#1f1f1f',
        third: '#4d4d4d',
        ['third-hover']: '#666',
        title: '#d9d9d9',
        white: {
          300: '#f2f2f2'
        }
      },
      minWidth: {
        searchInput: '16rem'
      },
      maxWidth: {
        tagPicker: '20rem',
        gallery: '75rem'
      },
      spacing: {
        unset: 'unset',
        72: '18rem',
        76: '19rem',
        80: '20rem',
        84: '21rem',
        100: ' 25rem'
      }
    }
  },
  plugins: []
};
