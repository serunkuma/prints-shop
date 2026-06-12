import {Link} from 'react-router';

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container-gallery py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link to="/" className="text-h4 text-gold">Kumachi Prints</Link>
            <p className="text-body-small text-text-muted mt-3 max-w-sm">
              Premium art prints from the Kumachi catalogue. Every print has a story.
            </p>
          </div>
          <div>
            <h4 className="text-caption text-text-primary mb-4">Shop</h4>
            <nav className="space-y-2">
              <Link to="/collections" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Collections</Link>
              <Link to="/drops" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Drops</Link>
              <Link to="/artists" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Artists</Link>
              <Link to="/search" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Search</Link>
            </nav>
          </div>
          <div>
            <h4 className="text-caption text-text-primary mb-4">Info</h4>
            <nav className="space-y-2">
              <Link to="/pages/about" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">About</Link>
              <Link to="/pages/faq" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">FAQ</Link>
              <Link to="/policies/privacyPolicy" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Privacy</Link>
              <Link to="/policies/termsOfService" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Terms</Link>
              <Link to="/policies/refundPolicy" className="block text-body-small text-text-secondary hover:text-text-primary transition-colors">Returns</Link>
            </nav>
          </div>
        </div>
        <div className="border-t border-border mt-10 pt-6 text-center text-body-small text-text-muted">
          &copy; {new Date().getFullYear()} Kumachi. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
