import ClipRevealImage from '~/components/motion/ClipRevealImage';

export function EditorialStorySection() {
  return (
    <section className="kumachi-section" style={{backgroundColor: 'var(--color-bg-primary)'}}>
      <div className="container-gallery grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-caption uppercase" style={{color: 'var(--color-accent-clay)'}}>Gallery eyes. Printmaker hands.</p>
          <h2 className="text-h2 mt-3" style={{color: 'var(--color-text-primary)'}}>A shop with gallery eyes and printmaker hands.</h2>
          <p className="text-body mt-5 max-w-[620px]" style={{color: 'var(--color-text-secondary)'}}>
            Kumachi Prints is a commerce-first art experience: curated editions, room-ready formats, and future tools for creating personal print concepts.
          </p>
          <p className="text-body mt-4 max-w-[620px]" style={{color: 'var(--color-text-secondary)'}}>
            The result is a calmer kind of shop. Collect what already exists, or begin with a memory and turn it into a print direction.
          </p>
        </div>
        <div className="p-4" style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-soft)'}}>
          <ClipRevealImage src="/images/pdp-room-mockup-02.jpg" alt="A framed Kumachi Prints artwork in a styled interior" className="aspect-[4/5]" />
        </div>
      </div>
    </section>
  );
}
