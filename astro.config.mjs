// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static site generation
  site: process.env.CI 
    ? 'https://YOUR-GITHUB-USERNAME.github.io' 
    : 'http://localhost:4321',
  base: process.env.CI 
    ? '/AEM-Ace' 
    : '',
  integrations: [
    vue(), 
    tailwind(),
    sanity({
      projectId: 'z5tty2va',
      dataset: 'production',
      useCdn: true, // Use CDN for production builds
      // Remove studio for static builds
      // studioBasePath: '/admin',
    })
  ]
});
