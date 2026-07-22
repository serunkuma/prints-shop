import {defineConfig} from '@playwright/test';

const canonicalSiteUrl = process.env.PUBLIC_SITE_URL || 'https://kumachiprints.art';
const baseURL = process.env.E2E_BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 1,
  use: {
    baseURL,
    headless: true,
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
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
