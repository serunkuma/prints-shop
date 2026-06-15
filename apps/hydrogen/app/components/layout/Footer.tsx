import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {Camera, MessageCircle, Moon, Sun} from 'lucide-react';
import {useRootLoaderData} from '~/lib/useRootLoaderData';

type FooterLink = {label: string; href: string; external?: boolean};

function navItemToLink(item: any): FooterLink | null {
  if (!item.label) return null;
  switch (item.type) {
    case 'path':
    case 'internal':
      return item.internalPath ? {label: item.label, href: item.internalPath} : null;
    case 'external':
      return item.externalUrl ? {label: item.label, href: item.externalUrl, external: true} : null;
    case 'collection':
      return item.collectionHandle ? {label: item.label, href: '/collections/' + item.collectionHandle} : null;
    case 'series':
      {
        const slug = item.seriesRef?.slug?.current || item.seriesRef?.slug;
        const refSlug =
          typeof item.seriesRef?._ref === 'string'
            ? item.seriesRef._ref.replace(/^series-/, '')
            : null;
        const handle = slug || refSlug;
        return handle ? {label: item.label, href: '/drops/' + handle} : null;
      }
    default:
      return null;
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

  const footerLinks = (Array.isArray(footerNav) ? footerNav : []).map(navItemToLink).filter(Boolean) as FooterLink[];
  const hasFooterLinks = footerLinks.length > 0;
  const groupedFooter = hasFooterLinks
    ? {
        Shop: footerLinks.filter((link) => ['Shop All', 'Opening Drop', 'Large Prints', 'Gift Guide'].includes(link.label)),
        Learn: footerLinks.filter((link) => ['Size Guide', 'Print Quality', 'Shipping And Returns', 'FAQ'].includes(link.label)),
        Kumachi: footerLinks.filter((link) => ['About', 'Contact', 'Tales Of Kuma'].includes(link.label)),
        Legal: footerLinks.filter((link) => ['Privacy Policy', 'Terms Of Service', 'Refund Policy'].includes(link.label)),
      }
    : null;

  return (
    <footer style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
      <div className="container-gallery grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <Link to="/" className="inline-flex min-h-16 items-center no-underline">
            <img src="/kumachi-prints-logo.svg" alt="Kumachi Prints" className="h-20 w-auto max-w-[240px] object-contain" />
          </Link>
          <p className="text-body-small mt-4 max-w-xs" style={{color: '#d8cbb7'}}>
            {siteDescription}
          </p>
          <div className="mt-5 flex gap-3">
            {socialLinks.instagram && (
              <a href={socialLinks.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center hover:opacity-75" style={{color: '#d8cbb7'}}>
                <Camera size={18} />
              </a>
            )}
            {socialLinks.twitter && (
              <a href={socialLinks.twitter} aria-label="X" target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center hover:opacity-75" style={{color: '#d8cbb7'}}>
                <MessageCircle size={18} />
              </a>
            )}
          </div>
        </div>
        {hasFooterLinks ? (
          <>
            <FooterColumn title="Shop" links={groupedFooter?.Shop || []} />
            <FooterColumn title="Learn" links={groupedFooter?.Learn || []} />
            <FooterColumn title="Kumachi" links={groupedFooter?.Kumachi || []} />
            <FooterColumn title="Legal" links={groupedFooter?.Legal || []} />
          </>
        ) : (
          <>
            <FooterColumn
              title="Shop"
              links={[
                {label: 'All Prints', href: '/collections'},
                {label: 'New Arrivals', href: '/collections/new-arrivals'},
                {label: 'Limited Editions', href: '/collections/limited-editions'},
                {label: 'The Drops', href: '/drops'},
                {label: 'Artists', href: '/artists'},
              ]}
            />
            <FooterColumn
              title="Kumachi"
              links={[
                {label: 'Kumachi Gallery', href: 'https://kumachigallery.com', external: true},
                {label: 'Kumachi Studio', href: 'https://kumachistudio.com', external: true},
                {label: 'About Ernest', href: 'https://eserunkuma.com', external: true},
              ]}
            />
            <FooterColumn
              title="Help"
              links={[
                {label: 'Shipping & Returns', href: '/pages/shipping'},
                {label: 'FAQ', href: '/pages/faq'},
                {label: 'Contact', href: '/pages/contact'},
                {label: 'Privacy Policy', href: '/policies/privacyPolicy'},
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

function FooterColumn({title, links}: {title: string; links: FooterLink[]}) {
  return (
    <div>
      <h3 className="text-caption uppercase" style={{color: 'var(--color-accent-ochre)'}}>
        {title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:opacity-75" style={{color: '#d8cbb7'}}>
                {link.label}
              </a>
            ) : (
              <Link to={link.href} className="hover:opacity-75" style={{color: '#d8cbb7'}}>
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
