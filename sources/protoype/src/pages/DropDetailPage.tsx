import { Link, Navigate, useParams } from "react-router";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";
import SeriesCard from "@/components/series/SeriesCard";
import { getArtistById } from "@/data/artists";
import { drops, getDropByHandle } from "@/data/drops";
import { products } from "@/data/products";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function DropDetailPage() {
  const { handle } = useParams();
  const item = handle ? getDropByHandle(handle) : undefined;

  if (!item) return <Navigate to="/drops" replace />;

  const artist = item.artistId ? getArtistById(item.artistId) : undefined;
  const works = products.filter((product) => item.featuredProductIds.includes(product.id));
  const otherDrops = drops.filter((drop) => drop.handle !== item.handle);

  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)", minHeight: "100vh" }}>
      <section className="relative min-h-dvh overflow-hidden">
        <img src={item.heroImage} alt={item.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--color-surface-deep) 76%, transparent)" }} />
        <div className="container-gallery relative flex min-h-dvh flex-col items-center justify-center text-center">
          <p className="text-caption uppercase" style={{ color: "var(--color-accent-ochre)" }}>
            Kumachi Prints Drop
          </p>
          <h1 className="text-display mt-4 flex flex-wrap justify-center gap-x-4" style={{ color: "#fffaf0" }}>
            {item.title.split(" ").map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <p className="text-body mt-6 max-w-3xl" style={{ color: "#d8cbb7" }}>{item.description}</p>
          <a
            href="#prints"
            className="text-button mt-8 inline-flex min-h-11 items-center px-6"
            style={{ backgroundColor: "var(--color-accent-ochre)", color: "#15120d" }}
          >
            Shop this series
          </a>
        </div>
      </section>

      <motion.section className="container-gallery kumachi-section grid gap-10 lg:grid-cols-2" initial="hidden" whileInView="show" viewport={{ once: true }} variants={staggerContainer}>
        <motion.img variants={fadeUp} src={item.heroImage} alt={`${item.title} detail`} className="aspect-[4/3] w-full object-cover" />
        <motion.div variants={fadeUp} className="flex flex-col justify-center">
          <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>Artist statement</p>
          <h2 className="text-h2 mt-3" style={{ color: "var(--color-text-primary)" }}>Memory made visual.</h2>
          <p className="text-body mt-5" style={{ color: "var(--color-text-secondary)" }}>{item.description}</p>
        </motion.div>
      </motion.section>

      <section id="prints" className="container-gallery kumachi-section">
        <h2 className="text-h2" style={{ color: "var(--color-text-primary)" }}>The Prints</h2>
        <p className="mt-2 text-sm tracking-wide" style={{ color: "var(--color-text-muted)" }}>{works.length} prints in this drop</p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((product, index) => <ProductCard key={product.handle} product={product} index={index} />)}
        </div>
      </section>

      {artist && (
        <section className="container-gallery kumachi-section pt-0">
          <div className="flex flex-col gap-5 p-6 md:flex-row md:items-center" style={{ border: "1px solid var(--color-border)", backgroundColor: "var(--color-surface)" }}>
            <img src={artist.portrait} alt={`${artist.name} portrait`} className="h-24 w-24 rounded-full object-cover" />
            <div>
              <h2 className="text-h3" style={{ color: "var(--color-text-primary)" }}>{artist.name}</h2>
              <p className="text-body-small" style={{ color: "var(--color-text-secondary)" }}>{artist.location}</p>
              <p className="text-body-small mt-3 max-w-3xl" style={{ color: "var(--color-text-secondary)" }}>{artist.bio}</p>
              <Link to={`/artists/${artist.id}`} className="text-nav mt-3 inline-flex" style={{ color: "var(--color-accent-clay)" }}>Full artist profile</Link>
            </div>
          </div>
        </section>
      )}

      <section className="container-gallery kumachi-section pt-0">
        <h2 className="text-h3" style={{ color: "var(--color-text-primary)" }}>More Drops</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {otherDrops.map((drop) => <SeriesCard key={drop.handle} item={drop} />)}
        </div>
      </section>
    </main>
  );
}
