// vite.config.js
import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
          main: resolve(__dirname, 'logsign.html'),
          diaries: resolve(__dirname, 'diaries.html'),
          account: resolve(__dirname, 'account.html'),
          contact: resolve(__dirname, 'contact.html'),
        },
      },
    },
    // base: '/~username/my-app/',
  });