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
});
