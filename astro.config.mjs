// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    vue(), 
    tailwind(),
    react(),
    sanity({
      projectId: 'z5tty2va',
      dataset: 'production',
      useCdn: false, // Set to false for dev, true for production
      // Access the Studio at /admin
      studioBasePath: '/admin',
    })
  ]
});
