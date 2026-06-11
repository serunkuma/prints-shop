export type ProductSize = {
  label: string;
  price: number;
  available: boolean;
};

export type ProductFrame = {
  label: string;
  color: string;
  available: boolean;
};

export type ProductImage = {
  src: string;
  alt: string;
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  artist: string;
  series: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  tags: string[];
  technique: string;
  sizes: ProductSize[];
  frames: ProductFrame[];
  images: ProductImage[];
  description: string;
  isNew?: boolean;
  isLimited?: boolean;
  isFeatured?: boolean;
};

export type Series = {
  id: string;
  handle: string;
  title: string;
  artist: string;
  heroImage: string;
  description: string;
  productHandles: string[];
  publishDate: string;
};

export type Artist = {
  id: string;
  handle: string;
  name: string;
  portrait: string;
  location: string;
  bio: string;
  quote: string;
};

export type CartItem = {
  productId: string;
  handle: string;
  title: string;
  artist: string;
  size: string;
  frame: string;
  price: number;
  currency: string;
  quantity: number;
  image: string;
};

const sizes: ProductSize[] = [
  { label: "A4", price: 4500, available: true },
  { label: "A3", price: 8500, available: true },
  { label: "A2", price: 15000, available: true },
  { label: "50x70cm", price: 25000, available: true },
  { label: "70x100cm", price: 45000, available: false },
];

const frames: ProductFrame[] = [
  { label: "No Frame", color: "transparent", available: true },
  { label: "Black Frame", color: "var(--void)", available: true },
  { label: "White Frame", color: "var(--text-primary)", available: true },
  { label: "Natural Wood", color: "var(--gold-dim)", available: true },
];

export const artists: Artist[] = [
  {
    id: "a1",
    handle: "kumachi",
    name: "Kumachi",
    portrait: "/images/artist-portrait.jpg",
    location: "Kampala, Uganda",
    bio: "Kumachi is the visual voice of the Kumachi creative ecosystem - bold, saturated, and rooted in the stories of the African diaspora. Every work is a confrontation: with identity, with colour, with silence.",
    quote: "I paint what I need to see in the world.",
  },
];

export const series: Series[] = [
  {
    id: "s1",
    handle: "monarch-series",
    title: "The Monarch Series",
    artist: "Kumachi",
    heroImage: "/images/hero-lion-print.jpg",
    description:
      "Power has never been quiet. The Monarch Series is a study in dominance, colour, and the refusal to be subtle. Each piece is a coronation.",
    productHandles: ["majestic-monarch", "silent-king", "crown-of-colour"],
    publishDate: "2025-11-01",
  },
  {
    id: "s2",
    handle: "spirit-series",
    title: "Silence in Spirit",
    artist: "Kumachi",
    heroImage: "/images/hero-figures-print.jpg",
    description:
      "Three figures. Three frequencies. One silence that speaks louder than any noise. This series reaches into ritual and asks: what do we carry that we cannot name?",
    productHandles: ["silence-in-spirit", "spirit-two", "the-three"],
    publishDate: "2025-09-15",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    handle: "majestic-monarch",
    title: "Majestic Monarch",
    artist: "Kumachi",
    series: "The Monarch Series",
    price: 4500,
    currency: "USD",
    tags: ["lion", "bold", "colour", "pop-art", "african"],
    technique: "Acrylic on canvas, Giclee print on 300gsm archival paper",
    description:
      "The lion does not explain itself. Neither does this print. Explosive flat-fill colour on a pure black ground. This is power made visible.",
    sizes,
    frames,
    images: [
      { src: "/images/hero-lion-print.jpg", alt: "Majestic Monarch full artwork view" },
      { src: "/images/pdp-room-mockup-01.jpg", alt: "Majestic Monarch shown in a styled room" },
    ],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p2",
    handle: "silence-in-spirit",
    title: "Silence in Spirit",
    artist: "Kumachi",
    series: "Silence in Spirit",
    price: 5500,
    currency: "USD",
    tags: ["figures", "cultural", "pan-african", "ritual", "diaspora"],
    technique: "Acrylic on board, Giclee print on 300gsm archival paper",
    description:
      "Three figures in a tricolor field. Pan-African palette, concentric white linework, half-lidded eyes that have seen things. This piece carries memory.",
    sizes: sizes.map((size) => ({ ...size, price: size.price + 1000, available: size.label !== "70x100cm" || true })),
    frames: frames.map((frame) => ({ ...frame, available: frame.label !== "Natural Wood" })),
    images: [
      { src: "/images/hero-figures-print.jpg", alt: "Silence in Spirit full artwork view" },
      { src: "/images/pdp-room-mockup-02.jpg", alt: "Silence in Spirit in an interior mockup" },
    ],
    isLimited: true,
    isFeatured: true,
  },
  {
    id: "p3",
    handle: "silent-king",
    title: "Silent King",
    artist: "Kumachi",
    series: "The Monarch Series",
    price: 8500,
    currency: "USD",
    tags: ["lion", "monarch", "portrait", "limited"],
    technique: "Giclee print on 300gsm archival paper",
    description: "A quieter monarch study, still electric with colour and command.",
    sizes,
    frames,
    images: [{ src: "/images/collection-print-01.jpg", alt: "Silent King art print" }],
    isLimited: true,
  },
  {
    id: "p4",
    handle: "crown-of-colour",
    title: "Crown of Colour",
    artist: "Kumachi",
    series: "The Monarch Series",
    price: 15000,
    compareAtPrice: 18000,
    currency: "USD",
    tags: ["colour", "monarch", "bold", "new"],
    technique: "Giclee print on 300gsm archival paper",
    description: "A saturated crown of electric blue, cadmium red, acid yellow, and heat.",
    sizes,
    frames,
    images: [{ src: "/images/collection-print-03.jpg", alt: "Crown of Colour art print" }],
    isNew: true,
    isFeatured: true,
  },
  {
    id: "p5",
    handle: "spirit-two",
    title: "Spirit Two",
    artist: "Kumachi",
    series: "Silence in Spirit",
    price: 9500,
    currency: "USD",
    tags: ["spirit", "figures", "ritual", "green"],
    technique: "Giclee print on 300gsm archival paper",
    description: "A second study in stillness, ritual, and inward sight.",
    sizes,
    frames,
    images: [{ src: "/images/collection-print-02.jpg", alt: "Spirit Two art print" }],
  },
  {
    id: "p6",
    handle: "the-three",
    title: "The Three",
    artist: "Kumachi",
    series: "Silence in Spirit",
    price: 25000,
    currency: "USD",
    tags: ["figures", "diaspora", "pan-african", "featured"],
    technique: "Giclee print on 300gsm archival paper",
    description: "Three frequencies held in one field. A print for rooms that listen.",
    sizes,
    frames,
    images: [{ src: "/images/collection-print-05.jpg", alt: "The Three art print" }],
    isFeatured: true,
  },
];

export function getProductByHandle(handle: string) {
  return products.find((product) => product.handle === handle);
}

export function getSeriesByHandle(handle: string) {
  return series.find((item) => item.handle === handle);
}

export function getArtistByHandle(handle: string) {
  return artists.find((artist) => artist.handle === handle);
}

export function getSeriesProducts(seriesTitle: string) {
  return products.filter((product) => product.series === seriesTitle);
}
