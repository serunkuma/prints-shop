const CANONICAL_SITE_URL = 'https://prints.kumachigallery.com';

export function getCanonicalSiteUrl(env?: {PUBLIC_SITE_URL?: string} | null): string {
  const configured = env?.PUBLIC_SITE_URL?.trim();
  return (configured || CANONICAL_SITE_URL).replace(/\/+$/, '');
}
