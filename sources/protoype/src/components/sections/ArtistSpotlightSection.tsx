import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ClipRevealImage from "@/components/motion/ClipRevealImage";

interface ArtistSpotlightSectionProps {
  name: string;
  portrait: string;
  bio: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export default function ArtistSpotlightSection({
  name,
  portrait,
  bio,
  ctaLabel = "View Artist's Collection",
  ctaLink = "/artists",
}: ArtistSpotlightSectionProps) {
  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        padding: "var(--space-2xl) 0",
      }}
    >
      <div className="container-gallery">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative aspect-square overflow-hidden"
          >
            <ClipRevealImage
              src={portrait}
              alt={`${name} in their studio`}
              className="w-full h-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <p
              className="text-caption font-medium uppercase tracking-[0.08em]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Artist Spotlight
            </p>
            <h2
              className="text-h2 font-display mt-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              {name}
            </h2>
            <p
              className="text-body mt-6 max-w-[480px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {bio}
            </p>
            <Link
              to={ctaLink}
              className="text-nav inline-flex items-center gap-1 mt-8 group"
              style={{ color: "var(--color-text-primary)" }}
            >
              <span className="group-hover:underline">{ctaLabel}</span>
              <ArrowRight
                size={14}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
