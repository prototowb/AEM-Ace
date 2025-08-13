// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    includeFiles: [
      'node_modules/vue/**',
      'node_modules/@vue/**'
    ]
  }),
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
