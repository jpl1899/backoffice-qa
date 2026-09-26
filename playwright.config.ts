import { defineConfig, devices } from '@playwright/test';
import 'dotenv/config';

const baseURL = process.env.WEB_URL;

if (!baseURL) {
  throw new Error('Falta WEB_URL en .env — copiá .env.example y completá la URL de staging.');
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: 1,
  timeout: 30_000,
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
