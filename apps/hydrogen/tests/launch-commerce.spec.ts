import {expect, test} from '@playwright/test';

test.describe('Launch commerce', () => {
  test('Given Majestic Monarch is opened Then the product page is launch-safe', async ({page}) => {
    const response = await page.goto('/products/majestic-monarch');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', {name: 'Majestic Monarch', level: 1})).toBeVisible();
    await expect(page.getByText(/Price shown after Shopify import|Add to Cart|Unavailable/i).first()).toBeVisible();
    await expect(page.getByText(/Story/i).first()).toBeVisible();
    await expect(page.getByText(/Print Details/i)).toBeVisible();
    await expect(page.getByText(/Size|Format/i).first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/free shipping|over \$75|Page not found|Unknown block type/i);
  });

  for (const path of ['/collections/all', '/collections/drop-opening-drop']) {
    test(`Given a visitor opens ${path} Then a real product grid renders`, async ({page}) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('link', {name: /Majestic Monarch/i}).first()).toBeVisible();
      await expect(page.locator('body')).not.toContainText(/Page not found|Unknown block type|free shipping|over \$75/i);
    });
  }

  test('Given the Opening Drop editorial page loads Then it shows the story and launch products', async ({page}) => {
    const response = await page.goto('/drops/opening-drop');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', {name: 'Opening Drop', level: 1})).toBeVisible();
    await expect(page.getByRole('link', {name: /Majestic Monarch/i})).toBeVisible();
    const productLinks = await page.locator('main a[href^="/products/"]').count();
    expect(productLinks).toBeGreaterThanOrEqual(22);
    await expect(page.locator('body')).not.toContainText(/Unknown block type|Page not found|free shipping|over \$75/i);
  });
});
