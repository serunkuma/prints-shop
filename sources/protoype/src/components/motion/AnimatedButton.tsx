import { motion } from "framer-motion";
import type { CSSProperties } from "react";

interface AnimatedButtonProps {
  children: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline";
  type?: "button" | "submit";
}

export default function AnimatedButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
}: AnimatedButtonProps) {
  const baseStyle: CSSProperties =
    variant === "primary"
      ? {
          backgroundColor: "var(--color-text-primary)",
          color: "var(--color-bg-primary)",
        }
      : {
          border: "1px solid var(--color-text-primary)",
          color: "var(--color-text-primary)",
          backgroundColor: "transparent",
        };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`group relative h-12 inline-flex items-center justify-center overflow-hidden ${className}`}
      style={{
        ...baseStyle,
        paddingLeft: "var(--space-lg)",
        paddingRight: "var(--space-lg)",
      }}
      whileHover={{ opacity: 0.85 }}
      whileTap={{ scale: 0.97 }}
    >
      <span
        className="absolute inset-y-0 left-0 w-0 transition-all duration-500 group-hover:w-full"
        style={{
          backgroundColor:
            variant === "primary"
              ? "var(--color-accent-ochre)"
              : "var(--color-text-primary)",
        }}
      />
      <span className="relative h-[1em] overflow-hidden text-button">
        <span className="block transition-transform duration-300 group-hover:-translate-y-full">
          {children}
        </span>
        <span
          className="absolute left-0 top-full block transition-transform duration-300 group-hover:-translate-y-full"
          style={{
            color:
              variant === "primary"
                ? "var(--color-text-primary)"
                : "var(--color-bg-primary)",
          }}
        >
          {children}
        </span>
      </span>
    </motion.button>
  );
}
