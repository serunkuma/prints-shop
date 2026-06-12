import {useFetcher, Link} from 'react-router';
import {useUIStore} from '~/lib/store';
import {CartItem} from './CartItem';
import {CartSummary} from './CartSummary';
import {useRootLoaderData} from '~/lib/useRootLoaderData';

export function CartDrawer() {
  const cartOpen = useUIStore((s) => s.cartOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const rootData = useRootLoaderData();
  const cart = rootData?.cart;

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-void/60 backdrop-blur-sm" onClick={() => setCartOpen(false)} />
      <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border shadow-strong overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-h4">Cart</h2>
          <button onClick={() => setCartOpen(false)} className="p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 4l10 10M14 4l-10 10" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div className="p-6">
          {!cart || cart.totalQuantity === 0 ? (
            <div className="text-center py-12">
              <p className="text-body text-text-muted mb-6">Your cart is empty.</p>
              <button onClick={() => setCartOpen(false)} className="text-gold hover:opacity-80 transition-opacity">
                Continue shopping
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-2 mb-8">
                {cart.lines?.nodes?.map((line: any) => (
                  <CartItem key={line.id} line={line} />
                ))}
              </div>
              <CartSummary cost={cart.cost} checkoutUrl={cart.checkoutUrl} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
