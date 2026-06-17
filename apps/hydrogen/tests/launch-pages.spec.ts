import {expect, test} from '@playwright/test';

const forbiddenCopy = /Page not found|Unknown block type|example\.com|Maya Chen|Theo Marlow/i;

test.describe('Launch pages', () => {
  test('Given the homepage renders Then the prototype shell sections are present', async ({page}) => {
    const response = await page.goto('/');
    expect(response?.ok()).toBeTruthy();

    await expect(page.getByRole('heading', {level: 1})).toBeVisible();
    await expect(page.getByRole('heading', {name: /Eight images that set the tone/i})).toBeVisible();
    await expect(page.getByText(/Kuma|Kumachi Prints/i).first()).toBeVisible();
    await expect(page.getByRole('region', {name: 'Newsletter signup'})).toBeVisible();
    await expect(page.locator('body')).not.toContainText(forbiddenCopy);
  });

  test('Given the homepage renders Then the closeout sections are in launch order', async ({page}) => {
    await page.goto('/');

    const positions = await page.evaluate(() => {
      const textNodeTop = (text: string) => {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (node.textContent?.includes(text)) {
            const element = node.parentElement;
            return element?.getBoundingClientRect().top ?? Number.MAX_SAFE_INTEGER;
          }
        }
        return Number.MAX_SAFE_INTEGER;
      };

      return {
        ai: textNodeTop('Kumachi Prints AI Studio'),
        featured: textNodeTop('Eight images that set the tone'),
        marquee: document.querySelector('section[aria-label="Featured product marquee"]')?.getBoundingClientRect().top ?? Number.MAX_SAFE_INTEGER,
        newsletter: document.querySelector('section[aria-label="Newsletter signup"]')?.getBoundingClientRect().top ?? Number.MAX_SAFE_INTEGER,
        footer: document.querySelector('footer')?.getBoundingClientRect().top ?? Number.MAX_SAFE_INTEGER,
      };
    });

    expect(positions.ai).toBeLessThan(positions.featured);
    expect(positions.featured).toBeLessThan(positions.marquee);
    expect(positions.marquee).toBeLessThan(positions.newsletter);
    expect(positions.newsletter).toBeLessThan(positions.footer);
  });

  test('Given the homepage renders Then it links to all featured drop products', async ({page}) => {
    await page.goto('/');

    for (const handle of [
      'timeless-majesty',
      'tireless-joy',
      'elephant-in-calmness',
      'thinking-faces',
      'majestic-monarch',
      'rapt-in-observation',
      'eyes-with-desire',
      'african-warrior',
    ]) {
      await expect(page.locator(`main a[href="/products/${handle}"]`).first()).toBeVisible();
    }
  });

  for (const path of ['/', '/collection', '/about', '/blog/drops', '/products/majestic-monarch']) {
    test(`Given ${path} renders Then one global newsletter appears above the footer`, async ({page}) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();

      const newsletter = page.locator('section[aria-label="Newsletter signup"]');
      await expect(newsletter).toHaveCount(1);
      await expect(newsletter).toBeVisible();

      const order = await page.evaluate(() => {
        const newsletterTop = document.querySelector('section[aria-label="Newsletter signup"]')?.getBoundingClientRect().top ?? 0;
        const footerTop = document.querySelector('footer')?.getBoundingClientRect().top ?? 0;
        return {newsletterTop, footerTop};
      });
      expect(order.newsletterTop).toBeLessThan(order.footerTop);
    });
  }

  for (const {path, heading} of [
    {path: '/about', heading: 'Kumachi Prints'},
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
