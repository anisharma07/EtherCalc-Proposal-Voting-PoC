/// <reference types="vitest" />

// import legacy from "@vitejs/plugin-legacy"; // Remove this line
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // plugins: [react(), legacy()], // Remove legacy() from here
  plugins: [react()], // Keep only react() or other necessary plugins
  test: {
    globals: true,
    environment: "jsdom", // Changed back to jsdom as es2021 is not a valid env here
    setupFiles: "./src/setupTests.ts",
  },
  // Add these lines to support BigInt literals in the main build
  esbuild: {
    target: "esnext",
  },
  build: {
    target: "esnext",
  },
});
