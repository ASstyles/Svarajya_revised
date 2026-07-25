import { defineConfig } from 'vitest/config';
import path from 'node:path';

export default defineConfig({
  test: { environment: 'jsdom', clearMocks: true, restoreMocks: true },
  resolve: { alias: { '@': path.resolve(__dirname, '../../source-snapshot/Svarajya-main-6-7-26/Svarajya-main/src') } },
});
