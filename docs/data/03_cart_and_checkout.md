# Cart & Checkout Data Model

Status: Current

## Cart State Architecture

Cart state is managed **server-side** via Shopify's Cart API (Storefront API). The server is the source of truth for cart data. The zustand store on the client manages only UI state (drawer open/closed), not cart contents.

### Server-Side Cart

```
root.tsx loader
  └── context.storefront.query(CART_QUERY)
        └── Cart data passed to all routes via useRootLoaderData()
              └── CartDrawer reads from root loader data
```

Cart mutations use Remix fetchers:
```tsx
const fetcher = useFetcher();
fetcher.submit(
  { variantId, quantity, intent: 'add' },
  { method: 'post', action: '/cart' }
);
```

### Zustand Store (UI State Only)

Purpose: manage UI toggles (cart drawer open/closed, mobile menu open/closed).

```typescript
type UIStore = {
  isCartOpen: boolean;
  isMobileMenuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
};
```

Persistence key: `kumachi-cart` (via `zustand/middleware/persist`)

### CartItem Type (Shopify Storefront API)

```typescript
type CartItem = {
  id: string;               // Storefront API line item ID
  quantity: number;
  merchandise: {
    id: string;             // Variant ID
    product: {
      handle: string;
      title: string;
      featuredImage: { url: string; altText: string };
    };
    selectedOptions: Array<{ name: string; value: string }>;  // Size, Frame
    price: { amount: string; currencyCode: string };
  };
};
```

### Cart Subtotal Calculation

Sum of `price.amount * quantity` for all line items. Prices are in the store's currency (USD). The `formatPrice()` utility in `app/lib/format.ts` converts cents to display strings.

## Checkout Flow

1. User clicks "Checkout" in CartDrawer or on Cart page
2. Hydrogen redirects to `checkoutUrl` from the Storefront API cart response
3. Shopify hosted checkout handles:
   - Shipping address collection
   - Shipping method selection
   - Payment processing (Shopify Payments or Stripe)
   - Order confirmation
4. Customer is redirected back to the store after checkout completion

### Why Custom Checkout Is Not Built

Custom checkout is a **Shopify Plus** feature only. The store runs on a Basic plan. Even if it were available, building and maintaining a custom checkout would add significant complexity for minimal benefit at launch scale.

### Session Secret

`SESSION_SECRET` is used for session encryption. When this value changes, all existing sessions are invalidated. Only rotate this intentionally. Generate with:

```bash
openssl rand -hex 32
```

## Checkout Redirect

The redirect URL from the Storefront API cart response:

```typescript
const checkoutUrl = cart.checkoutUrl;
// https://{store}.myshopify.com/carts/{cart-id}
```

Redirect pattern in the cart action handler:

```typescript
return redirect(cart.checkoutUrl);
```

*Last updated: 2026-06*
