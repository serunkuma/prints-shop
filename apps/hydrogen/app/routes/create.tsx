import {Link} from 'react-router';
import {ArrowRight, ImagePlus, Layers, Sparkles, Wand2} from 'lucide-react';
import {motion} from 'framer-motion';
import AnimatedButton from '~/components/motion/AnimatedButton';
import ClipRevealImage from '~/components/motion/ClipRevealImage';

const steps = [
  {
    icon: ImagePlus,
    title: 'Begin with a feeling',
    body: 'Choose mood, palette, room, and print intention before any generation happens.',
  },
  {
    icon: Wand2,
    title: 'Curate the study',
    body: 'The studio will produce directions for review instead of flooding you with noise.',
  },
  {
    icon: Layers,
    title: 'Approve the print',
    body: 'Only approved work becomes a purchasable Shopify product with proper fulfillment rules.',
  },
];

export default function CreateRoute() {
  return (
    <main style={{backgroundColor: 'var(--color-bg-primary)'}}>
      <section className="container-gallery grid min-h-[92vh] grid-cols-1 items-center gap-12 pt-28 pb-16 lg:grid-cols-[52%_48%]">
        <div>
          <p className="text-caption mb-6 uppercase" style={{color: 'var(--color-accent-clay)'}}>
            Kumachi AI Studio
          </p>
          <h1 className="font-display text-[clamp(3rem,8vw,7rem)] leading-[0.88]" style={{color: 'var(--color-text-primary)'}}>
            Create a print with soul, not sameness.
          </h1>
          <p className="mt-8 max-w-xl text-body-large" style={{color: 'var(--color-text-secondary)'}}>
            The creation pathway is being prepared as a guided art direction studio. For launch, it stays visible as a promise while the store focuses on real curated prints.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <AnimatedButton as={Link} to="/collections" variant="dark" icon={<ArrowRight size={18} />}>
              Browse prints
            </AnimatedButton>
            <AnimatedButton as={Link} to="/pages/about" variant="outline">
              Read the story
            </AnimatedButton>
          </div>
        </div>

        <div className="relative">
          <ClipRevealImage
            src="/images/collection-print-06.jpg"
            alt="Layered studio wall with warm contemporary prints"
            className="aspect-[4/5] w-full overflow-hidden rounded-t-full"
            imgClassName="h-full w-full object-cover"
          />
          <motion.div
            className="absolute -bottom-8 left-6 right-6 border p-6 shadow-kumachi-xl"
            style={{
              backgroundColor: 'rgba(255, 251, 245, 0.92)',
              borderColor: 'var(--color-border)',
              backdropFilter: 'blur(16px)',
            }}
            initial={{opacity: 0, y: 24}}
            animate={{opacity: 1, y: 0}}
            transition={{delay: 0.2}}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{backgroundColor: 'var(--color-accent-ochre)', color: 'var(--color-surface-dark)'}}>
                <Sparkles size={18} />
              </span>
              <div>
                <p className="font-display text-h4" style={{color: 'var(--color-text-primary)'}}>Studio access coming next</p>
                <p className="text-body-small" style={{color: 'var(--color-text-secondary)'}}>Launch first. Generation later, with care.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="kumachi-section border-t" style={{borderColor: 'var(--color-border)'}}>
        <div className="container-gallery">
          <div className="grid gap-5 md:grid-cols-3">
            {steps.map(({icon: Icon, title, body}) => (
              <div key={title} className="kumachi-card p-6">
                <Icon size={22} style={{color: 'var(--color-accent-crimson)'}} />
                <h2 className="mt-6 font-display text-h3" style={{color: 'var(--color-text-primary)'}}>{title}</h2>
                <p className="mt-3 text-body-small" style={{color: 'var(--color-text-secondary)'}}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
