/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'b-light-blue': '#A6D7F5',
        'b-mid-blue': '#00AEEF',
        'b-active-blue': '#00739E',
        'b-deep-blue': '#00233A',
        'b-dark-grey': '#DDDDDD',
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
      },
    },
  },
  plugins: [],
}
