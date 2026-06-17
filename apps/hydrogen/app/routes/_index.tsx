import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {HOMEPAGE_QUERY, ALL_PRODUCTS_QUERY} from '~/lib/queries';
import {HeroSection} from '~/components/sections/HeroSection';
import {TrustBar} from '~/components/sections/TrustBar';
import {AIPrintStudioTeaser} from '~/components/sections/AIPrintStudioTeaser';
import {FeaturedDropSection} from '~/components/sections/FeaturedDropSection';
import {EditorialProductRail} from '~/components/sections/EditorialProductRail';
import {getFallbackProducts, getFallbackSiteDoc} from '~/lib/localFallback.server';
import {enrichLaunchProduct} from '~/lib/launchProductMeta';
import {OPENING_DROP_HANDLES} from '~/lib/allowlist';

const FEATURED_DROP_HANDLES = [
  'timeless-majesty',
  'tireless-joy',
  'elephant-in-calmness',
  'thinking-faces',
  'majestic-monarch',
  'rapt-in-observation',
  'eyes-with-desire',
  'african-warrior',
];

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export const meta = () => [
  {title: 'Kumachi Prints'},
  {
    name: 'description',
    content:
      'African art prints from Kuma, beginning with the curated Opening Drop from Kumachi Prints.',
  },
];

export async function loader({context}: {context: any}) {
  const [homepage, allPrints, fallbackHomepage, fallbackProducts] = await Promise.all([
    context.sanity.fetch(HOMEPAGE_QUERY).catch(() => null),
    context.storefront.query(ALL_PRODUCTS_QUERY).catch(() => null),
    getFallbackSiteDoc('homepage', context.env),
    getFallbackProducts(context.env),
  ]);

  return {homepage: homepage || fallbackHomepage, allPrints, fallbackProducts};
}

function firstSection(sections: any[], type: string) {
  return sections.find((section) => section?._type === type);
}

export default function Homepage() {
  const {homepage, allPrints, fallbackProducts} = useLoaderData<typeof loader>();
  const sections = homepage?.sections || [];

  const sourceProducts = [
    ...(allPrints?.products?.nodes?.filter(Boolean) || []),
    ...(fallbackProducts?.filter(Boolean) || []),
  ].filter((p: any) => OPENING_DROP_HANDLES.has(p.handle));

  const productByHandle = new Map<string, any>();
  for (const product of sourceProducts) {
    if (!productByHandle.has(product.handle)) productByHandle.set(product.handle, product);
  }

  const featuredDropProducts = FEATURED_DROP_HANDLES
    .map((handle) => productByHandle.get(handle))
    .filter(Boolean)
    .map(enrichLaunchProduct);

  const heroSection = firstSection(sections, 'hero');

  return (
    <main>
      <HeroSection section={heroSection} />
      <TrustBar />
      <AIPrintStudioTeaser />
      <FeaturedDropSection products={featuredDropProducts} />
      <EditorialProductRail products={featuredDropProducts} />
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
