/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@pl-app': path.join(__dirname, './src'),
      '@api': path.join(__dirname, '../api/src'),
    },
  },
});
