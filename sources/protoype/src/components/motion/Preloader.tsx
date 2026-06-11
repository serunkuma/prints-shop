import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [show, setShow] = useState(true);
  const [handoff, setHandoff] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handoffTimer = window.setTimeout(
      () => setHandoff(true),
      shouldReduceMotion ? 220 : 900,
    );
    const revealTimer = window.setTimeout(() => {
      onComplete?.();
    }, shouldReduceMotion ? 420 : 1850);
    const hideTimer = window.setTimeout(() => {
      setShow(false);
    }, shouldReduceMotion ? 640 : 2600);

    return () => {
      window.clearTimeout(handoffTimer);
      window.clearTimeout(revealTimer);
      window.clearTimeout(hideTimer);
    };
  }, [onComplete, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle at 82% 12%, rgba(255,196,0,0.22), transparent 25%), radial-gradient(circle at 14% 86%, color-mix(in srgb, var(--color-accent-clay) 14%, transparent), transparent 30%), linear-gradient(135deg, color-mix(in srgb, var(--color-bg-primary) 94%, var(--color-accent-ochre)), var(--color-bg-primary) 48%, color-mix(in srgb, var(--color-bg-primary) 92%, var(--color-accent-green)))",
          }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.18 : 0.8, ease: [0.45, 0, 0.2, 1] }}
          aria-label="Kumachi Prints loading"
        >
          <motion.img
            src="/kumachi-prints-logo.svg"
            alt="Kumachi Prints"
            className="h-24 w-auto max-w-[58vw] object-contain sm:h-28"
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.985 }}
            animate={
              shouldReduceMotion
                ? { opacity: handoff ? 0 : 1 }
                : handoff
                  ? {
                      opacity: 0.45,
                      scale: 0.76,
                      x: "calc(-50vw + clamp(4.35rem, 8vw, 6.25rem))",
                      y: "calc(-50vh + 2.5rem)",
                    }
                  : { opacity: 1, scale: 1, x: 0, y: 0 }
            }
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.18 : 1.5, ease: [0.45, 0, 0.18, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
