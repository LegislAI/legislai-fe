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
        dark: '#242423',
        'dark-medium': '#333333',
        'dark-light': '#3A3A3A',
        'custom-gray': '#4f4f4f',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        raleway: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [],
};

export default config;
