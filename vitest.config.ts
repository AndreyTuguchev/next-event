/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true, // allows using `describe`, `it`, `expect` without imports

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
