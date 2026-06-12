import {createClient, type SanityClient} from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type {SanityImageSource} from '@sanity/image-url/lib/types/types';

interface SanityEnv {
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_VERSION: string;
  SANITY_API_READ_TOKEN?: string;
}

export function createSanityClient(env: SanityEnv): SanityClient {
  return createClient({
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
    apiVersion: env.SANITY_API_VERSION,
    useCdn: true,
    perspective: 'published',
    ...(env.SANITY_API_READ_TOKEN ? {token: env.SANITY_API_READ_TOKEN} : {}),
  });
}

export function createUrlBuilder(env: SanityEnv) {
  const builder = imageUrlBuilder({
    projectId: env.SANITY_PROJECT_ID,
    dataset: env.SANITY_DATASET,
  });
  return (source: SanityImageSource) => builder.image(source);
}
