import type { SeriesDrop } from "@/lib/types";

export const drops: SeriesDrop[] = [
  {
    id: "awakening",
    handle: "awakening",
    title: "Awakening",
    heroImage: "/images/hero-lion-print.jpg",
    publishDate: "2026-07-15T10:00:00Z",
    status: "live",
    description:
      "A bold new collection exploring themes of identity, heritage, and renewal. Featuring four artists at the forefront of contemporary African art.",
    artistId: "amara-okafor",
    collectionHandle: "featured",
    featuredProductIds: ["lion-of-judah", "three-sisters"],
  },
  {
    id: "earth-tones",
    handle: "earth-tones",
    title: "Earth Tones",
    heroImage: "/images/collection-print-04.jpg",
    publishDate: "2026-08-01T10:00:00Z",
    status: "scheduled",
    description:
      "Warm earth pigments meet minimalist composition. A limited series celebrating the textures and colors of the African landscape.",
    artistId: "kofi-mensah",
    featuredProductIds: ["earth-rhythm", "adinkra-geometry"],
  },
  {
    id: "diaspora-dreams",
    handle: "diaspora-dreams",
    title: "Diaspora Dreams",
    heroImage: "/images/collection-print-03.jpg",
    publishDate: "2026-09-01T10:00:00Z",
    status: "draft",
    description:
      "Afrofuturist visions from the global African diaspora. Imagining futures where heritage and technology converge.",
    artistId: "tunde-bakare",
    featuredProductIds: ["afrofuturist-dawn", "golden-savanna"],
  },
];

export const getDropByHandle = (handle: string): SeriesDrop | undefined =>
  drops.find((d) => d.handle === handle);
