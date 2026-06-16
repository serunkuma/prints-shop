import {type RefObject, useEffect, useState} from 'react';
import {AddToCart} from '~/components/product/AddToCart';

export function ProductStickyMobileBar({
  product,
  optionSummary,
  selectedVariant,
  quantity,
  isFallbackProduct,
  allUnavailable,
  purchaseRef,
}: {
  product: any;
  optionSummary?: string;
  selectedVariant: any;
  quantity: number;
  isFallbackProduct: boolean;
  allUnavailable: boolean;
  purchaseRef: RefObject<HTMLDivElement | null>;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const target = purchaseRef.current;
    const handleScroll = () => setShow(window.scrollY > 420);

    const observer = new IntersectionObserver(
      ([entry]) => setShow(!entry.isIntersecting || window.scrollY > 420),
      {threshold: 0.05},
    );
    if (target) observer.observe(target);
    window.addEventListener('scroll', handleScroll, {passive: true});
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [purchaseRef]);

  if (!show) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t px-4 py-3 shadow-kumachi-xl md:hidden"
      style={{
        backgroundColor: 'rgba(255, 251, 245, 0.96)',
        borderColor: 'var(--color-border)',
        backdropFilter: 'blur(18px)',
      }}
      role="region"
      aria-label="Product purchase summary"
    >
      <div className="mx-auto flex max-w-screen-sm items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-base text-text-primary">{product.title}</p>
          {optionSummary && (
            <p className="truncate text-xs text-text-secondary">{optionSummary}</p>
          )}
        </div>
        <div className="w-40 flex-shrink-0">
          {isFallbackProduct ? (
            <button
              type="button"
              disabled
              className="flex h-11 w-full items-center justify-center bg-surface-mid px-4 text-xs uppercase text-text-muted"
            >
              Shopify import
            </button>
          ) : allUnavailable ? (
            <button
              type="button"
              disabled
              className="flex h-11 w-full items-center justify-center bg-surface-mid px-4 text-xs uppercase text-text-muted"
            >
              Sold out
            </button>
          ) : (
            <AddToCart
              variantId={selectedVariant?.id || null}
              quantity={quantity}
              disabled={!selectedVariant?.availableForSale}
              label="Add"
              compact
            />
          )}
        </div>
      </div>
    </div>
  );
}
