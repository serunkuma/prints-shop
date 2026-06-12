import type { Product } from "./products";

const WOO_BASE_URL = "http://localhost/prints-local";
const STORE_API = `${WOO_BASE_URL}/wp-json/wc/store/v1`;
const STOREFRONT_EXPORT_URL = `${WOO_BASE_URL}/art-business/artifacts/exports/storefront-products.json`;

interface WooStoreImage {
  src: string;
  alt?: string;
}

interface WooStoreTerm {
  name: string;
  default?: boolean;
}

interface WooStoreAttribute {
  name: string;
  terms?: WooStoreTerm[];
}

interface WooStoreVariationRef {
  id: number;
  attributes?: { name: string; value: string }[];
}

interface WooStoreProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  short_description?: string;
  description?: string;
  prices?: {
    price?: string;
    price_range?: { min_amount?: string; max_amount?: string };
    currency_code?: string;
  };
  images?: WooStoreImage[];
  categories?: { name: string; slug: string }[];
  tags?: { name: string; slug: string }[];
  attributes?: WooStoreAttribute[];
  variations?: WooStoreVariationRef[];
  average_rating?: string;
  review_count?: number;
}

interface StorefrontExportProduct {
  sku: string;
  handle: string;
  title: string;
  short_description?: string;
  category_name?: string;
  seo_tags?: string[];
  artist?: { id: string; name: string; location?: string; bio?: string };
  region?: string;
  genre?: string;
  series?: string;
  colors?: string[];
  sizes?: string[];
  default_size?: string;
  materials?: string[];
  frames?: string[];
  image?: { src: string; alt?: string };
  images?: { src: string; alt?: string }[];
  room_mockups?: string[];
  print_details?: { paper?: string; ink?: string; edition?: string };
  shipping_note?: string;
  returns_note?: string;
  trust_notes?: string[];
}

const stripHtml = (value = "") =>
  value
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#036;/g, "$")
    .replace(/&ndash;/g, "-")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/\s+/g, " ")
    .trim();

const cents = (value?: string) => Number.parseInt(value || "0", 10) || 0;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function loadExportProduct(handle: string): Promise<StorefrontExportProduct | null> {
  const payload = await fetchJson<{ products?: StorefrontExportProduct[] }>(STOREFRONT_EXPORT_URL);
  const products = payload?.products || [];
  return products.find((product) => product.handle === handle) || null;
}

async function loadVariationPrices(product: WooStoreProduct): Promise<Record<string, number>> {
  const entries = await Promise.all(
    (product.variations || []).map(async (variation) => {
      const size = variation.attributes?.find((attribute) => attribute.name === "Size")?.value;
      const detail = await fetchJson<WooStoreProduct>(`${STORE_API}/products/${variation.id}`);
      return size && detail?.prices?.price ? [size, cents(detail.prices.price)] as const : null;
    }),
  );
  return Object.fromEntries(entries.filter(Boolean) as [string, number][]);
}

export async function getMirrorProductByHandle(handle: string): Promise<Product | null> {
  const [wooMatches, overlay] = await Promise.all([
    fetchJson<WooStoreProduct[]>(`${STORE_API}/products?slug=${encodeURIComponent(handle)}`),
    loadExportProduct(handle),
  ]);
  const woo = wooMatches?.[0] || null;
  if (!woo && !overlay) return null;

  const source = woo || {
    name: overlay?.title || handle,
    slug: overlay?.handle || handle,
    sku: overlay?.sku || handle,
    prices: { price: "0" },
    images: overlay?.images?.map((image) => ({ src: image.src, alt: image.alt })) || [],
    tags: overlay?.seo_tags?.map((name) => ({ name, slug: name })) || [],
  };

  const sizeTerms =
    woo?.attributes?.find((attribute) => attribute.name === "Size")?.terms || [];
  const sizes = sizeTerms.map((term) => term.name) || overlay?.sizes || [];
  const defaultSize =
    sizeTerms.find((term) => term.default)?.name || overlay?.default_size || sizes[0] || "";
  const sizePriceMap = woo ? await loadVariationPrices(woo) : {};
  const price = cents(woo?.prices?.price_range?.min_amount || woo?.prices?.price || "0");
  const image = overlay?.image?.src || source.images?.[0]?.src || "";

  return {
    id: source.slug,
    handle: source.slug,
    title: source.name,
    artist: overlay?.artist?.name || "Kumachi Gallery",
    artistId: overlay?.artist?.id || "kumachi-gallery",
    artistLocation: overlay?.artist?.location,
    artistBio: overlay?.artist?.bio,
    price,
    currency: woo?.prices?.currency_code || "USD",
    image,
    images: (overlay?.images?.map((item) => item.src) || source.images?.map((item) => item.src) || []).filter(Boolean),
    roomMockups: overlay?.room_mockups || [],
    description: stripHtml(woo?.short_description || overlay?.short_description || woo?.description || ""),
    colors: overlay?.colors || [],
    region: overlay?.region || "",
    genre: overlay?.genre || overlay?.category_name || "",
    series: overlay?.series || "",
    sizes,
    defaultSize,
    sizePriceMap,
    materials: overlay?.materials || ["Matte Paper"],
    frames: overlay?.frames || ["unframed"],
    tags: woo?.tags?.map((tag) => tag.name) || overlay?.seo_tags || [],
    rating: Number.parseFloat(woo?.average_rating || "0"),
    reviewCount: woo?.review_count || 0,
    sku: source.sku,
    categoryName: overlay?.category_name || woo?.categories?.[0]?.name,
    printDetails: overlay?.print_details,
    shippingNote: overlay?.shipping_note,
    returnsNote: overlay?.returns_note,
    trustNotes: overlay?.trust_notes,
    isMirrorProduct: Boolean(woo || overlay),
  };
}
