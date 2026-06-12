import {Link} from 'react-router';
import {Suspense} from 'react';
import {useUIStore} from '~/lib/store';

export function Header() {
  const toggleCart = useUIStore((s) => s.toggleCart);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const mobileMenuOpen = useUIStore((s) => s.mobileMenuOpen);

  return (
    <header className="sticky top-0 z-50 bg-void/90 backdrop-blur-md border-b border-border">
      <div className="container-gallery flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="text-h3 text-gold hover:opacity-80 transition-opacity">
          Kumachi Prints
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/collections" className="text-body-small text-text-secondary hover:text-text-primary transition-colors">Shop</Link>
          <Link to="/drops" className="text-body-small text-text-secondary hover:text-text-primary transition-colors">Drops</Link>
          <Link to="/artists" className="text-body-small text-text-secondary hover:text-text-primary transition-colors">Artists</Link>
          <Link to="/search" className="text-body-small text-text-secondary hover:text-text-primary transition-colors">Search</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/account" className="text-body-small text-text-secondary hover:text-text-primary transition-colors hidden md:inline">Account</Link>
          <button onClick={toggleCart} className="relative p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="Open cart">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 1h3l1.68 9.5a2 2 0 002 1.5h7.64a2 2 0 002-1.5L18 4H5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="7" cy="17" r="1.5"/><circle cx="15" cy="17" r="1.5"/></svg>
          </button>
          <button onClick={toggleMobileMenu} className="md:hidden p-2 text-text-secondary" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5"><path d={mobileMenuOpen ? 'M5 5l10 10M15 5l-10 10' : 'M3 5h14M3 10h14M3 15h14'} strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border px-4 py-6 space-y-4">
          <Link to="/collections" className="block text-body text-text-secondary" onClick={toggleMobileMenu}>Shop</Link>
          <Link to="/drops" className="block text-body text-text-secondary" onClick={toggleMobileMenu}>Drops</Link>
          <Link to="/artists" className="block text-body text-text-secondary" onClick={toggleMobileMenu}>Artists</Link>
          <Link to="/search" className="block text-body text-text-secondary" onClick={toggleMobileMenu}>Search</Link>
          <Link to="/account" className="block text-body text-text-secondary" onClick={toggleMobileMenu}>Account</Link>
        </nav>
      )}
    </header>
  );
}
