import { motion, type Easing } from "framer-motion";

interface RevealTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
}

export default function RevealText({
  children,
  as: Tag = "p",
  className = "",
  delay = 0.3,
  stagger = 0.03,
}: RevealTextProps) {
  const words = children.split(" ");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const child = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as Easing },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={className}
    >
      <Tag style={{ display: "flex", flexWrap: "wrap", overflow: "hidden" }}>
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={child}
            style={{ marginRight: "0.28em", display: "inline-block" }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
