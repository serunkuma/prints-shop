interface NewsletterSectionProps {
  section: any;
}

export function NewsletterSection({section}: NewsletterSectionProps) {
  if (!section.heading) return null;

  return (
    <section className="container-gallery section-pad">
      <div className="card-surface rounded-xs p-8 md:p-12 text-center max-w-lg mx-auto">
        <h2 className="text-h2 mb-4">{section.heading}</h2>
        {section.description && <p className="text-body text-text-secondary mb-8">{section.description}</p>}
        <form
          action="https://kumachi.us21.list-manage.com/subscribe/post?u=PLACEHOLDER&amp;id=PLACEHOLDER"
          method="post"
          target="_blank"
          className="flex gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            name="EMAIL"
            placeholder="Your email"
            required
            className="flex-1 px-4 py-3 bg-surface-mid border border-border rounded-xs text-body placeholder:text-text-muted focus:outline-none focus:border-gold"
          />
          <button type="submit" className="px-6 py-3 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity flex-shrink-0">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
