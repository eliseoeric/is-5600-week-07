import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/products': 'http://localhost:3080',
      '/orders': 'http://localhost:3080',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
})