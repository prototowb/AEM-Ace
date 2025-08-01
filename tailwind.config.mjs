/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#000044',
        background: '#F5F7FA',
        accent: '#4375be',
      },
      fontFamily: {
        'body': ['Inter', 'sans-serif'],
        'heading': ['Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
}