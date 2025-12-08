import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    strictPort: true,
    proxy: {
      '/products': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
      '/orders': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '0.0.0.0',
    port: 5000,
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})