/// <reference types="vitest" />

import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig((env) => {
  const getBase = () => {
    if (env.mode === 'github') return '/mini-slot';

    return './';
  };

  return {
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
    base: getBase(),
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
    plugins: [glsl(), solidPlugin()],
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
  };
});
