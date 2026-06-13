import {useFetcher} from 'react-router';
import {useEffect} from 'react';
import {toast} from 'sonner';
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
      toast.success('Added to cart');
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
        className="flex h-[52px] w-full items-center justify-center gap-2 bg-gold px-8 text-button text-void transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {adding ? 'Adding...' : !variantId ? 'Select a size' : label || 'Add to Cart'}
      </button>
      {fetcherData?.error && (
        <p className="mt-3 text-body-small text-crimson">{fetcherData.error}</p>
      )}
    </fetcher.Form>
  );
}
