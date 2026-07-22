import {expect, test} from '@playwright/test';

test.describe('Launch SEO', () => {
  for (const path of [
    '/',
    '/about',
    '/pages/size-guide',
    '/pages/print-quality',
    '/pages/shipping-returns',
    '/pages/faq',
    '/pages/contact',
    '/blog/drops/opening-drop',
    '/collection',
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
      '/about',
      '/pages/size-guide',
      '/pages/print-quality',
      '/pages/shipping-returns',
      '/pages/faq',
      '/pages/contact',
      '/blog/drops/opening-drop',
            '/collection/opening-drop',
      '/products/majestic-monarch',
    ]) {
      expect(body).toContain(url === '/' ? 'https://kumachiprints.art/</loc>' : `https://kumachiprints.art${url}`);
    }
  });

  test('Given the sitemap is requested Then old drop URLs are NOT included', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();

    expect(body).not.toContain('kumachiprints.art/drops/');
    expect(body).not.toContain('/artists');
  });

  test('Given the sitemap is requested Then non-opening products are NOT included', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();

    expect(body).not.toContain('/products/legacy-in-the-last-light');
    expect(body).not.toContain('/products/skyward-carriers');
  });

  test('Given robots.txt is requested Then it references the canonical sitemap', async ({request}) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    await expect(response.text()).resolves.toContain('Sitemap: https://kumachiprints.art/sitemap.xml');
  });
});
