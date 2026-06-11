import { Link } from "react-router";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { artists } from "@/data/artists";
import { drops } from "@/data/drops";
import { categoryMeta, products } from "@/data/products";
import { staggerContainer, fadeUp } from "@/lib/animations";

type SitemapLink = {
  label: string;
  href: string;
  description?: string;
};

const publicPages: SitemapLink[] = [
  { label: "Home", href: "/", description: "Start at the Kumachi Prints landing page." },
  { label: "Collection", href: "/collection", description: "Browse all curated art prints." },
  { label: "Create Your Own", href: "/create", description: "Explore the AI-assisted print creation stub." },
  { label: "Drops", href: "/drops", description: "See print releases and series drops." },
  { label: "Artists", href: "/artists", description: "Meet the creators behind the collection." },
  { label: "About", href: "/about", description: "Read the Kumachi Prints story." },
  { label: "Shipping", href: "/shipping", description: "Shipping rates, timelines, and policies." },
  { label: "FAQ", href: "/faq", description: "Frequently asked questions about prints and ordering." },
  { label: "Contact", href: "/contact", description: "Get in touch with the Kumachi team." },
  { label: "Privacy", href: "/privacy", description: "Privacy policy and data handling practices." },
  { label: "Sitemap", href: "/sitemap", description: "All site links in one place." },
];

const internalPages: SitemapLink[] = [
  { label: "Component Showcase", href: "/components", description: "Internal UI component reference." },
  { label: "Design System", href: "/design-system", description: "Brand tokens, typography, and controls." },
];

export default function SitemapPage() {
  const categoryLinks = categoryMeta.map((category) => ({
    label: category.label,
    href: `/collection/${category.handle}`,
    description: category.description,
  }));

  const productLinks = products.map((product) => ({
    label: product.title,
    href: `/product/${product.handle}`,
    description: `${product.artist} / ${product.genre}`,
  }));

  const dropLinks = drops.map((drop) => ({
    label: drop.title,
    href: `/drops/${drop.handle}`,
    description: `${drop.status} / ${new Date(drop.publishDate).getFullYear()}`,
  }));

  const artistLinks = artists.map((artist) => ({
    label: artist.name,
    href: `/artists/${artist.id}`,
    description: artist.location,
  }));

  const lastUpdated = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)", minHeight: "100vh", paddingTop: "100px" }}>
      <section className="container-gallery py-14 lg:py-20">
        <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
          Site index
        </p>
        <h1 className="text-h1 mt-3" style={{ color: "var(--color-text-primary)" }}>
          Kumachi Prints sitemap.
        </h1>
        <p className="text-body mt-5 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
          Every public page, collection category, print, drop, artist profile, and internal reference route in one quiet place.
        </p>
      </section>

      <motion.section
        className="container-gallery grid gap-6 pb-20 lg:grid-cols-2"
        variants={staggerContainer}
        initial="hidden"
        animate="show"
      >
        <SitemapSection title="Main Pages" count={publicPages.length} links={publicPages} />
        <SitemapSection title="Collection Categories" count={categoryLinks.length} links={categoryLinks} />
        <SitemapSection title="Prints" count={productLinks.length} links={productLinks} />
        <SitemapSection title="Drops" count={dropLinks.length} links={dropLinks} />
        <SitemapSection title="Artists" count={artistLinks.length} links={artistLinks} />
        <SitemapSection title="Internal Tools" count={internalPages.length} links={internalPages} />
      </motion.section>

      <section className="container-gallery pb-20">
        <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
          Last updated: {lastUpdated}
        </p>
      </section>
    </main>
  );
}

function SitemapSection({ title, count, links }: { title: string; count: number; links: SitemapLink[] }) {
  return (
    <motion.article
      className="p-5 sm:p-6"
      style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}
      variants={fadeUp}
    >
      <div className="flex items-end justify-between gap-4">
        <h2 className="text-h3" style={{ color: "var(--color-text-primary)" }}>
          {title}
        </h2>
        <span className="text-caption uppercase" style={{ color: "var(--color-text-tertiary)" }}>
          {count} links
        </span>
      </div>

      {links.length === 0 ? (
        <p className="text-body-small mt-5" style={{ color: "var(--color-text-secondary)" }}>
          No links available yet.
        </p>
      ) : (
        <ul className="mt-5 grid gap-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="group flex min-h-11 items-start justify-between gap-4 p-3 transition-opacity hover:opacity-75"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                  textDecoration: "none",
                }}
              >
                <span>
                  <span className="text-body-small font-semibold">{link.label}</span>
                  {link.description && (
                    <span className="text-caption mt-1 block normal-case tracking-normal" style={{ color: "var(--color-text-secondary)" }}>
                      {link.description}
                    </span>
                  )}
                </span>
                <ArrowUpRight size={16} className="mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </motion.article>
  );
}
