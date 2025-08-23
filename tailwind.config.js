/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/**/*.{js,ts,jsx,tsx}'],
  darkMode: ['class', '[data-theme*="dark"]'],
  theme: {
    extend: {
      colors: {
        // CSS変数を使用したカラーパレット
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-secondary': 'var(--accent-secondary)',
        'accent-tertiary': 'var(--accent-tertiary)',
        'card-bg': 'var(--card-bg)',
        'card-border': 'var(--card-border)',
      },
      backgroundImage: {
        'accent-gradient': 'var(--accent-primary)',
      },
      boxShadow: {
        'card': 'var(--card-shadow)',
      }
    }
  },
  plugins: []
};