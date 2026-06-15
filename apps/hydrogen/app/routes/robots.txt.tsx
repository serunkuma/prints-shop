import {getCanonicalSiteUrl} from '~/lib/siteUrl.server';

export async function loader({context}: {context: any}) {
  const env = context?.env || {};
  const siteUrl = getCanonicalSiteUrl(env);

  const robots = 'User-agent: *\nAllow: /\n\nSitemap: ' + siteUrl + '/sitemap.xml\n';

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600',
    },
  });
}
