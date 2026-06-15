import {expect, test} from '@playwright/test';

const navLabels = ['Collection', 'Create', 'Drops', 'About'];
const forbiddenNav = ['Artists', 'Home', 'Shop'];

test.describe('Launch navigation', () => {
  test('Given the homepage loads Then the top nav has correct labels', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('body')).not.toContainText(/free shipping|over \$75/i);

    const desktopNav = page.locator('nav[aria-label="Primary navigation"]');
    const navText = await desktopNav.innerText();
    for (const label of navLabels) {
      expect(navText).toContain(label);
    }
    for (const forbidden of forbiddenNav) {
      expect(navText).not.toContain(forbidden);
    }
  });

  test('Given a visitor navigates to new routes Then they return 200', async ({page}) => {
    for (const path of ['/collection', '/about', '/create', '/drops']) {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.locator('body')).not.toContainText(/Page not found|free shipping|over \$75/i);
    }
  });

  test('Given old URLs are visited Then they redirect to new paths', async ({page}) => {
    await page.goto('/collections');
    await page.waitForURL('/collection');
    expect(page.url()).toContain('/collection');

    await page.goto('/collections/abstract-art');
    await page.waitForURL('/collection/abstract-art');
    expect(page.url()).toContain('/collection/abstract-art');

    await page.goto('/pages/about');
    await page.waitForURL('/about');
    expect(page.url()).toContain('/about');
  });

  test('Given the Collection hover mega menu Then it opens and closes correctly', async ({page}) => {
    await page.goto('/');
    await expect(page.locator('body')).toBeAttached();

    const collectionTrigger = page.locator('nav[aria-label="Primary navigation"] button', {hasText: 'Collection'});
    await collectionTrigger.hover();

    const megaMenu = page.locator('[role="menu"][aria-label="Collection menu"]');
    await expect(megaMenu).toBeVisible({timeout: 3000});

    await expect(megaMenu).toContainText('All Prints');
    await expect(megaMenu).toContainText('Opening Drop');
    await expect(megaMenu).toContainText('Size Guide');
    await expect(megaMenu).toContainText('Print Quality');
    await expect(megaMenu).toContainText('Majestic Monarch');
    await expect(megaMenu).toContainText("A Continent's Tapestry");
    await expect(megaMenu).not.toContainText('Artists');

    await page.keyboard.press('Escape');
    await page.waitForTimeout(300);
    await expect(megaMenu).not.toBeVisible();
  });

  test('Given a mobile visitor opens the menu Then it shows top-level links plus Collection submenu', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    await page.goto('/');

    await page.getByRole('button', {name: 'Open menu'}).click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');

    for (const label of ['Create', 'Drops', 'About']) {
      await expect(mobileNav.getByRole('link', {name: label})).toBeVisible();
    }
    await expect(mobileNav.getByText('Collection')).toBeVisible();
    await expect(mobileNav).not.toContainText('Artists');

    await page.getByRole('button', {name: 'Close menu'}).last().click();
    await expect(mobileNav).toBeHidden();
  });
});
