import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronDown, X} from 'lucide-react';
import {FACET_ALL, computeAvailableRegions} from '~/lib/productFacets';

interface FilterSidebarProps {
  products: any[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filters: Record<string, string[]>) => void;
  onClearAll: () => void;
  isMobileOpen: boolean;
  onMobileClose: () => void;
  showGenre?: boolean;
  showPrice?: boolean;
  genreSingleSelect?: boolean;
}

const filterLabels: Record<string, string> = {
  color: 'Color',
  region: 'Region',
  genre: 'Genre',
  price: 'Price',
};

export function FilterSidebar({
  products,
  activeFilters,
  onFilterChange,
  onClearAll,
  isMobileOpen,
  onMobileClose,
  showGenre = true,
  showPrice = true,
  genreSingleSelect = true,
}: FilterSidebarProps) {
  const [collapsedGroups, setCollapsedGroups] = useState<Set<string>>(new Set());

  const toggleGroup = (name: string) => {
    setCollapsedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const availableRegions = computeAvailableRegions(products);

  const hasRealPrices = products.some((p) => {
    const amount = p.priceRange?.minVariantPrice?.amount;
    return amount && parseFloat(amount) > 0;
  });

  const filterGroups: {category: string; options: {value: string; label: string; swatch?: string}[]}[] = [
    {category: 'color', options: FACET_ALL.color},
  ];

  const regionOptions = FACET_ALL.region.filter((r) => availableRegions.includes(r.value));
  if (regionOptions.length > 0) {
    filterGroups.push({category: 'region', options: regionOptions});
  }

  if (showGenre) {
    filterGroups.push({category: 'genre', options: FACET_ALL.genre});
  }

  if (showPrice) {
    filterGroups.push({category: 'price', options: FACET_ALL.price});
  }

  const multiSelect: Record<string, boolean> = {
    color: true,
    region: false,
    genre: genreSingleSelect ? false : true,
    price: false,
  };

  const toggleFilter = (category: string, value: string) => {
    const current = activeFilters[category] || [];
    let next: string[];
    if (multiSelect[category]) {
      next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
    } else {
      next = current.includes(value) ? [] : [value];
    }
    onFilterChange({...activeFilters, [category]: next});
  };

  const activeFilterCount = Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);

  const sidebarContent = (
    <div className="space-y-6">
      <div className="mb-2">
        <p className="text-caption uppercase tracking-wider" style={{color: 'var(--color-text-secondary)'}}>
          Refine
        </p>
        <p className="text-body-small mt-0.5" style={{color: 'var(--color-text-tertiary)'}}>
          Find your print
        </p>
      </div>

      {filterGroups.map(({category, options}) => {
        const isCollapsed = collapsedGroups.has(category);
        return (
          <div key={category}>
            <button
              onClick={() => toggleGroup(category)}
              className="flex items-center justify-between w-full py-1 text-caption uppercase tracking-wider"
              style={{color: 'var(--color-text-primary)'}}
              aria-expanded={!isCollapsed}
            >
              {filterLabels[category] || category}
              <motion.span
                animate={{rotate: isCollapsed ? 0 : 180}}
                transition={{duration: 0.2}}
              >
                <ChevronDown size={14} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {!isCollapsed && (
                <motion.div
                  key="content"
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  transition={{duration: 0.2}}
                  className="overflow-hidden"
                >
                  <div className="pt-2 pb-1 space-y-1">
                    {options.map((opt) => {
                      const isActive = (activeFilters[category] || []).includes(opt.value);
                      if (category === 'color') {
                        return (
                          <button
                            key={opt.value}
                            onClick={() => toggleFilter(category, opt.value)}
                            className={`flex items-center gap-2.5 w-full text-left px-2 py-1.5 text-body-small rounded transition-colors ${
                              isActive ? '' : 'hover:opacity-80'
                            }`}
                            style={{
                              backgroundColor: isActive ? 'var(--color-bg-secondary)' : 'transparent',
                              color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                            }}
                            aria-pressed={isActive}
                            aria-label={`Filter by ${opt.label}`}
                          >
                            <span
                              className="block w-4 h-4 rounded-full shrink-0"
                              style={{
                                backgroundColor: opt.swatch || opt.value,
                                border: '1px solid var(--color-border)',
                              }}
                            />
                            {opt.label}
                          </button>
                        );
                      }
                      return (
                        <button
                          key={opt.value}
                          onClick={() => toggleFilter(category, opt.value)}
                          className={`flex items-center gap-2.5 w-full text-left px-2 py-1.5 text-body-small rounded transition-colors ${
                            isActive ? '' : 'hover:opacity-80'
                          }`}
                          style={{
                            backgroundColor: isActive ? 'var(--color-bg-secondary)' : 'transparent',
                            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                          }}
                          aria-pressed={isActive}
                        >
                          <span
                            className="flex items-center justify-center w-4 h-4 shrink-0 rounded"
                            style={{
                              border: isActive
                                ? '1px solid var(--color-text-primary)'
                                : '1px solid var(--color-border)',
                              backgroundColor: isActive ? 'var(--color-text-primary)' : 'transparent',
                            }}
                          >
                            {isActive && <X size={10} strokeWidth={3} style={{color: 'var(--color-bg-primary)'}} />}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      {activeFilterCount > 0 && (
        <button
          onClick={onClearAll}
          className="w-full text-left px-2 py-2 text-body-small transition-opacity hover:opacity-70"
          style={{color: 'var(--color-accent-crimson)'}}
        >
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block w-[240px] shrink-0 sticky top-24 self-start">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="fixed inset-0 z-[60]"
              style={{backgroundColor: 'rgba(0,0,0,0.3)'}}
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{x: '100%'}}
              animate={{x: 0}}
              exit={{x: '100%'}}
              transition={{duration: 0.32, ease: [0.22, 1, 0.36, 1]}}
              className="fixed bottom-0 right-0 top-0 z-[70] w-[min(88vw,360px)] p-6 overflow-y-auto"
              style={{backgroundColor: 'var(--color-surface)', borderLeft: '1px solid var(--color-border)'}}
            >
              <div className="flex items-center justify-between mb-6">
                <p className="text-h4" style={{color: 'var(--color-text-primary)'}}>Filters</p>
                <button
                  onClick={onMobileClose}
                  aria-label="Close filters"
                  className="flex min-h-11 min-w-11 items-center justify-center"
                  style={{color: 'var(--color-text-primary)'}}
                >
                  <X size={20} strokeWidth={1.6} />
                </button>
              </div>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
