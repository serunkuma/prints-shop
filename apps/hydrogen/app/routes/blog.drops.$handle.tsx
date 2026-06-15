import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {PortableText} from '~/components/editorial/PortableText';
import {SERIES_BY_SLUG_QUERY} from '~/lib/queries';
import {getFallbackSeries} from '~/lib/localFallback.server';

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
    <main className="container-gallery section-pad">
      {series.heroImage && (
        <div className="aspect-[21/9] bg-surface-mid rounded-xs overflow-hidden mb-10">
          <img
            src={series.heroImage.asset?.url}
            alt={series.heroImage.alt || series.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <p className="text-caption uppercase mb-2" style={{color: 'var(--color-accent-clay)'}}>Drops</p>
      <h1 className="text-h1 mb-4">{series.title}</h1>
      {series.artist && <p className="text-body text-text-muted mb-6">By {series.artist.name}</p>}
      {series.publishDate && (
        <p className="text-body-small text-text-muted mb-6">
          {new Date(series.publishDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
        </p>
      )}

      {series.description && (
        <div className="max-w-3xl text-body text-text-secondary leading-relaxed mb-10">
          <PortableText value={series.description} />
        </div>
      )}

      <div className="mt-10 pt-10 border-t border-border">
        <a
          href="/collection"
          className="inline-flex h-11 px-6 items-center text-button"
          style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
        >
          Browse the Collection
        </a>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Article not found</h1><a href="/blog/drops" className="text-gold">View all blog posts</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
