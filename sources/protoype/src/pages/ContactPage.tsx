import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Message sent! We'll respond within 48 hours.");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <main
      style={{
        backgroundColor: "var(--color-bg-primary)",
        paddingTop: "100px",
        minHeight: "100vh",
      }}
    >
      <div className="container-gallery text-center py-16 lg:py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-caption font-medium uppercase tracking-[0.08em]"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-h1 font-display mt-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Contact Us
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="text-body mt-4"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Email us at{" "}
          <a
            href="mailto:hello@kumachi.com"
            className="underline"
            style={{ color: "var(--color-text-primary)" }}
          >
            hello@kumachi.com
          </a>
        </motion.p>
      </div>

      <div className="container-gallery pb-20 max-w-2xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div>
            <label htmlFor="name" className="text-body-small font-medium block mb-2"
              style={{ color: "var(--color-text-primary)" }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-4 py-3 text-body rounded-sm"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
          <div>
            <label htmlFor="email" className="text-body-small font-medium block mb-2"
              style={{ color: "var(--color-text-primary)" }}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 text-body rounded-sm"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
          <div>
            <label htmlFor="order" className="text-body-small font-medium block mb-2"
              style={{ color: "var(--color-text-primary)" }}>
              Order Number <span className="text-text-muted">(optional)</span>
            </label>
            <input
              id="order"
              type="text"
              className="w-full px-4 py-3 text-body rounded-sm"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
          <div>
            <label htmlFor="message" className="text-body-small font-medium block mb-2"
              style={{ color: "var(--color-text-primary)" }}>
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full px-4 py-3 text-body rounded-sm resize-y"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-primary)",
              }}
            />
          </div>
          <button
            type="submit"
            className="min-h-11 px-8 bg-gold text-void text-button font-semibold transition-opacity duration-150 hover:opacity-85"
          >
            Send Message
          </button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mt-20 pt-16"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <h3
            className="text-h3 font-display mb-4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Follow Us
          </h3>
          <div className="flex justify-center gap-8 text-body"
            style={{ color: "var(--color-text-secondary)" }}>
            <a href="https://instagram.com/kumachi" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity">Instagram</a>
            <a href="https://twitter.com/kumachi" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity">Twitter</a>
            <a href="https://pinterest.com/kumachi" target="_blank" rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity">Pinterest</a>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
