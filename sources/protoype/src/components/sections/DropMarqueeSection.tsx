import { Link } from "react-router";
import MarqueeRow from "@/components/motion/MarqueeRow";
import type { SeriesDrop } from "@/lib/types";

interface DropMarqueeSectionProps {
  drops: SeriesDrop[];
}

export default function DropMarqueeSection({
  drops,
}: DropMarqueeSectionProps) {
  const liveDrops = drops.filter((d) => d.status === "live" || d.status === "scheduled");

  if (liveDrops.length === 0) return null;

  return (
    <section
      style={{
        backgroundColor: "var(--color-surface-deep)",
        padding: "var(--space-lg) 0",
        borderTop: "1px solid rgba(255,255,255,0.14)",
        borderBottom: "1px solid rgba(255,255,255,0.14)",
        overflow: "hidden",
      }}
    >
      <MarqueeRow speed={42}>
        {liveDrops.map((drop) => (
          <Link
            key={drop.id}
            to={`/drops`}
            className="flex items-center gap-4 group"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-h3 whitespace-nowrap"
              style={{ color: "#fffaf0" }}
            >
              {drop.title}
            </span>
            <span
              className="text-caption uppercase tracking-widest"
              style={{ color: "var(--color-accent-ochre)" }}
            >
              {drop.status === "live" ? "Live Now" : "Upcoming"}
            </span>
            <span
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "#eadbc4" }}
            />
          </Link>
        ))}
      </MarqueeRow>
    </section>
  );
}
