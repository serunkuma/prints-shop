import {type RefObject, useState} from 'react';
import {Link} from 'react-router';
import {ChevronDown, Minus, Plus, Ruler, Truck} from 'lucide-react';
import {AnimatePresence, motion} from 'framer-motion';
import {formatPrice} from '~/lib/format';
import {AddToCart} from '~/components/product/AddToCart';
import {ProductTrustStrip} from '~/components/product/ProductTrustStrip';
import {VariantSelector} from '~/components/product/VariantSelector';

function Money({price}: {price?: {amount: string}}) {
  if (!price?.amount) return null;
  return <>{formatPrice(parseFloat(price.amount) * 100)}</>;
}

export function ProductPurchasePanel({
  product,
  supplement,
  variants,
  selectedVariant,
  selectedVariantId,
  onVariantSelect,
  selectedPrice,
  minPrice,
  maxPrice,
  optionSummary,
  quantity,
  setQuantity,
  isFallbackProduct,
  allUnavailable,
  purchaseRef,
}: {
  product: any;
  supplement?: any;
  variants: any[];
  selectedVariant: any;
  selectedVariantId: string | null;
  onVariantSelect: (variantId: string) => void;
  selectedPrice?: {amount: string};
  minPrice?: {amount: string};
  maxPrice?: {amount: string};
  optionSummary?: string;
  quantity: number;
  setQuantity: (quantity: number) => void;
  isFallbackProduct: boolean;
  allUnavailable: boolean;
  purchaseRef: RefObject<HTMLDivElement | null>;
}) {
  const [shippingOpen, setShippingOpen] = useState(false);
  const hasRange = maxPrice?.amount && minPrice?.amount && maxPrice.amount !== minPrice.amount;

  return (
    <aside className="pb-8" aria-label="Product purchase details">
      {supplement?.series?.title && (
        <p className="text-caption uppercase text-[var(--color-accent-clay)]">
          {supplement.series.title}
        </p>
      )}
      {supplement?.artist?.name && (
        <p className="mt-1 text-body-small text-text-secondary">By {supplement.artist.name}</p>
      )}

      <h1 className="mt-2 text-h1 font-display text-text-primary">{product.title}</h1>

      {(selectedPrice || isFallbackProduct) && (
        <div className="mt-5">
          <AnimatePresence mode="wait">
            {isFallbackProduct ? (
              <motion.span
                key="fallback-price"
                className="text-body-small uppercase tracking-wide text-text-secondary"
                initial={{opacity: 0, y: -8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 8}}
                transition={{duration: 0.2}}
              >
                Price shown after Shopify import
              </motion.span>
            ) : (
              <motion.span
                key={`${selectedVariant?.id || 'price'}-${selectedPrice?.amount}`}
                className="text-price text-text-primary"
                initial={{opacity: 0, y: -8}}
                animate={{opacity: 1, y: 0}}
                exit={{opacity: 0, y: 8}}
                transition={{duration: 0.2}}
              >
                <Money price={selectedPrice} />
                {!selectedVariant && hasRange ? (
                  <>
                    {' '}
                    to <Money price={maxPrice} />
                  </>
                ) : null}
              </motion.span>
            )}
          </AnimatePresence>
          {optionSummary && (
            <p className="mt-1 text-body-small text-text-secondary">Selected: {optionSummary}</p>
          )}
        </div>
      )}

      {product.description && (
        <p className="mt-6 max-w-[520px] text-body leading-relaxed text-text-secondary">
          {product.description}
        </p>
      )}

      {supplement?.technique && (
        <p className="mt-4 text-body-small text-text-secondary">
          Technique: <span className="text-text-primary">{supplement.technique}</span>
        </p>
      )}

      <div ref={purchaseRef} className="mt-8 border-t border-border pt-8">
        {supplement?.sizeGuidance && (
          <div className="mb-5 border border-border bg-surface px-5 py-4">
            <div className="flex gap-3">
              <Ruler className="mt-0.5 shrink-0 text-gold" size={18} strokeWidth={1.7} />
              <div>
                <p className="text-body-small font-medium text-text-primary">Size note</p>
                <p className="mt-1 text-body-small text-text-secondary">{supplement.sizeGuidance}</p>
                <Link to="/pages/size-guide" className="mt-2 inline-flex text-caption uppercase text-text-primary underline decoration-gold underline-offset-4">
                  Compare sizes
                </Link>
              </div>
            </div>
          </div>
        )}

        {variants.length > 0 && (!allUnavailable || isFallbackProduct) && (
          <VariantSelector
            variants={variants}
            selectedVariantId={selectedVariantId}
            onSelect={onVariantSelect}
          />
        )}

        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <label className="text-caption uppercase text-text-muted" htmlFor="product-quantity">
              Quantity
            </label>
            <div className="mt-2 flex h-12 w-36 items-center border border-border bg-surface">
              <button
                type="button"
                className="grid h-full w-11 place-items-center text-text-secondary disabled:opacity-40"
                aria-label="Decrease quantity"
                disabled={quantity <= 1}
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={16} />
              </button>
              <input
                id="product-quantity"
                value={quantity}
                min={1}
                inputMode="numeric"
                onChange={(event) => {
                  const next = Number(event.currentTarget.value);
                  setQuantity(Number.isFinite(next) && next > 0 ? Math.min(99, next) : 1);
                }}
                className="h-full min-w-0 flex-1 bg-transparent text-center text-body text-text-primary outline-none"
                aria-label="Quantity"
              />
              <button
                type="button"
                className="grid h-full w-11 place-items-center text-text-secondary"
                aria-label="Increase quantity"
                onClick={() => setQuantity(Math.min(99, quantity + 1))}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          {optionSummary && (
            <p className="max-w-[180px] text-right text-caption uppercase text-text-muted">
              {optionSummary}
            </p>
          )}
        </div>

        {isFallbackProduct ? (
          <div className="border border-border bg-surface-mid px-6 py-4">
            <p className="text-body text-text-muted">Available after Shopify import</p>
          </div>
        ) : allUnavailable ? (
          <div className="border border-border bg-surface-mid px-6 py-4">
            <p className="text-body text-text-muted">Sold out</p>
          </div>
        ) : (
          <AddToCart
            variantId={selectedVariant?.id || null}
            quantity={quantity}
            disabled={!selectedVariant?.availableForSale}
            label={selectedVariant?.availableForSale ? 'Add to Cart' : 'Unavailable'}
          />
        )}
      </div>

      <div className="mt-4 flex items-center gap-2 text-body-small text-text-secondary">
        <Truck size={16} />
        <span>{supplement?.shippingNote || 'Produced after ordering. Shipping is calculated at checkout.'}</span>
      </div>

      <div className="mt-7">
        <ProductTrustStrip trustNotes={supplement?.trustNotes} />
      </div>

      <div className="mt-7 border-t border-border">
        <button
          type="button"
          onClick={() => setShippingOpen(!shippingOpen)}
          className="flex min-h-12 w-full items-center justify-between py-3 text-left"
          aria-expanded={shippingOpen}
        >
          <span className="text-body-small font-medium text-text-primary">Shipping & Returns</span>
          <motion.div animate={{rotate: shippingOpen ? 180 : 0}} transition={{duration: 0.2}}>
            <ChevronDown size={18} className="text-text-secondary" />
          </motion.div>
        </button>
        <AnimatePresence>
          {shippingOpen && (
            <motion.div
              initial={{height: 0, opacity: 0}}
              animate={{height: 'auto', opacity: 1}}
              exit={{height: 0, opacity: 0}}
              transition={{duration: 0.25}}
              className="overflow-hidden"
            >
              <p className="pb-4 text-body-small text-text-secondary">
                {supplement?.returnsNote ||
                  'Prints are produced after ordering and ship through the connected fulfillment workflow. Returns and damage handling follow the published Kumachi Prints policy.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
}
