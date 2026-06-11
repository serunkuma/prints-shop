import { motion, type Easing } from "framer-motion";
import { Award, Globe, Layers, Sparkles } from "lucide-react";

const columns = [
  { icon: Layers, stat: "300gsm", sub: "Archival fine art paper" },
  { icon: Globe, stat: "Worldwide", sub: "Ships from Kampala" },
  { icon: Sparkles, stat: "Open + Limited", sub: "Two edition types" },
  { icon: Award, stat: "Gallery grade", sub: "Every single print" },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as Easing },
  },
};

export default function TrustBar() {
  return (
    <section className="border-y border-gold/20 bg-surface py-8">
      <div className="container-gallery">
        <motion.div
          className="grid grid-cols-2 gap-8 md:grid-cols-4"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {columns.map((col) => (
            <motion.div key={col.stat} variants={item} className="flex flex-col items-center text-center md:items-start md:text-left">
              <col.icon size={20} className="mb-2 text-gold/60" strokeWidth={1.5} />
              <span className="font-display text-2xl text-text-primary">{col.stat}</span>
              <span className="mt-1 text-xs uppercase tracking-widest text-text-secondary">{col.sub}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
