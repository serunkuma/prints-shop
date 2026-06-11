import { motion } from "framer-motion";

interface NewsletterSectionProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
}

export default function NewsletterSection({
  title = "Stay with Kumachi Prints",
  subtitle = "Be the first to discover new prints, artist collaborations, and exclusive releases.",
  placeholder = "Enter your email",
  buttonLabel = "Subscribe",
}: NewsletterSectionProps) {
  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-primary)",
        padding: "var(--space-2xl) 0",
      }}
    >
      <div className="max-w-[600px] mx-auto text-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-h2 font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            {title}
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-body mt-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {subtitle}
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder={placeholder}
            className="h-12 w-full sm:w-[280px] px-0 text-body outline-none"
            style={{
              backgroundColor: "transparent",
              borderBottom: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
            }}
          />
          <button
            type="submit"
            className="h-12 px-6 text-button hover:underline transition-all"
            style={{ color: "var(--color-text-primary)" }}
          >
            {buttonLabel}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
