import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';
import {formatPrice} from '~/lib/format';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export const meta = ({data}: any) => [
  {title: data?.order ? `Order #${data.order.orderNumber} — Kumachi Prints` : 'Order — Kumachi Prints'},
];

export async function loader({params, context}: {params: any; context: any}) {
  const customerAccessToken = context.session.get('customerAccessToken');
  if (!customerAccessToken) {
    throw new Response('Not found', {status: 404});
  }

  const {orderId} = params;
  if (!orderId) throw new Response('Not found', {status: 404});

  const {node: order} = await context.storefront.query(ORDER_BY_ID_QUERY, {
    variables: {id: orderId},
  }).catch(() => ({node: null}));

  if (!order) throw new Response('Not found', {status: 404});

  return {order};
}

export default function OrderDetailPage() {
  const {order} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad max-w-3xl">
      <a href="/account/orders" className="text-gold text-body-small mb-8 inline-block">&larr; All Orders</a>

      <h1 className="text-h1 mb-2">Order #{order.orderNumber}</h1>
      <p className="text-body-small text-text-muted mb-8">
        Placed {new Date(order.processedAt).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
      </p>

      <div className="card-surface rounded-xs p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-h4">Summary</h2>
          <p className={`text-body-small uppercase ${order.fulfillmentStatus === 'FULFILLED' ? 'text-grove' : 'text-text-muted'}`}>
            {order.fulfillmentStatus === 'FULFILLED' ? 'Fulfilled' : order.fulfillmentStatus}
          </p>
        </div>
        <div className="space-y-2 text-body text-text-secondary">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(parseFloat(order.subtotalPrice.amount) * 100)}</span></div>
          {order.totalTax && <div className="flex justify-between"><span>Tax</span><span>{formatPrice(parseFloat(order.totalTax.amount) * 100)}</span></div>}
          <div className="flex justify-between border-t border-border pt-2 mt-2 font-medium text-text-primary"><span>Total</span><span>{formatPrice(parseFloat(order.totalPrice.amount) * 100)}</span></div>
        </div>
      </div>

      <div className="card-surface rounded-xs p-6">
        <h2 className="text-h4 mb-4">Items</h2>
        <div className="space-y-4">
          {order.lineItems?.nodes?.map((item: any) => (
            <div key={item.variant?.id || item.title} className="flex justify-between py-2 border-b border-border last:border-0">
              <div>
                <p className="text-body font-medium">{item.title}</p>
                <p className="text-body-small text-text-muted">Qty: {item.quantity}</p>
              </div>
              {item.variant?.price && (
                <p className="text-price">{formatPrice(parseFloat(item.variant.price.amount) * 100)}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

const ORDER_BY_ID_QUERY = `#graphql
  query OrderById($id: ID!) {
    node(id: $id) {
      ... on Order {
        id
        orderNumber
        processedAt
        fulfillmentStatus
        totalPrice { amount currencyCode }
        subtotalPrice { amount currencyCode }
        totalTax { amount currencyCode }
        lineItems(first: 50) {
          nodes {
            title
            quantity
            variant {
              id
              price { amount currencyCode }
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
    return <main className="container-gallery section-pad"><h1 className="text-h1">Order not found</h1><a href="/account/orders" className="text-gold">Back to orders</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
