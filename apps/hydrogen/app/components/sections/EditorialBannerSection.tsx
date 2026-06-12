interface EditorialBannerSectionProps {
  section: any;
}

export function EditorialBannerSection({section}: EditorialBannerSectionProps) {
  if (!section.heading) return null;

  return (
    <section className="container-gallery section-pad">
      <div className="card-surface rounded-xs p-8 md:p-12 lg:p-16">
        <div className="max-w-2xl">
          <h2 className="text-h2 mb-6">{section.heading}</h2>
          {section.body && <p className="text-body text-text-secondary leading-relaxed mb-8">{section.body}</p>}
          {section.cta?.url && (
            <a href={section.cta.url} className="text-gold text-body font-medium hover:opacity-80 transition-opacity">
              {section.cta.label || 'Learn more'} &rarr;
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
