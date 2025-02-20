/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens: {
        xs: '480px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      colors: {
        black: '#000',
        white: '#fff',
        orange: '#E06330',
        gray: '#A9A9A9',
        brown: '#996630',
        red: '#FF0000',
        blue: "#2563EB",
        green: "#6dde6d",
        indigo: "#7F9CF5",
        golden: "#FFD700"
      },
      fontFamily: {
        // Headings
        sans: ['Inter', 'sans-serif'],
        // Base text
        monospace: ['Inconsolata', 'monospace'],
      },
      fontSize: {
        xs: '.75rem',
        sm: '.875rem',
        tiny: '.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.6rem',
        '7xl': '4.32rem',
        '8xl': '5.184rem',
      },
      letterSpacing: {
        wide: '.025em',
        wider: '.05rem',
        widest: '.1rem'
      },
    }, // Moved closing brace here
  }, // Moved closing brace here

};
