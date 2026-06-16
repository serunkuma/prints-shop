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

const ORDER_BY_ID_QUERY = `
  query OrderById($orderId: ID!) {
    node(id: $orderId) {
      ... on Order {
        id
        orderNumber
        processedAt
        fulfillmentStatus
        financialStatus
        totalPrice {
          amount
          currencyCode
        }
        subtotalPrice {
          amount
          currencyCode
        }
        totalTax {
          amount
          currencyCode
        }
        lineItems(first: 50) {
          nodes {
            title
            quantity
            variant {
              id
              price {
                amount
                currencyCode
              }
            }
          }
        }
        shippingAddress {
          address1
          address2
          city
          province
          zip
          country
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

export async function loader({params, context}: {params: any; context: any}) {
  if (!context.customerAccount) {
    throw new Response('Not found', {status: 404});
  }

  const loggedIn = await context.customerAccount.isLoggedIn();
  if (!loggedIn) {
    throw new Response('Not found', {status: 404});
  }

  const rawOrderId = params.orderId;
  if (!rawOrderId) throw new Response('Not found', {status: 404});

  const orderId = decodeURIComponent(rawOrderId);

  const {data, errors} = await context.customerAccount.query(ORDER_BY_ID_QUERY, {
    variables: {orderId},
  }).catch(() => ({data: null, errors: [{message: 'Failed to load order'}]}));

  if (errors || !data?.node) {
    throw new Response('Not found', {status: 404});
  }

  return {order: data.node};
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
            {statusLabel(order.fulfillmentStatus)}
          </p>
        </div>
        <div className="space-y-2 text-body text-text-secondary">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(parseFloat(order.subtotalPrice.amount) * 100)}</span></div>
          {order.totalTax && <div className="flex justify-between"><span>Tax</span><span>{formatPrice(parseFloat(order.totalTax.amount) * 100)}</span></div>}
          <div className="flex justify-between border-t border-border pt-2 mt-2 font-medium text-text-primary"><span>Total</span><span>{formatPrice(parseFloat(order.totalPrice.amount) * 100)}</span></div>
        </div>
      </div>

      {order.shippingAddress && (
        <div className="card-surface rounded-xs p-6 mb-8">
          <h2 className="text-h4 mb-4">Shipping Address</h2>
          <p className="text-body text-text-secondary">
            {order.shippingAddress.address1}
            {order.shippingAddress.address2 && <>, {order.shippingAddress.address2}</>}
            <br />
            {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.zip}
            <br />
            {order.shippingAddress.country}
          </p>
        </div>
      )}

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

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <main className="container-gallery section-pad">
        <h1 className="text-h1">Order not found</h1>
        <p className="text-body text-text-secondary mb-6">This order could not be found or you may not be signed in.</p>
        <a href="/account/orders" className="text-gold">Back to orders</a>
      </main>
    );
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
