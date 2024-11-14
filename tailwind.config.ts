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
        'main-dark': '#1A1A19',

        'green-house': {
          '50': '#f2faeb',
          '100': '#e3f4d3',
          '200': '#c8eaac',
          '300': '#a6da7c',
          '400': '#86c853',
          '500': '#67ae34',
          '600': '#4e8a26',
          '700': '#3c6a21',
          '800': '#31511e', // Original
          '900': '#2d481f',
          '950': '#15270c',
        },

        'main-green': {
          '50': '#f7f9ec',
          '100': '#ecf1d6',
          '200': '#dae4b2',
          '300': '#c0d284',
          '400': '#a6be5d',
          '500': '#859f3d', // Original
          '600': '#6a812f',
          '700': '#526427',
          '800': '#435024',
          '900': '#3a4522',
          '950': '#1d250e',
        },

        'light-green': {
          '50': '#f6fcdf', // Original
          '100': '#effacd',
          '200': '#e0f4a2',
          '300': '#c8eb6b',
          '400': '#b0dd3e',
          '500': '#92c31f',
          '600': '#719c14',
          '700': '#567714',
          '800': '#465e16',
          '900': '#3c5017',
          '950': '#1e2c07',
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
