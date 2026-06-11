import { motion } from "framer-motion";

const stats = [
  { value: "300gsm", label: "archival paper options" },
  { value: "4", label: "curated artist voices" },
  { value: "5", label: "print sizes planned" },
];

export default function KumachiStatsBand() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-surface-deep)",
        color: "var(--color-bg-primary)",
        borderTop: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <div className="container-gallery grid grid-cols-1 md:grid-cols-[1.2fr_2fr] gap-8 py-8 md:py-10">
        <div>
          <span className="accent-rule" />
          <p className="text-caption uppercase mt-4" style={{ color: "var(--color-accent-ochre)" }}>
            Gallery grade, printshop ready
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
            >
              <p className="text-h3">{stat.value}</p>
              <p className="text-caption normal-case tracking-normal mt-1" style={{ color: "#d8cbb7" }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
