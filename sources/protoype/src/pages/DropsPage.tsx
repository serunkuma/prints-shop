import { useMemo } from "react";
import { motion } from "framer-motion";
import { drops } from "@/data/drops";
import SeriesCard from "@/components/series/SeriesCard";
import { fadeUp, staggerContainer } from "@/lib/animations";

const statusOrder: Record<string, number> = { live: 0, scheduled: 1, draft: 2, archived: 3 };

export default function DropsPage() {
  const sortedDrops = useMemo(
    () => [...drops].sort((a, b) => statusOrder[a.status] - statusOrder[b.status]),
    [],
  );

  const liveCount = drops.filter((d) => d.status === "live").length;
  const scheduledCount = drops.filter((d) => d.status === "scheduled").length;
  const draftCount = drops.filter((d) => d.status === "draft").length;

  return (
    <main className="min-h-dvh pt-24" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <motion.section className="container-gallery pb-12 pt-8" initial="hidden" animate="show" variants={staggerContainer}>
        <motion.p variants={fadeUp} className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>Kumachi Prints drops</motion.p>
        <motion.h1 variants={fadeUp} className="text-h1 mt-3" style={{ color: "var(--color-text-primary)" }}>The Drops.</motion.h1>
        <motion.p variants={fadeUp} className="text-body mt-4 max-w-xl" style={{ color: "var(--color-text-secondary)" }}>Limited series. Each one tells a story and leads back into the collection.</motion.p>
        <motion.p variants={fadeUp} className="text-sm mt-4" style={{ color: "var(--color-text-secondary)" }}>
          {drops.length} drops: {liveCount} live &middot; {scheduledCount} scheduled &middot; {draftCount} in development
        </motion.p>
      </motion.section>
      <section className="container-gallery section-pad pt-0">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {sortedDrops.map((item) => (
            <SeriesCard key={item.handle} item={item} />
          ))}
        </div>
      </section>
    </main>
  );
}
