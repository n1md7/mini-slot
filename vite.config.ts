/// <reference types="vitest" />

import { createHtmlPlugin } from 'vite-plugin-html';
import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
export default defineConfig({
  appType: 'spa',
  envPrefix: 'SLOT_GAME_',
  envDir: process.cwd(),
  publicDir: 'public',
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
    assetsDir: 'assets',
    emptyOutDir: true,
  },
  plugins: [
    glsl(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
  test: {
    setupFiles: ['./tests/unit/__setup__/setup.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      all: true,
      provider: 'c8',
      reporter: ['cobertura', 'text', 'html'],
      exclude: ['*.cjs', '*.config.*', 'dist/**', 'src/**.d.ts', 'tests'],
    },
  },
});
