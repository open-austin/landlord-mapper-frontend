import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter()],
  // Use polling in dev to avoid hitting OS file‑watch limits (EMFILE) on some systems.
  server: {
    watch: {
      usePolling: true,
      interval: 750,
    },
  },
});
