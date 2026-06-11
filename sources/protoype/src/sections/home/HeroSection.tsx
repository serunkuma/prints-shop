import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/mockData";
import { fadeUp, staggerContainer } from "@/lib/animations";
import MagneticButton from "@/components/MagneticButton";

const words = "The ones worth keeping.".split(" ");
const featured = products.find((product) => product.isFeatured) ?? products[0];

export default function HeroSection() {
  return (
    <motion.section
      className="min-h-dvh bg-void pt-20"
      initial="hidden"
      animate="show"
      variants={staggerContainer}
    >
      <div className="container-gallery grid min-h-[calc(100dvh-5rem)] grid-cols-1 items-center gap-12 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div variants={staggerContainer}>
          <motion.p variants={fadeUp} className="text-xs font-semibold uppercase tracking-widest text-gold">
            Kumachi Prints · Kampala
          </motion.p>
          <h1 className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-display text-6xl leading-[0.95] text-text-primary md:text-8xl">
            {words.map((word, index) => (
              <motion.span
                key={`${word}-${index}`}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base leading-7 text-text-secondary">
            Original prints from the Kumachi catalogue. Each piece is a conversation — between the art, the artist, and the wall you choose for it. Ships worldwide.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Link to="/collection" className="no-underline">
              <MagneticButton className="bg-gold px-6 text-sm font-semibold uppercase tracking-wider text-void">
                Shop Prints
              </MagneticButton>
            </Link>
            <Link
              to="/drops"
              className="inline-flex min-h-11 items-center rounded-sm border border-[var(--border-mid)] px-6 text-sm font-semibold uppercase tracking-wider text-gold no-underline"
            >
              View the Drops
            </Link>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-2">
            {["6 prints available", "2 active series", "Ships to 50+ countries"].map((stat) => (
              <span key={stat} className="rounded-full border border-[var(--border-mid)] px-4 py-2 text-xs font-medium text-text-secondary">
                {stat}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div variants={fadeUp} className="relative">
          <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.6, ease: "easeOut" }} className="aspect-[4/5] overflow-hidden bg-surface-mid">
            <img src={featured.images[0].src} alt={featured.images[0].alt} className="h-full w-full object-cover" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.85 }}
            className="gallery-glass absolute bottom-6 left-6 max-w-[280px] p-4"
          >
            <p className="font-display text-2xl leading-none text-text-primary">{featured.title}</p>
            <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary">{featured.artist}</p>
            <Link to={`/shop/${featured.handle}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-gold">
              View Print <ArrowRight size={14} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
