/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    fontFamily: {
      sans: ['QuickSand', 'sans-serif'],
      title: ['Pathfinder Demo']
    },
    extend: {
      backgroundImage: {
        'hero-image': "url('/img/hero.jpg')"
      },
      spacing: {
        128: '32rem',
        144: '36rem',
        155: '46rem',
        168: '56rem'
      }
    }
  },
  plugins: []
};
