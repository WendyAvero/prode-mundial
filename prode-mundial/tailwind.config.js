/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#7697C9',
          mid: '#476697',
          dark: '#1D3665',
          gray: '#444242',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #476697 0%, #1D3665 100%)',
        'gradient-field': 'linear-gradient(135deg, #1D3665 0%, #0d1f3c 100%)',
      },
    },
  },
  plugins: [],
}
