// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
// import sanity from '@sanity/astro';
import vercel from '@astrojs/vercel';

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
    },
    excludeFiles: [
      'node_modules/**/*.map',
      'node_modules/**/*.d.ts',
      'node_modules/**/test/**',
      'node_modules/**/tests/**',
      'node_modules/**/__tests__/**',
      'node_modules/**/docs/**',
      'node_modules/**/examples/**',
      'node_modules/**/*.md'
    ]
  }) : undefined,
  vite: {
    ssr: { 
      noExternal: [
        'vue', 
        '@vue/server-renderer', 
        '@vue/compiler-dom',
        '@vue/compiler-sfc',
        '@astrojs/vue'
      ]
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'vue']
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'vue', '@astrojs/vue'],
      exclude: ['fsevents']
    },
    build: {
      rollupOptions: {
        external: ['fsevents'],
        output: {
          manualChunks: {
            'vue-vendor': ['vue', '@vue/server-renderer', '@vue/compiler-dom'],
            'react-vendor': ['react', 'react-dom']
          }
        }
      }
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