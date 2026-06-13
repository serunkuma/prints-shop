import {motion} from 'framer-motion';

export default function ClipRevealImage({
  src,
  alt,
  className = '',
  imgClassName = 'h-full w-full object-cover',
}: {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      initial={{clipPath: 'inset(0 0 100% 0)'}}
      whileInView={{clipPath: 'inset(0 0 0% 0)'}}
      viewport={{once: true, margin: '-80px'}}
      transition={{duration: 0.75, ease: [0.16, 1, 0.3, 1]}}
    >
      <img src={src} alt={alt} className={imgClassName} />
    </motion.div>
  );
}
