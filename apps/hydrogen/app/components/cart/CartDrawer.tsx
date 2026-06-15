import {Link} from 'react-router';
import {AnimatePresence, motion} from 'framer-motion';
import {Frame, ShoppingBag, X} from 'lucide-react';
import {useUIStore} from '~/lib/store';
import {CartItem} from './CartItem';
import {CartSummary} from './CartSummary';
import {useRootLoaderData} from '~/lib/useRootLoaderData';

export function CartDrawer() {
  const cartOpen = useUIStore((s) => s.cartOpen);
  const setCartOpen = useUIStore((s) => s.setCartOpen);
  const rootData = useRootLoaderData();
  const cart = rootData?.cart;
  const count = cart?.totalQuantity || 0;

  return (
    <AnimatePresence>
      {cartOpen && (
        <div className="fixed inset-0 z-[80]">
          <motion.button
            type="button"
            aria-label="Close cart"
            className="absolute inset-0"
            style={{backgroundColor: 'color-mix(in srgb, var(--void) 70%, transparent)'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            initial={{x: '100%'}}
            animate={{x: 0}}
            exit={{x: '100%'}}
            transition={{duration: 0.32, ease: [0.22, 1, 0.36, 1]}}
            className="fixed bottom-0 right-0 top-auto z-[90] flex h-[92dvh] w-full flex-col border border-[var(--border-mid)] bg-surface p-0 outline-none md:top-0 md:h-full md:max-w-[420px]"
          >
            <header className="flex items-center justify-between border-b border-[var(--border-mid)] px-5 py-4">
              <h2 className="font-display text-2xl text-text-primary">Cart {count > 0 ? `(${count})` : ''}</h2>
              <button type="button" aria-label="Close cart" onClick={() => setCartOpen(false)} className="flex min-h-11 min-w-11 items-center justify-center text-text-primary">
                <X size={20} />
              </button>
            </header>

            {!cart || cart.totalQuantity === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
                <Frame size={54} strokeWidth={1.2} className="text-text-muted" />
                <p className="mt-5 font-display text-2xl italic text-text-primary">Your wall is waiting.</p>
                <p className="mt-2 text-sm text-text-secondary">Browse the collection and find something worth keeping.</p>
                <Link to="/collection" onClick={() => setCartOpen(false)} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold">
                  Shop prints
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-3">
                  <AnimatePresence initial={false}>
                    {cart.lines?.nodes?.map((line: any) => (
                      <CartItem key={line.id} line={line} />
                    ))}
                  </AnimatePresence>
                </div>
                <footer className="border-t border-[var(--border-mid)] p-5">
                  <CartSummary cost={cart.cost} checkoutUrl={cart.checkoutUrl} />
                  <button type="button" onClick={() => setCartOpen(false)} className="mt-3 min-h-11 w-full text-sm font-medium text-text-secondary hover:text-text-primary">
                    Continue shopping
                  </button>
                  <p className="mt-2 flex items-center justify-center gap-2 text-center text-xs text-text-muted">
                    <ShoppingBag size={14} />
                    Secure checkout via Shopify
                  </p>
                </footer>
              </>
            )}
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}
