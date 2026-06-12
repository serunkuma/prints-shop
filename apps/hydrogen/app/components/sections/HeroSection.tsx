interface HeroSectionProps {
  section: any;
}

export function HeroSection({section}: HeroSectionProps) {
  return (
    <section className="container-gallery section-pad">
      <h1 className="text-display">{section.heading || 'Kumachi Prints'}</h1>
      <div className="accent-rule mt-6 mb-8" />
      {section.subheading && (
        <p className="text-h3 text-text-secondary max-w-2xl">{section.subheading}</p>
      )}
      {section.cta?.url && (
        <a
          href={section.cta.url}
          className="inline-block mt-8 py-4 px-8 bg-gold text-void text-button rounded-xs font-medium hover:opacity-90 transition-opacity"
        >
          {section.cta.label || 'Explore'}
        </a>
      )}
    </section>
  );
}
