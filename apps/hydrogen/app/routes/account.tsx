import {useLoaderData, Form, useRouteError, isRouteErrorResponse, redirect} from 'react-router';
import {type HeadersFunction} from 'react-router';
import {generateCacheControlHeader, CacheNone} from '@shopify/hydrogen';

export const headers: HeadersFunction = () => ({
  'Cache-Control': generateCacheControlHeader(CacheNone()),
});

export const meta = () => [{title: 'Account — Kumachi Prints'}];

const CUSTOMER_QUERY = `
  query CurrentCustomer {
    customer {
      firstName
      lastName
      emailAddress {
        emailAddress
      }
      createdAt
    }
  }
`;

export async function loader({context}: {context: any}) {
  if (!context.customerAccount) {
    return {customer: null, error: 'Customer accounts are not configured'};
  }

  const loggedIn = await context.customerAccount.isLoggedIn();

  if (!loggedIn) {
    return {customer: null, error: null};
  }

  const {data} = await context.customerAccount.query(CUSTOMER_QUERY).catch(() => ({data: null}));

  return {customer: data?.customer || null, error: null};
}

export async function action({request, context}: {request: Request; context: any}) {
  const formData = await request.formData();
  const intent = formData.get('intent');

  if (intent === 'logout' && context.customerAccount) {
    return context.customerAccount.logout();
  }

  return {customer: null, error: 'Unknown intent'};
}

export default function AccountPage() {
  const {customer, error} = useLoaderData<typeof loader>();

  if (!customer) {
    return (
      <main className="container-gallery section-pad max-w-md mx-auto">
        <h1 className="text-h1 mb-6">Account</h1>
        {error && <p className="text-body-small text-crimson mb-4">{error}</p>}
        <p className="text-body text-text-secondary mb-8">
          Sign in to view your order history and account details.
        </p>
        <a
          href="/account/login"
          className="block w-full py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity text-center"
        >
          Sign In
        </a>
      </main>
    );
  }

  return (
    <main className="container-gallery section-pad">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-h1">Account</h1>
        <Form method="post" action="/account">
          <input type="hidden" name="intent" value="logout" />
          <button type="submit" className="text-body-small text-text-muted hover:text-crimson transition-colors">
            Sign Out
          </button>
        </Form>
      </div>
      <p className="text-body text-text-secondary mb-2">
        Welcome, {customer.firstName || 'valued customer'}.
      </p>
      <p className="text-body-small text-text-muted mb-8">
        {customer.emailAddress?.emailAddress}
      </p>
      <div className="space-y-4">
        <a href="/account/orders" className="block p-4 card-surface rounded-xs hover:border-gold transition-colors">
          <span className="text-body font-medium">Order History</span>
          <span className="text-body-small text-text-muted block mt-1">View your past orders</span>
        </a>
      </div>
    </main>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
