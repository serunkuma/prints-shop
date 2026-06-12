import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {HOMEPAGE_QUERY, FEATURED_PRODUCTS_QUERY, COLLECTION_PRODUCTS_QUERY} from '~/lib/queries';
import {HeroSection} from '~/components/sections/HeroSection';
import {FeaturedCollectionSection} from '~/components/sections/FeaturedCollectionSection';
import {ProductGridSection} from '~/components/sections/ProductGridSection';
import {ProductGrid} from '~/components/product/ProductGrid';

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
          <HeroSection
            section={{
              _type: 'hero',
              heading: 'Museum-minded prints for everyday rooms',
              subheading: 'Premium art prints from the Kumachi catalogue. Every print has a story.',
              cta: {label: 'Explore', url: '/collections/all'},
            }}
          />

          <section className="border-y border-border bg-surface-mid/40">
            <div className="container-gallery grid grid-cols-1 gap-6 py-6 text-body-small text-text-secondary md:grid-cols-3">
              <p>Archival print materials</p>
              <p>Secure Shopify checkout</p>
              <p>Made to order through Printful</p>
            </div>
          </section>

          <FeaturedCollectionSection
            section={{
              _type: 'featuredCollection',
              title: 'All Prints',
              description: 'Every print in the Kumachi catalogue, ready for your walls.',
              collectionHandle: 'all',
            }}
            products={products}
          />

          {featuredProducts?.products?.nodes && (
            <ProductGridSection
              section={{_type: 'productGrid', title: 'Featured Prints'}}
              products={featuredProducts.products.nodes.filter(Boolean)}
            />
          )}
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
