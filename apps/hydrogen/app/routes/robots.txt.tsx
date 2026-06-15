function getSiteUrl(env: any): string {
  return env?.PUBLIC_SITE_URL
    ? env.PUBLIC_SITE_URL.replace(/\/+$/, '')
    : env?.PUBLIC_STORE_DOMAIN
      ? 'https://' + env.PUBLIC_STORE_DOMAIN
      : 'https://prints.kumachigallery.com';
}

export async function loader({context}: {context: any}) {
  const env = context?.env || {};
  const siteUrl = getSiteUrl(env);

  const robots = 'User-agent: *\nAllow: /\n\nSitemap: ' + siteUrl + '/sitemap\n';

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600',
    },
  });
}
