import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['electron'],
      input: {
        main: resolve(__dirname, 'index.html')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/components': resolve(__dirname, 'src/renderer/components'),
      '@/hooks': resolve(__dirname, 'src/renderer/hooks'),
      '@/stores': resolve(__dirname, 'src/renderer/stores'),
      '@/types': resolve(__dirname, 'src/shared/types'),
    }
  },
  server: {
    port: 3000
  }
});