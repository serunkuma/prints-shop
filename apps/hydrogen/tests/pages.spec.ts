import {test, expect} from '@playwright/test';

test.describe('Pages', () => {
  test('Given a visitor requests the homepage Then it renders without crashing', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).toBeAttached();
  });

  test('Given a product page for majestic-monarch When it loads Then it shows product data', async ({page}) => {
    const response = await page.goto('/products/majestic-monarch', {timeout: 30000});
    expect(response?.ok()).toBeTruthy();
    const body = page.locator('body');
    await expect(body).toBeAttached({timeout: 10000});
    const text = await body.innerText();
    expect(text.length).toBeGreaterThan(0);
  });

  test('Given a visitor requests /components Then it returns 200 and shows showcase content', async ({page}) => {
    const response = await page.goto('/components');
    expect(response?.ok()).toBeTruthy();
    const body = page.locator('body');
    await expect(body).toBeAttached();
    const text = await body.innerText();
    expect(text).toContain('Component Showcase');
    expect(text).toContain('Palette');
    expect(text).toContain('Type Ramp');
    expect(text).toContain('Product Cards');
  });

  test('Given a visitor opens /components Then it shows fallback product cards', async ({page}) => {
    const response = await page.goto('/components');
    expect(response?.ok()).toBeTruthy();
    const body = page.locator('body');
    await expect(body).toBeAttached();
    await expect(body).toContainText('Price after Shopify import');
  });

  test('Given a visitor requests /sitemap Then it returns 200 and shows grouped sections', async ({page}) => {
    const response = await page.goto('/sitemap');
    expect(response?.ok()).toBeTruthy();
    const body = page.locator('body');
    await expect(body).toBeAttached();
    const text = await body.innerText();
    expect(text).toContain('Main Pages');
    expect(text).toContain('Internal Tools');
    expect(text).toContain('Product Pages');
  });
});
