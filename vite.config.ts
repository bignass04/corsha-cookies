/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import publicPath from "vite-plugin-public-path";
import mkcert from "vite-plugin-mkcert"
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === "production" ? "/__vite_base__/" : "/",
  plugins: [
    react(),
    // https://github.com/intlify/vite-plugin-vue-i18n
    publicPath({
      // A JS expression evaluates on client side each time when loading a new file
      // Should evaluate to a string ending with "/"
      publicPathExpression: "window.publicPath",
      html: false,
    }),
    mkcert(),
  ],
  test: {
    globals: true,
    reporters: ['default', 'html'],
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      exclude: ['.pnp.*'],
    },
  },
  server: {
    https: true,
    hmr: {
      host: "localhost", // This is needed for WebSockets to work
    },
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      lib: path.resolve(__dirname, "./src/lib"),
      mocks: path.resolve(__dirname, "./src/mocks"),
      pages: path.resolve(__dirname, "./src/pages"),
      styles: path.resolve(__dirname, "./src/styles"),
    },
  }
});
