import {Form, useActionData, useRouteError, isRouteErrorResponse} from 'react-router';

export const meta = () => [{title: 'Reset Password — Kumachi Prints'}];

export async function action({request, context}: {request: Request; context: any}) {
  const formData = await request.formData();
  const email = formData.get('email') as string;

  if (!email) {
    return {error: 'Email is required', sent: false};
  }

  const {customerRecover} = await context.storefront.mutate(RECOVER_MUTATION, {
    variables: {email},
  }).catch(() => ({customerRecover: null}));

  if (customerRecover?.customerUserErrors?.length > 0) {
    return {error: customerRecover.customerUserErrors[0].message, sent: false};
  }

  return {error: null, sent: true};
}

export default function RecoverPage() {
  const result = useActionData<typeof action>();

  return (
    <main className="container-gallery section-pad max-w-md mx-auto">
      <h1 className="text-h1 mb-4">Reset Password</h1>
      <p className="text-body text-text-secondary mb-8">Enter your email and we'll send you a reset link.</p>

      {result?.sent ? (
        <div className="card-surface rounded-xs p-6">
          <p className="text-body text-grove">Check your email for the reset link.</p>
          <a href="/account" className="text-gold text-body-small mt-4 inline-block">Back to sign in</a>
        </div>
      ) : (
        <Form method="post" action="/account/recover" className="space-y-6">
          {result?.error && <p className="text-body-small text-crimson">{result.error}</p>}
          <div>
            <label htmlFor="email" className="text-caption text-text-muted block mb-2">Email</label>
            <input id="email" type="email" name="email" required className="w-full px-4 py-3 bg-surface-mid border border-border rounded-xs text-body focus:outline-none focus:border-gold" />
          </div>
          <button type="submit" className="w-full py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity">Send Reset Link</button>
          <p className="text-body-small text-text-muted text-center"><a href="/account" className="text-gold">Back to sign in</a></p>
        </Form>
      )}
    </main>
  );
}

const RECOVER_MUTATION = `#graphql
  mutation Recover($email: String!) {
    customerRecover(email: $email) {
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
