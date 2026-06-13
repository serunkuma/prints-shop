import {useLoaderData, Form, useRouteError, isRouteErrorResponse} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export const meta = () => [{title: 'Account — Kumachi Prints'}];

export async function loader({context}: {context: any}) {
  const customerAccessToken = context.session.get('customerAccessToken');
  if (!customerAccessToken) {
    return {customer: null, error: null};
  }

  const {customer} = await context.storefront.query(CUSTOMER_QUERY, {
    variables: {customerAccessToken},
  }).catch(() => ({customer: null}));

  return {customer, error: null};
}

export async function action({request, context}: {request: Request; context: any}) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'login') {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const {customerAccessTokenCreate} = await context.storefront.mutate(
      LOGIN_MUTATION,
      {variables: {input: {email, password}}},
    );

    if (customerAccessTokenCreate?.customerAccessToken?.accessToken) {
      context.session.set('customerAccessToken', customerAccessTokenCreate.customerAccessToken.accessToken);
      return {customer: null, error: null};
    }

    return {customer: null, error: customerAccessTokenCreate?.customerUserErrors?.[0]?.message || 'Login failed'};
  }

  if (intent === 'logout') {
    context.session.unset('customerAccessToken');
    return {customer: null, error: null};
  }

  return {customer: null, error: 'Unknown intent'};
}

export default function AccountPage() {
  const {customer, error} = useLoaderData<typeof loader>();

  if (!customer) {
    return (
      <main className="container-gallery section-pad max-w-md mx-auto">
        <h1 className="text-h1 mb-8">Sign In</h1>
        {error && <p className="text-body-small text-crimson mb-4">{error}</p>}
        <Form method="post" action="/account" className="space-y-6">
          <input type="hidden" name="intent" value="login" />
          <div>
            <label htmlFor="email" className="text-caption text-text-muted block mb-2">Email</label>
            <input id="email" type="email" name="email" required className="w-full px-4 py-3 bg-surface-mid border border-border rounded-xs text-body focus:outline-none focus:border-gold" />
          </div>
          <div>
            <label htmlFor="password" className="text-caption text-text-muted block mb-2">Password</label>
            <input id="password" type="password" name="password" required className="w-full px-4 py-3 bg-surface-mid border border-border rounded-xs text-body focus:outline-none focus:border-gold" />
          </div>
          <button type="submit" className="w-full py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity">Sign In</button>
        </Form>
        <p className="text-body-small text-text-muted mt-6 text-center">
          <a href="/account/recover" className="text-gold">Forgot password?</a>
        </p>
      </main>
    );
  }

  return (
    <main className="container-gallery section-pad">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-h1">Account</h1>
        <Form method="post" action="/account">
          <input type="hidden" name="intent" value="logout" />
          <button type="submit" className="text-body-small text-text-muted hover:text-crimson transition-colors">Sign Out</button>
        </Form>
      </div>
      <p className="text-body text-text-secondary mb-6">Welcome, {customer.firstName || 'valued customer'}.</p>
      <div className="space-y-4">
        <a href="/account/orders" className="block p-4 card-surface rounded-xs hover:border-gold transition-colors">
          <span className="text-body font-medium">Order History</span>
          <span className="text-body-small text-text-muted block mt-1">View your past orders</span>
        </a>
      </div>
    </main>
  );
}

const CUSTOMER_QUERY = `#graphql
  query Customer($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
      firstName
      lastName
      email
      displayName
    }
  }
`;

const LOGIN_MUTATION = `#graphql
  mutation Login($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        accessToken
        expiresAt
      }
      customerUserErrors {
        code
        message
      }
    }
  }
`;

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
