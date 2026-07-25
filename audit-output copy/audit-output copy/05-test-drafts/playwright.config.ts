import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  use: { baseURL: process.env.TEST_BASE_URL || 'http://127.0.0.1:3000', trace: 'retain-on-failure' },
  forbidOnly: true,
  retries: 0,
});
