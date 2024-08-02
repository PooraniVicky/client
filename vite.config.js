import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Define custom chunks for better code-splitting
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@mui/material'],
          // Add more custom chunks as needed
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Set the warning limit to 1000 kB
  },
});
