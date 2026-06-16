import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export const meta = () => [{title: 'Order History — Kumachi Prints'}];

const ORDERS_QUERY = `
  query CustomerOrders {
    customer {
      orders(first: 50, sortKey: PROCESSED_AT, reverse: true) {
        nodes {
          id
          orderNumber
          processedAt
          fulfillmentStatus
          totalPrice {
            amount
            currencyCode
          }
          lineItems(first: 10) {
            nodes {
              title
              quantity
            }
          }
        }
      }
    }
  }
`;

function statusLabel(status: string): string {
  switch (status) {
    case 'FULFILLED':
      return 'Fulfilled';
    case 'IN_PROGRESS':
      return 'In Progress';
    case 'ON_HOLD':
      return 'On Hold';
    case 'PARTIALLY_FULFILLED':
      return 'Partially Fulfilled';
    case 'PENDING_FULFILLMENT':
      return 'Pending Fulfillment';
    case 'UNFULFILLED':
      return 'Unfulfilled';
    default:
      return status;
  }
}

export async function loader({context}: {context: any}) {
  if (!context.customerAccount) {
    throw new Response('Not found', {status: 404});
  }

  const loggedIn = await context.customerAccount.isLoggedIn();
  if (!loggedIn) {
    throw new Response('Not found', {status: 404});
  }

  const {data, errors} = await context.customerAccount.query(ORDERS_QUERY).catch(() => ({
    data: null,
    errors: [{message: 'Failed to load orders'}],
  }));

  if (errors || !data) {
    return {orders: [], error: errors?.[0]?.message || 'Failed to load orders'};
  }

  return {orders: data.customer?.orders?.nodes || [], error: null};
}

export default function OrdersPage() {
  const {orders, error} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-2">Order History</h1>
      <a href="/account" className="text-gold text-body-small mb-8 inline-block">&larr; Back to Account</a>

      {error && !orders.length ? (
        <div className="card-surface rounded-xs p-6">
          <p className="text-body text-crimson mb-2">Unable to load orders</p>
          <p className="text-body-small text-text-muted">{error}</p>
          <a href="/account" className="text-gold text-body-small mt-4 inline-block">Back to account</a>
        </div>
      ) : orders.length === 0 ? (
        <div className="card-surface rounded-xs p-6">
          <p className="text-body text-text-secondary">No orders yet.</p>
          <p className="text-body-small text-text-muted mt-1">Your order history will appear here after your first purchase.</p>
          <a href="/collection" className="text-gold text-body-small mt-4 inline-block">Browse prints</a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <a
              key={order.id}
              href={`/account/orders/${encodeURIComponent(order.id)}`}
              className="block card-surface rounded-xs p-4 hover:border-gold transition-colors"
              style={{border: '1px solid var(--color-border)'}}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-body font-medium">Order #{order.orderNumber}</p>
                  <p className="text-body-small text-text-muted">
                    {new Date(order.processedAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                  </p>
                </div>
                {order.totalPrice && (
                  <p className="text-price text-gold">{formatPrice(parseFloat(order.totalPrice.amount) * 100)}</p>
                )}
              </div>
              <p className={`text-body-small ${order.fulfillmentStatus === 'FULFILLED' ? 'text-grove' : 'text-text-muted'}`}>
                {statusLabel(order.fulfillmentStatus)}
              </p>
              {order.lineItems?.nodes?.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border">
                  {order.lineItems.nodes.map((item: any) => (
                    <p key={item.variant?.id || item.title} className="text-body-small text-text-secondary">
                      {item.title} &times; {item.quantity}
                    </p>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="container-gallery section-pad">
        <h1 className="text-h1">Not signed in</h1>
        <p className="text-body text-text-secondary mb-6">Sign in to view your order history.</p>
        <a href="/account/login" className="text-gold">Sign in</a>
      </main>
    );
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
