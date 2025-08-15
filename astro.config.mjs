// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';
import { fileURLToPath } from 'node:url';

// Check if we're building for production (Vercel)
const isProduction = process.env.NODE_ENV === 'production' || process.env.VERCEL;

// https://astro.build/config
export default defineConfig({
  output: 'server',
  // Only use adapter for production builds
  adapter: isProduction ? vercel({
    functionPerRoute: false,
    maxDuration: 60,
    webAnalytics: {
      enabled: false
    }
  }) : undefined,
  vite: {
    ssr: {
      // Ensure native/optional deps are never bundled in SSR
      external: ['fsevents', 'chokidar']
    },
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
    sanity({
      projectId: 'z5tty2va',
      dataset: 'production',
      useCdn: true,
      // Mount Sanity Studio at /admin (built as static assets)
      studioBasePath: '/admin',
    })
  ]
});