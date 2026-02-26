import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#191975',
        secondary: '#cc1715',
        black: '#000000',
        white: '#ffffff',
      },
      borderRadius: {
        'xl': '0.75rem',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
