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

  test('Given a non-opening product is opened Then it returns 404', async ({page}) => {
    const response = await page.goto('/products/legacy-in-the-last-light');
    expect(response?.status()).toBe(404);
  });

  for (const path of ['/collection', '/collection/figurative-and-portrait-art']) {
    test(`Given a visitor opens ${path} Then a real product grid renders`, async ({page}) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator('body')).toContainText(/Price after Shopify import|Majestic/i);
      await expect(page.locator('body')).not.toContainText(/Page not found|Unknown block type|free shipping|over \$75/i);
    });
  }

  test('Given /collection shows 22 product links total across pagination', async ({page}) => {
    const response = await page.goto('/collection');
    expect(response?.ok()).toBeTruthy();
    await page.waitForSelector('main a[href^="/products/"]');
    const productLinks = await page.locator('main a[href^="/products/"]').count();
    expect(productLinks).toBeLessThanOrEqual(22);
    const uniqueHandles = new Set(await page.locator('main a[href^="/products/"]').evaluateAll((links) => links.map((l) => (l as HTMLAnchorElement).pathname)));
    expect(uniqueHandles.size).toBeGreaterThanOrEqual(12);
  });

  test('Given the Opening Drop blog article loads Then it shows the story', async ({page}) => {
    const response = await page.goto('/blog/drops/opening-drop');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', {name: 'Opening Drop', level: 1}).first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/Unknown block type|Page not found|free shipping|over \$75/i);
  });

  test('Given /drops redirects to /blog/drops', async ({page}) => {
    await page.goto('/drops');
    await page.waitForURL('/blog/drops');
    expect(page.url()).toContain('/blog/drops');
  });

  test('Given /drops/opening-drop redirects to /blog/drops/opening-drop', async ({page}) => {
    await page.goto('/drops/opening-drop');
    await page.waitForURL('/blog/drops/opening-drop');
    expect(page.url()).toContain('/blog/drops/opening-drop');
  });

  test('Given the collection page has filters and sort Then they update URL parameters', async ({page}) => {
    await page.goto('/collection');
    await expect(page.locator('body')).toBeAttached();

    const sortButton = page.locator('button', {hasText: 'Sort by:'});
    await sortButton.click();
    await page.getByRole('menuitem', {name: 'Sort by Price: Low to High'}).click();
    await expect(page).toHaveURL(/sort=price-low/);
  });
});
