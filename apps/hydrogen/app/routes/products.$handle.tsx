import {useMemo, useState} from 'react';
import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import type {MetaArgs} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {PRODUCT_QUERY, PRODUCT_SUPPLEMENT_QUERY} from '~/lib/queries';
import {formatPrice} from '~/lib/format';
import {ProductMedia} from '~/components/product/ProductMedia';
import {VariantSelector} from '~/components/product/VariantSelector';
import {AddToCart} from '~/components/product/AddToCart';

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
  const allUnavailable = variants.length > 0 && variants.every((v: any) => !v.availableForSale);
  const initialVariant = useMemo(
    () => variants.find((variant: any) => variant.availableForSale) || variants[0],
    [variants],
  );
  const [selectedVariantId, setSelectedVariantId] = useState<string | null>(
    initialVariant?.id || null,
  );
  const selectedVariant =
    variants.find((variant: any) => variant.id === selectedVariantId) || initialVariant;
  const selectedPrice = selectedVariant?.price || minPrice;

  return (
    <main className="container-gallery section-pad">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-xl">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductMedia
            featuredImage={product.featuredImage}
            images={images}
            title={product.title}
          />
        </div>

        <div>
          {supplement?.series?.title && (
            <p className="text-caption text-gold mb-3">{supplement.series.title}</p>
          )}
          <h1 className="text-h1 mb-4">{product.title}</h1>

          {selectedPrice && (
            <p className="text-price text-gold text-2xl mb-6">
              {formatPrice(parseFloat(selectedPrice.amount) * 100)}
              {!selectedVariant && maxPrice?.amount !== minPrice?.amount &&
                ` - ${formatPrice(parseFloat(maxPrice.amount) * 100)}`}
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

          {variants.length > 0 && !allUnavailable && (
            <VariantSelector
              variants={variants}
              selectedVariantId={selectedVariant?.id || null}
              onSelect={setSelectedVariantId}
            />
          )}

          {allUnavailable ? (
            <div className="py-4 px-6 bg-surface-mid rounded-xs border border-border mb-6">
              <p className="text-body text-text-muted">Sold out</p>
            </div>
          ) : (
            <AddToCart
              variantId={selectedVariant?.id || null}
              disabled={!selectedVariant?.availableForSale}
              label={selectedVariant?.availableForSale ? 'Add to Cart' : 'Unavailable'}
            />
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 text-body-small text-text-muted sm:grid-cols-3">
            <p>Archival paper</p>
            <p>Printed on demand</p>
            <p>Secure Shopify checkout</p>
          </div>

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
