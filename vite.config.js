import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Add these options to fix the crypto error
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
});
