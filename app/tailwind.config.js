/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',   // se existir
    './src/**/*.{js,ts,jsx,tsx,mdx}',     // mantenha se você realmente tiver /src
  ],
  darkMode: 'media', // ou 'class' se você usar .dark
  theme: {
    extend: {
      colors: {
        brand: {
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
        },
      },
    },
  },
  plugins: [],
}
