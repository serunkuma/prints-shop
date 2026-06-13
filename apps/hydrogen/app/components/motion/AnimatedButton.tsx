import {motion} from 'framer-motion';
import type {ComponentPropsWithoutRef, ElementType, ReactNode} from 'react';

export default function AnimatedButton({
  as,
  children,
  variant = 'primary',
  icon,
  ...props
}: {
  as?: ElementType;
  children: ReactNode;
  variant?: 'primary' | 'dark' | 'outline';
  icon?: ReactNode;
} & ComponentPropsWithoutRef<any>) {
  const Component = motion.create(as || 'span');
  const isDark = variant === 'dark';
  const isPrimary = variant === 'primary';

  return (
    <Component
      {...props}
      whileHover={{y: -1}}
      whileTap={{scale: 0.98}}
      className={`inline-flex min-h-12 items-center justify-center gap-2 px-6 text-button uppercase ${props.className || ''}`}
      style={{
        backgroundColor: isDark
          ? 'var(--color-surface-deep)'
          : isPrimary
            ? 'var(--color-accent-ochre)'
            : 'transparent',
        color: isDark || isPrimary ? '#15120d' : 'var(--color-text-primary)',
        border: isDark
          ? '1px solid var(--color-surface-deep)'
          : isPrimary
            ? '1px solid var(--color-accent-ochre)'
            : '1px solid var(--color-border-active)',
        ...(props.style || {}),
      }}
    >
      {children}
      {icon}
    </Component>
  );
}
