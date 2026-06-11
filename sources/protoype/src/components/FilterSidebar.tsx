import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X } from "lucide-react";
import { filterOptions } from "@/data/products";

interface ActiveFilters {
  color: string[];
  region: string[];
  genre: string[];
  price: string[];
}

interface FilterSidebarProps {
  activeFilters: ActiveFilters;
  onFilterChange: (filters: ActiveFilters) => void;
  mobile?: boolean;
  onClose?: () => void;
}

interface FilterGroupProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function FilterGroup({ title, children, defaultOpen = true }: FilterGroupProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      style={{
        borderBottom: "1px solid var(--color-border)",
        paddingBottom: "var(--space-md)",
        marginBottom: "var(--space-md)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-1"
      >
        <span
          className="text-caption font-medium uppercase"
          style={{ color: "var(--color-accent-clay)" }}
        >
          {title}
        </span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            size={16}
            style={{ color: "var(--color-text-secondary)" }}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FilterSidebar({
  activeFilters,
  onFilterChange,
  mobile,
  onClose,
}: FilterSidebarProps) {
  const toggleFilter = (
    category: keyof ActiveFilters,
    value: string
  ) => {
    const current = activeFilters[category];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange({ ...activeFilters, [category]: updated });
  };

  const clearAll = () => {
    onFilterChange({ color: [], region: [], genre: [], price: [] });
  };

  const hasActiveFilters = Object.values(activeFilters).some(
    (arr) => arr.length > 0
  );

  const content = (
    <>
      {mobile && (
        <div
          className="flex items-center justify-between pb-4 mb-2"
          style={{ borderBottom: "1px solid var(--color-border)" }}
        >
          <h3
            className="text-h4"
            style={{ color: "var(--color-text-primary)" }}
          >
            Filters
          </h3>
          <button onClick={onClose} style={{ color: "var(--color-text-primary)" }}>
            <X size={20} />
          </button>
        </div>
      )}

      {/* Color */}
      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-2">
          {filterOptions.color.map((color) => (
            <button
              key={color.value}
              onClick={() => toggleFilter("color", color.value)}
              className="flex items-center gap-2 transition-opacity duration-150 hover:opacity-80"
              title={color.label}
            >
              <div
                className="w-6 h-6 rounded-full transition-all duration-200"
                style={{
                  backgroundColor: color.swatch,
                  boxShadow: activeFilters.color.includes(color.value)
                    ? `0 0 0 2px var(--color-bg-primary), 0 0 0 3.5px var(--color-border-active)`
                    : "0 0 0 1px var(--color-border)",
                }}
              />
            </button>
          ))}
        </div>
      </FilterGroup>

      {/* Region */}
      <FilterGroup title="Region">
        <div className="space-y-2">
          {filterOptions.region.map((region) => (
            <label
              key={region}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-primary)",
                }}
              >
                {activeFilters.region.includes(region) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="var(--color-text-primary)"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={activeFilters.region.includes(region)}
                onChange={() => toggleFilter("region", region)}
                className="sr-only"
              />
              <span
                className="text-body-small"
                style={{ color: "var(--color-text-primary)" }}
              >
                {region}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Genre */}
      <FilterGroup title="Genre">
        <div className="space-y-2">
          {filterOptions.genre.map((genre) => (
            <label
              key={genre}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-primary)",
                }}
              >
                {activeFilters.genre.includes(genre) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="var(--color-text-primary)"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={activeFilters.genre.includes(genre)}
                onChange={() => toggleFilter("genre", genre)}
                className="sr-only"
              />
              <span
                className="text-body-small"
                style={{ color: "var(--color-text-primary)" }}
              >
                {genre}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {/* Price */}
      <FilterGroup title="Price">
        <div className="space-y-2">
          {filterOptions.price.map((price) => (
            <label
              key={price.value}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div
                className="w-[18px] h-[18px] flex items-center justify-center flex-shrink-0 transition-all duration-150"
                style={{
                  border: "1px solid var(--color-border)",
                  backgroundColor: "var(--color-bg-primary)",
                }}
              >
                {activeFilters.price.includes(price.value) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2 6L5 9L10 3"
                      stroke="var(--color-text-primary)"
                      strokeWidth="2"
                    />
                  </svg>
                )}
              </div>
              <input
                type="checkbox"
                checked={activeFilters.price.includes(price.value)}
                onChange={() => toggleFilter("price", price.value)}
                className="sr-only"
              />
              <span
                className="text-body-small"
                style={{ color: "var(--color-text-primary)" }}
              >
                {price.label}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      {hasActiveFilters && (
        <button
          onClick={clearAll}
          className="text-caption mt-2 hover:opacity-70 transition-opacity"
          style={{ color: "var(--color-accent-crimson)" }}
        >
          Clear All Filters
        </button>
      )}
    </>
  );

  if (mobile) {
    return (
    <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
        className="fixed inset-x-0 bottom-0 z-[70] rounded-t-2xl overflow-auto"
        style={{
          backgroundColor: "var(--color-surface)",
          maxHeight: "85vh",
          padding: "var(--space-lg) var(--space-lg) var(--space-xl)",
        }}
      >
        {content}
      </motion.div>
    );
  }

  return (
    <aside
      className="hidden lg:block w-[280px] flex-shrink-0 sticky top-[100px] self-start"
      style={{
        backgroundColor: "var(--color-surface)",
        border: "1px solid var(--color-border)",
        padding: "var(--space-lg)",
      }}
    >
      <div className="mb-5">
        <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
          Refine
        </p>
        <h2 className="text-h4 mt-1" style={{ color: "var(--color-text-primary)" }}>
          Find your print
        </h2>
      </div>
      {content}
    </aside>
  );
}
