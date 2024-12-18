import { resolve } from "path";
import { defineConfig } from "vite";

import { fileURLToPath } from 'url';
import path from 'path';

// Create __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        // cart: resolve(__dirname, "src/cart/index.html"),
        // product: resolve(__dirname, "src/product_pages/index.html"),
        // Productlist: resolve(__dirname, "src/product-listing/index.html"),
        // checkout: resolve(__dirname, "src/checkout/index.html"),
        // success: resolve(__dirname, "src/checkout/success.html"),
      },
    },
  },
});
