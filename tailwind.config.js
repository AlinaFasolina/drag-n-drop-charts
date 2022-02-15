const colors = require('tailwindcss/colors')

//https://neumorphism.io/
//https://akaspanion.github.io/ui-neumorphism/


module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    './public/index.html'
  ],
  darkMode: 'class',
  theme: {
    neumorphismColor: {
      bg: {
        100: '#1B1E31'
      }
    },
    extend: {
      colors: {
        'white': '#ffffff',
        gray: {
          900: '#202225',
          800: '#2f3136',
          700: '#36393f',
          600: '#4f545c',
          400: '#d4d7dc',
          300: '#e3e5e8',
          200: '#ebedef',
          100: '#f2f3f5',
        },
        night: {
          100: '#1B1E31', // background color
          200: '#202237', // second layer
          300: '#FFFFFF', // font color
          400: '#20C55E', // icon color
          500: '#818497'  // third layer
        },
        light: {
          100: '#e0e5ef', // background color
          200: '#FFFFFF', // second layer
          300: '#1F1F1F', // font color
          400: '#506ef9', // icon color
          500: '#74adff'  // third layer
        },
      },
      spacing: {
        88: '22rem',
      },
    },
  },
  plugins: [require('tailwindcss-neumorphism')],
}