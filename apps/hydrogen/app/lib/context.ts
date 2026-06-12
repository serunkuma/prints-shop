import {createHydrogenContext} from '@shopify/hydrogen';
import {AppSession} from '~/lib/session';
import {createSanityClient, createUrlBuilder} from '~/lib/sanity.server';

export async function createHydrogenRouterContext(
  request: Request,
  env: Env,
  executionContext: ExecutionContext,
) {
  if (!env?.SESSION_SECRET) {
    throw new Error('SESSION_SECRET environment variable is not set');
  }

  const waitUntil = executionContext.waitUntil.bind(executionContext);
  const [cache, session] = await Promise.all([
    caches.open('hydrogen'),
    AppSession.init(request, [env.SESSION_SECRET]),
  ]);

  const sanity = createSanityClient(env as any);
  const e = env as unknown as {SANITY_PROJECT_ID: string; SANITY_DATASET: string};
  const urlFor = createUrlBuilder(e.SANITY_PROJECT_ID, e.SANITY_DATASET);
  const additionalContext = {sanity, urlFor} as const;

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
    additionalContext,
  );

  return hydrogenContext;
}
