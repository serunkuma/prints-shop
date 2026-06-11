export interface Product {
  id: string;
  handle: string;
  title: string;
  artist: string;
  artistId: string;
  price: number;
  originalPrice?: number;
  compareAtPrice?: number;
  currency: string;
  image: string;
  images: string[];
  roomMockups: string[];
  description: string;
  colors: string[];
  region: string;
  genre: string;
  series: string;
  sizes: string[];
  materials: string[];
  frames: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  isNew?: boolean;
  isLimited?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "lion-of-judah",
    handle: "lion-of-judah",
    title: "Lion of Judah",
    artist: "Amara Okafor",
    artistId: "amara-okafor",
    price: 185,
    currency: "USD",
    image: "/images/hero-lion-print.jpg",
    images: ["/images/hero-lion-print.jpg"],
    roomMockups: [
      "/images/pdp-room-mockup-01.jpg",
      "/images/pdp-room-mockup-02.jpg",
      "/images/pdp-room-mockup-03.jpg",
    ],
    description:
      "A powerful celebration of African strength and dignity. This bold graphic print features a lion rendered in vibrant blocks of gold, crimson, and cobalt — a contemporary vision of a timeless symbol. Printed on archival-quality matte paper with pigment inks for lasting color fidelity.",
    colors: ["ochre", "crimson", "cobalt"],
    region: "West African",
    genre: "Graphic Illustration",
    series: "Awakening",
    sizes: ['8"×10"', '11"×14"', '16"×20"', '24"×36"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: ["New"],
    rating: 5,
    reviewCount: 24,
    sku: "KGC-LJ-1620",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "three-sisters",
    handle: "three-sisters",
    title: "Three Sisters",
    artist: "Amara Okafor",
    artistId: "amara-okafor",
    price: 165,
    currency: "USD",
    image: "/images/hero-figures-print.jpg",
    images: ["/images/hero-figures-print.jpg"],
    roomMockups: [
      "/images/pdp-room-mockup-01.jpg",
      "/images/pdp-room-mockup-02.jpg",
    ],
    description:
      "Three abstracted figures in emerald, ochre, and terracotta stand unified against a rhythmic, textile-inspired background. A modern linocut aesthetic celebrating sisterhood and collective identity.",
    colors: ["emerald", "ochre", "crimson"],
    region: "West African",
    genre: "Graphic Illustration",
    series: "Awakening",
    sizes: ['8"×10"', '11"×14"', '16"×20"', '24"×36"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: ["New"],
    rating: 4.5,
    reviewCount: 18,
    sku: "KGC-TS-1620",
    isNew: true,
    isFeatured: true,
  },
  {
    id: "adinkra-geometry",
    handle: "adinkra-geometry",
    title: "Adinkra Geometry",
    artist: "Kofi Mensah",
    artistId: "kofi-mensah",
    price: 145,
    currency: "USD",
    image: "/images/collection-print-01.jpg",
    images: ["/images/collection-print-01.jpg"],
    roomMockups: ["/images/pdp-room-mockup-01.jpg"],
    description:
      "An abstract composition inspired by West African Adinkra symbols. Geometric patterns in black, gold, and terracotta on a cream background. Bold, graphic, traditional yet contemporary.",
    colors: ["ochre", "crimson"],
    region: "West African",
    genre: "Abstract Expressionism",
    series: "Earth Tones",
    sizes: ['8"×10"', '11"×14"', '16"×20"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: ["New"],
    rating: 4.5,
    reviewCount: 12,
    sku: "KGC-AG-1620",
    isNew: true,
  },
  {
    id: "wrapped-in-color",
    handle: "wrapped-in-color",
    title: "Wrapped in Color",
    artist: "Zara Ndiaye",
    artistId: "zara-ndiaye",
    price: 195,
    originalPrice: 235,
    compareAtPrice: 235,
    currency: "USD",
    image: "/images/collection-print-02.jpg",
    images: ["/images/collection-print-02.jpg"],
    roomMockups: ["/images/pdp-room-mockup-02.jpg"],
    description:
      "A portrait of a woman in traditional African headwrap, rendered in a modern, colorful pop-art style. Vivid greens, blues, and yellows create an expressive, powerful gaze.",
    colors: ["emerald", "cobalt", "ochre"],
    region: "East African",
    genre: "Portrait",
    series: "Diaspora Dreams",
    sizes: ['8"×10"', '11"×14"', '16"×20"', '24"×36"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: ["Sale"],
    rating: 5,
    reviewCount: 31,
    sku: "KGC-WC-1620",
    isFeatured: true,
  },
  {
    id: "afrofuturist-dawn",
    handle: "afrofuturist-dawn",
    title: "Afrofuturist Dawn",
    artist: "Tunde Bakare",
    artistId: "tunde-bakare",
    price: 220,
    currency: "USD",
    image: "/images/collection-print-03.jpg",
    images: ["/images/collection-print-03.jpg"],
    roomMockups: ["/images/pdp-room-mockup-03.jpg"],
    description:
      "An Afrofuturist cityscape at dusk. Geometric buildings in silhouette against a gradient sky of deep purple, orange, and gold. Stars and celestial elements converge in a bold, visionary composition.",
    colors: ["cobalt", "ochre"],
    region: "Diaspora",
    genre: "Afrofuturism",
    series: "Diaspora Dreams",
    sizes: ['11"×14"', '16"×20"', '24"×36"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: [],
    rating: 4.5,
    reviewCount: 15,
    sku: "KGC-AD-1620",
    isLimited: true,
    isFeatured: true,
  },
  {
    id: "earth-rhythm",
    handle: "earth-rhythm",
    title: "Earth Rhythm",
    artist: "Kofi Mensah",
    artistId: "kofi-mensah",
    price: 135,
    currency: "USD",
    image: "/images/collection-print-04.jpg",
    images: ["/images/collection-print-04.jpg"],
    roomMockups: ["/images/pdp-room-mockup-01.jpg"],
    description:
      "A rhythmic pattern of overlapping circles and arcs in warm earth tones — ochre, sienna, cream, and charcoal. Inspired by traditional African textile patterns. Minimal, elegant, geometric.",
    colors: ["ochre", "crimson"],
    region: "West African",
    genre: "Pattern",
    series: "Earth Tones",
    sizes: ['8"×10"', '11"×14"', '16"×20"'],
    materials: ["Matte Paper"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: [],
    rating: 4,
    reviewCount: 9,
    sku: "KGC-ER-1620",
  },
  {
    id: "dancers-flame",
    handle: "dancers-flame",
    title: "Dancer's Flame",
    artist: "Zara Ndiaye",
    artistId: "zara-ndiaye",
    price: 175,
    currency: "USD",
    image: "/images/collection-print-05.jpg",
    images: ["/images/collection-print-05.jpg"],
    roomMockups: ["/images/pdp-room-mockup-02.jpg"],
    description:
      "A dynamic depiction of a dancer in mid-movement. Fluid lines and bold blocks of color — crimson, gold, black. The figure is abstracted, capturing motion and energy in contemporary African expressionism.",
    colors: ["crimson", "ochre"],
    region: "East African",
    genre: "Abstract Expressionism",
    series: "Diaspora Dreams",
    sizes: ['8"×10"', '11"×14"', '16"×20"', '24"×36"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: ["New"],
    rating: 5,
    reviewCount: 22,
    sku: "KGC-DF-1620",
    isNew: true,
  },
  {
    id: "golden-savanna",
    handle: "golden-savanna",
    title: "Golden Savanna",
    artist: "Tunde Bakare",
    artistId: "tunde-bakare",
    price: 155,
    currency: "USD",
    image: "/images/collection-print-06.jpg",
    images: ["/images/collection-print-06.jpg"],
    roomMockups: ["/images/pdp-room-mockup-03.jpg"],
    description:
      "A serene landscape of rolling savanna hills at golden hour. Warm amber light, acacia tree silhouettes, distant mountains. Painterly, atmospheric, and peacefully composed.",
    colors: ["ochre"],
    region: "South African",
    genre: "Landscape",
    series: "Earth Tones",
    sizes: ['11"×14"', '16"×20"', '24"×36"'],
    materials: ["Matte Paper", "Canvas"],
    frames: ["black-metal", "light-oak", "walnut", "unframed"],
    tags: [],
    rating: 4.5,
    reviewCount: 14,
    sku: "KGC-GS-1620",
  },
];

export const getProductById = (id: string): Product | undefined =>
  products.find((p) => p.id === id);

export const getProductByHandle = (handle: string): Product | undefined =>
  products.find((p) => p.handle === handle || p.id === handle);

export const getRelatedProducts = (product: Product, count = 4): Product[] =>
  products
    .filter((p) => p.id !== product.id && p.artistId === product.artistId)
    .slice(0, count);

export const colorMap: Record<string, string> = {
  ochre: "#F3B923",
  crimson: "#D63434",
  cobalt: "#1D63B8",
  emerald: "#258555",
};

export const frameOptions = [
  { id: "black-metal", label: "Black Metal", color: "#1A1A1A", width: 10 },
  { id: "light-oak", label: "Light Oak", color: "#C4A882", width: 14 },
  { id: "walnut", label: "Deep Walnut", color: "#3D2817", width: 16 },
  { id: "unframed", label: "Unframed", color: "transparent", width: 0 },
];

export const sizePrices: Record<string, number> = {
  '8"×10"': -20,
  '11"×14"': -10,
  '16"×20"': 0,
  '24"×36"': 45,
};

export const materialPrices: Record<string, number> = {
  "Matte Paper": 0,
  Canvas: 35,
};

export const framePrices: Record<string, number> = {
  "black-metal": 65,
  "light-oak": 75,
  walnut: 85,
  unframed: 0,
};

export const filterOptions = {
  color: [
    { value: "ochre", label: "Ochre", swatch: "#F3B923" },
    { value: "crimson", label: "Terracotta", swatch: "#D63434" },
    { value: "cobalt", label: "Cobalt", swatch: "#1D63B8" },
    { value: "emerald", label: "Emerald", swatch: "#258555" },
  ],
  region: [
    "Nigerian Contemporary",
    "South African",
    "East African",
    "West African",
    "Diaspora",
  ],
  genre: [
    "Abstract Expressionism",
    "Afrofuturism",
    "Graphic Illustration",
    "Portrait",
    "Landscape",
    "Pattern",
  ],
  price: [
    { value: "under-100", label: "Under $100" },
    { value: "100-200", label: "$100 – $200" },
    { value: "200-500", label: "$200 – $500" },
    { value: "over-500", label: "Over $500" },
  ],
};

export interface CategoryMeta {
  handle: string;
  label: string;
  title: string;
  description: string;
  matcher: (product: Product) => boolean;
}

export const categoryMeta: CategoryMeta[] = [
  {
    handle: "portraits",
    label: "Portraits",
    title: "Portrait Prints",
    description: "Face-forward works with presence, gaze, and personal mythology.",
    matcher: (product) => product.genre === "Portrait" || product.tags.includes("portrait"),
  },
  {
    handle: "abstract",
    label: "Abstract",
    title: "Abstract Prints",
    description: "Expressive compositions, symbolic geometry, and colour-led statements.",
    matcher: (product) => product.genre.includes("Abstract"),
  },
  {
    handle: "graphic-illustration",
    label: "Graphic Illustration",
    title: "Graphic Illustration Prints",
    description: "Bold illustrative editions with clear silhouettes and high-impact colour.",
    matcher: (product) => product.genre === "Graphic Illustration",
  },
  {
    handle: "patterns",
    label: "Patterns",
    title: "Pattern Prints",
    description: "Textile-inspired rhythms, repeats, and visual systems for calmer rooms.",
    matcher: (product) => product.genre === "Pattern",
  },
  {
    handle: "landscape",
    label: "Landscape",
    title: "Landscape Prints",
    description: "Atmospheric views, natural forms, and grounded interior pieces.",
    matcher: (product) => product.genre === "Landscape",
  },
  {
    handle: "afrofuturism",
    label: "Afrofuturism",
    title: "Afrofuturist Prints",
    description: "Future-facing works where African memory meets speculative imagination.",
    matcher: (product) => product.genre === "Afrofuturism",
  },
  {
    handle: "new-arrivals",
    label: "New Arrivals",
    title: "New Arrivals",
    description: "Freshly added Kumachi Prints editions and early collection favourites.",
    matcher: (product) => product.isNew === true || product.tags.includes("New"),
  },
];

export const getCategoryByHandle = (handle: string): CategoryMeta | undefined =>
  categoryMeta.find((category) => category.handle === handle);

export const getProductsByCategory = (handle: string): Product[] => {
  const category = getCategoryByHandle(handle);
  return category ? products.filter(category.matcher) : [];
};
