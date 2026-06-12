import {useLoaderData, useFetcher, data, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export async function loader({context}: {context: any}) {
  const cartId = context.session.get('cartId');
  if (!cartId) return {cart: null};

  const {cart} = await context.storefront.query(CART_QUERY, {
    variables: {cartId},
  });

  return {cart};
}

export async function action({request, context}: {request: Request; context: any}) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  let cartId = context.session.get('cartId');

  if (intent === 'update' && cartId) {
    const lineId = formData.get('lineId') as string;
    const quantity = parseInt(formData.get('quantity') as string);

    const {cartLinesUpdate} = await context.storefront.mutate(
      CART_LINES_UPDATE_MUTATION,
      {variables: {cartId, lines: [{id: lineId, quantity}]}},
    );

    if (cartLinesUpdate?.userErrors?.length) {
      return data({error: cartLinesUpdate.userErrors[0].message}, {status: 400});
    }

    if (cartLinesUpdate?.cart) {
      return {cart: cartLinesUpdate.cart};
    }
  }

  if (intent === 'remove' && cartId) {
    const lineId = formData.get('lineId') as string;

    const {cartLinesRemove} = await context.storefront.mutate(
      CART_LINES_REMOVE_MUTATION,
      {variables: {cartId, lineIds: [lineId]}},
    );

    if (cartLinesRemove?.userErrors?.length) {
      return data({error: cartLinesRemove.userErrors[0].message}, {status: 400});
    }

    if (cartLinesRemove?.cart) {
      return {cart: cartLinesRemove.cart};
    }
  }

  if (intent === 'add') {
    const variantId = formData.get('variantId') as string;
    if (!variantId) {
      return data({error: 'Choose an available variant before adding to cart.'}, {status: 400});
    }

    const lines = [{
      merchandiseId: variantId,
      quantity: parseInt(formData.get('quantity') as string) || 1,
    }];

    let cart;

    // If a cart exists, add lines to it
    if (cartId) {
      const {cartLinesAdd} = await context.storefront.mutate(
        CART_LINES_ADD_MUTATION,
        {variables: {cartId, lines}},
      );

      if (cartLinesAdd?.userErrors?.length) {
        return data({error: cartLinesAdd.userErrors[0].message}, {status: 400});
      }

      cart = cartLinesAdd?.cart;

      if (!cart) {
        // Existing cart expired or was deleted — clear stale ID and create new
        context.session.set('cartId', null);
      }
    }

    // Create a new cart if one doesn't exist yet
    if (!cart) {
      const {cartCreate} = await context.storefront.mutate(
        CART_CREATE_MUTATION,
        {variables: {input: {lines}}},
      );

      if (cartCreate?.userErrors?.length) {
        return data({error: cartCreate.userErrors[0].message}, {status: 400});
      }

      cart = cartCreate?.cart;

      if (cart) {
        context.session.set('cartId', cart.id);
      }
    }

    if (!cart) {
      return data({error: 'Could not create or update cart. Please try again.'}, {status: 500});
    }

    return {cart};
  }

  return data({error: 'Cart action failed. Please try again.'}, {status: 400});
}

const CART_QUERY = `#graphql
  query CartQuery($cartId: String!) {
    cart(id: $cartId) {
      id
      checkoutUrl
      totalQuantity
      cost {
        subtotalAmount { amount currencyCode }
        totalAmount { amount currencyCode }
      }
      lines(first: 100) {
        nodes {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              product {
                handle
                title
                featuredImage { url altText }
              }
              selectedOptions { name value }
              price { amount currencyCode }
            }
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  handle
                  title
                  featuredImage { url altText }
                }
                selectedOptions { name value }
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_LINES_ADD_MUTATION = `#graphql
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      userErrors {
        field
        message
      }
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product {
                  handle
                  title
                  featuredImage { url altText }
                }
                selectedOptions { name value }
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_LINES_UPDATE_MUTATION = `#graphql
  mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product { handle title }
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

const CART_LINES_REMOVE_MUTATION = `#graphql
  mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount { amount currencyCode }
          totalAmount { amount currencyCode }
        }
        lines(first: 100) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                product { handle title }
                price { amount currencyCode }
              }
            }
          }
        }
      }
    }
  }
`;

export default function CartPage() {
  const {cart} = useLoaderData<typeof loader>();

  if (!cart || cart.lines?.nodes?.length === 0) {
    return (
      <main className="container-gallery section-pad">
        <h1 className="text-h1 mb-4">Cart</h1>
        <p className="text-body text-text-secondary">Your cart is empty.</p>
        <a href="/" className="text-gold mt-4 inline-block">Continue shopping</a>
      </main>
    );
  }

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-8">Cart</h1>
      <div className="space-y-4 mb-8">
        {cart.lines.nodes.map((line: any) => (
          <CartItem key={line.id} line={line} />
        ))}
      </div>
      {cart.cost?.subtotalAmount && (
        <div className="border-t border-border pt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-h4">Subtotal</span>
            <span className="text-price text-gold">
              {formatPrice(parseFloat(cart.cost.subtotalAmount.amount) * 100)}
            </span>
          </div>
          <a
            href={cart.checkoutUrl}
            className="inline-block w-full text-center py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity"
          >
            Checkout
          </a>
        </div>
      )}
    </main>
  );
}

function CartItem({line}: {line: any}) {
  const fetcher = useFetcher();
  const product = line.merchandise?.product;
  const options = line.merchandise?.selectedOptions || [];

  return (
    <div className="flex gap-4 py-4 border-b border-border">
      {product?.featuredImage && (
        <div className="w-20 h-20 bg-surface-mid rounded-xs overflow-hidden flex-shrink-0">
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover"
            width={80}
            height={80}
          />
        </div>
      )}
      <div className="flex-1">
        <a href={`/products/${product.handle}`} className="text-body font-medium hover:text-gold transition-colors">
          {product.title}
        </a>
        <p className="text-body-small text-text-muted">
          {options.map((o: any) => o.value).join(' / ')}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <fetcher.Form method="post" action="/cart">
            <input type="hidden" name="intent" value="update" />
            <input type="hidden" name="lineId" value={line.id} />
            <input
              type="number"
              name="quantity"
              defaultValue={line.quantity}
              min="0"
              className="w-16 px-2 py-1 bg-surface-mid border border-border rounded-xs text-body-small text-center"
              onChange={(e) => {
                if (parseInt(e.target.value) === 0) {
                  fetcher.submit({intent: 'remove', lineId: line.id}, {method: 'post', action: '/cart'});
                } else {
                  fetcher.submit(e.target.form, {method: 'post'});
                }
              }}
            />
          </fetcher.Form>
          <fetcher.Form method="post" action="/cart">
            <input type="hidden" name="intent" value="remove" />
            <input type="hidden" name="lineId" value={line.id} />
            <button type="submit" className="text-body-small text-text-muted hover:text-crimson transition-colors">
              Remove
            </button>
          </fetcher.Form>
        </div>
      </div>
      <div className="text-price">
        {formatPrice(parseFloat(line.merchandise.price.amount) * 100)}
      </div>
    </div>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Cart not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
