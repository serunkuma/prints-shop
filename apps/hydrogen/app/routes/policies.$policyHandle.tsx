import {useLoaderData, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheLong} from '@shopify/hydrogen';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheLong()),
});

export const meta = ({data}: any) => [
  {title: data?.policy?.title || 'Policy — Kumachi Prints'},
];

export async function loader({params, context}: {params: any; context: any}) {
  const {policyHandle} = params;
  if (!policyHandle) throw new Response('Not found', {status: 404});

  const {shop} = await context.storefront.query(SHOP_POLICIES_QUERY);

  const policy = shop?.[`${policyHandle}Policy`] || shop?.[policyHandle];
  if (!policy) throw new Response('Not found', {status: 404});

  return {policy};
}

export default function PolicyPage() {
  const {policy} = useLoaderData<typeof loader>();

  return (
    <main className="container-gallery section-pad max-w-3xl">
      <h1 className="text-h1 mb-8">{policy.title}</h1>
      <div
        className="text-body text-text-secondary leading-relaxed prose"
        dangerouslySetInnerHTML={{__html: policy.body}}
      />
    </main>
  );
}

const SHOP_POLICIES_QUERY = `#graphql
  query ShopPolicies {
    shop {
      privacyPolicy { title body }
      termsOfService { title body }
      refundPolicy { title body }
      shippingPolicy { title body }
      subscriptionPolicy { title body }
    }
  }
`;

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><h1 className="text-h1">Policy not found</h1><a href="/" className="text-gold">Return home</a></main>;
  }
  return <main className="container-gallery section-pad"><h1 className="text-h1">Error</h1><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
