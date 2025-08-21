// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

// Load environment variables from .env.local (only in development)
if (!process.env.VERCEL) {
  dotenv.config({ path: '.env.local' });
}

// Check if we're building for production (Vercel)
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

// Enable Sanity Studio only when explicitly requested
const enableStudio = process.env.ENABLE_SANITY_STUDIO === 'true';
console.log('Studio enabled:', enableStudio); // Debug log

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // Only use adapter for production builds
  adapter: isProduction ? vercel({
    functionPerRoute: false,
    maxDuration: 60
  }) : undefined,
  vite: {
    ssr: {},
    resolve: {
      dedupe: ['react', 'react-dom', 'vue'],
      alias: {
        // Avoid resolving native optional dep
        fsevents: fileURLToPath(new URL('./stubs/empty.js', import.meta.url))
      }
    },
    optimizeDeps: {
      include: [
        'react', 
        'react-dom', 
        'vue',
        '@vue/compiler-core',
        '@vue/compiler-dom',
        '@vue/compiler-sfc',
        '@vue/compiler-ssr',
        '@vue/reactivity',
        '@vue/runtime-core',
        '@vue/runtime-dom',
        '@vue/server-renderer',
        '@vue/shared',
        '@astrojs/vue'
      ],
      exclude: ['fsevents', 'chokidar']
    },
    build: {
      rollupOptions: {
        external: ['fsevents']
      }
    }
  },
  integrations: [
    vue(),
    react(),
    tailwind(),
    // Conditionally include Sanity Studio integration
    ...(enableStudio ? [
      sanity({
        projectId: 'z5tty2va',
        dataset: 'production',
        useCdn: true,
        studioBasePath: '/admin',
      })
    ] : [])
  ]
});