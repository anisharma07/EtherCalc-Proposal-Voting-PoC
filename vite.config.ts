/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

function bigIntLiteralPlugin() {
  return {
    name: "bigint-literal-rewrite",
    setup(build) {
      const bigintRE = /([^0-9A-Za-z$_.])(\d+)n\b/g;
      build.onLoad({ filter: /\.[jt]s$/ }, async (args) => {
        const text = await fs.promises.readFile(args.path, "utf8");
        const transformed = text.replace(
          bigintRE,
          (_, prefix, num) => `${prefix}BigInt("${num}")`
        );
        return { contents: transformed, loader: "default" };
      });
    },
  };
}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), legacy()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
  build: {
    target: ["es2021"], // you can keep this
    rollupOptions: {
      plugins: [bigIntLiteralPlugin()],
    },
  },
});
