import {motion} from 'framer-motion';
import {Link} from 'react-router';
import {ArrowRight, MapPin, Sparkles, Frame} from 'lucide-react';
import ClipRevealImage from '~/components/motion/ClipRevealImage';
import {InfoGrid, PageHero, PageShell} from '~/components/design/PageTemplates';

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
    title: 'Made For Recognition',
    body: 'The work begins with images that feel placed, remembered, and ready to hold a room without shouting.',
  },
  {
    title: 'Built From Kampala Outward',
    body: 'Kumachi Prints carries Kuma\'s visual world into homes across the continent, diaspora, and beyond.',
  },
  {
    title: 'Prints With Care',
    body: 'Launch prints are produced on archival matte paper with pigment ink and shipped unframed for collector choice.',
  },
];

const signals = [
  {label: 'Origin', value: 'Kampala', icon: MapPin},
  {label: 'Launch focus', value: '22 prints', icon: Sparkles},
  {label: 'Format', value: 'Unframed archival prints', icon: Frame},
];

export default function About() {
  return (
    <PageShell>
      <PageHero
        eyebrow="About"
        title="Kumachi Prints"
        description="A print shop for Kuma's visual world: animals, portraits, ceremony, silence, joy, and the colors that arrive before language."
        align="center"
      />

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
              Kumachi Prints begins with Kuma: a visual language shaped by
              myth, witness, animal presence, portraiture, and memory. The shop
              turns that world into archival prints for people who want art to
              feel both personal and placed.
            </p>
            <p className="text-body mt-4" style={{color: 'var(--color-text-secondary)'}}>
              The Opening Drop is curated open, not artificially scarce. Each
              piece was selected because it carries a specific charge: a face
              held in thought, an animal moving like memory, a landscape that
              feels older than the room around it.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {signals.map(({label, value, icon: Icon}) => (
                <div key={label} className="p-4" style={{border: '1px solid var(--color-border)', backgroundColor: 'var(--color-surface)'}}>
                  <Icon className="h-5 w-5" style={{color: 'var(--color-accent-ochre)'}} />
                  <p className="text-caption mt-3 uppercase" style={{color: 'var(--color-text-tertiary)'}}>{label}</p>
                  <p className="text-body-small mt-1 font-semibold" style={{color: 'var(--color-text-primary)'}}>{value}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <InfoGrid items={values} />

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
    </PageShell>
  );
}
