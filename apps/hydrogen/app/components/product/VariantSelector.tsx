import {formatPrice} from '~/lib/format';

interface VariantSelectorProps {
  variants: any[];
  selectedVariantId: string | null;
  onSelect: (variantId: string) => void;
}

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
}: VariantSelectorProps) {
  if (!variants?.length) return null;

  return (
    <div className="mb-8">
      <p className="mb-4 text-caption uppercase text-text-muted">Size / Format</p>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {variants.slice(0, 10).map((variant: any) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            disabled={!variant.availableForSale}
            className={`flex min-h-14 w-full items-center justify-between gap-3 px-4 py-3 text-left text-body-small transition-all ${
              selectedVariantId === variant.id
                ? 'border border-[var(--color-border-active)] bg-gold/10 text-text-primary'
                : 'border border-border bg-surface text-text-secondary hover:border-text-muted'
            } ${!variant.availableForSale ? 'opacity-45 cursor-not-allowed' : ''}`}
            aria-pressed={selectedVariantId === variant.id}
            type="button"
          >
            <span>
              {variant.selectedOptions?.map((o: any) => o.value).join(' / ')}
              {!variant.availableForSale && (
                <span className="ml-2 text-text-muted">(Unavailable)</span>
              )}
            </span>
            <span className="text-price">
              {formatPrice(parseFloat(variant.price.amount) * 100)}
              {variant.compareAtPrice && (
                <span className="text-body-small text-text-muted line-through ml-2">
                  {formatPrice(parseFloat(variant.compareAtPrice.amount) * 100)}
                </span>
              )}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
