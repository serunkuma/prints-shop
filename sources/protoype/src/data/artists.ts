export interface Artist {
  id: string;
  name: string;
  location: string;
  bio: string;
  portrait: string;
  printCount: number;
}

export const artists: Artist[] = [
  {
    id: "amara-okafor",
    name: "Amara Okafor",
    location: "Lagos / London",
    bio: "Lagos-born, London-based artist Amara Okafor creates bold, graphic works that bridge traditional West African visual languages with contemporary pop sensibilities. Her prints explore themes of identity, migration, and the vibrant energy of modern African cities. Her work has been exhibited in galleries across Lagos, Accra, and London.",
    portrait: "/images/artist-portrait.jpg",
    printCount: 8,
  },
  {
    id: "kofi-mensah",
    name: "Kofi Mensah",
    location: "Accra",
    bio: "Kofi Mensah draws deeply from the visual traditions of the Akan people, reinterpreting Adinkra symbols and kente patterns through a minimalist, geometric lens. His work celebrates the mathematical elegance inherent in African design systems.",
    portrait: "/images/artist-portrait.jpg",
    printCount: 6,
  },
  {
    id: "zara-ndiaye",
    name: "Zara Ndiaye",
    location: "Dakar / Paris",
    bio: "Zara Ndiaye's figurative works celebrate the strength and grace of African women. Working between Dakar and Paris, she brings together West African portraiture traditions with European modernist influences, creating a visual language that is entirely her own.",
    portrait: "/images/artist-portrait.jpg",
    printCount: 7,
  },
  {
    id: "tunde-bakare",
    name: "Tunde Bakare",
    location: "Johannesburg",
    bio: "Tunde Bakare is a leading voice in Afrofuturist art. His visionary landscapes and architectural compositions imagine futures where African cultural heritage and technological advancement coexist in harmony. Based in Johannesburg, his work has been featured in major exhibitions across the continent.",
    portrait: "/images/artist-portrait.jpg",
    printCount: 5,
  },
];

export const getArtistById = (id: string): Artist | undefined =>
  artists.find((a) => a.id === id);
