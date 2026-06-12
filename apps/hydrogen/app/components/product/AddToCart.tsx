import {useFetcher} from 'react-router';

interface AddToCartProps {
  variantId: string | null;
  disabled?: boolean;
}

export function AddToCart({variantId, disabled}: AddToCartProps) {
  const fetcher = useFetcher();
  const adding = fetcher.state !== 'idle';

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
        {adding ? 'Adding...' : !variantId ? 'Select a size' : 'Add to Cart'}
      </button>
    </fetcher.Form>
  );
}
