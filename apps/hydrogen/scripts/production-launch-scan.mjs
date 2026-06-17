const DEFAULT_BASE_URL = 'https://prints.kumachigallery.com';

const baseUrl = normalizeBaseUrl(process.env.E2E_BASE_URL || DEFAULT_BASE_URL);

const openingHandles = [
  'majestic-monarch',
  'rapt-in-observation',
  'transfixed-beauty',
  'graceful-potbearer',
  'boys-in-joyful-abandon',
  'captivating-beauty',
  'unbridled-laughter',
  'serious-beauty',
  'thinking-faces',
  'nurtured-wings',
  'a-continents-tapestry',
  'african-youths-smile',
  'tireless-joy',
  'elephant-in-calmness',
  'timeless-majesty',
  'young-innocence',
  'eyes-with-desire',
  'african-warrior',
  'skin-deep-beauty',
  'african-equine-grace',
  'silence-in-spirit',
  'triadic-reflections',
];

const launchPages = [
  '/',
  '/collection',
  '/collection/opening-drop',
  '/collection?genre=figurative-and-portrait-art',
  '/collection?genre=abstract-art',
  '/create',
  '/about',
  '/blog/drops',
  '/blog/drops/opening-drop',
  '/pages/size-guide',
  '/pages/print-quality',
  '/pages/shipping-returns',
  '/pages/faq',
  '/pages/contact',
  '/sitemap',
  '/sitemap.xml',
  '/robots.txt',
];

const crawlSeeds = ['/', '/collection', '/blog/drops/opening-drop', '/about', '/create'];

const blockerPattern =
  /Page not found|Collection not found|Product not found|An unexpected error occurred|Log in to continue to Oxygen|Verifying your connection/i;

const failures = [];
const discoveredLinks = new Set();

console.log(`Production QA scan: ${baseUrl}`);

for (const path of launchPages) {
  const result = await fetchPath(path);
  recordHttpFailure(path, result);
  if (result.text && blockerPattern.test(result.text)) {
    failures.push({url: absoluteUrl(path), reason: 'blocker text rendered'});
  }
}

for (const path of crawlSeeds) {
  const result = await fetchPath(path);
  recordHttpFailure(path, result);
  if (!result.text) continue;

  for (const href of extractInternalLinks(result.text)) {
    discoveredLinks.add(href);
  }
}

for (const href of [...discoveredLinks].sort()) {
  const result = await fetchPath(href);
  recordHttpFailure(href, result);
  if (result.text && blockerPattern.test(result.text)) {
    failures.push({url: absoluteUrl(href), reason: 'blocker text rendered'});
  }
}

for (const handle of openingHandles) {
  const path = `/products/${handle}`;
  const result = await fetchPath(path);
  recordHttpFailure(path, result);

  if (!result.text) continue;
  if (!/add to cart/i.test(result.text)) {
    failures.push({url: absoluteUrl(path), reason: 'missing Add to Cart'});
  }
  if (/Product not found|Unavailable|Price shown after Shopify import/i.test(result.text)) {
    failures.push({url: absoluteUrl(path), reason: 'PDP blocker text rendered'});
  }
}

printReport();

if (failures.length > 0) {
  process.exitCode = 1;
}

function normalizeBaseUrl(value) {
  return value.replace(/\/+$/, '');
}

function absoluteUrl(path) {
  return new URL(path, `${baseUrl}/`).toString();
}

async function fetchPath(path) {
  const url = absoluteUrl(path);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {
    const response = await fetch(url, {
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'user-agent': 'KumachiProductionQAScan/1.0',
      },
    });
    const contentType = response.headers.get('content-type') || '';
    const text = contentType.includes('text') || contentType.includes('json') || contentType.includes('xml')
      ? await response.text()
      : '';

    return {
      status: response.status,
      text,
      url: response.url,
    };
  } catch (error) {
    return {
      error: error.name || String(error),
      url,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function recordHttpFailure(path, result) {
  if (result.error) {
    failures.push({url: absoluteUrl(path), reason: result.error});
    return;
  }

  if (result.status === 404 || result.status >= 500) {
    failures.push({url: absoluteUrl(path), status: result.status, reason: 'bad status'});
  }
}

function extractInternalLinks(html) {
  const links = [];
  for (const match of html.matchAll(/href=["']([^"']+)["']/g)) {
    const href = decodeHtml(match[1]).split('#')[0];
    if (!href.startsWith('/')) continue;
    if (href.startsWith('/account/login')) continue;
    links.push(href);
  }
  return links;
}

function decodeHtml(value) {
  return value.replaceAll('&amp;', '&');
}

function printReport() {
  console.log('');
  console.log('Production QA scan result');
  console.log(`- Launch routes checked: ${launchPages.length}`);
  console.log(`- Internal links discovered: ${discoveredLinks.size}`);
  console.log(`- PDPs checked: ${openingHandles.length}`);
  console.log(`- Failures: ${failures.length}`);

  if (failures.length === 0) {
    console.log('');
    console.log('PASS: production launch scan found no blockers.');
    return;
  }

  console.log('');
  console.log('Failures:');
  for (const failure of failures) {
    const status = failure.status ? ` status=${failure.status}` : '';
    console.log(`- ${failure.url}${status} reason=${failure.reason}`);
  }
}
