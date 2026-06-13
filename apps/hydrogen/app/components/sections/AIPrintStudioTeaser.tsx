import {Link} from 'react-router';
import {motion} from 'framer-motion';
import {ArrowRight, Lock, Sparkles} from 'lucide-react';
import AnimatedButton from '~/components/motion/AnimatedButton';

const styles = ['Diaspora', 'Portrait', 'Textile', 'Abstract', 'Afrofuturist'];
const prompts = [
  'A regal portrait in ochre and indigo',
  'Textile rhythm with sunlit geometry',
  'Diaspora cityscape at golden hour',
];

export function AIPrintStudioTeaser() {
  return (
    <section className="kumachi-section" style={{backgroundColor: 'var(--color-bg-secondary)'}}>
      <div className="container-gallery">
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
          <motion.div initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} transition={{duration: 0.55}} className="kumachi-card flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              <span className="accent-rule" />
              <p className="text-caption mt-5 uppercase" style={{color: 'var(--color-accent-clay)'}}>Kumachi Prints AI studio</p>
              <h2 className="text-h2 mt-4" style={{color: 'var(--color-text-primary)'}}>Start with a memory. Shape it into wall art.</h2>
              <p className="text-body mt-5 max-w-[560px]" style={{color: 'var(--color-text-secondary)'}}>
                A designed preview flow for customers who want to describe a scene, explore a visual direction, and later turn the final concept into a printed piece.
              </p>
            </div>
            <div className="mt-8">
              <div className="p-4" style={{backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)'}}>
                <p className="text-caption mb-3 uppercase" style={{color: 'var(--color-text-tertiary)'}}>Prompt idea</p>
                <div className="min-h-[92px] text-editorial" style={{color: 'var(--color-text-primary)'}}>
                  A family archive portrait reimagined as a bold contemporary African print...
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {styles.map((style) => (
                  <span key={style} className="px-3 py-2 text-caption uppercase" style={{border: '1px solid var(--color-border)', backgroundColor: style === 'Textile' ? 'var(--color-accent-ochre)' : 'transparent', color: 'var(--color-text-primary)'}}>
                    {style}
                  </span>
                ))}
              </div>
              <Link to="/create" className="mt-6 inline-flex" style={{textDecoration: 'none'}}>
                <AnimatedButton>Create Your Own Print</AnimatedButton>
              </Link>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {prompts.map((prompt, index) => (
              <motion.div key={prompt} initial={{opacity: 0, y: 24, rotate: index === 1 ? 2 : -1}} whileInView={{opacity: 1, y: 0, rotate: index === 1 ? 1 : -1}} viewport={{once: true}} transition={{duration: 0.6, delay: index * 0.1}} className={index === 0 ? 'col-span-2 sm:col-span-1' : ''} style={{minHeight: index === 0 ? 330 : 260, background: index === 0 ? 'linear-gradient(135deg, #15120d 0%, #6f3d2a 48%, #ffc400 100%)' : index === 1 ? 'linear-gradient(135deg, #fffaf0 0%, #1f5a45 55%, #15120d 100%)' : 'linear-gradient(135deg, #1f5d77 0%, #f4ead8 52%, #b7603f 100%)', border: '1px solid var(--color-border)', padding: 18, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-soft)'}}>
                <Sparkles size={22} color={index === 1 ? '#fffaf0' : '#ffc400'} />
                <div>
                  <p className="text-caption uppercase" style={{color: index === 1 ? '#fffaf0' : '#15120d'}}>Preview {String(index + 1).padStart(2, '0')}</p>
                  <p className="text-body-small mt-2" style={{color: index === 1 ? '#fffaf0' : '#15120d'}}>{prompt}</p>
                </div>
              </motion.div>
            ))}
            <motion.div initial={{opacity: 0, y: 20}} whileInView={{opacity: 1, y: 0}} viewport={{once: true}} className="col-span-2 flex items-center justify-between gap-4 p-5" style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
              <div className="flex items-center gap-3">
                <Lock size={18} color="var(--color-accent-ochre)" />
                <p className="text-body-small">Sign in to save concepts and prepare print-ready files.</p>
              </div>
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
