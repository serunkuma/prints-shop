import {expect, test} from '@playwright/test';

const navLabels = ['Home', 'About', 'Shop', 'Opening Drop', 'Contact'];

test.describe('Launch navigation', () => {
  test('Given the homepage loads Then launch navigation and footer are ready', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();

    const body = page.locator('body');
    await expect(body).not.toContainText(/free shipping|over \$75/i);

    const desktopNav = page.locator('nav[aria-label="Primary navigation"] a');
    await expect(desktopNav).toHaveText(navLabels);
    const desktopNavText = (await desktopNav.allTextContents()).join(' ');
    expect(desktopNavText).not.toMatch(/Collection|AI Studio|Artists/i);

    const footer = page.locator('footer');
    for (const group of ['Shop', 'Learn', 'Kumachi', 'Legal']) {
      await expect(footer.getByRole('heading', {name: group})).toBeVisible();
    }
    await expect(footer).not.toContainText(/free shipping|over \$75/i);

    const emptyHrefs = await footer.locator('a').evaluateAll((links) =>
      links
        .map((link) => link.getAttribute('href'))
        .filter((href) => !href || href.trim() === '' || href.trim() === '#'),
    );
    expect(emptyHrefs).toEqual([]);
  });

  test('Given a mobile visitor opens the menu Then the key launch links are available and close cleanly', async ({page}) => {
    await page.setViewportSize({width: 390, height: 844});
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();

    await page.getByRole('button', {name: 'Open menu'}).click();
    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]');
    for (const label of navLabels) {
      await expect(mobileNav.getByRole('link', {name: label})).toBeVisible();
    }

    await page.getByRole('button', {name: 'Close menu'}).last().click();
    await expect(mobileNav).toBeHidden();
  });
});
