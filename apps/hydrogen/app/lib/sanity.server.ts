interface SanityEnv {
  SANITY_PROJECT_ID: string;
  SANITY_DATASET: string;
  SANITY_API_VERSION: string;
  SANITY_API_READ_TOKEN?: string;
}

type SanityParams = Record<string, unknown>;

interface SanityApiResponse<T> {
  result?: T;
  error?: {
    description?: string;
    message?: string;
  };
}

export interface SanityFetchClient {
  fetch<T = unknown>(query: string, params?: SanityParams): Promise<T>;
}

export type SanityImageSource =
  | string
  | {_ref?: string; url?: string; asset?: {url?: string; _ref?: string}}
  | null
  | undefined;

export interface SanityImageUrlBuilder {
  width(width: number): SanityImageUrlBuilder;
  height(height: number): SanityImageUrlBuilder;
  auto(value: 'format'): SanityImageUrlBuilder;
  url(): string;
}

export function createSanityClient(env: SanityEnv): SanityFetchClient {
  const projectId = env.SANITY_PROJECT_ID;
  const dataset = env.SANITY_DATASET;
  const apiVersion = env.SANITY_API_VERSION;
  const token = env.SANITY_API_READ_TOKEN;
  const host = token ? 'api.sanity.io' : 'apicdn.sanity.io';
  const baseUrl = `https://${projectId}.${host}/v${apiVersion}/data/query/${dataset}`;

  return {
    async fetch<T = unknown>(query: string, params: SanityParams = {}) {
      const url = new URL(baseUrl);
      url.searchParams.set('query', query);

      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(`$${key}`, JSON.stringify(value));
      }

      const response = await fetch(url, {
        headers: token ? {Authorization: `Bearer ${token}`} : undefined,
      });
      const data = (await response.json()) as SanityApiResponse<T>;

      if (!response.ok || data.error) {
        const message =
          data.error?.description ||
          data.error?.message ||
          `Sanity query failed with status ${response.status}`;
        throw new Error(message);
      }

      return data.result as T;
    },
  };
}

export function createUrlBuilder(projectId: string, dataset: string) {
  return (source: SanityImageSource): SanityImageUrlBuilder => {
    const params = new URLSearchParams();

    const builder: SanityImageUrlBuilder = {
      width(width: number) {
        if (Number.isFinite(width)) params.set('w', String(Math.round(width)));
        return builder;
      },
      height(height: number) {
        if (Number.isFinite(height)) params.set('h', String(Math.round(height)));
        return builder;
      },
      auto(value: 'format') {
        params.set('auto', value);
        return builder;
      },
      url() {
        const baseUrl = getSanityImageBaseUrl(source, projectId, dataset);
        if (!baseUrl) return '';

        const query = params.toString();
        if (!query) return baseUrl;

        const separator = baseUrl.includes('?') ? '&' : '?';
        return `${baseUrl}${separator}${query}`;
      },
    };

    return builder;
  };
}

function getSanityImageBaseUrl(source: SanityImageSource, projectId: string, dataset: string) {
  const directUrl = getDirectImageUrl(source);
  if (directUrl) return directUrl;

  const ref = getImageRef(source);
  if (!ref) return '';

  const match = /^image-([a-zA-Z0-9]+)-([0-9]+x[0-9]+)-([a-zA-Z0-9]+)$/.exec(ref);
  if (!match) return '';

  const [, assetId, dimensions, extension] = match;
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${extension}`;
}

function getDirectImageUrl(source: SanityImageSource) {
  if (typeof source === 'string' && /^https?:\/\//.test(source)) return source;
  if (typeof source === 'object' && source?.url) return source.url;
  if (typeof source === 'object' && source?.asset?.url) return source.asset.url;
  return '';
}

function getImageRef(source: SanityImageSource) {
  if (typeof source === 'string') return source;
  if (typeof source === 'object' && source?._ref) return source._ref;
  if (typeof source === 'object' && source?.asset?._ref) return source.asset._ref;
  return '';
}
