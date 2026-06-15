import {useState, useRef, useEffect, useCallback} from 'react';
import {Link} from 'react-router';
import {motion, AnimatePresence} from 'framer-motion';
import {ArrowUpRight} from 'lucide-react';

const columns = [
  {
    title: 'Start Here',
    links: [
      {label: 'All Prints', to: '/collection'},
      {label: 'Opening Drop', to: '/drops/opening-drop'},
      {label: 'New Arrivals', to: '/collection?sort=newest'},
      {label: 'Large Prints', to: '/collection/large-prints'},
    ],
  },
  {
    title: 'By Subject',
    links: [
      {label: 'Figurative & Portrait', to: '/collection/figurative-and-portrait-art'},
      {label: 'Narrative & Storytelling', to: '/collection/narrative-and-storytelling-art'},
      {label: 'Landscape & Nature', to: '/collection/landscape-and-nature'},
      {label: 'Abstract', to: '/collection/abstract-art'},
      {label: 'Contemporary African Art', to: '/collection/contemporary-african-art'},
    ],
  },
  {
    title: 'Learn Before Buying',
    links: [
      {label: 'Size Guide', to: '/pages/size-guide'},
      {label: 'Print Quality', to: '/pages/print-quality'},
      {label: 'Shipping & Returns', to: '/pages/shipping-returns'},
      {label: 'FAQ', to: '/pages/faq'},
    ],
  },
  {
    title: 'Featured Prints',
    links: [
      {label: 'Majestic Monarch', to: '/products/majestic-monarch'},
      {label: 'Silence In Spirit', to: '/products/silence-in-spirit'},
      {label: "A Continent's Tapestry", to: '/products/a-continents-tapestry'},
    ],
    featured: true,
  },
];

interface CollectionMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

export function CollectionMegaMenu({isOpen, onClose, triggerRef}: CollectionMegaMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeColumn, setActiveColumn] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setActiveColumn(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  const handlePointerEnter = useCallback(() => {
    if (isOpen) setActiveColumn('collection');
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{backgroundColor: 'rgba(21,18,13,0.3)'}}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.15}}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            ref={panelRef}
            initial={{opacity: 0, y: -8}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: -8}}
            transition={{duration: 0.2, ease: [0.22, 1, 0.36, 1]}}
            className="fixed left-0 right-0 z-50 shadow-lg"
            style={{
              top: '80px',
              backgroundColor: 'var(--color-surface)',
              borderBottom: '1px solid var(--color-border)',
            }}
            onPointerEnter={handlePointerEnter}
            onPointerLeave={(e) => {
              if (!panelRef.current?.contains(e.relatedTarget as Node) && !triggerRef.current?.contains(e.relatedTarget as Node)) {
                onClose();
              }
            }}
            role="menu"
            aria-label="Collection menu"
          >
            <div className="container-gallery py-10">
              <div className="grid grid-cols-4 gap-8">
                {columns.map((column) => (
                  <div key={column.title}>
                    <p className="text-caption uppercase mb-4" style={{color: 'var(--color-accent-clay)'}}>
                      {column.title}
                    </p>
                    <ul className="space-y-3">
                      {column.links.map((link) => (
                        <li key={link.to}>
                          <Link
                            to={link.to}
                            onClick={onClose}
                            className="group flex items-center gap-1.5 text-body-small transition-colors"
                            style={{color: 'var(--color-text-secondary)'}}
                          >
                            {column.featured && <ArrowUpRight size={12} className="shrink-0" style={{color: 'var(--color-accent-ochre)'}} />}
                            <span className="group-hover:text-text-primary transition-colors">{link.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export function MobileCollectionSubmenu() {
  return (
    <div className="mt-2 ml-4 space-y-2 border-l-2 pl-4" style={{borderColor: 'var(--color-border)'}}>
      {columns.map((column) => (
        <div key={column.title} className="mb-4">
          <p className="text-caption uppercase mb-2" style={{color: 'var(--color-accent-clay)'}}>
            {column.title}
          </p>
          <div className="space-y-2">
            {column.links.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="block text-body-small transition-colors"
                style={{color: 'var(--color-text-secondary)'}}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
