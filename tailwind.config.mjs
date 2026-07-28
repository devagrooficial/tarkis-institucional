/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        petroleum: {
          50:  '#e8f4f6',
          100: '#c5e2e8',
          200: '#8fc6d1',
          300: '#59aaba',
          400: '#2390a5',
          500: '#0A2E36',
          600: '#082630',
          700: '#061a22',
          800: '#040f14',
          900: '#020508',
          DEFAULT: '#0A2E36',
          dark:  '#061A1F',
          light: '#0D3B47',
          mid:   '#0f4756',
        },
        emerald: {
          50:  '#e0f7f5',
          100: '#b3ece8',
          200: '#80e0da',
          300: '#4dd3cc',
          400: '#26c9bf',
          500: '#00A896',
          600: '#009889',
          700: '#008579',
          800: '#007369',
          900: '#00524c',
          DEFAULT: '#00A896',
          light:   '#00C4AF',
          dark:    '#008A7A',
          glow:    '#00d4be',
        },
        silver: {
          DEFAULT: '#E5E5E5',
          dark:    '#CCCCCC',
          light:   '#F5F5F5',
          mid:     '#D4D4D4',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', 'sans-serif'],
        heading: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-petroleum': 'linear-gradient(135deg, #061A1F 0%, #0A2E36 50%, #0D3B47 100%)',
        'gradient-emerald':   'linear-gradient(135deg, #00A896 0%, #00C4AF 100%)',
        'gradient-dark':      'linear-gradient(180deg, #0A2E36 0%, #061A1F 100%)',
        'gradient-card':      'linear-gradient(135deg, rgba(13,59,71,0.8) 0%, rgba(10,46,54,0.9) 100%)',
        'dot-pattern':        'radial-gradient(circle, rgba(0,168,150,0.15) 1px, transparent 1px)',
        'mesh-gradient':      'radial-gradient(at 40% 20%, rgba(0,168,150,0.12) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(10,46,54,0.5) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(0,168,150,0.08) 0px, transparent 50%)',
      },
      backgroundSize: {
        'dot-sm': '20px 20px',
        'dot-md': '30px 30px',
        'dot-lg': '40px 40px',
      },
      boxShadow: {
        'emerald-sm':  '0 0 10px rgba(0, 168, 150, 0.25)',
        'emerald-md':  '0 0 20px rgba(0, 168, 150, 0.35)',
        'emerald-lg':  '0 0 40px rgba(0, 168, 150, 0.45)',
        'card':        '0 4px 24px rgba(0, 0, 0, 0.12)',
        'card-dark':   '0 8px 32px rgba(0, 0, 0, 0.4)',
        'inner-glow':  'inset 0 1px 0 rgba(0, 168, 150, 0.2)',
      },
      animation: {
        'fade-in':      'fadeIn 0.6s ease-out forwards',
        'slide-up':     'slideUp 0.6s ease-out forwards',
        'slide-right':  'slideRight 0.6s ease-out forwards',
        'scale-in':     'scaleIn 0.5s ease-out forwards',
        'glow-pulse':   'glowPulse 3s ease-in-out infinite',
        'float':        'float 6s ease-in-out infinite',
        'shimmer':      'shimmer 2s linear infinite',
        'pulse-dot':    'pulseDot 2s ease-in-out infinite',
        'flow-line':    'flowLine 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { transform: 'translateY(30px)', opacity: '0' },
          to:   { transform: 'translateY(0)',    opacity: '1' },
        },
        slideRight: {
          from: { transform: 'translateX(-30px)', opacity: '0' },
          to:   { transform: 'translateX(0)',     opacity: '1' },
        },
        scaleIn: {
          from: { transform: 'scale(0.9)', opacity: '0' },
          to:   { transform: 'scale(1)',   opacity: '1' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,168,150,0.3)' },
          '50%':       { boxShadow: '0 0 30px rgba(0,168,150,0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)',   opacity: '1' },
          '50%':       { transform: 'scale(1.5)', opacity: '0.5' },
        },
        flowLine: {
          '0%':   { strokeDashoffset: '100' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
    },
  },
  plugins: [],
};
