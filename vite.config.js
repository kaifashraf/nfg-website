import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        configurator: resolve(__dirname, 'configurator.html'),
        journal: resolve(__dirname, 'journal.html'),
        helmets: resolve(__dirname, 'helmets.html'),
        kneepads: resolve(__dirname, 'kneepads.html')
      }
    }
  }
});
