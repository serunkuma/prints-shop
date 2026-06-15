import {expect, test} from '@playwright/test';

const forbiddenCopy = /Page not found|Unknown block type|example\.com|Maya Chen|Theo Marlow/i;

test.describe('Launch pages', () => {
  test('Given the homepage renders Then the prototype shell sections are present', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    await expect(page.getByText(/Opening Drop|Featured Prints/i).first()).toBeVisible();
    await expect(page.getByText(/Kuma|Kumachi Prints/i).first()).toBeVisible();
    await expect(page.getByText(/Stay close|studio notes|print stories/i).first()).toBeVisible();
    await expect(page.locator('body')).not.toContainText(forbiddenCopy);
  });

  for (const {path, heading} of [
    {path: '/pages/about', heading: 'About Kumachi Prints'},
    {path: '/pages/size-guide', heading: 'Size Guide'},
    {path: '/pages/print-quality', heading: 'Print Quality'},
    {path: '/pages/shipping-returns', heading: 'Shipping And Returns'},
    {path: '/pages/faq', heading: 'FAQ'},
    {path: '/pages/contact', heading: 'Contact'},
  ]) {
    test(`Given a visitor opens ${path} Then the page content renders`, async ({page}) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      await expect(page.getByRole('heading', {name: heading, level: 1})).toBeVisible();
      await expect(page.locator('body')).not.toContainText(forbiddenCopy);
      await expect(page.locator('body')).not.toContainText(/free shipping|over \$75/i);
    });
  }
});
