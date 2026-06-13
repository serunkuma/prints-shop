import {useEffect, useState} from 'react';
import {Link} from 'react-router';
import {Camera, MessageCircle, Moon, Sun} from 'lucide-react';

export function Footer() {
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

  return (
    <footer style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
      <div className="container-gallery grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="inline-flex min-h-16 items-center no-underline">
            <img src="/kumachi-prints-logo.svg" alt="Kumachi Prints" className="h-20 w-auto max-w-[240px] object-contain" />
          </Link>
          <p className="text-body-small mt-4 max-w-xs" style={{color: '#d8cbb7'}}>
            Art for the walls you live with.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="https://instagram.com" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center hover:opacity-75" style={{color: '#d8cbb7'}}>
              <Camera size={18} />
            </a>
            <a href="https://x.com" aria-label="X" className="flex h-11 w-11 items-center justify-center hover:opacity-75" style={{color: '#d8cbb7'}}>
              <MessageCircle size={18} />
            </a>
          </div>
        </div>
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
      </div>
      <div className="container-gallery flex flex-col gap-4 py-5 text-xs sm:flex-row sm:items-center sm:justify-between" style={{borderTop: '1px solid rgba(255,255,255,0.12)', color: '#d8cbb7'}}>
        <p>© {new Date().getFullYear()} Kumachi Prints. All rights reserved.</p>
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
