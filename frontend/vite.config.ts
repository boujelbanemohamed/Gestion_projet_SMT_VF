import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    // Optimisations de build
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les dépendances vendor
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          api: ['axios'],
        },
      },
    },
    // Augmenter la limite d'avertissement des chunks
    chunkSizeWarningLimit: 1000,
  },
  optimizeDeps: {
    // Pré-bundler les dépendances communes
    include: ['react', 'react-dom', 'react-router-dom', 'axios'],
  },
})
