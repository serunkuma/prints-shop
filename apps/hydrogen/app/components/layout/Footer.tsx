import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {Camera, MessageCircle, Moon, Sun} from 'lucide-react';
import {useRootLoaderData} from '~/lib/useRootLoaderData';

function navItemToLink(item: any): [string, string] {
  switch (item.type) {
    case 'internal':
      return [item.label || '', item.internalPath || '/'];
    case 'external':
      return [item.label || '', item.externalUrl || '/'];
    case 'collection':
      return [item.label || '', '/collections/' + (item.collectionHandle || '')];
    default:
      return [item.label || '', '/'];
  }
}

export function Footer() {
  const rootData = useRootLoaderData();
  const settings = rootData?.settings;
  const footerNav = settings?.footerNavigation || [];
  const socialLinks = settings?.socialLinks || {};
  const siteDescription = settings?.siteDescription || 'Art for the walls you live with.';

  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    window.localStorage.setItem('kumachi-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme !== 'dark');
  };

  const hasFooterLinks = Array.isArray(footerNav) && footerNav.length > 0;

  return (
    <footer style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
      <div className="container-gallery grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex min-h-16 items-center no-underline">
            <img src="/kumachi-prints-logo.svg" alt="Kumachi Prints" className="h-20 w-auto max-w-[240px] object-contain" />
          </Link>
          <p className="text-body-small mt-4 max-w-xs" style={{color: '#d8cbb7'}}>
            {siteDescription}
          </p>
          <div className="mt-5 flex gap-3">
            {(socialLinks.instagram || true) && (
              <a href={socialLinks.instagram || 'https://instagram.com'} aria-label="Instagram" className="flex h-11 w-11 items-center justify-center hover:opacity-75" style={{color: '#d8cbb7'}}>
                <Camera size={18} />
              </a>
            )}
            {(socialLinks.twitter || true) && (
              <a href={socialLinks.twitter || 'https://x.com'} aria-label="X" className="flex h-11 w-11 items-center justify-center hover:opacity-75" style={{color: '#d8cbb7'}}>
                <MessageCircle size={18} />
              </a>
            )}
          </div>
        </div>
        {hasFooterLinks ? (
          renderFooterColumns(footerNav)
        ) : (
          <>
            <FooterColumn
              title="Shop"
              links={[
                ['All Prints', '/collections'],
                ['New Arrivals', '/collections/new-arrivals'],
                ['Limited Editions', '/collections/limited-editions'],
                ['The Drops', '/drops'],
                ['Artists', '/artists'],
              ]}
            />
            <FooterColumn
              title="Kumachi"
              links={[
                ['Kumachi Gallery', 'https://kumachigallery.com'],
                ['Kumachi Studio', 'https://kumachistudio.com'],
                ['About Ernest', 'https://eserunkuma.com'],
              ]}
              external
            />
            <FooterColumn
              title="Help"
              links={[
                ['Shipping & Returns', '/pages/shipping'],
                ['FAQ', '/pages/faq'],
                ['Contact', '/pages/contact'],
                ['Privacy Policy', '/policies/privacyPolicy'],
              ]}
            />
          </>
        )}
      </div>
      <div className="container-gallery flex flex-col gap-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between" style={{borderTop: '1px solid rgba(255,255,255,0.12)', color: '#d8cbb7'}}>
        <p>&copy; {new Date().getFullYear()} Kumachi Prints. All rights reserved.</p>
        <button
          type="button"
          onClick={toggleTheme}
          className="flex min-h-11 items-center hover:opacity-75"
        >
          {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      </div>
    </footer>
  );
}

function renderFooterColumns(items: any[]) {
  const groups: {title: string; links: [string, string][]; external: boolean}[] = [];
  let current: {title: string; links: [string, string][]; external: boolean} | null = null;

  for (const item of items) {
    if (!item.label) continue;
    const isGroup = item.type === 'group';
    if (isGroup) {
      if (current) groups.push(current);
      current = {title: item.label, links: [], external: false};
    } else if (current) {
      const [label, href] = navItemToLink(item);
      const isExternal = item.type === 'external';
      current.links.push([label, href]);
      if (isExternal) current.external = true;
    }
  }
  if (current) groups.push(current);

  if (groups.length === 0) return null;

  return groups.map((g) => (
    <FooterColumn key={g.title} title={g.title} links={g.links} external={g.external} />
  ));
}

function FooterColumn({title, links, external}: {title: string; links: [string, string][]; external?: boolean}) {
  return (
    <div>
      <h3 className="text-caption uppercase" style={{color: 'var(--color-accent-ochre)'}}>
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map(([label, href]) => (
          <li key={label}>
            {external ? (
              <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={{color: '#d8cbb7'}}>
                {label}
              </a>
            ) : (
              <Link to={href} className="hover:opacity-75" style={{color: '#d8cbb7'}}>
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
