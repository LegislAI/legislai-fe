/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import daisyui from 'daisyui';
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '0.625rem',
      },
      colors: {
        'light-text': '#e1eae6',
        'dark-text': '#23312f',
        accent: '#f8741b',

        'powder-ash': {
          '50': '#f3f6f5',
          '100': '#e1eae6',
          '200': '#b3c7c1', // Original
          '300': '#9eb7b1',
          '400': '#74938d',
          '500': '#54756f',
          '600': '#3f5c58',
          '700': '#324a47',
          '800': '#2a3b39',
          '900': '#23312f',
          '950': '#131b1a',
        },

        background: '#011e14',
        // background
        holly: {
          '50': '#ecfdf3',
          '100': '#d0fbe0',
          '200': '#a6f4c8',
          '300': '#6de8aa',
          '400': '#32d589',
          '500': '#0ebb70',
          '600': '#03985a',
          '700': '#03794b',
          '800': '#05603c',
          '900': '#054f33',
          '950': '#011e14', // Original
        },

        primary: '#60f5cd',
        // primary
        aquamarine: {
          '50': '#eafff8',
          '100': '#ccffeb',
          '200': '#7efbd1', // Original
          '300': '#60f5cd',
          '400': '#21e6b7',
          '500': '#00cda2',
          '600': '#00a785',
          '700': '#00866e',
          '800': '#006a58',
          '900': '#00574a',
          '950': '#00312b',
        },

        'deep-sea': {
          '50': '#effaf5',
          '100': '#d8f3e5',
          '200': '#b4e6cf',
          '300': '#83d2b3',
          '400': '#50b791',
          '500': '#2e9b77',
          '600': '#1f7f61', // Original
          '700': '#18644e',
          '800': '#164f3f',
          '900': '#134135',
          '950': '#09251e',
        },

        pumpkin: {
          '50': '#fff7ed',
          '100': '#ffedd5',
          '200': '#fed6aa',
          '300': '#fcb975',
          '400': '#fa913d',
          '500': '#f8741b', // Original
          '600': '#e9560d',
          '700': '#c1400d',
          '800': '#993313',
          '900': '#7b2c13',
          '950': '#431407',
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
