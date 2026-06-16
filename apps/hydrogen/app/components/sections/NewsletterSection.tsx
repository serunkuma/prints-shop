import {useId} from 'react';

interface NewsletterSectionProps {
  section?: {
    heading?: string;
    description?: string;
  };
}

export function NewsletterSection({section}: NewsletterSectionProps) {
  const generatedId = useId();
  const emailId = `newsletter-email-${generatedId.replace(/:/g, '')}`;
  const headingId = `newsletter-heading-${generatedId.replace(/:/g, '')}`;
  const heading = section?.heading || 'Stay with Kumachi Prints';
  const description = section?.description || 'Release notes, studio signals, and the first look at what enters the shop next.';

  return (
    <section
      aria-label="Newsletter signup"
      className="kumachi-section"
      style={{
        backgroundColor: 'var(--color-bg-primary)',
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="container-gallery">
        <div className="mx-auto max-w-[640px] text-center">
          <span className="accent-rule" />
          <p className="text-caption mt-5 uppercase" style={{color: 'var(--color-accent-clay)'}}>Stay close</p>
          <h2 id={headingId} className="text-h2 mt-3" style={{color: 'var(--color-text-primary)'}}>
            {heading}
          </h2>
          <p className="text-body mx-auto mt-5 max-w-[520px]" style={{color: 'var(--color-text-secondary)'}}>
            {description}
          </p>
          <form className="mx-auto mt-8 flex max-w-[520px] flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-end" onSubmit={(event) => event.preventDefault()}>
            <div className="min-w-0 flex-1 text-left">
              <label className="text-caption uppercase" htmlFor={emailId} style={{color: 'var(--color-text-tertiary)'}}>
                Email address
              </label>
              <input
                id={emailId}
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="mt-2 min-h-12 w-full bg-transparent px-0 text-body"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
            <button
              type="submit"
              className="min-h-12 px-6 text-button uppercase transition-opacity hover:opacity-85"
              style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
