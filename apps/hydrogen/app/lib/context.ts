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
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
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
    },
    {sanity},
  );

  return hydrogenContext;
}
