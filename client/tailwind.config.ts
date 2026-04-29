import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

const config: Config = {
  // Enable class-based dark mode so user can toggle
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Light-mode surface tokens
        surface: {
          DEFAULT: '#F8FAFC',
          card: '#FFFFFF',
          subtle: '#F1F5F9',
          border: '#E2E8F0',
        },
        // Blue brand
        brand: {
          50:  '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
        // Text scale
        ink: {
          DEFAULT: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
          inverse: '#F8FAFC',
        },
        // Dark mode navy (kept for dark surfaces)
        navy: {
          50:  '#F0F4FF',
          100: '#E0E9FF',
          700: '#1A2F7A',
          800: '#0F1F5C',
          900: '#0A1540',
          950: '#060D2E',
        },
        emerald: {
          400: '#34D399',
          500: '#22C55E',
          600: '#16A34A',
        },
        amber: {
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
      },
      backgroundImage: {
        // Light hero
        'hero-light': 'linear-gradient(135deg, #EFF6FF 0%, #F8FAFC 50%, #DBEAFE 100%)',
        // Dark hero (kept)
        'hero-dark': 'linear-gradient(135deg, #060D2E 0%, #0A1540 40%, #0F1F5C 100%)',
        // Blue gradient for accents
        'blue-gradient': 'linear-gradient(135deg, #60A5FA 0%, #2563EB 100%)',
        'blue-glow': 'radial-gradient(ellipse at 50% 0%, rgba(59,130,246,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        // Light-mode premium shadows
        card:   '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 20px rgba(0,0,0,0.08), 0 12px 40px rgba(59,130,246,0.12)',
        'blue-glow': '0 0 30px rgba(37,99,235,0.25)',
        'inset-sm': 'inset 0 1px 2px rgba(0,0,0,0.06)',
        // Dark mode
        dark: '0 4px 24px rgba(0,0,0,0.4)',
      },
      animation: {
        'fade-in':   'fadeIn 0.5s ease-out both',
        'slide-up':  'slideUp 0.5s ease-out both',
        'slide-down': 'slideDown 0.3s ease-out both',
        float:       'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideDown: { '0%': { opacity: '0', transform: 'translateY(-8px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        float:     { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
    },
  },
  plugins: [forms],
};

export default config;
