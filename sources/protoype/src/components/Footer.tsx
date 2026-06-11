import { Link } from "react-router";
import { useState } from "react";
import type { FormEvent } from "react";
import BrandEcosystemFooter from "@/components/sections/BrandEcosystemFooter";

const shopLinks = [
  { label: "All Prints", path: "/collection" },
  { label: "New Arrivals", path: "/collection" },
  { label: "Drops", path: "/drops" },
  { label: "Artists", path: "/artists" },
];

const createLinks = [
  { label: "Create With AI", path: "/create" },
  { label: "Style Guide", path: "/framing" },
  { label: "Saved Concepts", path: "/create" },
];

const printLinks = [
  { label: "Design System", path: "/design-system" },
  { label: "Components", path: "/components" },
  { label: "Custom Projects", path: "/contact" },
];

const supportLinks = [
  { label: "Shipping & Returns", path: "/shipping" },
  { label: "Framing Guide", path: "/framing" },
  { label: "FAQ", path: "/faq" },
  { label: "Contact", path: "/contact" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <>
      <BrandEcosystemFooter />
      <footer
        style={{
        backgroundColor: "var(--color-surface-deep)",
        borderTop: "1px solid var(--color-border)",
      }}
      >
        <div
          className="container-gallery"
          style={{
            paddingTop: "var(--space-2xl)",
            paddingBottom: "var(--space-xl)",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link
                to="/"
                className="font-display text-h3 inline-block"
                style={{ color: "var(--color-bg-primary)" }}
              >
                Kumachi Prints
              </Link>
              <p
                className="text-body-small mt-4 max-w-[320px]"
                style={{ color: "#d8cbb7" }}
              >
                Curated African art prints, room-ready editions, and future AI-assisted print concepts.
              </p>
              <div className="flex gap-4 mt-4">
                <span className="text-caption uppercase" style={{ color: "var(--color-accent-ochre)" }}>
                  Collection / Create / Drops
                </span>
              </div>
            </div>

            {/* Shop Column */}
            <div>
              <p
                className="text-caption font-medium uppercase"
                style={{
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Shop
              </p>
              <ul className="space-y-2">
                {shopLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-body-small hover:underline"
                      style={{ color: "#fffaf0" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Create Column */}
            <div>
              <p
                className="text-caption font-medium uppercase"
                style={{
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Create
              </p>
              <ul className="space-y-2">
                {createLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-body-small hover:underline"
                      style={{ color: "#fffaf0" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-caption font-medium uppercase"
                style={{
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Internal
              </p>
              <ul className="space-y-2">
                {printLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-body-small hover:underline"
                      style={{ color: "#fffaf0" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                className="text-caption font-medium uppercase"
                style={{
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Support
              </p>
              <ul className="space-y-2">
                {supportLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-body-small hover:underline"
                      style={{ color: "#fffaf0" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Column */}
            <div className="lg:col-span-2">
              <p
                className="text-caption font-medium uppercase"
                style={{
                  color: "var(--color-text-secondary)",
                  marginBottom: "var(--space-md)",
                }}
              >
                Stay Inspired
              </p>
              <p
                className="text-body-small"
                style={{ color: "#d8cbb7" }}
              >
                Subscribe for new releases, artist features, and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="mt-4 flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 h-11 px-3 text-body-small outline-none"
                  style={{
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid rgba(255,255,255,0.18)",
                  color: "var(--color-text-primary)",
                  }}
                />
                <button
                  type="submit"
                  className="h-11 px-4 text-button transition-all duration-200 hover:text-[var(--color-bg-primary)]"
                  style={{
                  border: "1px solid var(--color-accent-ochre)",
                  color: "#15120d",
                  backgroundColor: "var(--color-accent-ochre)",
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-bg-primary)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "var(--color-accent-ochre)";
                    e.currentTarget.style.color = "#15120d";
                  }}
                >
                  {subscribed ? "Subscribed!" : "Subscribe"}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div
            className="flex flex-col sm:flex-row justify-between items-center gap-4"
            style={{
              marginTop: "var(--space-2xl)",
              paddingTop: "var(--space-lg)",
            borderTop: "1px solid rgba(255,255,255,0.16)",
            }}
          >
            <p
              className="text-caption"
            style={{ color: "#d8cbb7" }}
            >
              &copy; 2026 Kumachi Prints. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                to="/privacy"
                className="text-caption hover:underline"
                style={{ color: "#d8cbb7" }}
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-caption hover:underline"
                style={{ color: "#d8cbb7" }}
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
