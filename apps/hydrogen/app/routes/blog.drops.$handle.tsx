import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {PortableText} from '~/components/editorial/PortableText';
import {SERIES_BY_SLUG_QUERY} from '~/lib/queries';
import {getFallbackSeries} from '~/lib/localFallback.server';
import {ContentCallout, EditorialFrame, LinkRail, PageHero, PageShell} from '~/components/design/PageTemplates';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: any) => [
  {title: data?.series?.title ? `${data.series.title} — Kumachi Prints Blog` : 'Kumachi Prints Blog'},
  {
    name: 'description',
    content:
      data?.series?.seo?.metaDescription ||
      'Editorial stories from the Kumachi Prints collection.',
  },
];

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  const liveSeries = await context.sanity.fetch(SERIES_BY_SLUG_QUERY, {slug: handle}).catch(() => null);
  const fallbackSeries = await getFallbackSeries(handle, context.env);
  const series = liveSeries || fallbackSeries;
  if (!series) throw new Response('Not found', {status: 404});

  return {series};
}

export default function BlogDropPage() {
  const {series} = useLoaderData<typeof loader>();

  return (
    <PageShell>
      <PageHero
        eyebrow="Drops"
        title={series.title}
        description="A themed release note: why these pieces sit together, what they ask of a room, and where to begin in the collection."
      >
        {series.heroImage ? (
          <div className="aspect-[21/9] overflow-hidden" style={{backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)'}}>
            <img
              src={series.heroImage.asset?.url}
              alt={series.heroImage.alt || series.title}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}
      </PageHero>

      <EditorialFrame
        aside={
          <LinkRail
            title="After the story"
            links={[
              {label: 'Shop the Collection', href: '/collection', description: 'Browse the launch prints.'},
              {label: 'Size Guide', href: '/pages/size-guide', description: 'Choose the right print size.'},
              {label: 'Print Quality', href: '/pages/print-quality', description: 'Paper, ink, and care.'},
              {label: 'All Blog Posts', href: '/blog/drops', description: 'Return to editorial drops.'},
            ]}
          />
        }
      >
        {series.artist || series.publishDate ? (
          <p className="text-caption uppercase" style={{color: 'var(--color-text-tertiary)'}}>
            {series.artist ? `By ${series.artist.name}` : 'Kumachi Prints'}
            {series.publishDate
              ? ` / ${new Date(series.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}`
              : ''}
          </p>
        ) : null}
        <ContentCallout title="Drop note">
          Drops are editorial themes, not separate stores. The products live in the collection; the blog explains the
          thinking, selection, and room feeling behind the release.
        </ContentCallout>
        {series.description ? (
          <PortableText value={series.description} />
        ) : null}
      </EditorialFrame>
    </PageShell>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Article not found</h1><a href="/blog/drops" className="text-gold">View all blog posts</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
