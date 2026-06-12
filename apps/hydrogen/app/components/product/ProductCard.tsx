import {useEffect} from 'react';
import {Link, useFetcher} from 'react-router';
import {formatPrice} from '~/lib/format';
import {useUIStore} from '~/lib/store';

interface ProductCardProps {
  product: any;
}

export function ProductCard({product}: ProductCardProps) {
  const fetcher = useFetcher();
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const defaultVariant = product.variants?.nodes?.find(
    (variant: any) => variant.availableForSale,
  );
  const fetcherData = fetcher.data as {cart?: unknown; error?: string} | undefined;

  useEffect(() => {
    if (fetcherData?.cart) {
      setCartOpen(true);
    }
  }, [fetcherData, setCartOpen]);

  return (
    <article className="group">
      <Link to={`/products/${product.handle}`} className="block">
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
      </Link>
      <div className="flex items-center justify-between gap-3">
        {product.priceRange?.minVariantPrice && (
          <p className="text-price text-gold">
            {formatPrice(parseFloat(product.priceRange.minVariantPrice.amount) * 100)}
          </p>
        )}
        {defaultVariant && (
          <fetcher.Form method="post" action="/cart">
            <input type="hidden" name="intent" value="add" />
            <input type="hidden" name="variantId" value={defaultVariant?.id || ''} />
            <input type="hidden" name="quantity" value="1" />
            <button
              type="submit"
              disabled={!defaultVariant || fetcher.state !== 'idle'}
              className="px-4 py-2 bg-gold text-void text-body-small rounded-xs font-medium transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {fetcher.state !== 'idle' ? 'Adding' : 'Add'}
            </button>
          </fetcher.Form>
        )}
      </div>
      {fetcherData?.error && (
        <p className="mt-2 text-body-small text-crimson">{fetcherData.error}</p>
      )}
    </article>
  );
}
