import type {Config} from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: 'var(--void)',
        surface: 'var(--surface)',
        'surface-mid': 'var(--surface-mid)',
        'surface-raised': 'var(--surface-raised)',
        gold: 'var(--gold)',
        crimson: 'var(--crimson)',
        teal: 'var(--teal)',
        blush: 'var(--blush)',
        grove: 'var(--grove)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        border: 'var(--border)',
        'border-active': 'var(--border-active)',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        full: '9999px',
      },
      spacing: {
        'gutter': '24px',
        'margin-desktop': '80px',
        'margin-tablet': '40px',
        'margin-mobile': '20px',
      },
      maxWidth: {
        gallery: '1440px',
      },
    },
  },
  plugins: [],
} satisfies Config;
