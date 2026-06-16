import {useState, useMemo, useCallback} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronDown, SlidersHorizontal, X, Search} from 'lucide-react';
import {useLoaderData, useSearchParams, useRouteError, isRouteErrorResponse} from 'react-router';
import PathwaySwitch from '~/components/PathwaySwitch';
import {CategoryTiles} from '~/components/sections/CategoryTiles';
import {ProductGrid} from '~/components/product/ProductGrid';
import {FilterSidebar} from '~/components/collection/FilterSidebar';
import {getFallbackProducts} from '~/lib/localFallback.server';
import {OPENING_DROP_HANDLES} from '~/lib/allowlist';
import {ALL_PRODUCTS_QUERY} from '~/lib/queries';
import {PageShell} from '~/components/design/PageTemplates';
import {slugToLabel, testPrice} from '~/lib/productFacets';

const sortOptions = [
  {value: 'featured', label: 'Featured'},
  {value: 'newest', label: 'Newest'},
  {value: 'price-low', label: 'Price: Low to High'},
  {value: 'price-high', label: 'Price: High to Low'},
  {value: 'popular', label: 'Most Popular'},
];

export const meta = () => [
  {title: 'Collection — Kumachi Prints'},
  {name: 'description', content: 'Browse curated African art prints from Kumachi Prints. Filter by palette, region, genre, or price.'},
];

export async function loader({context}: {context: any}) {
  const [shopifyData, fallbackProducts] = await Promise.all([
    context.storefront.query(ALL_PRODUCTS_QUERY).catch(() => null),
    getFallbackProducts(context.env),
  ]);

  const products = (shopifyData?.products?.nodes?.filter(Boolean) || fallbackProducts || [])
    .filter((p: any) => OPENING_DROP_HANDLES.has(p.handle));
  return {products};
}

export default function CollectionIndex() {
  const {products} = useLoaderData<typeof loader>();
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const activeFilters = useMemo(() => ({
    color: searchParams.get('color')?.split(',').filter(Boolean) ?? [],
    region: searchParams.get('region')?.split(',').filter(Boolean) ?? [],
    genre: searchParams.get('genre') ? [searchParams.get('genre')!] : [],
    price: searchParams.get('price')?.split(',').filter(Boolean) ?? [],
  }), [searchParams]);

  const sortBy = searchParams.get('sort') ?? 'featured';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeFilters.color.length > 0) {
      result = result.filter((p: any) => {
        const productColors = p.facets?.colors || [];
        return activeFilters.color.some((c) => productColors.includes(c));
      });
    }
    if (activeFilters.region.length > 0) {
      result = result.filter((p: any) => {
        const productRegion = p.facets?.region;
        return productRegion && activeFilters.region.includes(productRegion);
      });
    }
    if (activeFilters.genre.length > 0) {
      result = result.filter((p: any) => {
        const productGenre = p.facets?.genre;
        return productGenre && activeFilters.genre.includes(productGenre);
      });
    }
    if (activeFilters.price.length > 0) {
      result = result.filter((p: any) => {
        const amount = p.priceRange?.minVariantPrice ? parseFloat(p.priceRange.minVariantPrice.amount) : 0;
        return activeFilters.price.some((range) => testPrice(range, amount));
      });
    }

    switch (sortBy) {
      case 'price-low':
        result.sort((a: any, b: any) => {
          const pa = a.priceRange?.minVariantPrice ? parseFloat(a.priceRange.minVariantPrice.amount) : 0;
          const pb = b.priceRange?.minVariantPrice ? parseFloat(b.priceRange.minVariantPrice.amount) : 0;
          return pa - pb;
        });
        break;
      case 'price-high':
        result.sort((a: any, b: any) => {
          const pa = a.priceRange?.minVariantPrice ? parseFloat(a.priceRange.minVariantPrice.amount) : 0;
          const pb = b.priceRange?.minVariantPrice ? parseFloat(b.priceRange.minVariantPrice.amount) : 0;
          return pb - pa;
        });
        break;
      case 'newest':
        result.sort((a: any, b: any) => {
          const aNew = a.tags?.includes?.('New') ? -1 : 1;
          const bNew = b.tags?.includes?.('New') ? -1 : 1;
          return aNew - bNew;
        });
        break;
    }

    return result;
  }, [products, activeFilters, sortBy]);

  const activeFilterCount = Object.values(activeFilters).reduce((sum, arr) => sum + arr.length, 0);

  const activeFilterPills: {key: string; label: string; value: string; category: string}[] = [];
  for (const [cat, values] of Object.entries(activeFilters)) {
    for (const v of values) {
      const label = slugToLabel(v, cat);
      if (label) activeFilterPills.push({key: `${cat}-${v}`, label, value: v, category: cat});
    }
  }

  function replaceUrlParams(params: URLSearchParams) {
    const qs = params.toString();
    const url = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
    window.history.replaceState(null, '', url);
    setSearchParams(params, {replace: true});
  }

  const handleFilterChange = useCallback((filters: Record<string, string[]>) => {
    const params = new URLSearchParams(window.location.search);
    for (const [key, values] of Object.entries(filters)) {
      if (values.length > 0) params.set(key, values.join(','));
      else params.delete(key);
    }
    replaceUrlParams(params);
  }, [setSearchParams]);

  const removeFilter = useCallback((category: string, value: string) => {
    const params = new URLSearchParams(window.location.search);
    const current = params.get(category);
    if (current) {
      const values = current.split(',').filter((v) => v !== value);
      if (values.length > 0) params.set(category, values.join(','));
      else params.delete(category);
    }
    replaceUrlParams(params);
  }, [setSearchParams]);

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete('color');
    params.delete('region');
    params.delete('genre');
    params.delete('price');
    replaceUrlParams(params);
  }, [setSearchParams]);

  const handleSortChange = useCallback((value: string) => {
    const params = new URLSearchParams(window.location.search);
    if (value === 'featured') params.delete('sort');
    else params.set('sort', value);
    replaceUrlParams(params);
  }, [setSearchParams]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  return (
    <PageShell>
      <section
        style={{
          backgroundColor: 'var(--color-bg-secondary)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div className="container-gallery grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center py-12 lg:py-16">
          <motion.div initial={{opacity: 0, y: 18}} animate={{opacity: 1, y: 0}} transition={{duration: 0.5}}>
            <PathwaySwitch compact />
            <p className="text-caption uppercase mt-8" style={{color: 'var(--color-accent-clay)'}}>
              Explore the print archive
            </p>
            <h1 className="text-h1 mt-3" style={{color: 'var(--color-text-primary)'}}>
              Curated prints for rooms with memory.
            </h1>
            <p className="text-body mt-5 max-w-[620px]" style={{color: 'var(--color-text-secondary)'}}>
              {products.length} prints available. Filter by palette, region, genre, or price, then choose the piece that feels made for the wall in front of you.
            </p>
          </motion.div>
          <motion.div
            initial={{opacity: 0, rotate: 3, y: 24}}
            animate={{opacity: 1, rotate: 2, y: 0}}
            transition={{duration: 0.65, delay: 0.15}}
            className="relative p-4"
            style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-strong)'}}
          >
            <img
              src="/images/pdp-room-mockup-01.jpg"
              alt="A styled room with framed Kumachi art"
              className="aspect-[5/4] w-full object-cover"
            />
            <div className="absolute -bottom-5 left-5 right-5 p-4" style={{backgroundColor: 'var(--color-surface-deep)', color: 'var(--color-bg-primary)'}}>
              <p className="text-caption uppercase" style={{color: 'var(--color-accent-ochre)'}}>Browse with intention</p>
              <p className="text-body-small mt-1" style={{color: '#eadbc4'}}>
                Browse by mood first, refine with filters second.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="py-12">
        <CategoryTiles />
      </div>

      <div className="container-gallery pb-24">
        <div className="flex items-center justify-between gap-4 mb-8 p-3 sm:p-4" style={{backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)'}}>
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 h-9 px-4 text-caption"
            style={{border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-bg-primary)'}}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]" style={{backgroundColor: 'var(--color-text-primary)', color: 'var(--color-bg-primary)'}}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <div className="hidden lg:flex items-center flex-wrap gap-2 flex-1">
            {activeFilterPills.map((pill) => (
              <span key={pill.key} className="inline-flex items-center gap-1.5 px-3 py-1 text-caption" style={{backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text-primary)'}}>
                {pill.label}
                <button onClick={() => removeFilter(pill.category, pill.value)} className="hover:opacity-60">
                  <X size={12} />
                </button>
              </span>
            ))}
            {activeFilterPills.length > 0 && (
              <button onClick={clearAllFilters} className="text-caption ml-1 hover:opacity-70 transition-opacity" style={{color: 'var(--color-accent-crimson)'}}>
                Clear All
              </button>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              aria-haspopup="menu"
              aria-expanded={sortOpen}
              className="flex min-h-11 items-center gap-2 text-body-small"
              style={{color: 'var(--color-text-secondary)'}}
            >
              Sort by:{' '}
              <span style={{color: 'var(--color-text-primary)'}}>{sortOptions.find((o) => o.value === sortBy)?.label}</span>
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setSortOpen(false)} />
                  <motion.div
                    initial={{opacity: 0, y: -4}}
                    animate={{opacity: 1, y: 0}}
                    exit={{opacity: 0, y: -4}}
                    transition={{duration: 0.15}}
                    className="absolute right-0 top-full mt-2 w-[200px] z-50 py-1"
                    role="menu"
                    style={{backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)'}}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        role="menuitem"
                        aria-label={`Sort by ${option.label}`}
                        onClick={() => { handleSortChange(option.value); setSortOpen(false); }}
                        className="w-full text-left px-4 py-2.5 text-body-small hover:bg-[var(--color-overlay)] transition-colors"
                        style={{color: sortBy === option.value ? 'var(--color-text-primary)' : 'var(--color-text-secondary)', fontWeight: sortBy === option.value ? 500 : 400}}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden lg:block text-text-muted text-xs tracking-wide mb-4">
          Showing {visibleProducts.length} of {filteredProducts.length}
        </div>

        <div className="flex gap-8">
          <FilterSidebar
            products={products}
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
            onClearAll={clearAllFilters}
            isMobileOpen={mobileFiltersOpen}
            onMobileClose={() => setMobileFiltersOpen(false)}
            showGenre={true}
            showPrice={true}
          />

          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="flex flex-col items-center justify-center py-24">
                <Search size={48} strokeWidth={1} style={{color: 'var(--color-text-tertiary)'}} />
                <h3 className="text-h3 font-display mt-6" style={{color: 'var(--color-text-secondary)'}}>No prints match your filters</h3>
                <p className="text-body-small mt-2" style={{color: 'var(--color-text-tertiary)'}}>Try adjusting your selections</p>
                <button onClick={clearAllFilters} className="mt-6 h-10 px-6 text-button transition-all duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]" style={{border: '1px solid var(--color-text-primary)', color: 'var(--color-text-primary)'}}>
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <>
                <ProductGrid products={visibleProducts} columns={4} />
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={() => setVisibleCount((c) => c + 6)}
                      className="h-12 px-8 text-button transition-all duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
                      style={{border: '1px solid var(--color-border)', color: 'var(--color-text-primary)', backgroundColor: 'var(--color-surface)'}}
                    >
                      Load More Prints
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </PageShell>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error) && error.status === 404) {
    return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Page not found.</p></main>;
  }
  return <main className="container-gallery section-pad"><p className="text-body text-text-secondary">Something went wrong.</p></main>;
}
