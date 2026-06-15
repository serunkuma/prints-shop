import {buildSitemap} from '~/lib/sitemap.server';

export async function loader({context}: {context: any}) {
  const sitemap = await buildSitemap(context);

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=3600',
    },
  });
}
