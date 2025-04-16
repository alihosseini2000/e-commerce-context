import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    // Layout utilities
    'flexCenter',
    'flexBetween',
    'flexStart',
    'flexEnd',
    'lg:flexCenter',
    'lg:flexBetween',
    'lg:flexStart',
    'lg:flexEnd',
    'xl:flexCenter',
    'xl:flexBetween',
    'xl:flexStart',
    'xl:flexEnd',
    '2xl:flexCenter',
    '2xl:flexBetween',
    '2xl:flexStart',
    '2xl:flexEnd',
  
    // Container padding
    'padding-container',
    'lg:padding-container',
    'xl:padding-container',
    '2xl:padding-container',
  
    // Max container
    'max-container',
    'xl:max-container',
    '2xl:max-container',
  
    // Button variants
    'btn-sky',
    'btn-dark',
    'btn-light',
  
    // Font styles
    'regular-64',
    'regular-40',
    'regular-32',
    'regular-24',
    'regular-20',
    'regular-18',
    'regular-16',
    'regular-14',
    'medium-14',
    'bold-88',
    'bold-64',
    'bold-52',
    'bold-40',
    'bold-32',
    'bold-24',
    'bold-20',
    'bold-18',
    'bold-16',
  
    // Scrollbar hiding
    'hide-scrollbar',
  
    // Dark mode background (اگر توی jsx استفاده کردی)
    'dark:bg-slate-900',
    'dark:bg-slate-800',
  ],  
  theme: {
    extend: {
      screens: {
        xs: '400px',
        md: '870px',
        lg: '1100px',
        '3xl': '1680px',
        '4xl': '2200px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      },
    },
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      center: true
    },
  },
  darkMode: 'selector',
  plugins: [],
} satisfies Config;
