/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allows using `describe`, `it`, `expect` without imports

    setupFiles: "./vitest.setup.ts", // optional
    include: ["**/__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}"],
    exclude: ["node_modules", ".next", "dist"],
    css: true,

    // Enables browser mode
    browser: {
      enabled: true,
      instances: [
        {
          browser: "chromium", // could be 'firefox' or 'webkit' too
        },
      ],
      headless: true, // run browser tests in headless mode
    },
  },
});
