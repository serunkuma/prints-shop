export function isPreviewMode(request: Request, secret: string | undefined): boolean {
  if (!secret) return false;

  const url = new URL(request.url);
  const previewParam = url.searchParams.get('sanity-preview');
  const secretParam = url.searchParams.get('sanity-preview-secret');

  return previewParam === 'true' && secretParam === secret;
}
