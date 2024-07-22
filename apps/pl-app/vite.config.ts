import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

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
