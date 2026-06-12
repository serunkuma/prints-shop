import {useFetcher} from 'react-router';
import {useEffect} from 'react';
import {useUIStore} from '~/lib/store';

interface AddToCartProps {
  variantId: string | null;
  disabled?: boolean;
  label?: string;
}

export function AddToCart({variantId, disabled, label}: AddToCartProps) {
  const fetcher = useFetcher();
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const adding = fetcher.state !== 'idle';
  const fetcherData = fetcher.data as {cart?: unknown; error?: string} | undefined;

  useEffect(() => {
    if (fetcherData?.cart) {
      setCartOpen(true);
    }
  }, [fetcherData, setCartOpen]);

  return (
    <fetcher.Form method="post" action="/cart">
      <input type="hidden" name="intent" value="add" />
      <input type="hidden" name="variantId" value={variantId || ''} />
      <input type="hidden" name="quantity" value="1" />
      <button
        type="submit"
        disabled={!variantId || disabled || adding}
        className="w-full py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {adding ? 'Adding...' : !variantId ? 'Select a size' : label || 'Add to Cart'}
      </button>
      {fetcherData?.error && (
        <p className="mt-3 text-body-small text-crimson">{fetcherData.error}</p>
      )}
    </fetcher.Form>
  );
}
