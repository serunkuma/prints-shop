import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import FrameMockup from "@/components/FrameMockup";
import PathwaySwitch from "@/components/PathwaySwitch";
import SeriesCard from "@/components/series/SeriesCard";
import AIPrintStudioTeaser from "@/components/sections/AIPrintStudioTeaser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { drops } from "@/data/drops";
import { products } from "@/data/products";

type ActiveFilters = {
  color: string[];
  region: string[];
  genre: string[];
  price: string[];
};

const colorTokens = [
  { name: "gold", value: "var(--gold)" },
  { name: "void", value: "var(--void)" },
  { name: "surface", value: "var(--surface)" },
  { name: "grove", value: "var(--grove)" },
  { name: "crimson", value: "var(--crimson)" },
  { name: "teal", value: "var(--teal)" },
  { name: "blush", value: "var(--blush)" },
] as const;

export default function ComponentShowcasePage() {
  const [filters, setFilters] = useState<ActiveFilters>({
    color: [],
    region: [],
    genre: [],
    price: [],
  });
  const featured = products[0];

  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)", paddingTop: "100px", minHeight: "100vh" }}>
      <section className="container-gallery py-14">
        <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>Internal</p>
        <h1 className="text-h1 mt-3" style={{ color: "var(--color-text-primary)" }}>Component Showcase</h1>
        <p className="text-body mt-5 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
          Live examples of the reusable Kumachi Prints commerce components.
        </p>
      </section>

      <section className="container-gallery grid gap-8 pb-20">
        <ShowcaseBlock
          label="COLOR TOKENS"
          title="Palette"
          description="Design-system colour tokens mapped to CSS custom properties"
        >
          <div className="flex flex-wrap gap-6">
            {colorTokens.map((token) => (
              <div key={token.name} className="flex flex-col items-center gap-2">
                <div
                  className="h-12 w-12 rounded-lg"
                  style={{
                    backgroundColor: token.value,
                    border: token.name === "void" || token.name === "grove" || token.name === "crimson"
                      ? "1px solid var(--border-mid)"
                      : "1px solid var(--border-token)",
                  }}
                />
                <span className="text-caption text-text-secondary">{token.name}</span>
              </div>
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          label="TYPOGRAPHY"
          title="Type Ramp"
          description="font-display (headings) and font-body (body) at each token size"
        >
          <div className="space-y-5">
            <div>
              <p className="text-h1 font-display" style={{ color: "var(--color-text-primary)" }}>Heading 1</p>
              <p className="text-caption text-text-muted mt-1">text-h1 · font-display</p>
            </div>
            <div>
              <p className="text-h2 font-display" style={{ color: "var(--color-text-primary)" }}>Heading 2</p>
              <p className="text-caption text-text-muted mt-1">text-h2 · font-display</p>
            </div>
            <div>
              <p className="text-h3 font-display" style={{ color: "var(--color-text-primary)" }}>Heading 3</p>
              <p className="text-caption text-text-muted mt-1">text-h3 · font-display</p>
            </div>
            <div>
              <p className="text-body font-body" style={{ color: "var(--color-text-primary)" }}>
                Body — The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-caption text-text-muted mt-1">text-body · font-body</p>
            </div>
            <div>
              <p className="text-body-small font-body" style={{ color: "var(--color-text-primary)" }}>
                Body small — The quick brown fox jumps over the lazy dog.
              </p>
              <p className="text-caption text-text-muted mt-1">text-body-small · font-body</p>
            </div>
            <div>
              <p className="text-caption" style={{ color: "var(--color-text-primary)" }}>
                Caption — UPPERCASE LETTERING
              </p>
              <p className="text-caption text-text-muted mt-1">text-caption · font-body</p>
            </div>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          label="BUTTONS"
          title="Button Variants"
          description="Custom-styled buttons using token utility classes"
        >
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-gold text-void px-6 py-2 rounded-md text-button font-medium hover:opacity-90 transition-opacity">
              Primary
            </button>
            <button
              className="px-6 py-2 rounded-md text-button font-medium transition-colors"
              style={{
                border: "1px solid var(--border-mid)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-overlay)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              Outline
            </button>
            <button
              className="px-2 py-2 rounded-md text-button font-medium transition-colors"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "var(--text-primary)"}
              onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-secondary)"}
            >
              Ghost
            </button>
            <button
              className="flex items-center justify-center h-10 w-10 rounded-md transition-colors"
              style={{ color: "var(--text-primary)" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "var(--color-overlay)"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "transparent"}
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock
          label="FORM ELEMENTS"
          title="Inputs & Select"
          description="Standard form controls with placeholder states"
        >
          <div className="max-w-md space-y-4">
            <Input placeholder="Text input placeholder…" />
            <Textarea placeholder="Textarea placeholder…" />
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Option one</SelectItem>
                <SelectItem value="2">Option two</SelectItem>
                <SelectItem value="3">Option three</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Pathway Switch">
          <PathwaySwitch />
        </ShowcaseBlock>

        <ShowcaseBlock title="Product Cards">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.slice(0, 4).map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Collection Filters">
          <div className="max-w-[320px]">
            <FilterSidebar activeFilters={filters} onFilterChange={setFilters} />
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Product Configurator">
          <div className="max-w-xl">
            <FrameMockup imageSrc={featured.image} basePrice={featured.price} showPurchaseFooter />
          </div>
        </ShowcaseBlock>

        <ShowcaseBlock title="Drop Card">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {drops.slice(0, 2).map((drop) => (
              <SeriesCard key={drop.id} item={drop} />
            ))}
          </div>
        </ShowcaseBlock>
      </section>

      <AIPrintStudioTeaser />
    </main>
  );
}

function ShowcaseBlock({ label, title, description, children }: { label?: string; title: string; description?: string; children: ReactNode }) {
  return (
    <article>
      {label && (
        <p className="text-caption uppercase mb-1" style={{ color: "var(--color-accent-clay)" }}>{label}</p>
      )}
      <h2 className="text-h3" style={{ color: "var(--color-text-primary)" }}>{title}</h2>
      {description && (
        <p className="text-body-small mt-2 mb-5 text-text-secondary">{description}</p>
      )}
      {!description && <div className="mb-5" />}
      {children}
    </article>
  );
}
