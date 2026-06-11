import { useState, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal, X, Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import FilterSidebar from "@/components/FilterSidebar";
import { categoryMeta, filterOptions, getCategoryByHandle, products } from "@/data/products";
import PathwaySwitch from "@/components/PathwaySwitch";
import CategoryTiles from "@/components/sections/CategoryTiles";
import { Navigate, useParams, useSearchParams } from "react-router";

interface ActiveFilters {
  color: string[];
  region: string[];
  genre: string[];
  price: string[];
}

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "popular", label: "Most Popular" },
];

function matchesPriceRange(productPrice: number, range: string): boolean {
  switch (range) {
    case "under-100":
      return productPrice < 100;
    case "100-200":
      return productPrice >= 100 && productPrice <= 200;
    case "200-500":
      return productPrice > 200 && productPrice <= 500;
    case "over-500":
      return productPrice > 500;
    default:
      return true;
  }
}

export default function CollectionPage() {
  const { categoryHandle } = useParams();
  const category = categoryHandle ? getCategoryByHandle(categoryHandle) : undefined;

  const [searchParams, setSearchParams] = useSearchParams();

  const activeFilters: ActiveFilters = useMemo(() => ({
    color: searchParams.get("color")?.split(",").filter(Boolean) ?? [],
    region: searchParams.get("region")?.split(",").filter(Boolean) ?? [],
    genre: searchParams.get("genre") ? [searchParams.get("genre")!] : [],
    price: searchParams.get("price")?.split(",").filter(Boolean) ?? [],
  }), [searchParams]);

  const sortBy = searchParams.get("sort") ?? "featured";

  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(12);

  const filteredProducts = useMemo(() => {
    let result = category ? products.filter(category.matcher) : [...products];

    // Apply filters
    if (activeFilters.color.length > 0) {
      result = result.filter((p) =>
        p.colors.some((c) => activeFilters.color.includes(c))
      );
    }
    if (activeFilters.region.length > 0) {
      result = result.filter((p) =>
        activeFilters.region.some((r) => p.region.includes(r))
      );
    }
    if (activeFilters.genre.length > 0) {
      result = result.filter((p) => activeFilters.genre.includes(p.genre));
    }
    if (activeFilters.price.length > 0) {
      result = result.filter((p) =>
        activeFilters.price.some((range) => matchesPriceRange(p.price, range))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) =>
          a.tags.includes("New") && !b.tags.includes("New") ? -1 : 1
        );
        break;
      case "popular":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return result;
  }, [activeFilters, sortBy, category]);

  const activeFilterCount = Object.values(activeFilters).reduce(
    (sum, arr) => sum + arr.length,
    0
  );

  // Build active filter pills for display
  const activeFilterPills: { key: string; label: string; value: string; category: keyof ActiveFilters }[] = [];
  activeFilters.color.forEach((v) => {
    const color = filterOptions.color.find((c) => c.value === v);
    if (color) activeFilterPills.push({ key: `color-${v}`, label: color.label, value: v, category: "color" });
  });
  activeFilters.region.forEach((v) => activeFilterPills.push({ key: `region-${v}`, label: v, value: v, category: "region" }));
  activeFilters.genre.forEach((v) => activeFilterPills.push({ key: `genre-${v}`, label: v, value: v, category: "genre" }));
  activeFilters.price.forEach((v) => {
    const price = filterOptions.price.find((p) => p.value === v);
    if (price) activeFilterPills.push({ key: `price-${v}`, label: price.label, value: v, category: "price" });
  });

  const handleFilterChange = useCallback((filters: ActiveFilters) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (filters.color.length > 0) params.set("color", filters.color.join(","));
      else params.delete("color");
      if (filters.region.length > 0) params.set("region", filters.region.join(","));
      else params.delete("region");
      if (filters.genre.length > 0) params.set("genre", filters.genre[0]);
      else params.delete("genre");
      if (filters.price.length > 0) params.set("price", filters.price.join(","));
      else params.delete("price");
      return params;
    }, { replace: true });
  }, [setSearchParams]);

  const removeFilter = useCallback((category: keyof ActiveFilters, value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      const key = category as string;
      const current = params.get(key);
      if (current) {
        const values = current.split(",").filter((v) => v !== value);
        if (values.length > 0) params.set(key, values.join(","));
        else params.delete(key);
      }
      return params;
    }, { replace: true });
  }, [setSearchParams]);

  const clearAllFilters = useCallback(() => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      params.delete("color");
      params.delete("region");
      params.delete("genre");
      params.delete("price");
      return params;
    }, { replace: true });
  }, [setSearchParams]);

  const handleSortChange = useCallback((value: string) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value === "featured") params.delete("sort");
      else params.set("sort", value);
      return params;
    }, { replace: true });
  }, [setSearchParams]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  if (categoryHandle && !category) return <Navigate to="/collection" replace />;

  return (
    <main
      style={{
        backgroundColor: "var(--color-bg-primary)",
        minHeight: "100vh",
      }}
    >
      <section
        style={{
          paddingTop: "112px",
          background:
            "linear-gradient(135deg, var(--color-bg-primary) 0%, var(--color-bg-secondary) 100%)",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
        <div className="container-gallery grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center py-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PathwaySwitch compact />
            <p className="text-caption uppercase mt-8" style={{ color: "var(--color-accent-clay)" }}>
              {category ? "Category archive" : "Explore the print archive"}
            </p>
            <h1 className="text-h1 mt-3" style={{ color: "var(--color-text-primary)" }}>
              {category ? category.title : "Curated prints for rooms with memory."}
            </h1>
            <p className="text-body mt-5 max-w-[620px]" style={{ color: "var(--color-text-secondary)" }}>
              {category
                ? `${category.description} Browse ${filteredProducts.length} matching prints, then refine by palette, region, genre, or price.`
                : `${products.length} prints by 4 artists. Filter by palette, region, genre, or price, then choose the piece that feels made for the wall in front of you.`}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, rotate: 3, y: 24 }}
            animate={{ opacity: 1, rotate: 2, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15 }}
            className="relative p-4"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-strong)",
            }}
          >
            <img
              src="/images/pdp-room-mockup-01.jpg"
              alt="A styled room with framed Kumachi art"
              className="aspect-[5/4] w-full object-cover"
            />
            <div
              className="absolute -bottom-5 left-5 right-5 p-4"
              style={{
                backgroundColor: "var(--color-surface-deep)",
                color: "var(--color-bg-primary)",
              }}
            >
              <p className="text-caption uppercase" style={{ color: "var(--color-accent-ochre)" }}>
                Category guide
              </p>
              <p className="text-body-small mt-1" style={{ color: "#eadbc4" }}>
                Browse by mood first, refine with filters second.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="py-12">
        {!category && <CategoryTiles compact />}
        {category && (
          <div className="container-gallery">
            <div className="flex flex-wrap gap-2">
              {categoryMeta.map((item) => (
                <a
                  key={item.handle}
                  href={`/collection/${item.handle}`}
                  className="min-h-11 px-4 inline-flex items-center text-caption uppercase"
                  style={{
                    border: "1px solid var(--color-border)",
                    backgroundColor: item.handle === category.handle ? "var(--color-text-primary)" : "var(--color-surface)",
                    color: item.handle === category.handle ? "var(--color-bg-primary)" : "var(--color-text-primary)",
                  }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filter Bar + Grid */}
      <div className="container-gallery pb-24">
        {/* Filter & Sort Bar */}
        <div
          className="flex items-center justify-between gap-4 mb-8 p-3 sm:p-4"
          style={{
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 h-9 px-4 text-caption"
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text-primary)",
              backgroundColor: "var(--color-bg-primary)",
            }}
          >
            <SlidersHorizontal size={14} />
            Filters
            {activeFilterCount > 0 && (
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center text-[10px]"
                style={{
                  backgroundColor: "var(--color-text-primary)",
                  color: "var(--color-bg-primary)",
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Active Filter Pills (desktop) */}
          <div className="hidden lg:flex items-center flex-wrap gap-2 flex-1">
            {activeFilterPills.map((pill) => (
              <span
                key={pill.key}
                className="inline-flex items-center gap-1.5 px-3 py-1 text-caption"
                style={{
                  backgroundColor: "var(--color-bg-secondary)",
                  color: "var(--color-text-primary)",
                }}
              >
                {pill.label}
                <button
                  onClick={() =>
                    removeFilter(
                      pill.category,
                      pill.value
                    )
                  }
                  className="hover:opacity-60"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
            {activeFilterPills.length > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-caption ml-1 hover:opacity-70 transition-opacity"
                style={{ color: "var(--color-accent-crimson)" }}
              >
                Clear All
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen(!sortOpen)}
              className="flex items-center gap-2 text-body-small"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Sort by:{" "}
              <span style={{ color: "var(--color-text-primary)" }}>
                {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
              <ChevronDown size={14} />
            </button>
            <AnimatePresence>
              {sortOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setSortOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-[200px] z-50 py-1"
                    style={{
                      backgroundColor: "var(--color-bg-secondary)",
                      border: "1px solid var(--color-border)",
                    }}
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          handleSortChange(option.value);
                          setSortOpen(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-body-small hover:bg-[var(--color-overlay)] transition-colors"
                        style={{
                          color:
                            sortBy === option.value
                              ? "var(--color-text-primary)"
                              : "var(--color-text-secondary)",
                          fontWeight: sortBy === option.value ? 500 : 400,
                        }}
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

        {/* Product count info */}
        <div className="hidden lg:block text-text-muted text-xs tracking-wide mb-4">
          Showing {visibleProducts.length} of {filteredProducts.length}
        </div>

        {/* Grid Layout */}
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <FilterSidebar
            activeFilters={activeFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-24"
              >
                <Search
                  size={48}
                  strokeWidth={1}
                  style={{ color: "var(--color-text-tertiary)" }}
                />
                <h3
                  className="text-h3 font-display mt-6"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  No prints match your filters
                </h3>
                <p
                  className="text-body-small mt-2"
                  style={{ color: "var(--color-text-tertiary)" }}
                >
                  Try adjusting your selections
                </p>
                <button
                  onClick={clearAllFilters}
                  className="mt-6 h-10 px-6 text-button transition-all duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
                  style={{
                    border: "1px solid var(--color-text-primary)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Clear All Filters
                </button>
              </motion.div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6">
                  {visibleProducts.map((product, index) => (
                    <div
                      key={product.id}
                      className={index > 3 && index % 7 === 0 ? "xl:col-span-2" : ""}
                    >
                      <ProductCard
                        product={product}
                        index={index}
                        featured={index > 3 && index % 7 === 0}
                      />
                    </div>
                  ))}
                </div>

                {/* Load More */}
                {hasMore && (
                  <div className="flex justify-center mt-12">
                    <button
                      onClick={() => setVisibleCount((c) => c + 6)}
                      className="h-12 px-8 text-button transition-all duration-200 hover:bg-[var(--color-text-primary)] hover:text-[var(--color-bg-primary)]"
                      style={{
                        border: "1px solid var(--color-border)",
                        color: "var(--color-text-primary)",
                        backgroundColor: "var(--color-surface)",
                      }}
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

      {/* Mobile Filter Overlay */}
      <AnimatePresence>
        {mobileFiltersOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60]"
              style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
              onClick={() => setMobileFiltersOpen(false)}
            />
            <FilterSidebar
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              mobile
              onClose={() => setMobileFiltersOpen(false)}
            />
          </>
        )}
      </AnimatePresence>
    </main>
  );
}
