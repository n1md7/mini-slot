/// <reference types="vitest" />

import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
  publicDir: 'public',
  envPrefix: 'VITE_',
  envDir: process.cwd(),
  server: {
    port: 4096,
    host: '0.0.0.0',
    open: '#debug',
  },
  resolve: {
    alias: {
      '@': process.cwd(),
    },
  },
  base: './',
  build: {
    chunkSizeWarningLimit: 700,
    sourcemap: true,
    assetsDir: '.',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: 'index.html',
      },
    },
  },
  plugins: [glsl()],
  test: {
    setupFiles: ['./tests/unit/__setup__/setup.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['cobertura', 'text', 'html'],
      exclude: ['*.cjs', '*.config.*', 'dist/**', 'src/**.d.ts', 'tests'],
    },
  },
});
