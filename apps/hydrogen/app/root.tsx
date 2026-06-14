import {useNonce} from '@shopify/hydrogen';
import {Sanity} from 'hydrogen-sanity';
import {usePreviewMode} from 'hydrogen-sanity/preview';
import {VisualEditing} from 'hydrogen-sanity/visual-editing';
import {Outlet, useLoaderData, Links, Meta, Scripts, ScrollRestoration, useRouteError, isRouteErrorResponse} from 'react-router';
import {SITE_SETTINGS_QUERY, NAVIGATION_QUERY} from '~/lib/queries';
import styles from '~/styles/app.css?url';
import {Header} from '~/components/layout/Header';
import {Footer} from '~/components/layout/Footer';
import {AnnouncementBar} from '~/components/layout/AnnouncementBar';
import {CartDrawer} from '~/components/cart/CartDrawer';
import {Toaster} from 'sonner';

export function links() {
  return [
    {rel: 'stylesheet', href: styles},
    {rel: 'preconnect', href: 'https://fonts.googleapis.com'},
    {rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous'},
    {rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap'},
  ];
}

const CART_QUERY = `#graphql
  query CartId($cartId: ID!) {
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

export async function loader({context}: {context: any}) {
  const cartId = context.session.get('cartId');
  const [settings, navigation, cartData] = await Promise.all([
    context?.sanity?.fetch(SITE_SETTINGS_QUERY).catch(() => null),
    context?.sanity?.fetch(NAVIGATION_QUERY).catch(() => null),
    cartId
      ? context?.storefront?.query(CART_QUERY, {
          variables: {cartId},
        }).catch(() => ({cart: null}))
      : Promise.resolve({cart: null}),
  ]);

  return {
    settings,
    navigation,
    cart: cartData?.cart || null,
  };
}

export function Layout({children}: {children?: React.ReactNode}) {
  const data = useLoaderData<typeof loader>();
  const nonce = useNonce();
  const previewMode = usePreviewMode();

  return (
    <html lang="en" className="light">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <AnnouncementBar text={data?.settings?.announcementBar?.text} link={data?.settings?.announcementBar?.link} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CartDrawer />
        <Toaster richColors position="bottom-right" />
        <Sanity nonce={nonce} />
        {previewMode ? <VisualEditing action="/api/preview" /> : null}
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
      </body>
    </html>
  );
}

export default function Root() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();
  let errorMessage = 'Unknown error';
  let errorStatus = 500;

  if (isRouteErrorResponse(error)) {
    errorMessage = error?.data?.message ?? error.data;
    errorStatus = error.status;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <main className="container-gallery section-pad">
          <h1 className="text-h1 mb-4">{errorStatus}</h1>
          <p className="text-body text-text-secondary">{errorMessage}</p>
          <a href="/" className="text-gold hover:opacity-80 transition-opacity mt-8 inline-block">Return home</a>
        </main>
      </body>
    </html>
  );
}
