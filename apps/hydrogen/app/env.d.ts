declare module '*?url' {
  const path: string;
  export default path;
}

declare module '*.css?url' {
  const path: string;
  export default path;
}

declare module 'virtual:react-router/server-build' {
  import type {ServerBuild} from 'react-router';
  export const assets: ServerBuild['assets'];
  export const assetsBuildDirectory: ServerBuild['assetsBuildDirectory'];
  export const basename: ServerBuild['basename'];
  export const entry: ServerBuild['entry'];
  export const future: ServerBuild['future'];
  export const isSpaMode: ServerBuild['isSpaMode'];
  export const prerender: ServerBuild['prerender'];
  export const publicPath: ServerBuild['publicPath'];
  export const routeDiscovery: ServerBuild['routeDiscovery'];
  export const routes: ServerBuild['routes'];
  export const ssr: ServerBuild['ssr'];
  export const allowedActionOrigins: ServerBuild['allowedActionOrigins'];
  export const unstable_getCriticalCss: ServerBuild['unstable_getCriticalCss'];
}

declare global {
  interface HydrogenAdditionalContext {
    sanity: import('@sanity/client').SanityClient;
    urlFor: (source: import('@sanity/image-url/lib/types/types').SanityImageSource) => import('@sanity/image-url').ImageUrlBuilder;
  }

  interface Env {
    SESSION_SECRET: string;
    PUBLIC_STORE_DOMAIN: string;
    PUBLIC_STOREFRONT_API_TOKEN: string;
    SANITY_PROJECT_ID: string;
    SANITY_DATASET: string;
    SANITY_API_VERSION: string;
    SANITY_API_READ_TOKEN?: string;
    SANITY_PREVIEW_SECRET?: string;
    [key: string]: string | undefined;
  }
}
