import {redirect} from 'react-router';

const COOKIE_NAME = 'kumachi_internal_access';
const LOCAL_SECRET = 'kumachi-internal';

function isLocalHost(request: Request) {
  const hostname = new URL(request.url).hostname;
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '::1';
}

function getInternalSecret(request: Request, env: any) {
  return env?.INTERNAL_TOOLS_SECRET || (isLocalHost(request) ? LOCAL_SECRET : undefined);
}

function hasAccessCookie(request: Request) {
  const cookie = request.headers.get('Cookie') || '';
  return cookie.split(';').some((part) => part.trim() === `${COOKIE_NAME}=granted`);
}

export function requireInternalAccess(request: Request, env: any) {
  const secret = getInternalSecret(request, env);
  if (!secret) {
    throw new Response('Not found', {status: 404});
  }

  const url = new URL(request.url);
  if (url.searchParams.get('key') === secret) {
    url.searchParams.delete('key');
    throw redirect(url.pathname + url.search, {
      headers: {
        'Set-Cookie': `${COOKIE_NAME}=granted; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
      },
    });
  }

  if (!hasAccessCookie(request)) {
    throw new Response('Not found', {status: 404});
  }
}

