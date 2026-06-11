import { motion } from "framer-motion";

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect information you provide directly, such as your name, email address, shipping address, and payment details when you make a purchase. We also automatically collect certain data when you browse our site, including IP address, browser type, device information, and browsing behavior through cookies and similar technologies.",
  },
  {
    title: "How We Use Your Information",
    content:
      "We use your information to process orders, communicate with you about your purchases, provide customer support, improve our website and product offerings, and send marketing communications if you have opted in. We do not sell your personal information to third parties.",
  },
  {
    title: "Cookies",
    content:
      "We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and serve personalized content. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the site.",
  },
  {
    title: "Data Sharing",
    content:
      "We share your information with trusted third-party service providers who assist in operating our website, processing payments, and fulfilling orders. These providers are contractually obligated to protect your data and use it only for the services we request.",
  },
  {
    title: "Your Rights",
    content:
      "You have the right to access, correct, or delete your personal data at any time. You may also opt out of marketing communications, request a copy of your data, or restrict processing. To exercise these rights, please contact us at hello@kumachi.com.",
  },
  {
    title: "Contact",
    content:
      "If you have any questions about this privacy policy or how we handle your data, please reach out to us at hello@kumachi.com. We are committed to protecting your privacy and will respond to all inquiries promptly.",
  },
];

export default function PrivacyPage() {
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
          Legal
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-h1 font-display mt-2"
          style={{ color: "var(--color-text-primary)" }}
        >
          Privacy Policy
        </motion.h1>
      </div>

      <div className="container-gallery pb-20 max-w-3xl mx-auto space-y-12">
        {sections.map((section, i) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <h2
              className="text-h2 font-display"
              style={{ color: "var(--color-text-primary)" }}
            >
              {section.title}
            </h2>
            <p
              className="text-body mt-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {section.content}
            </p>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
