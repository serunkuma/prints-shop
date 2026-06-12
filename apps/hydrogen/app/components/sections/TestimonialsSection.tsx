interface TestimonialsSectionProps {
  section: any;
}

export function TestimonialsSection({section}: TestimonialsSectionProps) {
  const items = section.testimonials || [];

  if (!items.length) return null;

  return (
    <section className="container-gallery section-pad">
      {section.title && <h2 className="text-h2 text-center mb-10">{section.title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        {items.map((item: any, i: number) => (
          <div key={i} className="card-surface rounded-xs p-6">
            <p className="text-body text-text-secondary leading-relaxed mb-4 italic">&ldquo;{item.quote}&rdquo;</p>
            <p className="text-body-small text-text-muted">— {item.author}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
