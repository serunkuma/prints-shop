import { motion } from "framer-motion";

interface ClipRevealImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ClipRevealImage({
  src,
  alt,
  className = "",
}: ClipRevealImageProps) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", scale: 1.08 }}
        whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
        className="h-full"
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      </motion.div>
    </div>
  );
}
