import type {Variants} from 'framer-motion';

export const fadeUp: Variants = {
  hidden: {opacity: 0, y: 24},
  show: {
    opacity: 1,
    y: 0,
    transition: {duration: 0.5, ease: [0.22, 1, 0.36, 1]},
  },
};

export const fadeIn: Variants = {
  hidden: {opacity: 0},
  show: {opacity: 1, transition: {duration: 0.4}},
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {transition: {staggerChildren: 0.08}},
};

export const scaleIn: Variants = {
  hidden: {opacity: 0, scale: 0.95},
  show: {
    opacity: 1,
    scale: 1,
    transition: {duration: 0.4, ease: [0.22, 1, 0.36, 1]},
  },
};

export const slideInRight: Variants = {
  hidden: {x: '100%'},
  show: {x: 0, transition: {duration: 0.35, ease: [0.22, 1, 0.36, 1]}},
  exit: {x: '100%', transition: {duration: 0.28, ease: [0.4, 0, 1, 1]}},
};

export const pageTransition = {
  initial: {opacity: 0, y: 18},
  animate: {opacity: 1, y: 0},
  exit: {opacity: 0},
  transition: {duration: 0.72, ease: [0.22, 1, 0.36, 1]},
};
