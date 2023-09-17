import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "src",
  envDir: "../",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        almostDone: resolve(__dirname, "src/almost-done.html"),
        confirmation: resolve(__dirname, "src/confirmation.html"),
      },
    },
  },
  resolve: {
    alias: {
      "~bootstrap": resolve(__dirname, "node_modules/bootstrap"),
    },
  },
});
