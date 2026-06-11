import { motion } from "framer-motion";

const faqs = [
  {
    question: "What sizes are available?",
    answer: "We offer prints in A4, A3, A2, 50×70cm, and 70×100cm sizes. Limited edition releases may have additional size options.",
  },
  {
    question: "Do you offer framing?",
    answer: "Yes, framing options are available at checkout for select sizes. We offer premium frames made from sustainable materials with UV-protective acrylic glazing.",
  },
  {
    question: "How long does shipping take?",
    answer: "Standard shipping takes 7–14 business days. International orders may take 10–20 business days depending on customs processing.",
  },
  {
    question: "Can I return a print?",
    answer: "Yes, we accept returns within 30 days of delivery. Prints must be unused and in original packaging. See our Shipping & Returns page for full details.",
  },
  {
    question: "What is Kumachi AI Studio?",
    answer: "Kumachi AI Studio is our AI-assisted print creation tool that lets you generate custom artworks. Describe your vision and our AI helps bring it to life as a print-ready piece.",
  },
  {
    question: "Do you ship internationally?",
    answer: "Yes, we ship to over 50 countries worldwide. International customers are responsible for any import duties or taxes applied by their country.",
  },
];

export default function FAQPage() {
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
          Help
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-h1 font-display mt-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Frequently Asked Questions
        </motion.h1>
      </div>

      <div className="container-gallery pb-20 max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <motion.div
            key={faq.question}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <details className="group border-b border-border-mid py-5">
              <summary className="flex items-center justify-between cursor-pointer list-none text-h3 font-display py-1"
                style={{ color: "var(--color-text-primary)" }}
              >
                {faq.question}
                <span className="text-text-muted transition-transform duration-200 group-open:rotate-45 text-xl leading-none">
                  +
                </span>
              </summary>
              <p
                className="text-body mt-3 pr-8"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {faq.answer}
              </p>
            </details>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
