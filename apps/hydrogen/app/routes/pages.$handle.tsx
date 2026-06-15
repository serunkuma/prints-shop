import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {PAGE_QUERY} from '~/lib/queries';
import {PortableText} from '~/components/editorial/PortableText';
import {getFallbackPage} from '~/lib/localFallback.server';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;
  if (!handle) throw new Response('Not found', {status: 404});

  const livePage = await context.sanity.fetch(PAGE_QUERY, {slug: handle}).catch(() => null);
  const page = livePage || (await getFallbackPage(handle, context.env));
  if (!page) throw new Response('Not found', {status: 404});

  return {page};
}

export const meta = ({data}: any) => [
  {title: data?.page?.seo?.metaTitle || data?.page?.title || 'Kumachi Prints'},
  {
    name: 'description',
    content:
      data?.page?.seo?.metaDescription ||
      data?.page?.excerpt ||
      'Kumachi Prints collector information, support, and launch guidance.',
  },
];

function blockText(block: any) {
  return (block?.children || [])
    .map((child: any) => child?.text || '')
    .join('')
    .trim();
}

function pageBodyWithoutDuplicateTitle(page: any) {
  if (!Array.isArray(page?.body)) return page?.body;
  return page.body.filter((block: any, index: number) => {
    if (index !== 0) return true;
    return !(block?.style === 'h1' && blockText(block) === page.title);
  });
}

export default function Page() {
  const {page} = useLoaderData<typeof loader>();
  const body = pageBodyWithoutDuplicateTitle(page);

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-8">{page.title}</h1>
      <div className="max-w-3xl text-body text-text-secondary leading-relaxed">
        <PortableText value={body} />
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Page not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
