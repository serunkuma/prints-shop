import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {HOMEPAGE_QUERY, FEATURED_PRODUCTS_QUERY, COLLECTION_PRODUCTS_QUERY} from '~/lib/queries';
import {HeroSection} from '~/components/sections/HeroSection';
import {FeaturedCollectionSection} from '~/components/sections/FeaturedCollectionSection';
import {ProductGridSection} from '~/components/sections/ProductGridSection';
import {TrustBar} from '~/components/sections/TrustBar';
import {AIPrintStudioTeaser} from '~/components/sections/AIPrintStudioTeaser';
import {CategoryTiles} from '~/components/sections/CategoryTiles';
import {EditorialProductRail} from '~/components/sections/EditorialProductRail';
import {EditorialStorySection} from '~/components/sections/EditorialStorySection';
import {ArtistSpotlightSection} from '~/components/sections/ArtistSpotlightSection';
import {NewsletterSection} from '~/components/sections/NewsletterSection';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export const meta = () => [{title: 'Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const [homepage, featuredProducts, allPrints] = await Promise.all([
    context.sanity.fetch(HOMEPAGE_QUERY).catch(() => null),
    context.storefront.query(FEATURED_PRODUCTS_QUERY).catch(() => null),
    context.storefront.query(COLLECTION_PRODUCTS_QUERY, {
      variables: {handle: 'all'},
    }).catch(() => null),
  ]);

  return {homepage, featuredProducts, allPrints};
}

export default function Homepage() {
  const {homepage, featuredProducts, allPrints} = useLoaderData<typeof loader>();
  const sections = homepage?.sections || [];

  const products = allPrints?.collection?.products?.nodes?.filter(Boolean) || [];

  const sectionRenderer = (section: any, index: number) => {
    switch (section._type) {
      case 'hero':
        return <HeroSection key={index} section={section} />;
      case 'featuredCollection':
        return <FeaturedCollectionSection key={index} section={section} products={products} />;
      case 'productGrid':
        return <ProductGridSection key={index} section={section} products={products} />;
      default:
        return null;
    }
  };

  return (
    <main>
      {sections.length > 0 ? (
        sections.map((section: any, index: number) => sectionRenderer(section, index))
      ) : (
        <>
          <HeroSection />
          <TrustBar />
          <AIPrintStudioTeaser />
          <CategoryTiles />
          <EditorialProductRail products={products} />

          {products.length > 0 && (
            <FeaturedCollectionSection
              section={{
                _type: 'featuredCollection',
                title: 'Featured Prints',
                description: 'Every print in the Kumachi catalogue, ready for your walls.',
                collectionHandle: 'all',
              }}
              products={products}
            />
          )}

          {featuredProducts?.products?.nodes?.length > 0 && (
            <ProductGridSection
              section={{_type: 'productGrid', title: 'Featured Prints'}}
              products={featuredProducts.products.nodes.filter(Boolean)}
            />
          )}

          <EditorialStorySection />
          <ArtistSpotlightSection />
          <NewsletterSection />
        </>
      )}
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
