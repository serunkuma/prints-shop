import {createHydrogenContext} from '@shopify/hydrogen';
import {createSanityContext, type SanityContext} from 'hydrogen-sanity';
import {isPreviewEnabled} from 'hydrogen-sanity/preview';
import {PreviewSession} from 'hydrogen-sanity/preview/session';
import {AppSession} from '~/lib/session';

declare global {
  interface HydrogenAdditionalContext {
    sanity: SanityContext;
  }
}

export async function createHydrogenRouterContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  const requiredEnv = [
    'SESSION_SECRET',
    'PUBLIC_STORE_DOMAIN',
    'PUBLIC_STOREFRONT_API_TOKEN',
    'SANITY_PROJECT_ID',
    'SANITY_DATASET',
    'SANITY_API_VERSION',
    'PUBLIC_CUSTOMER_ACCOUNT_API_CLIENT_ID',
    'SHOP_ID',
  ] as const;
  const missingEnv = requiredEnv.filter((key) => !env?.[key]);

  if (missingEnv.length > 0) {
    throw new Error(`Missing required Oxygen environment variables: ${missingEnv.join(', ')}`);
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session, previewSession] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
    PreviewSession.init(request, [env.SESSION_SECRET]),
  ]);

  const previewToken = env.SANITY_PREVIEW_TOKEN || env.SANITY_API_READ_TOKEN;
  const previewEnabled = isPreviewEnabled(env.SANITY_PROJECT_ID, previewSession);
  const sanity = await createSanityContext({
    request,
    cache,
    waitUntil,
    client: {
      projectId: env.SANITY_PROJECT_ID,
      dataset: env.SANITY_DATASET || 'production',
      apiVersion: env.SANITY_API_VERSION || '2026-06-01',
      useCdn: true,
      stega: {
        enabled: previewEnabled,
        studioUrl: env.SANITY_STUDIO_URL || 'http://localhost:3333',
      },
    },
    ...(previewToken
      ? {
          preview: {
            token: previewToken,
            session: previewSession,
          },
        }
      : {}),
  });

  const hydrogenContext = createHydrogenContext(
    {
      env,
      request,
      cache,
      waitUntil,
      session,
      i18n: {language: 'EN', country: 'US'},
      cart: {},
      customerAccount: {
        apiVersion: env.SHOPIFY_API_VERSION || '2026-04',
      },
    },
    {sanity},
  );

  return hydrogenContext;
}
