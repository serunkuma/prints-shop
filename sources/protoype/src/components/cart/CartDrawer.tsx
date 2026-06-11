import { AnimatePresence, motion } from "framer-motion";
import { Drawer } from "vaul";
import { Frame, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { toast } from "sonner";
import { Link } from "react-router";
import { useCartStore } from "@/store/useCartStore";
import { formatPrice } from "@/lib/format";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, itemCount } = useCartStore();
  const count = itemCount();

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => (open ? undefined : closeCart())} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay
          className="fixed inset-0 z-[80]"
          style={{ backgroundColor: "color-mix(in srgb, var(--void) 70%, transparent)" }}
        />
        <Drawer.Content className="fixed bottom-0 right-0 top-auto z-[90] flex h-[92dvh] w-full flex-col border border-[var(--border-mid)] bg-surface p-0 outline-none md:top-0 md:h-full md:max-w-[420px]">
          <header className="flex items-center justify-between border-b border-[var(--border-mid)] px-5 py-4">
            <Drawer.Title className="font-display text-2xl text-text-primary">Cart {count > 0 ? `(${count})` : ""}</Drawer.Title>
            <button type="button" aria-label="Close cart" onClick={closeCart} className="flex min-h-11 min-w-11 items-center justify-center text-text-primary">
              <X size={20} />
            </button>
          </header>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-6 text-center">
              <Frame size={54} strokeWidth={1.2} className="text-text-muted" />
              <p className="mt-5 font-display text-2xl italic text-text-primary">Your wall is waiting.</p>
              <p className="mt-2 text-sm text-text-secondary">Browse the collection and find something worth keeping.</p>
              <Link to="/collection" onClick={closeCart} className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-gold">
                Shop prints
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-5 py-3">
                <AnimatePresence initial={false}>
                  {items.map((item) => (
                    <motion.div
                      key={`${item.productId}-${item.size}-${item.frame}`}
                      layout
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className="grid grid-cols-[64px_1fr] gap-4 border-b border-[var(--border-token)] py-4"
                    >
                      <img src={item.image} alt={item.title} className="h-16 w-16 rounded-sm object-cover" />
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="truncate font-display text-lg leading-none text-text-primary">{item.title}</p>
                            <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary">{item.artist}</p>
                            <p className="mt-1 text-xs text-text-muted">{item.size} / {item.frame}</p>
                          </div>
                          <p className="shrink-0 text-sm font-medium text-text-primary">{formatPrice(item.price * item.quantity)}</p>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex h-8 items-center border border-[var(--border-mid)] bg-surface-mid">
                            <button
                              type="button"
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center text-text-primary"
                              onClick={() => updateQuantity(item.productId, item.size, item.frame, Math.max(0, item.quantity - 1))}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 text-center text-sm text-text-primary">{item.quantity}</span>
                            <button
                              type="button"
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center text-text-primary"
                              onClick={() => updateQuantity(item.productId, item.size, item.frame, item.quantity + 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.productId, item.size, item.frame)}
                            className="min-h-8 px-2 text-xs font-medium text-text-muted hover:text-text-primary"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <footer className="border-t border-[var(--border-mid)] p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Subtotal</span>
                  <span className="text-sm font-semibold text-text-primary">{formatPrice(subtotal())}</span>
                </div>
                <p className="mt-2 text-xs text-text-muted">Free shipping on orders over $75</p>
                <button
                  type="button"
                  onClick={() => toast("Redirecting to checkout...")}
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-sm bg-gold text-sm font-semibold uppercase tracking-wider text-void"
                >
                  <ShoppingBag size={17} />
                  Checkout · {formatPrice(subtotal())}
                </button>
                <p className="mt-2 text-center text-xs text-text-muted">Secure checkout via Shopify · Free shipping over $75</p>
                <button type="button" onClick={closeCart} className="mt-3 min-h-11 w-full text-sm font-medium text-text-secondary hover:text-text-primary">
                  Continue shopping
                </button>
              </footer>
            </>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
