/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: "es2021",
    setupFiles: "./src/setupTests.ts",
  },
  // Add these lines to support BigInt literals
  esbuild: {
    target: "es2021", // Ensures esbuild handles BigInt correctly
  },
  build: {
    target: "es2021", // Ensures the final build output supports BigInt
  },
});
