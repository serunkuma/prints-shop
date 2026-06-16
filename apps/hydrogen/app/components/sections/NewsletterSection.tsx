import {useId, useState, useCallback, useEffect} from 'react';
import {useFetcher} from 'react-router';

interface NewsletterSectionProps {
  section?: {
    heading?: string;
    description?: string;
  };
}

export function NewsletterSection({section}: NewsletterSectionProps) {
  const generatedId = useId();
  const emailId = `newsletter-email-${generatedId.replace(/:/g, '')}`;
  const consentId = `newsletter-consent-${generatedId.replace(/:/g, '')}`;
  const headingId = `newsletter-heading-${generatedId.replace(/:/g, '')}`;
  const heading = section?.heading || 'Stay with Kumachi Prints';
  const description = section?.description || 'Release notes, studio signals, and the first look at what enters the shop next.';
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fetcher = useFetcher();
  const consentText = 'I agree to receive emails about new drops, studio updates, and exclusive offers from Kumachi Prints.';

  useEffect(() => {
    if (fetcher.data && 'success' in fetcher.data) {
      setSubmitted(true);
      setEmail('');
      setConsent(false);
    }
  }, [fetcher.data]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@') || !consent) return;

    const fd = new FormData();
    fd.append('email', email);
    fd.append('source', 'newsletter_footer');
    fd.append('emailConsent', String(consent));
    fd.append('emailConsentText', consentText);
    fd.append('sourcePage', typeof window !== 'undefined' ? window.location.pathname : '');
    fetcher.submit(fd, {method: 'POST', action: '/api/contact-capture'});
  }, [email, consent, fetcher]);

  const isLoading = fetcher.state !== 'idle';
  const isError = fetcher.data && 'error' in fetcher.data && fetcher.state === 'idle';

  if (submitted) {
    return (
      <section aria-label="Newsletter signup" className="kumachi-section" style={{backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border)'}}>
        <div className="container-gallery">
          <div className="mx-auto max-w-[640px] text-center">
            <span className="accent-rule" />
            <p className="text-caption mt-5 uppercase" style={{color: 'var(--color-accent-clay)'}}>You are in</p>
            <p className="text-body mx-auto mt-5 max-w-[520px]" style={{color: 'var(--color-text-secondary)'}}>
              Thank you for joining. You will hear from us when the next drop lands.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Newsletter signup" className="kumachi-section" style={{backgroundColor: 'var(--color-bg-primary)', borderTop: '1px solid var(--color-border)'}}>
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
          <fetcher.Form method="POST" action="/api/contact-capture" className="mx-auto mt-8 max-w-[520px] flex flex-col gap-4">
            <input type="hidden" name="source" value="newsletter_footer" />
            <input type="hidden" name="emailConsentText" value={consentText} />
            <input type="hidden" name="sourcePage" value={typeof window !== 'undefined' ? window.location.pathname : ''} />
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-2 min-h-12 w-full bg-transparent px-0 text-body"
                style={{
                  borderBottom: '1px solid var(--color-border)',
                  color: 'var(--color-text-primary)',
                }}
              />
            </div>
            <div className="flex items-start gap-3 text-left">
              <input
                id={consentId}
                type="checkbox"
                name="emailConsent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 size-4 shrink-0"
                style={{accentColor: 'var(--color-accent-ochre)'}}
                value="true"
              />
              <label htmlFor={consentId} className="text-xs leading-relaxed" style={{color: 'var(--color-text-tertiary)'}}>
                {consentText}
              </label>
            </div>
            {isError && (
              <p className="text-xs text-center" style={{color: 'var(--color-crimson, #dc2626)'}}>
                Something went wrong. Please try again.
              </p>
            )}
            <button
              type="submit"
              disabled={isLoading || !email.includes('@') || !consent}
              className="min-h-12 px-6 text-button uppercase transition-opacity disabled:opacity-40 hover:opacity-85"
              style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
            >
              {isLoading ? 'Submitting…' : 'Subscribe'}
            </button>
          </fetcher.Form>
        </div>
      </div>
    </section>
  );
}
