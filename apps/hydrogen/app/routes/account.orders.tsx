import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from '@shopify/remix-oxygen';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export const meta = () => [{title: 'Order History — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const customerAccessToken = context.session.get('customerAccessToken');
  if (!customerAccessToken) {
    throw new Response('Not found', {status: 404});
  }

  const {customer} = await context.storefront.query(ORDERS_QUERY, {
    variables: {customerAccessToken},
  }).catch(() => ({customer: null}));

  return {orders: customer?.orders?.nodes || []};
}

export default function OrdersPage() {
  const {orders} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad">
      <h1 className="text-h1 mb-8">Order History</h1>
      <a href="/account" className="text-gold text-body-small mb-8 inline-block">&larr; Back to Account</a>

      {orders.length === 0 ? (
        <p className="text-body text-text-secondary">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => (
            <div key={order.id} className="card-surface rounded-xs p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="text-body font-medium">Order #{order.orderNumber}</p>
                  <p className="text-body-small text-text-muted">
                    {new Date(order.processedAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                  </p>
                </div>
                <p className="text-price text-gold">{formatPrice(parseFloat(order.totalPrice.amount) * 100)}</p>
              </div>
              <p className={`text-body-small ${order.fulfillmentStatus === 'FULFILLED' ? 'text-grove' : 'text-text-muted'}`}>
                {order.fulfillmentStatus === 'FULFILLED' ? 'Fulfilled' : order.fulfillmentStatus}
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
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

const ORDERS_QUERY = `#graphql
  query Orders($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      orders(first: 50) {
        nodes {
          id
          orderNumber
          processedAt
          totalPrice { amount currencyCode }
          fulfillmentStatus
          lineItems(first: 10) {
            nodes {
              title
              quantity
              variant { id }
            }
          }
        }
      }
    }
  }
`;

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Not signed in</h1><a href="/account" className="text-gold">Sign in</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
