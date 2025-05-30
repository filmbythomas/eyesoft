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
          DEFAULT: '#2F4F4F',
          dark: '#1E3E3E',
        },
        secondary: {
          DEFAULT: '#758E67',
          light: '#90A884',
        },
        background: '#FDFBF7',
        surface: '#F0EBE3',
        text: {
          primary: '#36454F',
          secondary: '#5B6870',
          'on-dark': '#FDFBF7',
        },
        accent: '#A88B79',
        highlight: {
          DEFAULT: '#87CEEB',
          dark: '#6CA8C7',
        },
        // New nature-inspired colors
        sage: '#BEE3BE',
        forest: '#2F4F4F',
        sand: '#FDFCF6',
        gold: '#C9A66B',
        charcoal: '#36454F',
      },
      fontFamily: {
        sans: ['Lora', 'serif'],
        display: ['Playfair Display', 'serif'],
        'freckle-face': ['Freckle Face', 'cursive'],
        'barrio': ['Barrio', 'cursive'],
        // New nature-inspired fonts
        'caveat': ['Caveat', 'cursive'],
        'pacifico': ['Pacifico', 'cursive'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'pop': '0 10px 40px -10px rgba(0, 0, 0, 0.25)',
        'card-3d': '0 20px 60px -10px rgba(0, 0, 0, 0.15), 0 8px 25px -5px rgba(0, 0, 0, 0.1)',
        '3xl': '0 35px 60px -12px rgba(0, 0, 0, 0.25)',
        'sage/30': '0 10px 40px -10px rgba(190, 227, 190, 0.3)',
        'sage/40': '0 15px 50px -10px rgba(190, 227, 190, 0.4)',
        'gold/30': '0 10px 40px -10px rgba(201, 166, 107, 0.3)',
        'gold/40': '0 15px 50px -10px rgba(201, 166, 107, 0.4)',
        'gold/50': '0 20px 60px -10px rgba(201, 166, 107, 0.5)',
      },
      animation: {
        'gentle-float': 'gentle-float 3s ease-in-out infinite',
        'gentle-sway': 'gentle-sway 4s ease-in-out infinite',
        'gentle-bounce': 'gentle-bounce 2s ease-in-out infinite',
        'float-random': 'float-random 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.5s ease-out',
        'fadeInUp': 'fadeInUp 0.8s ease-out forwards',
        'slideUpStagger': 'slideUpStagger 0.6s ease-out forwards',
        'bounceIn': 'bounceIn 0.6s ease-out',
        'modalSlideUp': 'modalSlideUp 0.4s ease-out',
      },
      keyframes: {
        'gentle-float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'gentle-sway': {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(3deg)' },
          '75%': { transform: 'rotate(-3deg)' },
        },
        'gentle-bounce': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'float-random': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(120deg)' },
          '66%': { transform: 'translateY(5px) rotate(240deg)' },
        },
        'fadeIn': {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        'fadeInUp': {
          'from': { opacity: '0', transform: 'translateY(30px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        'slideUpStagger': {
          'from': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'bounceIn': {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { transform: 'scale(1)' },
        },
        'modalSlideUp': {
          'from': { opacity: '0', transform: 'translateY(50px) scale(0.95)' },
          'to': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      transitionTimingFunction: {
        'elastic': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'creative': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'smooth-out': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'ease-out-bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      perspective: {
        '1000': '1000px',
      },
    },
  },
  plugins: [],
}
