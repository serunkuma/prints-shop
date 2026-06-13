export function NewsletterSection() {
  return (
    <section className="kumachi-section" style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
      <div className="container-gallery grid grid-cols-1 gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <div>
          <p className="text-caption uppercase" style={{color: 'var(--color-accent-ochre)'}}>Stay close</p>
          <h2 className="text-h2 mt-3 max-w-3xl">New drops, studio notes, and print stories.</h2>
          <p className="text-body mt-5 max-w-xl" style={{color: '#d8cbb7'}}>
            Join the list for release notes and first looks. The real email integration comes after checkout QA.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(event) => event.preventDefault()}>
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input id="newsletter-email" type="email" placeholder="you@example.com" className="min-h-12 flex-1 border border-white/20 bg-white/10 px-4 text-sm text-white placeholder:text-white/60" />
          <button type="submit" className="min-h-12 bg-gold px-6 text-button uppercase text-void">Notify me</button>
        </form>
      </div>
    </section>
  );
}
