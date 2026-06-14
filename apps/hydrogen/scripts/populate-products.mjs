#!/usr/bin/env node
import {readFile} from 'node:fs/promises';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';

const DEFAULT_API_VERSION = '2026-04';
const DEFAULT_MAX_PRODUCTS = 25;

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.input) {
    throw new Error('Missing --input path to shopify-launch-products.json');
  }
  if (args.live && args.dryRun) {
    throw new Error('Use either --live or --dry-run, not both.');
  }

  const dryRun = !args.live;
  loadDotEnv(path.resolve('.env'));

  const launchList = JSON.parse(await readFile(args.input, 'utf8'));
  const products = Array.isArray(launchList.products) ? launchList.products : [];
  if (!products.length) {
    throw new Error('Launch list has no products.');
  }
  const maxProducts = Number(args.maxProducts || DEFAULT_MAX_PRODUCTS);
  if (products.length > maxProducts && !args.allowLarge) {
    throw new Error(
      `Refusing to process ${products.length} products. Use --max-products ${products.length} or --allow-large after reviewing the input.`,
    );
  }

  validateLaunchList(products);

  const env = getShopifyEnv({live: args.live});
  console.log(`${dryRun ? '[dry-run]' : '[live]'} Selected products: ${products.length}`);
  console.log(`Source: ${launchList.source || 'unknown'}`);
  console.log(`Target store: ${env.storeDomain || '(not required for dry-run)'}`);

  const results = [];
  for (const product of products) {
    const productSetInput = buildProductSetInput(product);
    if (dryRun) {
      results.push({
        handle: product.handle,
        sku: product.sku,
        title: product.title,
        status: productSetInput.status,
        variant_count: productSetInput.variants.length,
        image_upload: product.image?.local_path ? 'would upload local image' : 'no image',
      });
      continue;
    }

    const fileInput = await uploadImageForProduct(product, env);
    if (fileInput) {
      productSetInput.files = [fileInput];
    }
    const result = await productSet(product.handle, productSetInput, env);
    results.push(result);
    console.log(`Synced ${product.sku} -> ${result.handle} (${result.status})`);
  }

  if (dryRun) {
    for (const row of results) {
      console.log(`${row.sku}: ${row.handle} variants=${row.variant_count} image=${row.image_upload}`);
    }
    console.log('[dry-run] No Shopify writes performed.');
  } else {
    const created = results.filter((row) => row.status === 'DRAFT').length;
    console.log(`Shopify draft products synced: ${created}`);
  }
}

function parseArgs(argv) {
  const args = {dryRun: false, live: false, allowLarge: false};
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === '--input') args.input = argv[++index];
    else if (value === '--dry-run') args.dryRun = true;
    else if (value === '--live') args.live = true;
    else if (value === '--allow-large') args.allowLarge = true;
    else if (value === '--max-products') args.maxProducts = argv[++index];
    else throw new Error(`Unknown argument: ${value}`);
  }
  return args;
}

function loadDotEnv(envPath) {
  if (!existsSync(envPath)) return;
  const text = requireText(envPath);
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key]) {
      process.env[key] = rest.join('=').trim().replace(/^['"]|['"]$/g, '');
    }
  }
}

function requireText(filePath) {
  return String(new TextDecoder().decode(new Uint8Array(requireBytes(filePath))));
}

function requireBytes(filePath) {
  return readFileSync(filePath);
}

function getShopifyEnv({live}) {
  const storeDomain = normalizeStoreDomain(process.env.SHOPIFY_STORE_DOMAIN || process.env.PUBLIC_STORE_DOMAIN || '');
  const adminToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
  const apiVersion = process.env.SHOPIFY_API_VERSION || DEFAULT_API_VERSION;
  if (live) {
    const missing = [];
    if (!storeDomain) missing.push('SHOPIFY_STORE_DOMAIN');
    if (!adminToken) missing.push('SHOPIFY_ADMIN_ACCESS_TOKEN');
    if (missing.length) {
      throw new Error(`Missing required live Shopify env vars: ${missing.join(', ')}`);
    }
  }
  return {storeDomain, adminToken, apiVersion};
}

function normalizeStoreDomain(value) {
  return value.replace(/^https?:\/\//, '').replace(/\/$/, '').trim();
}

function validateLaunchList(products) {
  for (const product of products) {
    for (const field of ['handle', 'sku', 'title', 'description_html']) {
      if (!product[field]) throw new Error(`Product missing ${field}: ${product.sku || product.title || 'unknown'}`);
    }
    if (!Array.isArray(product.variants) || !product.variants.length) {
      throw new Error(`Product has no variants: ${product.sku}`);
    }
    const localPath = product.image?.local_path;
    if (!localPath || !existsSync(localPath)) {
      throw new Error(`Product image is missing or unreadable for ${product.sku}: ${localPath || '(none)'}`);
    }
    const localImageUrl = product.source?.local_image_url || product.image?.src || '';
    if (localImageUrl.startsWith('http://localhost') || localImageUrl.startsWith('http://127.0.0.1')) {
      continue;
    }
  }
}

function buildProductSetInput(product) {
  return {
    title: product.title,
    handle: product.handle,
    descriptionHtml: product.description_html,
    vendor: product.vendor || 'Kumachi Gallery',
    productType: product.product_type || 'Art Print',
    status: 'DRAFT',
    tags: product.tags || [],
    seo: product.seo || undefined,
    metafields: product.metafields || [],
    productOptions: [
      {
        name: 'Size',
        position: 1,
        values: product.variants.map((variant) => ({name: variant.size || variant.option?.value})),
      },
    ],
    variants: product.variants.map((variant) => ({
      position: variant.position,
      sku: variant.sku,
      price: variant.price,
      taxable: true,
      optionValues: [
        {
          optionName: 'Size',
          name: variant.size || variant.option?.value,
        },
      ],
    })),
  };
}

async function uploadImageForProduct(product, env) {
  const localPath = product.image?.local_path;
  if (!localPath) return null;
  const filename = product.image.filename || path.basename(localPath);
  const mimeType = mimeTypeFor(filename);
  const staged = await graphql(env, STAGED_UPLOADS_CREATE, {
    input: [
      {
        filename,
        mimeType,
        resource: 'IMAGE',
        httpMethod: 'POST',
      },
    ],
  });
  const uploadPayload = staged.data?.stagedUploadsCreate;
  const errors = uploadPayload?.userErrors || [];
  if (errors.length) {
    throw new Error(`stagedUploadsCreate failed for ${product.sku}: ${formatUserErrors(errors)}`);
  }
  const target = uploadPayload?.stagedTargets?.[0];
  if (!target?.url || !target?.resourceUrl) {
    throw new Error(`Shopify did not return a staged upload target for ${product.sku}`);
  }

  const bytes = await readFile(localPath);
  const form = new FormData();
  for (const parameter of target.parameters || []) {
    form.append(parameter.name, parameter.value);
  }
  form.append('file', new Blob([bytes], {type: mimeType}), filename);
  const response = await fetch(target.url, {method: 'POST', body: form});
  if (!response.ok) {
    throw new Error(`Image upload failed for ${product.sku}: HTTP ${response.status}`);
  }

  return {
    originalSource: target.resourceUrl,
    filename,
    alt: product.image.alt || product.title,
    contentType: 'IMAGE',
    duplicateResolutionMode: 'REPLACE',
  };
}

async function productSet(handle, input, env) {
  const payload = await graphql(env, PRODUCT_SET, {
    identifier: {handle},
    input,
    synchronous: true,
  });
  const result = payload.data?.productSet;
  const errors = result?.userErrors || result?.productSetOperation?.userErrors || [];
  if (errors.length) {
    throw new Error(`productSet failed for ${handle}: ${formatUserErrors(errors)}`);
  }
  const product = result?.product;
  if (!product) {
    throw new Error(`productSet did not return a product for ${handle}`);
  }
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    status: product.status,
    variant_count: product.variants?.nodes?.length || 0,
  };
}

async function graphql(env, query, variables) {
  const response = await fetch(`https://${env.storeDomain}/admin/api/${env.apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': env.adminToken,
    },
    body: JSON.stringify({query, variables}),
  });
  const payload = await response.json();
  if (!response.ok || payload.errors) {
    throw new Error(`Shopify GraphQL request failed: ${JSON.stringify(payload.errors || payload)}`);
  }
  return payload;
}

function formatUserErrors(errors) {
  return errors.map((error) => `${(error.field || []).join('.')}: ${error.message}`).join('; ');
}

function mimeTypeFor(filename) {
  const extension = path.extname(filename).toLowerCase();
  if (extension === '.png') return 'image/png';
  if (extension === '.webp') return 'image/webp';
  return 'image/jpeg';
}

const STAGED_UPLOADS_CREATE = `#graphql
  mutation ArtbizStagedUploadsCreate($input: [StagedUploadInput!]!) {
    stagedUploadsCreate(input: $input) {
      stagedTargets {
        url
        resourceUrl
        parameters {
          name
          value
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

const PRODUCT_SET = `#graphql
  mutation ArtbizProductSet($identifier: ProductSetIdentifiers, $input: ProductSetInput!, $synchronous: Boolean!) {
    productSet(identifier: $identifier, input: $input, synchronous: $synchronous) {
      product {
        id
        handle
        title
        status
        variants(first: 100) {
          nodes {
            id
            sku
          }
        }
      }
      productSetOperation {
        id
        status
        userErrors {
          code
          field
          message
        }
      }
      userErrors {
        code
        field
        message
      }
    }
  }
`;
