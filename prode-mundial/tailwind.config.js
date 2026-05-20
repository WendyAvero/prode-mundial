/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 400: '#818cf8', 500: '#6366f1', 600: '#4f46e5' },
        gold: { 400: '#fbbf24', 500: '#f59e0b' },
        field: { 400: '#4ade80', 600: '#16a34a' },
      },
      backgroundImage: {
        'gradient-field': 'linear-gradient(135deg, #1a3a2a 0%, #0d2318 100%)',
        'gradient-brand': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
      },
    },
  },
  plugins: [],
}
