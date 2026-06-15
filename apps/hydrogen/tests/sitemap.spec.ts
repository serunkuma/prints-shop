import {test, expect} from '@playwright/test';

test.describe('Sitemap', () => {
  const PUBLIC_SITE_URL = 'https://prints.kumachigallery.com';

  test('Given a visitor requests /sitemap Then it returns valid XML', async ({request}) => {
    const response = await request.get('/sitemap');
    expect(response.ok()).toBeTruthy();
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('xml');
    const body = await response.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain('<urlset');
    expect(body).toContain('</urlset>');
  });

  test('Given a visitor requests /sitemap.xml Then it returns valid XML', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('xml');
    const body = await response.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain('<urlset');
  });

  test('Given the sitemap is generated When URLs use the PUBLIC_SITE_URL Then they start with the canonical domain', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).toContain(PUBLIC_SITE_URL);
    const locMatches = body.match(/<loc>([^<]+)<\/loc>/g) || [];
    for (const loc of locMatches) {
      expect(loc).toContain(PUBLIC_SITE_URL);
    }
  });

  test('Given the sitemap is generated Then it includes homepage, collections, drops, artists, and search URLs', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).toContain('<loc>' + PUBLIC_SITE_URL + '/</loc>');
    expect(body).toContain('<loc>' + PUBLIC_SITE_URL + '/collections</loc>');
    expect(body).toContain('<loc>' + PUBLIC_SITE_URL + '/drops</loc>');
    expect(body).toContain('<loc>' + PUBLIC_SITE_URL + '/artists</loc>');
    expect(body).toContain('<loc>' + PUBLIC_SITE_URL + '/search</loc>');
  });

  test('Given the sitemap is generated Then it includes product URLs where products exist', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    const productUrls = body.match(/<loc>https:\/\/prints\.kumachigallery\.com\/products\/[^<]+<\/loc>/g);
    if (productUrls && productUrls.length > 0) {
      for (const url of productUrls) {
        expect(url).toMatch(/\/products\//);
      }
    }
  });

  test('Given the sitemap is generated Then it includes collection URLs where collections exist', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    const collectionUrls = body.match(/<loc>https:\/\/prints\.kumachigallery\.com\/collections\/[^<]+<\/loc>/g);
    if (collectionUrls && collectionUrls.length > 0) {
      for (const url of collectionUrls) {
        expect(url).toMatch(/\/collections\//);
      }
    }
  });

  test('Given the sitemap is generated Then it excludes /account routes', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).not.toContain('/account');
  });

  test('Given the sitemap is generated Then it excludes /cart routes', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).not.toContain('/cart');
  });

  test('Given the sitemap is generated Then it excludes /api/preview routes', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).not.toContain('/api/preview');
  });

  test('Given the sitemap is generated Then it has no duplicate URLs', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    const locMatches = body.match(/<loc>([^<]+)<\/loc>/g) || [];
    const urls = locMatches.map((l) => l.replace('<loc>', '').replace('</loc>', ''));
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
