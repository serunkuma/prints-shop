
interface BrandLink {
  label: string;
  href: string;
  description: string;
}

const kumachiBrands: BrandLink[] = [
  {
    label: "Kumachi Prints",
    href: "/",
    description: "Art prints & editions",
  },
  {
    label: "Collection",
    href: "/collection",
    description: "Curated prints for rooms",
  },
  {
    label: "Create Your Own",
    href: "/create",
    description: "Future AI print concepts",
  },
];

export default function BrandEcosystemFooter() {
  return (
    <section
      style={{
        backgroundColor: "var(--color-bg-secondary)",
        borderTop: "1px solid var(--color-border)",
        padding: "var(--space-xl) 0",
      }}
    >
      <div className="container-gallery">
        <p
          className="text-caption font-medium uppercase text-center tracking-[0.08em] mb-6"
          style={{ color: "var(--color-text-tertiary)" }}
        >
          Kumachi Prints
        </p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {kumachiBrands.map((brand) => (
            <a
              key={brand.label}
              href={brand.href}
              target={brand.href.startsWith("http") ? "_blank" : undefined}
              rel={
                brand.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              className="group text-center"
              style={{ textDecoration: "none" }}
            >
              <span
                className="font-display text-h4 block group-hover:opacity-60 transition-opacity duration-200"
                style={{ color: "var(--color-text-primary)" }}
              >
                {brand.label}
              </span>
              <span
                className="text-caption mt-1 block"
                style={{ color: "var(--color-text-tertiary)" }}
              >
                {brand.description}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
