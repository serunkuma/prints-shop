import {expect, test} from '@playwright/test';

const openingHandles = [
  'majestic-monarch',
  'rapt-in-observation',
  'transfixed-beauty',
  'graceful-potbearer',
  'boys-in-joyful-abandon',
  'captivating-beauty',
  'unbridled-laughter',
  'serious-beauty',
  'thinking-faces',
  'nurtured-wings',
  'a-continents-tapestry',
  'african-youths-smile',
  'tireless-joy',
  'elephant-in-calmness',
  'timeless-majesty',
  'young-innocence',
  'eyes-with-desire',
  'african-warrior',
  'skin-deep-beauty',
  'african-equine-grace',
  'silence-in-spirit',
  'triadic-reflections',
];

const launchPages = [
  '/',
  '/collection',
  '/collection/opening-drop',
  '/collection?genre=figurative-and-portrait-art',
  '/collection?genre=abstract-art',
  '/create',
  '/about',
  '/blog/drops',
  '/blog/drops/opening-drop',
  '/pages/size-guide',
  '/pages/print-quality',
  '/pages/shipping-returns',
  '/pages/faq',
  '/pages/contact',
  '/sitemap',
  '/sitemap.xml',
  '/robots.txt',
];

test.describe('Production launch scan', () => {
  for (const path of launchPages) {
    test(`Given ${path} is public Then it does not render a launch blocker`, async ({page}) => {
      const response = await page.goto(path);
      expect(response?.ok()).toBeTruthy();
      const body = await page.locator('body').innerText();
      expect(body).not.toMatch(/Page not found|Collection not found|Product not found|An unexpected error occurred|Log in to continue to Oxygen|Verifying your connection/i);
    });
  }

  test('Given public internal links are crawled Then no launch link returns a 404', async ({page, request, baseURL}) => {
    const discovered = new Set<string>();
    for (const path of ['/', '/collection', '/blog/drops/opening-drop', '/about', '/create']) {
      await page.goto(path);
      const links = await page.locator('a[href]').evaluateAll((anchors) =>
        anchors
          .map((anchor) => (anchor as HTMLAnchorElement).getAttribute('href') || '')
          .filter((href) => href.startsWith('/') && !href.startsWith('/account/login')),
      );
      links.forEach((href) => discovered.add(href));
    }

    for (const href of discovered) {
      const response = await request.get(href);
      expect(response.status(), `${baseURL}${href}`).not.toBe(404);
      expect(response.status(), `${baseURL}${href}`).toBeLessThan(500);
    }
  });

  for (const handle of openingHandles) {
    test(`Given ${handle} is opened Then the PDP can sell`, async ({page}) => {
      const response = await page.goto(`/products/${handle}`);
      expect(response?.ok(), handle).toBeTruthy();
      await expect(page.getByRole('button', {name: /add to cart/i}).first(), handle).toBeVisible();
      await expect(page.locator('body'), handle).not.toContainText(/Product not found|Unavailable|Price shown after Shopify import/i);
    });
  }
});
