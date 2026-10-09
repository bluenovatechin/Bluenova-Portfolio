import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { seoPlugin } from './scripts/seo.js';

// https://vite.dev/config/
export default defineConfig({
  // Relative asset URLs: the same build works at portfolio.bluenovatech.in,
  // on the github.io preview address, or inside any sub-folder.
  base: './',
  plugins: [react(), seoPlugin()],
  build: {
    // inline nothing large; keep images as separate cacheable files
    assetsInlineLimit: 2048,
  },
});
