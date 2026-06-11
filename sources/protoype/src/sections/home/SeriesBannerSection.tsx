import { Link } from "react-router";
import { motion } from "framer-motion";
import { series } from "@/data/mockData";
import { fadeUp } from "@/lib/animations";

export default function SeriesBannerSection() {
  const latest = [...series].sort((a, b) => b.publishDate.localeCompare(a.publishDate))[0];

  return (
    <motion.section
      className="relative min-h-[560px] overflow-hidden"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={fadeUp}
    >
      <img src={latest.heroImage} alt={latest.title} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-void/90 to-void/60" />
      <div className="container-gallery relative flex min-h-[560px] flex-col items-center justify-center text-center">
        <motion.h2 variants={fadeUp} className="font-display text-6xl leading-none text-text-primary md:text-7xl">
          {latest.title}
        </motion.h2>
        <motion.p variants={fadeUp} className="mt-5 max-w-2xl text-lg leading-8 text-text-secondary">
          {latest.description}
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to={`/drops/${latest.handle}`} className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-gold px-6 text-sm font-semibold uppercase tracking-wider text-void">
            Explore the Series
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
}
