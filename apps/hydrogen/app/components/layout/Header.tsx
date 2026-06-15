import {useEffect, useState, useRef, useCallback} from 'react';
import {Link, NavLink, useLocation} from 'react-router';
import {AnimatePresence, motion} from 'framer-motion';
import {Menu, Moon, Search, ShoppingBag, Sun, X, ChevronDown} from 'lucide-react';
import {useUIStore} from '~/lib/store';
import {useRootLoaderData} from '~/lib/useRootLoaderData';
import {CollectionMegaMenu, MobileCollectionSubmenu} from './CollectionMegaMenu';

const primaryNav = [
  {label: 'Collection', to: '/collection'},
  {label: 'Create', to: '/create'},
  {label: 'Blog', to: '/blog/drops'},
  {label: 'About', to: '/about'},
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileCollectionOpen, setMobileCollectionOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const setCartOpen = useUIStore((state) => state.setCartOpen);
  const rootData = useRootLoaderData();
  const count = rootData?.cart?.totalQuantity || 0;
  const location = useLocation();
  const collectionRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem('kumachi-theme');
    const nextTheme = savedTheme === 'dark' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme !== 'dark');

    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, {passive: true});
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    window.localStorage.setItem('kumachi-theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
    document.documentElement.classList.toggle('light', nextTheme !== 'dark');
  };

  const openMegaMenu = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setMegaMenuOpen(true);
  }, []);

  const closeMegaMenu = useCallback(() => {
    closeTimeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 100);
  }, []);

  const cancelCloseMegaMenu = useCallback(() => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  return (
    <>
      <motion.header
        initial={{y: -64, opacity: 0}}
        animate={{y: 0, opacity: 1}}
        transition={{duration: 0.35, ease: [0.22, 1, 0.36, 1]}}
        className="fixed left-0 right-0 top-0 z-50"
      >
        <div
          className="flex h-20 items-center justify-between px-4 transition-all duration-300 md:px-12"
          style={{
            backgroundColor: scrolled
              ? 'color-mix(in srgb, var(--color-bg-primary) 88%, transparent)'
              : 'transparent',
            borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
            backdropFilter: scrolled ? 'blur(16px)' : 'none',
          }}
        >
          <Link to="/" className="flex min-h-14 min-w-14 items-center no-underline" aria-label="Kumachi Prints home">
            <img src="/kumachi-prints-logo.svg" alt="Kumachi Prints" className="h-14 w-auto max-w-[220px] object-contain md:h-16" />
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {primaryNav.map((item) =>
              item.label === 'Collection' ? (
                <button
                  key={item.to}
                  ref={collectionRef}
                  type="button"
                  onPointerEnter={openMegaMenu}
                  onPointerLeave={closeMegaMenu}
                  onClick={() => {
                    window.location.href = item.to;
                  }}
                  className="flex items-center gap-1 text-nav transition-colors"
                  style={{color: megaMenuOpen ? 'var(--color-text-primary)' : 'var(--color-text-secondary)'}}
                  aria-haspopup="true"
                  aria-expanded={megaMenuOpen}
                >
                  {item.label}
                  <ChevronDown
                    size={14}
                    className="transition-transform duration-200"
                    style={{transform: megaMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}
                  />
                </button>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  prefetch="intent"
                  className={({isActive}) =>
                    `text-nav transition-colors ${isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              to="/search"
              aria-label="Open search"
              className="flex min-h-11 min-w-11 items-center justify-center text-text-primary transition-colors hover:text-[var(--color-accent-ochre)]"
            >
              <Search size={20} strokeWidth={1.6} />
            </Link>
            <button
              type="button"
              aria-label="Toggle theme"
              onClick={toggleTheme}
              className="flex min-h-11 min-w-11 items-center justify-center text-text-primary transition-colors hover:text-[var(--color-accent-ochre)]"
            >
              {theme === 'light' ? <Moon size={20} strokeWidth={1.6} /> : <Sun size={20} strokeWidth={1.6} />}
            </button>
            <button
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
              className="relative flex min-h-11 min-w-11 items-center justify-center text-text-primary transition-colors hover:text-[var(--color-accent-ochre)]"
            >
              <ShoppingBag size={20} strokeWidth={1.6} />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{scale: 0}}
                    animate={{scale: [1, 1.4, 1]}}
                    exit={{scale: 0}}
                    transition={{type: 'spring', stiffness: 500, damping: 20}}
                    className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px] font-semibold"
                    style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileMenuOpen(true)}
              className="flex min-h-11 min-w-11 items-center justify-center text-text-primary md:hidden"
            >
              <Menu size={22} strokeWidth={1.6} />
            </button>
          </div>
        </div>

        <div
          onPointerEnter={cancelCloseMegaMenu}
          onPointerLeave={closeMegaMenu}
        >
          <CollectionMegaMenu
            isOpen={megaMenuOpen}
            onClose={() => setMegaMenuOpen(false)}
            triggerRef={collectionRef}
          />
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-[60]"
              style={{backgroundColor: 'color-mix(in srgb, var(--color-surface-deep) 70%, transparent)'}}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.aside
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.32, ease: [0.22, 1, 0.36, 1]}}
              className="fixed bottom-0 right-0 top-0 z-[70] w-[min(88vw,360px)] p-6 overflow-y-auto"
              style={{backgroundColor: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)'}}
            >
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileMenuOpen(false)}
                className="ml-auto flex min-h-11 min-w-11 items-center justify-center text-text-primary"
              >
                <X size={22} strokeWidth={1.6} />
              </button>
              <nav className="mt-10 flex flex-col gap-4" aria-label="Mobile navigation">
                {primaryNav.map((item) =>
                  item.label === 'Collection' ? (
                    <div key={item.to}>
                      <button
                        type="button"
                        onClick={() => setMobileCollectionOpen(!mobileCollectionOpen)}
                        className="flex items-center gap-2 w-full font-display text-4xl text-left"
                        style={{color: 'var(--color-text-primary)'}}
                      >
                        {item.label}
                        <ChevronDown
                          size={20}
                          className="transition-transform duration-200"
                          style={{transform: mobileCollectionOpen ? 'rotate(180deg)' : 'rotate(0deg)'}}
                        />
                      </button>
                      {mobileCollectionOpen && (
                        <MobileCollectionSubmenu />
                      )}
                    </div>
                  ) : (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-display text-4xl"
                      style={{color: 'var(--color-text-primary)', textDecoration: 'none'}}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
