import HeroSection from "@/components/sections/HeroSection";
import FeaturedCollectionSection from "@/components/sections/FeaturedCollectionSection";
import ArtistSpotlightSection from "@/components/sections/ArtistSpotlightSection";
import NewsletterSection from "@/components/sections/NewsletterSection";
import AIPrintStudioTeaser from "@/components/sections/AIPrintStudioTeaser";
import CategoryTiles from "@/components/sections/CategoryTiles";
import EditorialStorySection from "@/components/sections/EditorialStorySection";
import EditorialProductRail from "@/components/sections/EditorialProductRail";
import TrustBar from "@/sections/home/TrustBar";
import { products } from "@/data/products";
import { artists } from "@/data/artists";

const featuredProducts = products.slice(0, 6);
const featuredArtist = artists[0];

interface HomePageProps {
  revealHero?: boolean;
}

export default function HomePage({ revealHero = true }: HomePageProps) {
  return (
    <main>
      <HeroSection
        eyebrow="Kumachi Prints"
        title="Collect the image.\nCreate the myth."
        subtitle="Buy curated African art prints for rooms with memory, or start a future AI-assisted print path and shape an idea into something personal."
        ctaPrimary={{ label: "Buy Curated Collection", to: "/collection" }}
        ctaSecondary={{ label: "Create Your Own", to: "/create" }}
        image="/images/hero-lion-print.jpg"
        imageAlt="Lion of Judah, a vibrant graphic African lion print in gold, crimson, and cobalt"
        reveal={revealHero}
      />

      <TrustBar />
      <AIPrintStudioTeaser />
      <CategoryTiles />
      <EditorialProductRail products={products} />

      <FeaturedCollectionSection
        title="Featured Prints"
        products={featuredProducts}
        viewAllLink="/collection"
      />

      <EditorialStorySection
        title="A shop with gallery eyes and printmaker hands."
        body={"Kumachi Prints is a commerce-first art experience: curated editions, room-ready formats, and future tools for creating personal print concepts.\n\nThe result is a calmer kind of shop. Collect what already exists, or begin with a memory and turn it into a print direction."}
        image="/images/pdp-room-mockup-02.jpg"
        imageAlt="A framed Kumachi Prints artwork in a styled interior"
        imageSide="right"
      />

      <ArtistSpotlightSection
        name={featuredArtist.name}
        portrait={featuredArtist.portrait}
        bio={featuredArtist.bio}
        ctaLabel={`View ${featuredArtist.name.split(" ")[0]}'s Prints`}
        ctaLink="/collection"
      />

      <NewsletterSection />
    </main>
  );
}
