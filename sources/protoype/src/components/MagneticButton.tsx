import type { MouseEvent, ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 18 });

  function handleMouseMove(event: MouseEvent<HTMLSpanElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const nextY = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
    x.set(nextX);
    y.set(nextY);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.span
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={`inline-flex min-h-11 items-center justify-center rounded-sm ${className}`}
    >
      {children}
    </motion.span>
  );
}
