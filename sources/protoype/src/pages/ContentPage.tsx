import { motion } from "framer-motion";
import { useParams } from "react-router";

const contentMap: Record<string, { title: string; body: string }> = {
  shipping: {
    title: "Shipping & Returns",
    body: `Shipping Information

All orders are processed within 1–3 business days. Prints ship flat-packed in rigid mailers to ensure they arrive in perfect condition. Framed prints are carefully packed with corner protectors and bubble wrap.

Domestic Shipping (US)
- Standard (5–8 business days): $5.95
- Express (2–3 business days): $14.95
- Free standard shipping on orders over $100

International Shipping
- Standard (10–20 business days): $15.95
- Express (5–10 business days): $29.95

Returns & Exchanges
We want you to love your print. If you're not satisfied, you can return it within 30 days of delivery. Prints must be returned in their original condition and packaging.

Framed prints are non-returnable due to their custom nature. If your framed print arrives damaged, please contact us within 48 hours with photos.

To start a return, email us at hello@kumachiprints.com with your order number.`,
  },
  framing: {
    title: "Framing Guide",
    body: `Framing Options

We offer three frame styles to complement your print:

Black Metal — A slim, modern frame with a matte black finish. Works well with bold, graphic prints and contemporary interiors.

Light Oak — A warm, natural wood frame with subtle grain. Ideal for landscapes, portraits, and warm-toned artwork.

Deep Walnut — A rich, dark wood frame with a traditional feel. Pairs beautifully with classic compositions and archival presentations.

All framed prints include:
- Acid-free matting
- UV-protective acrylic glazing
- Mounting hardware installed
- Ready to hang

We recommend avoiding direct sunlight to preserve color fidelity over time.`,
  },
  faq: {
    title: "Frequently Asked Questions",
    body: `What materials are your prints made on?

Our standard prints are on 310gsm Hahnemühle German Etching paper — a museum-grade, archival paper with a textured matte finish. We also offer canvas prints stretched on solid wood frames.

Are the prints signed?

Open edition prints are not signed individually. Limited edition releases are signed and numbered by the artist.

How do I choose a size?

We recommend considering your wall space. Our most popular size is 16"×20", which works well in standard frames. Use our room view feature on each product page to see how different sizes look in a room setting.

Do you offer custom sizes?

Not at this time. We offer a curated selection of standard sizes that work with readily available frames.

Can I see the print before buying?

We provide detailed product photography, room mockups, and material samples. If you're still unsure, order a print sample set (available soon).

What payment methods do you accept?

We accept Visa, Mastercard, American Express, PayPal, and Shop Pay. We also offer buy-now-pay-later options through Shop Pay Installments.`,
  },
  contact: {
    title: "Contact",
    body: `Get in Touch

We'd love to hear from you. Whether you have a question about a print, need help with an order, or want to discuss a collaboration — reach out.

Email: hello@kumachiprints.com

Studio visits: By appointment only. Located in Lagos, Nigeria.

For artist submissions: Please email us with your portfolio and a brief introduction.

For press inquiries: press@kumachigallery.com

Response time: We aim to respond within 24 hours during business days.`,
  },
  privacy: {
    title: "Privacy Policy",
    body: `Privacy Policy

Last updated: June 2026

Kumachi Prints respects your privacy. This policy explains how we collect, use, and protect your personal information.

Information We Collect
- Name, email address, and shipping address when you place an order
- Payment information (processed securely by Shopify Payments)
- Browsing behavior on our site (via Umami analytics — no cookies)

How We Use Your Information
- To fulfill orders and provide customer support
- To send order updates and shipping confirmations
- To send newsletters (only if you opt in)
- To improve our site and product offerings

Data Sharing
We do not sell your data. We share necessary information with:
- Shopify (order processing and hosting)
- Printful (fulfillment)
- Shipping carriers (delivery)

Your Rights
You can request access to, correction of, or deletion of your personal data at any time by emailing us.`,
  },
  terms: {
    title: "Terms of Service",
    body: `Terms of Service

Last updated: June 2026

By using kumachiprints.com, you agree to these terms.

Orders & Pricing
All prices are listed in USD. We reserve the right to modify prices at any time. Orders are confirmed once payment is processed.

Intellectual Property
All artwork images and product photography are protected by copyright. Prints are for personal use only. Commercial reproduction is prohibited without written consent.

Limitation of Liability
Kumachi Prints is not liable for any indirect damages arising from the use of our products or site. Our total liability is limited to the purchase price of the product.

Changes
We reserve the right to update these terms at any time. Continued use of the site constitutes acceptance of the updated terms.`,
  },
};

export default function ContentPage() {
  const { pageId } = useParams<{ pageId: string }>();
  const content = pageId ? contentMap[pageId] : undefined;

  if (!content) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingTop: "100px",
        }}
      >
        <p
          className="text-h3 font-display"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Page not found
        </p>
      </main>
    );
  }

  return (
    <main
      style={{
        backgroundColor: "var(--color-bg-primary)",
        paddingTop: "100px",
        minHeight: "100vh",
      }}
    >
      <div className="container-gallery py-16 lg:py-24">
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-h1 font-display mb-10"
          style={{ color: "var(--color-text-primary)" }}
        >
          {content.title}
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-[680px]"
        >
          {content.body.split("\n\n").map((paragraph, i) => {
            if (paragraph.includes("\n")) {
              const [subtitle, ...lines] = paragraph.split("\n");
              return (
                <div key={i} className="mb-6">
                  {subtitle.endsWith(":") || subtitle.endsWith("?") ? (
                    <h2
                      className="text-h3 font-display mt-8 mb-3"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {subtitle}
                    </h2>
                  ) : (
                    <p className="text-body mb-2" style={{ color: "var(--color-text-primary)" }}>
                      {subtitle}
                    </p>
                  )}
                  {lines.map((line, j) => (
                    <p
                      key={j}
                      className="text-body"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              );
            }
            return (
              <p
                key={i}
                className="text-body mb-4"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {paragraph}
              </p>
            );
          })}
        </motion.div>
      </div>
    </main>
  );
}
