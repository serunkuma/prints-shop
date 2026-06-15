import {Link} from 'react-router';
import {motion} from 'framer-motion';
import {ShoppingBag, Sparkles} from 'lucide-react';

interface PathwaySwitchProps {
  active?: 'prints' | 'ai';
  compact?: boolean;
}

const pathways = [
  {
    id: 'prints',
    label: 'Buy Ready-Made Prints',
    description: 'Curated editions from Kumachi Prints',
    to: '/collection',
    icon: ShoppingBag,
  },
  {
    id: 'ai',
    label: 'Create Your Own',
    description: 'Shape an idea into a print concept',
    to: '/create',
    icon: Sparkles,
  },
] as const;

export default function PathwaySwitch({
  active = 'prints',
  compact = false,
}: PathwaySwitchProps) {
  return (
    <div
      className={`grid ${compact ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2'} gap-2`}
      style={{
        backgroundColor: 'rgba(255,255,255,0.48)',
        border: '1px solid var(--color-border)',
        padding: 6,
      }}
    >
      {pathways.map(({id, label, description, to, icon: Icon}) => {
        const selected = active === id;

        return (
          <Link
            key={id}
            to={to}
            className="relative min-h-14 overflow-hidden p-3 no-underline sm:p-4"
            style={{
              color: selected ? '#15120d' : 'var(--color-text-primary)',
            }}
          >
            {selected && (
              <motion.span
                layoutId={compact ? 'pathway-switch-compact' : 'pathway-switch'}
                className="absolute inset-0"
                style={{backgroundColor: 'var(--color-accent-ochre)'}}
                transition={{duration: 0.35, ease: [0.16, 1, 0.3, 1]}}
              />
            )}
            <span className="relative flex items-start gap-3">
              <Icon size={18} strokeWidth={1.8} />
              <span>
                <span className="block text-button">{label}</span>
                {!compact && (
                  <span
                    className="mt-1 block text-caption normal-case tracking-normal"
                    style={{
                      color: selected
                        ? '#3c321f'
                        : 'var(--color-text-secondary)',
                    }}
                  >
                    {description}
                  </span>
                )}
              </span>
            </span>
          </Link>
        );
      })}
    </div>
  );
}
