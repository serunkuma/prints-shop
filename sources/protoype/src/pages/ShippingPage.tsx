import { motion } from "framer-motion";

export default function ShippingPage() {
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
          Policies
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-h1 font-display mt-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Shipping & Returns
        </motion.h1>
      </div>

      <div className="container-gallery pb-20 space-y-16">
        {/* Shipping Information */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-h2 font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            Shipping Information
          </h2>
          <div className="mt-6 space-y-4 text-body" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              All orders are processed within 1–2 business days. Shipping typically takes
              <strong> 7–14 business days</strong> depending on your location and the shipping method selected.
            </p>
            <p>
              We offer <strong>free standard shipping</strong> on all orders over $75. Every order includes
              a tracking number so you can follow your package from our studio to your door.
            </p>
            <p>
              Expedited shipping options are available at checkout for an additional fee.
            </p>
          </div>
        </motion.div>

        {/* International Orders */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2
            className="text-h2 font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            International Orders
          </h2>
          <div className="mt-6 space-y-4 text-body" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              We ship to <strong>over 50 countries</strong> worldwide. International delivery times may vary
              between 10–20 business days depending on customs processing.
            </p>
            <p>
              Import duties, taxes, and customs fees are not included in the purchase price and are the
              responsibility of the buyer. Please check with your local customs office for estimated fees
              before placing an order.
            </p>
          </div>
        </motion.div>

        {/* Returns & Exchanges */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2
            className="text-h2 font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            Returns & Exchanges
          </h2>
          <div className="mt-6 space-y-4 text-body" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              We accept returns within <strong>30 days</strong> of delivery. Prints must be unused, in their
              original packaging, and in the same condition as received.
            </p>
            <p>
              Once your return is received and inspected, we will notify you of the approval or rejection.
              Approved refunds will be processed within 5–7 business days to your original payment method.
            </p>
            <p>
              To initiate a return, please contact us at{" "}
              <a href="mailto:hello@kumachi.com" className="underline" style={{ color: "var(--color-text-primary)" }}>
                hello@kumachi.com
              </a>{" "}
              with your order number.
            </p>
          </div>
        </motion.div>

        {/* Packaging */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2
            className="text-h2 font-display"
            style={{ color: "var(--color-text-primary)" }}
          >
            Packaging
          </h2>
          <div className="mt-6 space-y-4 text-body" style={{ color: "var(--color-text-secondary)" }}>
            <p>
              All prints are shipped in <strong>archival-grade tubes</strong> to ensure they arrive in perfect
              condition. Flat shipments are available for local pickup or by special request.
            </p>
            <p>
              We use recyclable and biodegradable materials wherever possible. Our packaging is designed to
              protect your print while minimizing environmental impact.
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
