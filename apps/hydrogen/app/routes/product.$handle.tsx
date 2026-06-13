export async function loader({params}: {params: {handle?: string}}) {
  const handle = params.handle;

  if (!handle) {
    throw new Response('Not found', {status: 404});
  }

  throw new Response(null, {
    status: 302,
    headers: {
      Location: `/products/${handle}`,
    },
  });
}

export default function ProductBridgeRoute() {
  return null;
}
