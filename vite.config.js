import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Add these options to fix the crypto error
    hmr: {
      protocol: "ws",
      host: "localhost",
    },
  },
});
