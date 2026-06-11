import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-dvh items-center pt-24" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <section className="container-gallery py-20">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">404</p>
        <h1 className="mt-4 max-w-3xl font-display text-6xl leading-none text-text-primary md:text-8xl">
          This print is not on the wall.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-text-secondary">
          The page moved, sold out, or never made it into the archive.
        </p>
        <Link
          to="/collection"
          className="mt-8 inline-flex min-h-11 items-center rounded-sm bg-gold px-6 text-sm font-semibold uppercase tracking-wider text-void"
        >
          Return to collection
        </Link>
      </section>
    </main>
  );
}
