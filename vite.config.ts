import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor libraries
          vendor: ["react", "react-dom"],
          charts: ["recharts"],
          ui: ["@headlessui/react", "@heroicons/react"],
          supabase: ["@supabase/supabase-js"],
        },
      },
    },
    // Increase chunk size warning limit to 1000kb (optional)
    chunkSizeWarningLimit: 1000,
    // Enable source maps for better debugging (optional)
    sourcemap: false,
  },
});
