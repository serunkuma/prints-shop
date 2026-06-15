import {defineConfig} from '@playwright/test';

const canonicalSiteUrl = process.env.PUBLIC_SITE_URL || 'https://prints.kumachigallery.com';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3000',
    headless: true,
  },
  webServer: {
    command: process.env.CI
      ? 'npm run build && npm run preview'
      : 'npm run dev',
    env: {
      PUBLIC_SITE_URL: canonicalSiteUrl,
    },
    port: 3000,
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
