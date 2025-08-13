// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';

// https://astro.build/config
export default defineConfig({
  output: 'static', // Static site generation
  vite: {
    resolve: {
      dedupe: ['react', 'react-dom']
    },
    optimizeDeps: {
      include: ['react', 'react-dom']
    }
  },
  integrations: [
    vue(),
    react(),
    tailwind(),
    sanity({
      projectId: 'z5tty2va',
      dataset: 'production',
      useCdn: true, // Use CDN for production builds
      // Mount Sanity Studio at /admin (built as static assets)
      studioBasePath: '/admin',
    })
  ]
});
