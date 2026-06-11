import { motion } from "framer-motion";
import ClipRevealImage from "@/components/motion/ClipRevealImage";

interface EditorialStorySectionProps {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  imageSide?: "left" | "right";
}

export default function EditorialStorySection({
  title,
  body,
  image,
  imageAlt,
  imageSide = "left",
}: EditorialStorySectionProps) {
  const imageCol = (
    <motion.div
      initial={{ opacity: 0, x: imageSide === "left" ? -40 : 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative aspect-[4/3] overflow-hidden"
    >
      <ClipRevealImage src={image} alt={imageAlt} className="w-full h-full" />
    </motion.div>
  );

  const textCol = (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col justify-center"
    >
      <h2
        className="text-h2 font-display"
        style={{ color: "var(--color-text-primary)" }}
      >
        {title}
      </h2>
      <div
        className="text-body mt-6 max-w-[520px]"
        style={{ color: "var(--color-text-secondary)", whiteSpace: "pre-line" }}
      >
        {body}
      </div>
    </motion.div>
  );

  return (
    <section
      className="kumachi-section"
      style={{
        backgroundColor: "var(--color-bg-primary)",
      }}
    >
      <div className="container-gallery">
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center p-5 sm:p-8 lg:p-10"
          style={{
            border: "1px solid var(--color-border)",
            backgroundColor: "var(--color-surface)",
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {imageSide === "left" ? imageCol : textCol}
          {imageSide === "left" ? textCol : imageCol}
        </div>
      </div>
    </section>
  );
}
