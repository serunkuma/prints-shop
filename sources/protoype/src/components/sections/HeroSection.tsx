import { Link } from "react-router";
import { motion } from "framer-motion";
import ClipRevealImage from "@/components/motion/ClipRevealImage";
import AnimatedButton from "@/components/motion/AnimatedButton";
import PathwaySwitch from "@/components/PathwaySwitch";

interface HeroSectionProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  ctaPrimary?: { label: string; to: string };
  ctaSecondary?: { label: string; to: string };
  image: string;
  imageAlt: string;
  reveal?: boolean;
}

export default function HeroSection({
  eyebrow = "Kumachi Prints",
  title = "Art That Speaks\nOf Home",
  subtitle = "Discover museum-quality prints by emerging and established African artists.",
  ctaPrimary = { label: "Shop Prints", to: "/collection" },
  ctaSecondary = { label: "Create Your Print", to: "/create" },
  image,
  imageAlt,
  reveal = true,
}: HeroSectionProps) {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at 82% 12%, rgba(255,196,0,0.32), transparent 24%), var(--color-bg-primary)",
        paddingTop: "96px",
      }}
    >
      <div className="container-gallery min-h-[calc(100vh-96px)] grid grid-cols-1 lg:grid-cols-[1.02fr_0.98fr] gap-10 lg:gap-16 items-center py-12 lg:py-16">
        <div className="relative z-10">
          <PathwaySwitch />

          <div className="mt-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-caption uppercase"
              style={{ color: "var(--color-accent-clay)" }}
            >
              {eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 34 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 34 }}
              transition={{ duration: 0.7, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="text-display mt-4 whitespace-pre-line"
              style={{ color: "var(--color-text-primary)" }}
            >
              {title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="text-body mt-6 max-w-[560px]"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={reveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: 0.75 }}
              className="flex flex-wrap gap-3 mt-8"
            >
              <Link to={ctaPrimary.to} style={{ textDecoration: "none" }}>
                <AnimatedButton>{ctaPrimary.label}</AnimatedButton>
              </Link>
              {ctaSecondary && (
                <Link to={ctaSecondary.to} style={{ textDecoration: "none" }}>
                  <AnimatedButton variant="outline">{ctaSecondary.label}</AnimatedButton>
                </Link>
              )}
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-[560px] mt-10">
            {[
              ["Curated", "gallery-led edits"],
              ["Framed", "room-ready options"],
              ["Create", "AI concept path"],
            ].map(([value, label]) => (
              <div
                key={value}
                className="p-4"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "rgba(255,255,255,0.36)",
                }}
              >
                <p className="text-h4">{value}</p>
                <p className="text-caption normal-case tracking-normal mt-1" style={{ color: "var(--color-text-secondary)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[580px]">
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: -4 }}
            animate={reveal ? { opacity: 1, y: 0, rotate: -3 } : { opacity: 0, y: 40, rotate: -4 }}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-12 w-[58%] max-w-[360px] p-4"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <ClipRevealImage src="/images/hero-figures-print.jpg" alt="Three Sisters art print" className="aspect-[4/5]" />
            <p className="text-caption normal-case tracking-normal mt-3" style={{ color: "var(--color-text-secondary)" }}>
              Kumachi Prints proof
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 35, rotate: 4 }}
            animate={reveal ? { opacity: 1, y: 0, rotate: 2 } : { opacity: 0, y: 35, rotate: 4 }}
            transition={{ duration: 0.85, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-0 w-[72%] max-w-[460px] p-5"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <ClipRevealImage src={image} alt={imageAlt} className="aspect-[4/5]" />
            <div className="flex items-center justify-between mt-4">
              <div>
                <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
                  Featured print
                </p>
                <p className="text-h4">Lion of Judah</p>
              </div>
              <span
                className="px-3 py-2 text-caption"
                style={{ backgroundColor: "var(--color-accent-ochre)", color: "#15120d" }}
              >
                New
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={reveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.55, delay: 0.8 }}
            className="absolute bottom-14 left-8 right-8 sm:left-auto sm:w-[300px] p-5"
            style={{
              backgroundColor: "var(--color-surface-deep)",
              color: "var(--color-bg-primary)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <p className="text-caption uppercase" style={{ color: "var(--color-accent-ochre)" }}>
              Next: Create Your Own
            </p>
            <p className="text-body-small mt-2" style={{ color: "#eadbc4" }}>
              Prompt, refine, save concepts, then prepare for print when the real generation pipeline arrives.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
