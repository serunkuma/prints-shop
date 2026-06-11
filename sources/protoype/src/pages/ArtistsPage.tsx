import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { artists } from "@/data/artists";
import { products } from "@/data/products";

export default function ArtistsPage() {
  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)", paddingTop: "100px", minHeight: "100vh" }}>
      <div className="container-gallery py-16 text-center lg:py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-caption font-medium uppercase"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Artists
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-h1 font-display mt-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          The Creators
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-body mx-auto mt-4 max-w-[620px]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Meet the artists behind Kumachi Prints. Each collection begins with a distinct visual language and ends as room-ready archival work.
        </motion.p>
      </div>

      <div className="container-gallery pb-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
          {artists.map((artist, index) => {
            const count = products.filter((product) => product.artistId === artist.id).length;
            return (
              <motion.div
                key={artist.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <Link to={`/artists/${artist.id}`} style={{ textDecoration: "none" }}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={artist.portrait}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-h2 font-display" style={{ color: "var(--color-text-primary)" }}>
                      {artist.name}
                    </h2>
                    <p className="text-caption mt-1" style={{ color: "var(--color-text-secondary)" }}>
                      {artist.location} / {count} prints
                    </p>
                    <p className="text-body-small mt-3" style={{ color: "var(--color-text-secondary)" }}>
                      {artist.bio}
                    </p>
                    <span className="text-nav group/link mt-4 inline-flex items-center gap-1" style={{ color: "var(--color-text-primary)" }}>
                      <span className="group-hover/link:underline">View Prints</span>
                      <ArrowRight size={14} className="transition-transform group-hover/link:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
