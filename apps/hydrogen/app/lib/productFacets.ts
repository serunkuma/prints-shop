export const FACET_COLORS = [
  {value: 'ochre', label: 'Ochre', swatch: '#C88A3D'},
  {value: 'crimson', label: 'Crimson', swatch: '#A52A2A'},
  {value: 'cobalt', label: 'Cobalt', swatch: '#0047AB'},
  {value: 'emerald', label: 'Emerald', swatch: '#50C878'},
  {value: 'neutral', label: 'Neutral', swatch: '#8B8B8B'},
  {value: 'black', label: 'Black', swatch: '#000000'},
];

export const FACET_REGIONS = [
  {value: 'african-diaspora', label: 'African Diaspora'},
  {value: 'african-landscape', label: 'African Landscape'},
  {value: 'pan-african', label: 'Pan-African'},
  {value: 'uganda', label: 'Uganda'},
  {value: 'east-africa', label: 'East Africa'},
];

export const FACET_GENRES = [
  {value: 'figurative-and-portrait-art', label: 'Figurative & Portrait'},
  {value: 'narrative-and-storytelling-art', label: 'Narrative & Storytelling'},
  {value: 'landscape-and-nature', label: 'Landscape & Nature'},
  {value: 'abstract-art', label: 'Abstract'},
  {value: 'contemporary-african-art', label: 'Contemporary African'},
  {value: 'political-and-social-commentary', label: 'Political & Social Commentary'},
];

export const FACET_PRICE_BANDS = [
  {value: 'under-100', label: 'Under $100'},
  {value: '100-200', label: '$100 – $200'},
  {value: '200-500', label: '$200 – $500'},
  {value: 'over-500', label: 'Over $500'},
];

export const FACET_ALL: Record<string, {value: string; label: string; swatch?: string}[]> = {
  color: FACET_COLORS,
  region: FACET_REGIONS,
  genre: FACET_GENRES,
  price: FACET_PRICE_BANDS,
};

export function genreToSlug(str: string): string {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export function regionToSlug(str: string): string {
  return str.toLowerCase().replace(/\s+/g, '-');
}

export function slugToLabel(slug: string, category: string): string {
  const group = FACET_ALL[category];
  if (group) {
    const found = group.find((f) => f.value === slug);
    if (found) return found.label;
  }
  return slug;
}

export function computeAvailableRegions(products: any[]): string[] {
  const seen = new Set<string>();
  for (const p of products) {
    const r = p.facets?.region;
    if (r && !seen.has(r)) seen.add(r);
  }
  return FACET_REGIONS.filter((r) => seen.has(r.value)).map((r) => r.value);
}

export function testPrice(priceBand: string, amount: number): boolean {
  switch (priceBand) {
    case 'under-100': return amount < 100;
    case '100-200': return amount >= 100 && amount <= 200;
    case '200-500': return amount > 200 && amount <= 500;
    case 'over-500': return amount > 500;
    default: return true;
  }
}
