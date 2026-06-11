import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { useStore, type CartItem } from "@/store/useStore";
import { useState } from "react";

export default function CartDrawer() {
  const { cartOpen, setCartOpen, cartItems, removeFromCart, updateQuantity, cartSubtotal } = useStore();
  const [checkoutState, setCheckoutState] = useState<"idle" | "success">("idle");

  const subtotal = cartSubtotal();

  const handleCheckout = () => {
    setCheckoutState("success");
    setTimeout(() => {
      setCheckoutState("idle");
      setCartOpen(false);
    }, 1500);
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
            onClick={() => setCartOpen(false)}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[70] w-full max-w-[420px] flex flex-col"
            style={{
              backgroundColor: "var(--color-bg-secondary)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-4"
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <h2
                className="text-h3 font-display"
                style={{ color: "var(--color-text-primary)" }}
              >
                Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="hover:opacity-60 transition-opacity"
                style={{ color: "var(--color-text-primary)" }}
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>

            {/* Cart Content */}
            {cartItems.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-6">
                <ShoppingBag
                  size={64}
                  strokeWidth={1}
                  style={{ color: "var(--color-text-tertiary)" }}
                />
                <p
                  className="text-body-small mt-4"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  Your cart is empty
                </p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="text-nav mt-2 underline"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Explore the collection
                </button>
              </div>
            ) : (
              <>
                {/* Items */}
                <div className="flex-1 overflow-auto px-6 py-4">
                  <AnimatePresence>
                    {cartItems.map((item: CartItem, index: number) => (
                      <motion.div
                        key={`${item.product.id}-${index}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex gap-4 py-4"
                        style={{
                          borderBottom:
                            index < cartItems.length - 1
                              ? "1px solid var(--color-border)"
                              : "none",
                        }}
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 flex-shrink-0 overflow-hidden">
                          <img
                            src={item.product.image}
                            alt={item.product.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p
                            className="text-body-small font-medium truncate"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            {item.product.title}
                          </p>
                          <p
                            className="text-caption mt-1"
                            style={{ color: "var(--color-text-secondary)" }}
                          >
                            {item.size} / {item.material} /{" "}
                            {item.frame === "unframed"
                              ? "Unframed"
                              : item.frame
                                  .split("-")
                                  .map(
                                    (w: string) =>
                                      w.charAt(0).toUpperCase() + w.slice(1)
                                  )
                                  .join(" ")}
                          </p>

                          {/* Quantity */}
                          <div
                            className="flex items-center mt-2 h-8"
                            style={{
                              border: "1px solid var(--color-border)",
                            }}
                          >
                            <button
                              className="w-8 h-full flex items-center justify-center hover:opacity-60"
                              onClick={() =>
                                item.quantity > 1
                                  ? updateQuantity(index, item.quantity - 1)
                                  : removeFromCart(index)
                              }
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              <Minus size={14} />
                            </button>
                            <span
                              className="w-12 text-center text-body-small"
                              style={{
                                color: "var(--color-text-primary)",
                              }}
                            >
                              {item.quantity}
                            </span>
                            <button
                              className="w-8 h-full flex items-center justify-center hover:opacity-60"
                              onClick={() =>
                                updateQuantity(index, item.quantity + 1)
                              }
                              style={{ color: "var(--color-text-primary)" }}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0">
                          <p
                            className="text-price"
                            style={{ color: "var(--color-text-primary)" }}
                          >
                            $
                            {(
                              item.product.price * item.quantity
                            ).toFixed(2)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {/* Footer */}
                <div
                  className="px-6 py-4"
                  style={{
                    borderTop: "1px solid var(--color-border)",
                  }}
                >
                  <div className="flex justify-between mb-2">
                    <span
                      className="text-body-small font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      Subtotal
                    </span>
                    <span
                      className="text-body-small font-medium"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <p
                    className="text-caption mb-4"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Shipping calculated at checkout.
                  </p>

                  <button
                    onClick={handleCheckout}
                    className="w-full h-12 flex items-center justify-center text-button transition-opacity duration-150 hover:opacity-85"
                    style={{
                      backgroundColor: "var(--color-text-primary)",
                      color: "var(--color-bg-primary)",
                    }}
                  >
                    {checkoutState === "success" ? (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Check size={18} />
                        <span>Added!</span>
                      </motion.div>
                    ) : (
                      "Checkout"
                    )}
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
