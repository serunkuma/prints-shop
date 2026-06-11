import AnimatedButton from "@/components/motion/AnimatedButton";
import type { ReactNode } from "react";

const colors = [
  ["Background", "var(--color-bg-primary)"],
  ["Surface", "var(--color-surface)"],
  ["Deep Surface", "var(--color-surface-deep)"],
  ["Ochre", "var(--color-accent-ochre)"],
  ["Clay", "var(--color-accent-clay)"],
  ["Crimson", "var(--color-accent-crimson)"],
  ["Cobalt", "var(--color-accent-cobalt)"],
  ["Emerald", "var(--color-accent-emerald)"],
];

export default function DesignSystemPage() {
  return (
    <main style={{ backgroundColor: "var(--color-bg-primary)", paddingTop: "100px", minHeight: "100vh" }}>
      <section className="container-gallery py-14">
        <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>Internal</p>
        <h1 className="text-h1 mt-3" style={{ color: "var(--color-text-primary)" }}>Kumachi Prints Design System</h1>
        <p className="text-body mt-5 max-w-2xl" style={{ color: "var(--color-text-secondary)" }}>
          A compact reference for the merged best-of-both-worlds visual system.
        </p>
      </section>

      <section className="container-gallery grid gap-8 pb-20 lg:grid-cols-2">
        <Panel title="Logo">
          <div className="flex flex-wrap items-center gap-8">
            <img src="/kumachi-prints-logo.svg" alt="Kumachi Prints logo" className="h-36 w-auto max-w-[340px]" />
            <p className="text-body-small max-w-sm" style={{ color: "var(--color-text-secondary)" }}>
              Use the official SVG at its natural ratio. Keep clear space around it and avoid rebuilding the wordmark in live text.
            </p>
          </div>
        </Panel>

        <Panel title="Typography">
          <div className="space-y-4">
            <p className="text-display" style={{ color: "var(--color-text-primary)" }}>Display</p>
            <p className="text-h2" style={{ color: "var(--color-text-primary)" }}>Heading System</p>
            <p className="text-editorial" style={{ color: "var(--color-text-secondary)" }}>Editorial accent for story moments.</p>
            <p className="text-body" style={{ color: "var(--color-text-secondary)" }}>Body text uses Manrope for commerce readability and calm scanning.</p>
          </div>
        </Panel>

        <Panel title="Color Tokens">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {colors.map(([label, value]) => (
              <div key={label}>
                <div className="aspect-square" style={{ background: value, border: "1px solid var(--color-border)" }} />
                <p className="text-caption mt-2 normal-case tracking-normal" style={{ color: "var(--color-text-secondary)" }}>{label}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Controls">
          <div className="flex flex-wrap items-center gap-3">
            <AnimatedButton>Primary</AnimatedButton>
            <AnimatedButton variant="outline">Secondary</AnimatedButton>
            <button className="text-caption min-h-11 rounded-full px-4 uppercase" style={{ border: "1px solid var(--color-border)", color: "var(--color-text-primary)" }}>
              Filter Pill
            </button>
            <input className="min-h-11 px-4" placeholder="Email address" style={{ border: "1px solid var(--color-border)", background: "var(--color-surface)", color: "var(--color-text-primary)" }} />
          </div>
        </Panel>

        <Panel title="Motion">
          <p className="text-body-small" style={{ color: "var(--color-text-secondary)" }}>
            Route transitions use fade/translate. Product cards use image scale and overlay reveals. Filter drawers and accordions use height/opacity transitions under 300ms where possible.
          </p>
        </Panel>

        <Panel title="Spacing And Radius">
          <p className="text-body-small" style={{ color: "var(--color-text-secondary)" }}>
            Spacing follows 4/8px increments with gallery sections using `kumachi-section`. Cards are mostly square-edged to preserve the editorial print-shop feel.
          </p>
        </Panel>
      </section>
    </main>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="p-6" style={{ backgroundColor: "var(--color-surface)", border: "1px solid var(--color-border)" }}>
      <h2 className="text-h3" style={{ color: "var(--color-text-primary)" }}>{title}</h2>
      <div className="mt-5">{children}</div>
    </article>
  );
}
