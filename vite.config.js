import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks: {
          bugfender: ["@bugfender/sdk"],
          firebase: ["@firebase/database", "@firebase/auth", "@firebase/app"],
        },
      },
    },
  },
});
