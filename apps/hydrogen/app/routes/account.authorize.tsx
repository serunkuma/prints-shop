import {redirect, type LoaderFunctionArgs} from 'react-router';

export async function loader({request, context}: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const shop = url.searchParams.get('shop');

  if (!code || !shop) {
    return redirect('/account');
  }

  const {customerAccessTokenCreate} = await context.storefront.mutate(
    AUTHORIZE_MUTATION,
    {variables: {input: {code, shopUrl: shop} as any}},
  ).catch(() => ({customerAccessTokenCreate: null}));

  if (customerAccessTokenCreate?.customerAccessToken?.accessToken) {
    context.session.set(
      'customerAccessToken',
      customerAccessTokenCreate.customerAccessToken.accessToken,
    );
  }

  return redirect('/account');
}

const AUTHORIZE_MUTATION = `#graphql
  mutation Authorize($input: CustomerAccessTokenCreateInput!) {
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
