import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sun, Moon, ShoppingBag, X } from "lucide-react";
import { useStore } from "@/store/useStore";

const navLinks = [
  { label: "Collection", path: "/collection" },
  { label: "Create", path: "/create" },
  { label: "Drops", path: "/drops" },
  { label: "Artists", path: "/artists" },
  { label: "About", path: "/about" },
];

export default function Header() {
  const { theme, toggleTheme, cartCount, setCartOpen, mobileMenuOpen, setMobileMenuOpen } = useStore();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, setMobileMenuOpen]);

  const count = cartCount();

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between transition-all duration-200"
        style={{
          paddingLeft: "var(--grid-margin-mobile)",
          paddingRight: "var(--grid-margin-mobile)",
          backgroundColor: scrolled ? "rgba(255,250,240,0.86)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
        }}
      >
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-3 z-10" style={{ textDecoration: "none" }}>
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
              <rect width="28" height="28" fill="var(--color-accent-ochre)" />
              <rect x="8" y="6" width="12" height="16" fill="none" stroke="#15120d" strokeWidth="2" />
            </svg>
            <div className="flex flex-col leading-none">
              <span className="font-display text-sm" style={{ color: "var(--color-text-primary)" }}>
                Kumachi
              </span>
              <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
                Prints
              </span>
            </div>
          </div>
          <span className="text-caption hidden sm:inline" style={{ color: "var(--color-text-tertiary)" }}>
            /
          </span>
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              Gallery
            </span>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              ·
            </span>
            <span className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>
              Studio
            </span>
          </div>
        </Link>

        {/* Center: Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-nav relative group py-1"
              style={{ color: "var(--color-text-secondary)" }}
            >
              <span className="group-hover:text-[var(--color-text-primary)] transition-colors duration-150">
                {link.label}
              </span>
              <span
                className="absolute bottom-0 left-0 h-px bg-[var(--color-text-primary)] transition-all duration-200 ease-out"
                style={{
                  width: location.pathname === link.path ? "100%" : "0%",
                }}
              />
              <span className="absolute bottom-0 left-0 w-0 h-px bg-[var(--color-text-primary)] group-hover:w-full transition-all duration-200 ease-out" />
            </Link>
          ))}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-4 z-10">
          <button
            aria-label="Search"
            className="hover:opacity-60 transition-opacity duration-150 hidden sm:block"
            style={{ color: "var(--color-text-primary)" }}
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hover:opacity-60 transition-opacity duration-150"
            style={{ color: "var(--color-text-primary)" }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {theme === "light" ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Sun size={20} strokeWidth={1.5} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Moon size={20} strokeWidth={1.5} />
                </motion.div>
              )}
            </AnimatePresence>
          </button>

          <button
            aria-label="Open cart"
            onClick={() => setCartOpen(true)}
            className="relative hover:opacity-60 transition-opacity duration-150"
            style={{ color: "var(--color-text-primary)" }}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />
            {count > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-medium"
                style={{
                  backgroundColor: "var(--color-accent-ochre)",
                  color: "#1A1A1A",
                }}
              >
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-nav uppercase"
            style={{ color: "var(--color-text-primary)" }}
          >
            {mobileMenuOpen ? <X size={20} /> : "Menu"}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: "var(--color-bg-primary)" }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
              >
                <Link
                  to={link.path}
                  className="text-h3 font-display"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
