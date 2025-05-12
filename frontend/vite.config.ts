import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Listen on all addresses
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        configure: (proxy) => {
          proxy.on('error', (err) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (req) => {
            console.log('Sending Request:', req.method);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received Response from:', req.url, proxyRes.statusCode);
          });
        },
      },
    },
  },
})
