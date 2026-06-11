import { Link } from "react-router";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

export default function AiPrintsTeaser() {
  return (
    <motion.section className="section-pad bg-surface" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}>
      <div className="container-gallery grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
        <motion.div variants={fadeUp}>
          <p className="text-xs font-semibold uppercase tracking-widest text-gold">Coming soon</p>
          <h2 className="mt-4 font-display text-5xl leading-none text-text-primary md:text-6xl">Your imagination.<br />Kumachi's hand.</h2>
          <p className="mt-5 max-w-xl text-base leading-7 text-text-secondary">
            Describe what you want to see. The Kumachi AI Studio generates a one-of-a-kind print in our visual language — then ships it to your wall. No two prints alike.
          </p>
          <Link to="/create" className="mt-7 inline-flex min-h-11 items-center rounded-sm border border-gold px-6 text-sm font-semibold uppercase tracking-wider text-gold">
            Join the Studio waitlist
          </Link>
          <p className="mt-5 flex gap-4 text-xs font-medium uppercase tracking-widest text-text-secondary"><span>01 Describe</span><span className="text-text-muted">→</span><span>02 Generate</span><span className="text-text-muted">→</span><span>03 Order</span></p>
        </motion.div>
        <motion.div variants={fadeUp} className="flex justify-center">
          <div className="w-full max-w-[420px] bg-surface-mid p-10 shadow-2xl">
            <div className="border-[16px] border-void bg-void p-4 shadow-2xl">
              <motion.div
                className="ai-gradient aspect-[4/5]"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
