import {test, expect} from '@playwright/test';

test.describe('Robots.txt', () => {
  const PUBLIC_SITE_URL = 'https://prints.kumachigallery.com';

  test('Given a visitor requests /robots.txt Then it references the canonical sitemap', async ({request}) => {
    const response = await request.get('/robots.txt');
    expect(response.ok()).toBeTruthy();
    const body = await response.text();
    expect(body).toContain('Sitemap: ' + PUBLIC_SITE_URL + '/sitemap');
  });

  test('Given a visitor requests /robots.txt Then it allows all user agents', async ({request}) => {
    const response = await request.get('/robots.txt');
    const body = await response.text();
    expect(body).toContain('User-agent: *');
    expect(body).toContain('Allow: /');
  });
});
