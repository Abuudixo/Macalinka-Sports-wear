/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E60000', // Matches the red stripes
          hover: '#cc0000',
        },
        dark: {
          900: '#0F172A', // Slate 900 (Navy Background)
          800: '#1E293B', // Slate 800 (Cards)
          700: '#334155', // Slate 700 (Inputs/Borders)
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
