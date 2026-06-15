import {expect, test} from '@playwright/test';

test.describe('Launch SEO', () => {
  for (const path of [
    '/',
    '/pages/about',
    '/pages/size-guide',
    '/pages/print-quality',
    '/pages/shipping-returns',
    '/pages/faq',
    '/pages/contact',
    '/drops/opening-drop',
    '/collections/all',
    '/collections/drop-opening-drop',
    '/products/majestic-monarch',
  ]) {
    test(`Given ${path} loads Then title and description are present`, async ({page}) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page).toHaveTitle(/\S+/);
      const description = await page.locator('meta[name="description"]').getAttribute('content');
      expect(description?.trim().length || 0).toBeGreaterThan(20);
    });
  }

  test('Given the sitemap is requested Then launch URLs are included', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();

    for (const url of [
      '/',
      '/pages/about',
      '/pages/size-guide',
      '/pages/print-quality',
      '/pages/shipping-returns',
      '/pages/faq',
      '/pages/contact',
      '/drops/opening-drop',
      '/collections/all',
      '/collections/drop-opening-drop',
      '/products/majestic-monarch',
    ]) {
      expect(body).toContain(url === '/' ? 'https://prints.kumachigallery.com/</loc>' : `https://prints.kumachigallery.com${url}`);
    }
  });

  test('Given robots.txt is requested Then it references the canonical sitemap', async ({request}) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    await expect(response.text()).resolves.toContain('Sitemap: https://prints.kumachigallery.com/sitemap.xml');
  });
});
