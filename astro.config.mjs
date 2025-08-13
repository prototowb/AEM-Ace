// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel({
    functionPerRoute: false,
    maxDuration: 60
  }),
  vite: {
    ssr: { 
      noExternal: ['vue', '@vue/server-renderer', '@astrojs/vue']
    },
    build: {
      rollupOptions: {
        external: ['fsevents']
      }
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'vue']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'vue', '@astrojs/vue'],
      exclude: ['fsevents']
    }
  },
  integrations: [
    vue(),
    react(),
    tailwind(),
    // sanity({
    //   projectId: 'z5tty2va',
    //   dataset: 'production',
    //   useCdn: true,
    //   studioBasePath: '/admin',
    // })
  ]
});