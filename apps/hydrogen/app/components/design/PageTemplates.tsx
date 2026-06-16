import type {ReactNode} from 'react';
import {ArrowUpRight} from 'lucide-react';

type LinkItem = {
  label: string;
  href: string;
  description?: string;
};

export function PageShell({children, tone = 'light'}: {children: ReactNode; tone?: 'light' | 'warm' | 'dark'}) {
  return (
    <main
      className={tone === 'dark' ? 'dark min-h-dvh' : 'min-h-dvh'}
      style={{
        backgroundColor: tone === 'warm' ? 'var(--color-bg-secondary)' : 'var(--color-bg-primary)',
        color: 'var(--color-text-primary)',
        paddingTop: '96px',
      }}
    >
      {children}
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  align = 'left',
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  children?: ReactNode;
}) {
  return (
    <section className="container-gallery py-14 lg:py-20">
      <div className={align === 'center' ? 'mx-auto max-w-4xl text-center' : 'max-w-4xl'}>
        {eyebrow && (
          <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>
            {eyebrow}
          </p>
        )}
        <h1 className="text-h1 mt-3" style={{color: 'var(--color-text-primary)'}}>
          {title}
        </h1>
        {description && (
          <p
            className={align === 'center' ? 'text-body mx-auto mt-5 max-w-2xl' : 'text-body mt-5 max-w-2xl'}
            style={{color: 'var(--color-text-secondary)'}}
          >
            {description}
          </p>
        )}
      </div>
      {children ? <div className="mt-10">{children}</div> : null}
    </section>
  );
}

export function EditorialFrame({
  children,
  aside,
}: {
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section className="container-gallery pb-20 lg:pb-28">
      <div className={aside ? 'grid gap-10 lg:grid-cols-[minmax(0,760px)_320px]' : 'max-w-[820px]'}>
        <article
          className="p-6 sm:p-8 lg:p-10"
          style={{
            backgroundColor: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            boxShadow: 'var(--shadow-soft)',
          }}
        >
          <div className="accent-rule mb-8" />
          <div className="prose-kumachi">{children}</div>
        </article>
        {aside ? <aside className="lg:sticky lg:top-28 lg:self-start">{aside}</aside> : null}
      </div>
    </section>
  );
}

export function InfoGrid({items}: {items: Array<{title: string; body: string}>}) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <article
          key={item.title}
          className="p-5"
          style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)'}}
        >
          <h2 className="text-h4" style={{color: 'var(--color-text-primary)'}}>
            {item.title}
          </h2>
          <p className="text-body-small mt-3" style={{color: 'var(--color-text-secondary)'}}>
            {item.body}
          </p>
        </article>
      ))}
    </div>
  );
}

export function LinkRail({title = 'Keep reading', links}: {title?: string; links: LinkItem[]}) {
  return (
    <div
      className="p-5"
      style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)'}}
    >
      <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>
        {title}
      </p>
      <div className="mt-4 grid gap-3">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="group flex min-h-11 items-start justify-between gap-4 p-3 transition-opacity hover:opacity-80"
            style={{backgroundColor: 'var(--color-bg-primary)', border: '1px solid var(--color-border)'}}
          >
            <span>
              <span className="text-body-small font-semibold" style={{color: 'var(--color-text-primary)'}}>
                {link.label}
              </span>
              {link.description && (
                <span className="text-caption mt-1 block normal-case tracking-normal" style={{color: 'var(--color-text-secondary)'}}>
                  {link.description}
                </span>
              )}
            </span>
            <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        ))}
      </div>
    </div>
  );
}

export function ContentCallout({title, children}: {title: string; children: ReactNode}) {
  return (
    <div
      className="my-8 p-5 sm:p-6"
      style={{backgroundColor: 'var(--color-bg-secondary)', borderLeft: '5px solid var(--color-accent-ochre)'}}
    >
      <h2 className="text-h4" style={{color: 'var(--color-text-primary)'}}>
        {title}
      </h2>
      <div className="mt-3 text-body-small" style={{color: 'var(--color-text-secondary)'}}>
        {children}
      </div>
    </div>
  );
}

export function DesignSwatch({name, token}: {name: string; token: string}) {
  return (
    <div className="min-w-0">
      <div className="h-16 w-full" style={{backgroundColor: `var(${token})`, border: '1px solid var(--color-border)'}} />
      <p className="text-body-small mt-2 font-semibold" style={{color: 'var(--color-text-primary)'}}>
        {name}
      </p>
      <p className="text-caption normal-case tracking-normal" style={{color: 'var(--color-text-tertiary)'}}>
        {token}
      </p>
    </div>
  );
}

