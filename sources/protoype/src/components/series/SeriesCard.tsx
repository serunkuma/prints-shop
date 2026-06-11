import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getArtistById } from "@/data/artists";
import type { SeriesDrop } from "@/lib/types";

interface SeriesCardProps {
  item: SeriesDrop;
}

export default function SeriesCard({ item }: SeriesCardProps) {
  const artist = item.artistId ? getArtistById(item.artistId) : undefined;

  const statusBadge = () => {
    switch (item.status) {
      case "live":
        return <span className="rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-grove) 20%, transparent)", color: "var(--color-accent-grove)", borderColor: "color-mix(in srgb, var(--color-accent-grove) 30%, transparent)" }}>Live now</span>;
      case "scheduled": {
        const date = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(new Date(item.publishDate));
        return <span className="rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm" style={{ backgroundColor: "color-mix(in srgb, var(--color-accent-gold) 20%, transparent)", color: "var(--color-accent-gold)", borderColor: "color-mix(in srgb, var(--color-accent-gold) 30%, transparent)" }}>Scheduled {date}</span>;
      }
      case "draft":
        return <span className="rounded-full border px-3 py-1 text-xs font-semibold backdrop-blur-sm" style={{ backgroundColor: "color-mix(in srgb, var(--color-text-muted) 10%, transparent)", color: "var(--color-text-muted)", borderColor: "var(--color-border-mid)" }}>In development</span>;
      default:
        return null;
    }
  };

  return (
    <motion.article whileHover="hover" className="group relative min-h-[420px] overflow-hidden" style={{ backgroundColor: "var(--color-surface)" }}>
      <div className="absolute left-6 top-6 z-10">{statusBadge()}</div>
      <Link to={`/drops/${item.handle}`} className="absolute inset-0 no-underline">
        <motion.img
          src={item.heroImage}
          alt={item.title}
          className="absolute inset-0 h-full w-full object-cover"
          variants={{ hover: { scale: 1.04 } }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
        />
        <div
          className="absolute inset-0 transition-colors"
          style={{ backgroundColor: "color-mix(in srgb, var(--color-surface-deep) 68%, transparent)" }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-6">
          <p className="text-body-small" style={{ color: "#d8cbb7" }}>{artist?.name ?? "Kumachi Prints"} / {new Date(item.publishDate).getFullYear()}</p>
          <h2 className="text-h2 mt-2" style={{ color: "#fffaf0" }}>{item.title}</h2>
          <p className="mt-4 flex items-center gap-2 text-sm font-semibold" style={{ color: "var(--color-accent-ochre)" }}>
            Explore Series <ArrowRight size={15} />
          </p>
        </div>
      </Link>
    </motion.article>
  );
}
