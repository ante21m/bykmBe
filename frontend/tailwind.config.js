/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8eaf6',
          100: '#c5cae9',
          200: '#9fa8da',
          300: '#7986cb',
          400: '#5c6bc0',
          500: '#3949ab',
          600: '#1a237e',
          700: '#172069',
          800: '#131b55',
          900: '#0d1240',
          950: '#080b2a',
        },
        forest: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#2e7d32',
          600: '#1b5e20',
          700: '#155724',
          800: '#0f3d18',
          900: '#09250f',
        },
        gold: {
          50: '#fffde7',
          100: '#fff9c4',
          200: '#fff176',
          300: '#ffee58',
          400: '#ffca28',
          500: '#c8a84b',
          600: '#a07d20',
          700: '#7d5f0f',
          800: '#5a4208',
          900: '#3a2a02',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-lato)', 'Helvetica', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-right': 'slideRight 0.6s ease-out forwards',
        shimmer: 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(30px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideRight: {
          '0%': { opacity: 0, transform: 'translateX(-30px)' },
          '100%': { opacity: 1, transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'hero-pattern':
          'radial-gradient(ellipse at 20% 50%, rgba(26,35,126,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(46,125,50,0.1) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
};
