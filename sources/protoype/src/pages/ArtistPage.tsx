import { motion } from "framer-motion";
import { Link, Navigate, useParams } from "react-router";
import ProductCard from "@/components/ProductCard";
import { getArtistById } from "@/data/artists";
import { products } from "@/data/products";

export default function ArtistPage() {
  const { handle } = useParams();
  const artist = handle ? getArtistById(handle) : undefined;

  if (!artist) return <Navigate to="/artists" replace />;

  const artistProducts = products.filter((product) => product.artistId === artist.id);

  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)", paddingTop: "100px", minHeight: "100vh" }}>
      <section className="container-gallery grid gap-10 py-10 lg:grid-cols-[42%_58%] lg:items-center">
        <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} className="relative">
          <div className="absolute -left-4 top-4 h-full w-full" style={{ border: "1px solid var(--color-accent-ochre)" }} />
          <img src={artist.portrait} alt={`${artist.name} portrait`} className="relative aspect-[4/5] w-full object-cover" />
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
            {artist.location}
          </p>
          <h1 className="text-h1 mt-4" style={{ color: "var(--color-text-primary)" }}>
            {artist.name}
          </h1>
          <p className="text-body mt-6 max-w-3xl" style={{ color: "var(--color-text-secondary)" }}>
            {artist.bio}
          </p>
          <Link
            to="/collection"
            className="text-button mt-8 inline-flex min-h-11 items-center px-6"
            style={{ backgroundColor: "var(--color-text-primary)", color: "var(--color-bg-primary)" }}
          >
            Shop Artist Prints
          </Link>
        </motion.div>
      </section>

      <section className="container-gallery kumachi-section">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
              Available editions
            </p>
            <h2 className="text-h2 mt-3" style={{ color: "var(--color-text-primary)" }}>
              Prints by {artist.name}
            </h2>
          </div>
          <p className="hidden text-body-small sm:block" style={{ color: "var(--color-text-tertiary)" }}>
            {artistProducts.length} works
          </p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artistProducts.map((product, index) => (
            <ProductCard key={product.handle} product={product} index={index} />
          ))}
        </div>
      </section>
    </main>
  );
}
