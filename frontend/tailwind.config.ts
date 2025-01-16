import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        primary: {
          DEFAULT: 'var(--primary)',
          strong: 'var(--primary-strong)',
          medium: 'var(--primary-medium',
          weak: 'var(--primary-weak)',
        },
        accent: 'var(--accent)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
