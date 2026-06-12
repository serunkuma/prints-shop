import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';
import {HOMEPAGE_QUERY, FEATURED_PRODUCTS_QUERY} from '~/lib/queries';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export const meta = () => [{title: 'Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const [homepage, featuredProducts] = await Promise.all([
    context.sanity.fetch(HOMEPAGE_QUERY).catch(() => null),
    context.storefront.query(FEATURED_PRODUCTS_QUERY).catch(() => null),
  ]);

  return {homepage, featuredProducts};
}

export default function Homepage() {
  const {homepage, featuredProducts} = useLoaderData<typeof loader>();

  return (
    <main>
      <section className="container-gallery section-pad">
        <h1 className="text-display">Kumachi Prints</h1>
        <div className="accent-rule mt-6 mb-8" />
        <p className="text-h3 text-text-secondary max-w-2xl">
          Premium art prints from the Kumachi catalogue.
        </p>
      </section>

      {featuredProducts?.products?.nodes && (
        <section className="container-gallery section-pad">
          <h2 className="text-h2 mb-10">Featured Prints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter">
            {featuredProducts.products.nodes.map(
              (product: any) =>
                product && (
                  <a
                    key={product.id}
                    href={`/products/${product.handle}`}
                    className="group"
                  >
                    <div className="aspect-[3/4] bg-surface-mid rounded-xs overflow-hidden mb-4">
                      {product.featuredImage && (
                        <img
                          src={product.featuredImage.url}
                          alt={product.featuredImage.altText || product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                          width={product.featuredImage.width || 600}
                          height={product.featuredImage.height || 800}
                        />
                      )}
                    </div>
                    <h3 className="text-h4 mb-1">{product.title}</h3>
                    {product.priceRange?.minVariantPrice && (
                      <p className="text-price text-gold">
                        {formatPrice(parseFloat(product.priceRange.minVariantPrice.amount) * 100)}
                      </p>
                    )}
                  </a>
                ),
            )}
          </div>
        </section>
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
