import {test, expect} from '@playwright/test';

test.describe('Sitemap', () => {
  const PUBLIC_SITE_URL = 'https://prints.kumachigallery.com';

  test('Given a visitor requests /sitemap Then it returns HTML', async ({request}) => {
    const response = await request.get('/sitemap');
    expect(response.ok()).toBeTruthy();
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('text/html');
  });

  test('Given a visitor requests /sitemap Then it shows grouped sections', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).toContain('Main Pages');
    expect(body).toContain('Collections');
    expect(body).toContain('Opening Drop');
    expect(body).toContain('Product Pages');
    expect(body).toContain('Support Pages');
    expect(body).toContain('Internal Tools');
  });

  test('Given the HTML sitemap is generated Then it includes key links', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).toContain('/components');
    expect(body).toContain('/collections/all');
    expect(body).toContain('/drops/opening-drop');
    expect(body).toContain('/pages/about');
    expect(body).toContain('/products/majestic-monarch');
  });

  test('Given the HTML sitemap is generated Then it does not emit XML tags', async ({request}) => {
    const response = await request.get('/sitemap');
    const body = await response.text();
    expect(body).not.toContain('<urlset');
    expect(body).not.toContain('<?xml');
  });

  test('Given a visitor requests /sitemap.xml Then it returns valid XML', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    expect(response.ok()).toBeTruthy();
    const contentType = response.headers()['content-type'] || '';
    expect(contentType).toContain('xml');
    const body = await response.text();
    expect(body).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(body).toContain('<urlset');
    expect(body).toContain('</urlset>');
  });

  test('Given the XML sitemap is generated Then it includes launch URLs', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    for (const url of [
      '/',
      '/pages/about',
      '/pages/size-guide',
      '/pages/print-quality',
      '/pages/shipping-returns',
      '/pages/faq',
      '/pages/contact',
      '/drops/opening-drop',
      '/collections/all',
      '/collections/drop-opening-drop',
      '/products/majestic-monarch',
    ]) {
      expect(body).toContain(url === '/' ? 'https://prints.kumachigallery.com/</loc>' : `https://prints.kumachigallery.com${url}`);
    }
  });

  test('Given the XML sitemap is generated Then it excludes /account routes', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    expect(body).not.toContain('/account');
  });

  test('Given the XML sitemap is generated Then it excludes /cart routes', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    expect(body).not.toContain('/cart');
  });

  test('Given the XML sitemap is generated Then it has no duplicate URLs', async ({request}) => {
    const response = await request.get('/sitemap.xml');
    const body = await response.text();
    const locMatches = body.match(/<loc>([^<]+)<\/loc>/g) || [];
    const urls = locMatches.map((l) => l.replace('<loc>', '').replace('</loc>', ''));
    const uniqueUrls = new Set(urls);
    expect(uniqueUrls.size).toBe(urls.length);
  });
});
