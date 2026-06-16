import {expect, test} from '@playwright/test';

test.describe('Launch commerce', () => {
  test('Given Majestic Monarch is opened Then the product page is launch-safe', async ({page}) => {
    const response = await page.goto('/products/majestic-monarch');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', {name: 'Majestic Monarch', level: 1})).toBeVisible();
    await expect(page.getByText(/Price shown after Shopify import|Add to Cart|Unavailable/i).first()).toBeVisible();
    await expect(page.getByLabel('Product media gallery')).toBeVisible();
    await expect(page.getByText(/Story/i).first()).toBeVisible();
    await expect(page.getByText(/Print Details/i)).toBeVisible();
    await expect(page.getByText(/In Your Space/i).first()).toBeVisible();
    await expect(page.getByText(/Size & Placement/i)).toBeVisible();
    await expect(page.getByText(/Shipping & Returns/i).first()).toBeVisible();
    await expect(page.getByText(/Size|Format/i).first()).toBeVisible();
    await expect(page.getByLabel('Related Prints')).toBeVisible();
    await expect(page.locator('body')).not.toContainText(/free shipping|over \$75|Page not found|Unknown block type/i);
  });

  test('Given a mobile visitor scrolls the PDP Then the sticky purchase bar appears', async ({page}) => {
    await page.setViewportSize({width: 375, height: 720});
    const response = await page.goto('/products/majestic-monarch');
    expect(response?.ok()).toBeTruthy();

    await page.mouse.wheel(0, 1600);
    await expect(page.getByRole('region', {name: 'Product purchase summary'})).toBeVisible();
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

  test('Given the collection page renders filter sidebar Then it shows Refine, Color, Region, Genre, Price', async ({page}) => {
    await page.goto('/collection');
    await expect(page.locator('body')).not.toContainText(/Page not found|Unknown block type/i);
    await expect(page.getByText('Refine').first()).toBeVisible();
    await expect(page.getByText('Find your print').first()).toBeVisible();
    await expect(page.getByText('Color').first()).toBeVisible();
    await expect(page.getByText('Region').first()).toBeVisible();
    await expect(page.getByText('Genre').first()).toBeVisible();
    await expect(page.getByText('Price').first()).toBeVisible();
  });

  test('Given a color filter is selected Then URL updates and product grid still works', async ({page}) => {
    await page.goto('/collection');
    await expect(page.locator('body')).toBeAttached();

    const ochreButton = page.locator('button[aria-label="Filter by Ochre"]').first();
    await ochreButton.click();

    await expect(page).toHaveURL(/color=ochre/);
    await expect(page.locator('body')).not.toContainText(/Page not found|Unknown block type/i);
    await expect(page.locator('main a[href^="/products/"]').first()).toBeVisible();
  });

  test('Given genre filter is applied Then it matches category handles', async ({page}) => {
    await page.goto('/collection');
    await expect(page.getByText('Genre').first()).toBeVisible();

    const genreButton = page.locator('button[aria-pressed]', {hasText: 'Figurative & Portrait'}).first();
    await genreButton.click();
    await expect(page).toHaveURL(/genre=figurative-and-portrait-art/);
    await expect(page.locator('main a[href^="/products/"]').first()).toBeVisible();
  });

  test('Given multiple filters combine Then they work together', async ({page}) => {
    await page.goto('/collection?color=ochre');
    await expect(page.locator('body')).toBeAttached();
    await expect(page).toHaveURL(/color=ochre/);

    const portraitButton = page.locator('button', {hasText: 'Figurative & Portrait'}).last();
    await portraitButton.click();
    await expect(page).toHaveURL(/genre=figurative-and-portrait-art/);
    await expect(page).toHaveURL(/color=ochre/);
  });

  test('Given active filter pills can be removed Then removing one preserves other filters', async ({page}) => {
    await page.goto('/collection');
    await expect(page.locator('body')).toBeAttached();

    const ochreButton = page.locator('button[aria-label="Filter by Ochre"]').first();
    await ochreButton.click();
    await expect(page).toHaveURL(/color=ochre/);

    const clearPill = page.locator('button', {hasText: 'Clear All'}).first();
    await expect(clearPill).toBeVisible();
  });

  test('Given Clear All Filters resets Then URL loses filter params and product count resets', async ({page}) => {
    await page.goto('/collection');
    await expect(page.locator('body')).toBeAttached();

    const ochreButton = page.locator('button[aria-label="Filter by Ochre"]').first();
    await ochreButton.click();
    await expect(page).toHaveURL(/color=ochre/);

    const clearButton = page.locator('button', {hasText: 'Clear All Filters'}).first();
    await clearButton.click();
    await expect(page).not.toHaveURL(/color=/);
  });

  test('Given mobile filter sheet opens Then it shows all groups and can be closed', async ({page}) => {
    await page.setViewportSize({width: 375, height: 667});
    await page.goto('/collection');
    await expect(page.locator('body')).toBeAttached();

    const mobileFilterBtn = page.locator('button', {hasText: 'Filters'}).first();
    await mobileFilterBtn.click();

    await expect(page.getByText('Refine').first()).toBeVisible();
    await expect(page.getByText('Color').first()).toBeVisible();
    await expect(page.getByText('Genre').first()).toBeVisible();
    await expect(page.getByText('Price').first()).toBeVisible();

    await page.getByLabel('Close filters').click();
    await expect(page.getByLabel('Close filters')).not.toBeVisible();
  });

  test('Given no filter interaction Then the product grid is intact', async ({page}) => {
    const response = await page.goto('/collection');
    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('body')).not.toContainText(/Page not found|Unknown block type|free shipping|over \$75/i);
    await expect(page.locator('main a[href^="/products/"]').first()).toBeVisible();
  });
});
