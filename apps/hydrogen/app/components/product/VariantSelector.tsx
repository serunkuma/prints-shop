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
      <p className="text-caption text-text-muted mb-4">Size / Format</p>
      <div className="space-y-3">
        {variants.slice(0, 10).map((variant: any) => (
          <button
            key={variant.id}
            onClick={() => onSelect(variant.id)}
            disabled={!variant.availableForSale}
            className={`w-full flex justify-between items-center py-3 px-4 rounded-xs text-body-small transition-all ${
              selectedVariantId === variant.id
                ? 'bg-gold/10 border border-gold text-gold'
                : 'bg-surface-mid border border-border text-text-secondary hover:border-text-muted'
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
