import { motion } from "framer-motion";
import { useState } from "react";

interface MarqueeRowProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

export default function MarqueeRow({
  children,
  direction = "left",
  speed = 20,
  className = "",
  style,
}: MarqueeRowProps) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={style}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.div
        className="flex gap-8 whitespace-nowrap"
        animate={{
          x: paused
            ? undefined
            : direction === "left"
              ? ["0%", "-50%"]
              : ["-50%", "0%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: speed,
            ease: "linear",
          },
        }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}
