/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@pl-app': path.join(__dirname, './src'),
      '@api': path.join(__dirname, '../api/src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          'react-family': ['react-hook-form', 'react-router-dom'],
          api: ['hono', 'swr'],
          ui: ['antd'],
          state: ['zustand'],
        },
      },
    },
  },
});
