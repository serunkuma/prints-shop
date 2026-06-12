export async function loader() {
  const robots = `User-agent: *
Allow: /

Sitemap: https://kumachiprints.com/sitemap.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'max-age=3600',
    },
  });
}
