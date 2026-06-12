import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import type {MetaArgs} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {PRODUCT_QUERY, PRODUCT_SUPPLEMENT_QUERY} from '~/lib/queries';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheShort()),
});

export const meta = ({data}: MetaArgs<typeof loader>) => {
  const product = data?.product;
  const supplement = data?.supplement;
  return [
    {
      title: supplement?.seo?.metaTitle || product?.title
        ? `${product.title} — Kumachi Prints`
        : 'Kumachi Prints',
    },
    {
      name: 'description',
      content:
        supplement?.seo?.metaDescription ||
        product?.description?.slice(0, 160),
    },
  ];
};

export async function loader({params, context}: {params: any; context: any}) {
  const {handle} = params;

  if (!handle) {
    throw new Response('Not found', {status: 404});
  }

  const [productData, supplement] = await Promise.all([
    context.storefront.query(PRODUCT_QUERY, {variables: {handle}}),
    context.sanity.fetch(PRODUCT_SUPPLEMENT_QUERY, {handle}).catch(() => null),
  ]);

  const product = productData?.product;

  if (!product) {
    throw new Response('Not found', {status: 404});
  }

  return {product, supplement};
}

export default function ProductPage() {
  const {product, supplement} = useLoaderData<typeof loader>();

  const minPrice = product.priceRange?.minVariantPrice;
  const maxPrice = product.priceRange?.maxVariantPrice;
  const variants = product.variants?.nodes || [];
  const images = product.images?.nodes || [];

  return (
    <main className="container-gallery section-pad">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        {/* Media */}
        <div>
          {product.featuredImage && (
            <div className="aspect-[3/4] bg-surface-mid rounded-xs overflow-hidden mb-4">
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="w-full h-full object-cover"
                width={product.featuredImage.width || 800}
                height={product.featuredImage.height || 1067}
              />
            </div>
          )}
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img: any) => (
                <div
                  key={img.id}
                  className="aspect-square bg-surface-mid rounded-xs overflow-hidden"
                >
                  <img
                    src={img.url}
                    alt={img.altText || product.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    width={img.width || 200}
                    height={img.height || 200}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          <h1 className="text-h1 mb-4">{product.title}</h1>

          {minPrice && (
            <p className="text-price text-gold text-2xl mb-6">
              {formatPrice(parseFloat(minPrice.amount) * 100)}
              {maxPrice?.amount !== minPrice?.amount &&
                ` – ${formatPrice(parseFloat(maxPrice.amount) * 100)}`}
            </p>
          )}

          {supplement?.artist && (
            <p className="text-body text-text-secondary mb-2">
              Artist:{' '}
              <span className="text-text-primary">
                {supplement.artist.name}
              </span>
            </p>
          )}

          {supplement?.technique && (
            <p className="text-body text-text-secondary mb-2">
              Technique:{' '}
              <span className="text-text-primary">
                {supplement.technique}
              </span>
            </p>
          )}

          {product.description && (
            <div className="text-body text-text-secondary mt-6 mb-8 leading-relaxed">
              {product.description}
            </div>
          )}

          {/* Variant selector placeholder */}
          {variants.length > 0 && (
            <div className="mb-8">
              <p className="text-caption mb-4 text-text-muted">
                {variants.length} options available
              </p>
              <div className="space-y-3">
                {variants.slice(0, 5).map((variant: any) => (
                  <div
                    key={variant.id}
                    className="flex justify-between items-center py-2 px-4 card-surface rounded-xs"
                  >
                    <span className="text-body-small">
                      {variant.selectedOptions
                        ?.map((o: any) => o.value)
                        .join(' / ')}
                    </span>
                    <span className="text-price">
                      {formatPrice(
                        parseFloat(variant.price.amount) * 100,
                      )}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {supplement?.story && (
            <div className="mt-10 pt-10 border-t border-border">
              <h2 className="text-h3 mb-4">Story</h2>
              <div className="text-body text-text-secondary leading-relaxed">
                {supplement.story}
              </div>
            </div>
          )}

          {supplement?.inspiration && (
            <div className="mt-8">
              <h2 className="text-h3 mb-4">Inspiration</h2>
              <div className="text-body text-text-secondary leading-relaxed">
                {supplement.inspiration}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Product not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong loading this product.</p></main>;
}
