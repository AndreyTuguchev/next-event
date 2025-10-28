/// <reference types="vitest" />

import path from 'path';

import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },

  test: {
    globals: true, // allows using `describe`, `it`, `expect` without imports

    // Enables browser mode
    browser: {
      enabled: true,
      provider: playwright(),

      instances: [
        {
          browser: 'chromium', // could be 'firefox' or 'webkit' too
        },
      ],
      headless: true, // run browser tests in headless mode
    },
    setupFiles: ['./vitest.setup.ts'],
  },
  define: {
    'process.env': {},
  },
});
