import {ServerRouter} from 'react-router';
import {isbot} from 'isbot';
import {renderToReadableStream} from 'react-dom/server';
import type {EntryContext} from 'react-router';

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  reactRouterContext: EntryContext,
) {
  const body = await renderToReadableStream(
    <ServerRouter context={reactRouterContext} url={request.url} />,
    {
      signal: request.signal,
      onError(error: unknown) {
        responseStatusCode = 500;
        console.error(error);
      },
    },
  );

  if (isbot(request.headers.get('user-agent'))) {
    await body.allReady;
  }

  responseHeaders.set('Content-Type', 'text/html; charset=utf-8');
  return new Response(body, {
    status: responseStatusCode,
    headers: responseHeaders,
  });
}
