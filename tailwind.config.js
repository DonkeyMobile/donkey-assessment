/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'surface': '#fff',
        'primary': '#BF9B65',
        'primary-light': '#fff8ea',
        'secondary': '#F5F5F5',
        'accent': '#2D302F',
        'accent-base': '#7F7F7F',
      },
      container: {
        // you can configure the container to be centered
        center: true,


        // default breakpoints but with 40px removed
        screens: {
          sm: '100%',
          md: '100%',
          lg: '100%',
          xl: '1280px',
          '2xl': '1536px',
        }
      },
      fontFamily: {
        lato: ['Lato', 'serif'],
        alef: ['Alef', 'serif'],
      },
    },
  },
  plugins: [],
}

