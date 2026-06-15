import {motion} from 'framer-motion';
import {Link} from 'react-router';
import {ArrowRight} from 'lucide-react';
import ClipRevealImage from '~/components/motion/ClipRevealImage';
import {fadeUp, staggerContainer} from '~/lib/animations';

export const meta = () => [
  {title: 'About — Kumachi Prints'},
  {
    name: 'description',
    content:
      'Kumachi Prints is a shop dedicated to contemporary African art prints, room-ready editions, and future tools for personal print creation.',
  },
];

const values = [
  {
    title: 'Curated Excellence',
    body: 'Every artist and print in our collection is carefully selected for quality, authenticity, and visual impact.',
  },
  {
    title: 'Artist-First',
    body: 'We work directly with artists, ensuring fair compensation and creative control over every reproduction.',
  },
  {
    title: 'Archival Quality',
    body: 'All prints use museum-grade materials — archival paper, pigment inks, and professional framing options.',
  },
];

export default function About() {
  return (
    <main style={{backgroundColor: 'var(--color-bg-primary)', paddingTop: '100px', minHeight: '100vh'}}>
      <div className="container-gallery text-center py-16 lg:py-24">
        <motion.p
          initial={{opacity: 0, y: 10}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.4}}
          className="text-caption font-medium uppercase tracking-[0.08em]"
          style={{color: 'var(--color-text-secondary)'}}
        >
          About
        </motion.p>
        <motion.h1
          initial={{opacity: 0, y: 16}}
          animate={{opacity: 1, y: 0}}
          transition={{duration: 0.5, delay: 0.1}}
          className="text-h1 font-display mt-2"
          style={{color: 'var(--color-text-primary)'}}
        >
          Kumachi Prints
        </motion.h1>
      </div>

      <div className="container-gallery pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
          <motion.div
            initial={{opacity: 0, x: -40}}
            whileInView={{opacity: 1, x: 0}}
            viewport={{once: true}}
            transition={{duration: 0.6}}
          >
            <ClipRevealImage
              src="/images/hero-lion-print.jpg"
              alt="Kumachi Prints studio"
              className="aspect-[4/3]"
            />
          </motion.div>
          <motion.div
            initial={{opacity: 0, y: 24}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true}}
            transition={{duration: 0.5, delay: 0.2}}
          >
            <h2 className="text-h2 font-display" style={{color: 'var(--color-text-primary)'}}>
              Our Story
            </h2>
            <p className="text-body mt-6" style={{color: 'var(--color-text-secondary)'}}>
              Kumachi Prints is a shop dedicated to contemporary African art
              prints, room-ready editions, and future tools for personal print
              creation. We work with artists across the continent and diaspora
              to produce museum-quality archival prints.
            </p>
            <p className="text-body mt-4" style={{color: 'var(--color-text-secondary)'}}>
              Every print is produced on archival-grade paper with pigment inks,
              ensuring lasting color fidelity. We believe that great art should
              be accessible — which is why we offer prints at multiple price
              points, from open editions to limited releases.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{opacity: 0, y: 30}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.5, delay: i * 0.15}}
              className="p-6"
              style={{
                backgroundColor: 'var(--color-bg-secondary)',
                border: '1px solid var(--color-border)',
              }}
            >
              <h3 className="text-h3 font-display" style={{color: 'var(--color-text-primary)'}}>
                {value.title}
              </h3>
              <p className="text-body-small mt-3" style={{color: 'var(--color-text-secondary)'}}>
                {value.body}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          className="text-center mt-20"
        >
          <h2 className="text-h2 font-display" style={{color: 'var(--color-text-primary)'}}>
            Ready to find your next piece?
          </h2>
          <Link
            to="/collection"
            className="inline-flex h-12 px-8 items-center text-button mt-6 transition-opacity duration-150 hover:opacity-85"
            style={{
              backgroundColor: 'var(--color-text-primary)',
              color: 'var(--color-bg-primary)',
            }}
          >
            Explore the Collection
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </motion.div>
      </div>
    </main>
  );
}
