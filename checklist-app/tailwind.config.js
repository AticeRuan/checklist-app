/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'b-light-blue': '#A6D7F5',
        'b-mid-blue': '#00AEEF',
        'b-active-blue': '#00739E',
        'b-deep-blue': '#00233A',
        'b-dark-grey': '#333333',
        'b-mid-grey': '#757575',
        'b-light-grey': '#BDBDBD',
        'b-lighter-grey': '#DDDDDD',
        'b-background-grey': '#EFEFF4',
        'b-orange': '#FD5A00',
        'b-dark-orange': '#C24500',
        'b-red': '#FF3B30',
        'b-earth': '#9A8700',
        'b-green': '#00AD11',
        'b-dark-green': '#066F10',
        'b-pink': '#FFE5E5',
        'b-light-yellow': '#F5E1A4',
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'fade-in-right': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'fade-in-left': {
          '0%': {
            opacity: '0',
            transform: 'translateX(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        'bounce-right': {
          '0%': {
            transform: 'translateX(0)',
          },
          '50%': {
            transform: 'translateX(10px)',
          },
          '100%': {
            transform: 'translateX(0)',
          },
        },
      },
      animation: {
        'bounce-right': 'bounce-right 1s infinite ease-out',
      },
      fontFamily: {
        pthin: ['Poppins-Thin', 'sans-serif'],
        pextralight: ['Poppins-ExtraLight', 'sans-serif'],
        plight: ['Poppins-Light', 'sans-serif'],
        pregular: ['Poppins-Regular', 'sans-serif'],
        pmedium: ['Poppins-Medium', 'sans-serif'],
        psemibold: ['Poppins-SemiBold', 'sans-serif'],
        pbold: ['Poppins-Bold', 'sans-serif'],
        pextrabold: ['Poppins-ExtraBold', 'sans-serif'],
        pblack: ['Poppins-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
