import {useMemo, useState} from 'react';
import {Link, useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import type {MetaArgs} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheShort} from '@shopify/hydrogen';
import {ChevronDown, Lock, RefreshCw, Truck} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
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
  const [shippingOpen, setShippingOpen] = useState(false);
  const optionSummary = selectedVariant?.selectedOptions?.map((option: any) => option.value).join(' / ');

  return (
    <main className="min-h-dvh pt-24 pb-28 md:pb-0" style={{backgroundColor: 'var(--color-bg-primary)'}}>
      <section className="container-gallery grid grid-cols-1 gap-10 py-8 lg:grid-cols-[60%_40%] lg:gap-14">
        <div className="lg:col-span-2">
          <nav className="flex flex-wrap items-center gap-2 text-caption uppercase text-text-muted">
            <Link to="/">Home</Link>
            <span>/</span>
            <Link to="/collections">Collection</Link>
            <span>/</span>
            <span className="text-text-primary">{product.title}</span>
          </nav>
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductMedia
            featuredImage={product.featuredImage}
            images={images}
            title={product.title}
          />
        </div>

        <div className="pb-8">
          {supplement?.series?.title && (
            <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>{supplement.series.title}</p>
          )}
          {supplement?.artist?.name && (
            <Link to={`/artists/${supplement.artist.slug?.current || supplement.artist.slug || ''}`} className="text-h4 font-display hover:underline" style={{color: 'var(--color-text-secondary)'}}>
              {supplement.artist.name}
            </Link>
          )}

          <h1 className="mt-1 text-h1 font-display" style={{color: 'var(--color-text-primary)'}}>{product.title}</h1>

          {selectedPrice && (
            <div className="mt-4">
              <AnimatePresence mode="wait">
                <motion.span
                  key={`${selectedVariant?.id || 'price'}-${selectedPrice.amount}`}
                  className="text-price"
                  style={{color: 'var(--color-text-primary)'}}
                  initial={{opacity: 0, y: -8}}
                  animate={{opacity: 1, y: 0}}
                  exit={{opacity: 0, y: 8}}
                  transition={{duration: 0.2}}
                >
                  {formatPrice(parseFloat(selectedPrice.amount) * 100)}
                  {!selectedVariant && maxPrice?.amount !== minPrice?.amount &&
                    ` - ${formatPrice(parseFloat(maxPrice.amount) * 100)}`}
                </motion.span>
              </AnimatePresence>
              {optionSummary && <p className="mt-1 text-xs" style={{color: 'var(--color-text-secondary)'}}>{optionSummary}</p>}
            </div>
          )}

          {supplement?.technique && (
            <p className="mt-4 text-body text-text-secondary">
              Technique:{' '}
              <span className="text-text-primary">
                {supplement.technique}
              </span>
            </p>
          )}

          {product.description && (
            <div className="text-body mt-6 max-w-[440px] leading-relaxed" style={{color: 'var(--color-text-secondary)'}}>
              {product.description}
            </div>
          )}

          <div className="mt-8 border-t border-border pt-8">
            {variants.length > 0 && !allUnavailable && (
              <VariantSelector
                variants={variants}
                selectedVariantId={selectedVariant?.id || null}
                onSelect={setSelectedVariantId}
              />
            )}

            {allUnavailable ? (
              <div className="mb-6 border border-border bg-surface-mid px-6 py-4">
                <p className="text-body text-text-muted">Sold out</p>
              </div>
            ) : (
              <AddToCart
                variantId={selectedVariant?.id || null}
                disabled={!selectedVariant?.availableForSale}
                label={selectedVariant?.availableForSale ? 'Add to Cart' : 'Unavailable'}
              />
            )}
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs" style={{color: 'var(--color-text-secondary)'}}>
            <Truck size={14} />
            <span>Estimated delivery 7-14 business days · Free over $75</span>
          </div>

          <div className="mt-6 flex items-center justify-between">
            {[
              {icon: Lock, label: 'Secure Checkout'},
              {icon: Truck, label: 'Careful Shipping'},
              {icon: RefreshCw, label: '30-Day Returns'},
            ].map(({icon: Icon, label}) => (
              <div key={label} className="flex flex-col items-center gap-1">
                <Icon size={18} strokeWidth={1.5} style={{color: 'var(--color-text-tertiary)'}} />
                <span className="text-caption text-center" style={{color: 'var(--color-text-tertiary)'}}>{label}</span>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={() => setShippingOpen(!shippingOpen)}
              className="flex w-full items-center justify-between py-3"
              style={{borderTop: '1px solid var(--color-border)'}}
            >
              <span className="text-body-small font-medium" style={{color: 'var(--color-text-primary)'}}>
                Shipping & Returns
              </span>
              <motion.div animate={{rotate: shippingOpen ? 180 : 0}} transition={{duration: 0.2}}>
                <ChevronDown size={18} style={{color: 'var(--color-text-secondary)'}} />
              </motion.div>
            </button>
            <AnimatePresence>
              {shippingOpen && (
                <motion.div
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  transition={{duration: 0.3}}
                  className="overflow-hidden"
                >
                  <p className="text-body-small pb-3" style={{color: 'var(--color-text-secondary)'}}>
                    Prints ship within 3-5 business days. Framed prints ship within 7-10 business days. Returns are accepted on unframed prints within 30 days.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {supplement?.story && (
            <div className="mt-10 pt-10 border-t border-border">
              <h2 className="text-h3 mb-4" style={{color: 'var(--color-text-primary)'}}>Story</h2>
              <div className="text-body leading-relaxed" style={{color: 'var(--color-text-secondary)'}}>
                {supplement.story}
              </div>
            </div>
          )}

          {supplement?.inspiration && (
            <div className="mt-8">
              <h2 className="text-h3 mb-4" style={{color: 'var(--color-text-primary)'}}>Inspiration</h2>
              <div className="text-body leading-relaxed" style={{color: 'var(--color-text-secondary)'}}>
                {supplement.inspiration}
              </div>
            </div>
          )}

          {supplement?.mockupImages && supplement.mockupImages.length > 0 && (
            <div className="mt-10 pt-10 border-t border-border">
              <h2 className="text-h3 mb-4" style={{color: 'var(--color-text-primary)'}}>In your space</h2>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {supplement.mockupImages.map((img: any, i: number) => (
                  <img
                    key={img._key || i}
                    src={img.asset?.url || img.url}
                    alt={img.alt || `${product.title} mockup ${i + 1}`}
                    className="h-64 w-auto shrink-0 rounded object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}

          {supplement?.roomImages && supplement.roomImages.length > 0 && (
            <div className="mt-8">
              <h2 className="text-h3 mb-4" style={{color: 'var(--color-text-primary)'}}>Room views</h2>
              <div className="grid grid-cols-2 gap-3">
                {supplement.roomImages.map((img: any, i: number) => (
                  <img
                    key={img._key || i}
                    src={img.asset?.url || img.url}
                    alt={img.alt || `${product.title} room view ${i + 1}`}
                    className="aspect-[4/3] w-full rounded object-cover"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          )}

          {supplement?.videos && supplement.videos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-h3 mb-4" style={{color: 'var(--color-text-primary)'}}>Video</h2>
              {supplement.videos.map((video: any, i: number) => (
                <video
                  key={video._key || i}
                  controls
                  className="w-full rounded"
                  poster={video.poster?.asset?.url || undefined}
                >
                  <source src={video.asset?.url || video.url} type={video.asset?.mimeType || "video/mp4"} />
                </video>
              ))}
            </div>
          )}

          <div className="mt-10 border-t border-border pt-8">
            <h3 className="text-h3 font-display" style={{color: 'var(--color-text-primary)'}}>Print Details</h3>
            <div className="mt-4 space-y-3">
              {[
                {label: 'Format', value: optionSummary || 'Choose size'},
                {label: 'Paper', value: supplement?.paper || '310gsm archival matte paper'},
                {label: 'Ink', value: supplement?.ink || 'Archival pigment ink'},
                {label: 'Edition', value: supplement?.edition || 'Open edition'},
                {label: 'SKU', value: selectedVariant?.sku || product.handle},
              ].map(({label, value}) => (
                <div key={label} className="flex">
                  <span className="w-28 flex-shrink-0 text-caption font-medium" style={{color: 'var(--color-text-secondary)'}}>{label}</span>
                  <span className="text-body-small" style={{color: 'var(--color-text-primary)'}}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {!allUnavailable && (
        <div
          className="fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 shadow-kumachi-xl md:hidden"
          style={{
            backgroundColor: 'rgba(255, 251, 245, 0.96)',
            borderColor: 'var(--color-border)',
            backdropFilter: 'blur(18px)',
          }}
        >
          <div className="mx-auto flex max-w-screen-sm items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base" style={{color: 'var(--color-text-primary)'}}>{product.title}</p>
              {optionSummary && (
                <p className="truncate text-xs" style={{color: 'var(--color-text-secondary)'}}>{optionSummary}</p>
              )}
            </div>
            <div className="w-36 flex-shrink-0">
              <AddToCart
                variantId={selectedVariant?.id || null}
                disabled={!selectedVariant?.availableForSale}
                label="Add"
              />
            </div>
          </div>
        </div>
      )}
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
