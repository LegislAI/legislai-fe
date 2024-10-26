/** @type {import('tailwindcss').Config} */

import type { Config } from 'tailwindcss';

import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      colors: {
        'dark-green-1': '#0f140f',
        'dark-green-2': '#003219',

        'green-house': {
          '50': '#f2faeb',
          '100': '#e3f4d3',
          '200': '#c8eaac',
          '300': '#a6da7c',
          '400': '#86c853',
          '500': '#67ae34',
          '600': '#4e8a26',
          '700': '#3c6a21',
          '800': '#31511e',
          '900': '#2d481f',
          '950': '#15270c',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        raleway: ['var(--font-raleway)'],
      },
    },
  },
  plugins: [typography, daisyui],
};

export default config;
