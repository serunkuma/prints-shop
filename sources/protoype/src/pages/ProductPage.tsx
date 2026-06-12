import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Heart,
  Loader2,
  Lock,
  Minus,
  Plus,
  RefreshCw,
  Star,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import Breadcrumb from "@/components/Breadcrumb";
import FrameMockup from "@/components/FrameMockup";
import ProductCard from "@/components/ProductCard";
import ProductGallery, { type ProductGalleryImage } from "@/components/product/ProductGallery";
import { getArtistById } from "@/data/artists";
import { getMirrorProductByHandle } from "@/data/mirror";
import { getProductByHandle, getRelatedProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/useCartStore";

export default function ProductPage() {
  const { handle } = useParams<{ handle: string }>();
  const fallbackProduct = handle ? getProductByHandle(handle) : undefined;
  const [mirrorProduct, setMirrorProduct] = useState<Awaited<ReturnType<typeof getMirrorProductByHandle>> | undefined>(undefined);
  const product = mirrorProduct ?? (fallbackProduct ? { ...fallbackProduct, isMockProduct: true } : undefined);
  const artist = product ? getArtistById(product.artistId) : undefined;
  const artistProfile =
    artist ||
    (product?.artist
      ? {
          name: product.artist,
          location: product.artistLocation || "",
          bio: product.artistBio || "",
          portrait: "/images/artist-portrait.jpg",
        }
      : undefined);
  const relatedProducts = product && !product.isMirrorProduct ? getRelatedProducts(product) : [];

  const [quantity, setQuantity] = useState(1);
  const [wishlisted, setWishlisted] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [frameConfig, setFrameConfig] = useState({
    size: '16"×20"',
    material: "Matte Paper",
    frame: "black-metal",
  });
  const [atcState, setAtcState] = useState<"idle" | "loading" | "success">("idle");
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useCartStore((state) => state.openCart);

  const atcRef = useRef<HTMLDivElement>(null);
  const [showMobileBar, setShowMobileBar] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setMirrorProduct(undefined);
    if (!handle) return;
    getMirrorProductByHandle(handle).then((result) => {
      if (!cancelled) setMirrorProduct(result);
    });
    return () => {
      cancelled = true;
    };
  }, [handle]);

  useEffect(() => {
    if (!product) return;
    const initialSize = product.defaultSize || product.sizes[0] || '16"×20"';
    const initialMaterial = product.materials[0] || "Matte Paper";
    const initialFrame = product.frames[0] || "unframed";
    setCurrentPrice(product.sizePriceMap?.[initialSize] ?? product.price);
    setFrameConfig({ size: initialSize, material: initialMaterial, frame: initialFrame });
  }, [product?.sku, product?.handle]);

  useEffect(() => {
    const el = atcRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowMobileBar(!entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!product && mirrorProduct === undefined) {
    return (
      <main style={{ backgroundColor: "var(--color-bg-primary)", paddingTop: "140px", minHeight: "70vh" }}>
        <div className="container-gallery">
          <p className="text-body" style={{ color: "var(--color-text-secondary)" }}>Loading product...</p>
        </div>
      </main>
    );
  }

  if (!product) return <Navigate to="/collection" replace />;

  const handleAddToCart = async () => {
    setAtcState("loading");
    await new Promise((r) => setTimeout(r, 300));
    addItem({
      productId: product.id,
      handle: product.handle,
      title: product.title,
      artist: product.artist,
      size: `${frameConfig.size} / ${frameConfig.material}`,
      frame: frameConfig.frame,
      price: currentPrice,
      currency: product.currency,
      quantity,
      image: product.image,
    });
    setAtcState("success");
    toast.success("Added to cart");
    await new Promise((r) => setTimeout(r, 1000));
    setAtcState("idle");
    openCart();
  };

  const atcButton = (compact?: boolean) => (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={atcState !== "idle"}
      className={`text-button flex items-center justify-center transition-all duration-200 ${
        compact ? "h-10 gap-1.5 px-4 text-xs" : "h-[52px] w-full gap-2"
      } ${atcState === "success" ? "bg-grove text-void" : atcState === "loading" ? "bg-gold/80 text-void" : "bg-gold text-void"}`}
    >
      <AnimatePresence mode="wait">
        {atcState === "loading" ? (
          <motion.span
            key="loading"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Loader2 size={compact ? 14 : 18} className="animate-spin" />
            Adding...
          </motion.span>
        ) : atcState === "success" ? (
          <motion.span
            key="success"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check size={compact ? 14 : 18} />
            Added!
          </motion.span>
        ) : (
          <motion.span
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {compact ? "Add" : "Add to Cart"}
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );

  const renderStars = (rating: number) =>
    Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={14}
        fill={i < Math.floor(rating) ? "var(--color-accent-ochre)" : "none"}
        stroke={i < Math.floor(rating) ? "var(--color-accent-ochre)" : "var(--color-text-tertiary)"}
        strokeWidth={1.5}
      />
    ));

  const galleryImages: ProductGalleryImage[] = [
    { src: product.image, alt: `${product.title} print` },
    ...product.roomMockups.map((mockup, index) => ({
      src: mockup,
      alt: `${product.title} in room setting ${index + 1}`,
    })),
  ];

  return (
    <main className="min-h-dvh pt-24" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <section className="container-gallery grid grid-cols-1 gap-10 py-8 lg:grid-cols-[60%_40%] lg:gap-14">
        <div className="lg:col-span-2">
        <Breadcrumb
          items={[
            { label: "Home", path: "/" },
            { label: "Collection", path: "/collection" },
            { label: product.title },
          ]}
        />
        </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery images={galleryImages} />
          </div>

          <div className="pb-8">
            <p className="text-caption uppercase" style={{ color: "var(--color-accent-clay)" }}>
              {product.series || product.categoryName || product.genre}
            </p>
            <Link to={`/artists/${product.artistId}`} className="text-h4 font-display hover:underline" style={{ color: "var(--color-text-secondary)" }}>
              {product.artist}
            </Link>

            <h1 className="text-h1 font-display mt-1" style={{ color: "var(--color-text-primary)" }}>
              {product.title}
            </h1>
            {product.isMockProduct && (
              <p className="text-caption mt-2 uppercase" style={{ color: "var(--color-text-tertiary)" }}>
                Demo product fallback
              </p>
            )}

            <div className="mt-4">
              <div className="flex items-center gap-3">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={currentPrice}
                    className="text-price"
                    style={{ color: "var(--color-text-primary)" }}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {formatPrice(currentPrice)}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="font-sans text-xs mt-1" style={{ color: "var(--color-text-secondary)" }}>
                or 4 interest-free payments of {formatPrice(currentPrice / 4)} with Afterpay
              </p>
            </div>

            <div className="mt-2 flex items-center gap-2">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="text-caption" style={{ color: "var(--color-text-secondary)" }}>
                ({product.reviewCount} reviews)
              </span>
            </div>

            <p className="text-body mt-6 max-w-[440px]" style={{ color: "var(--color-text-secondary)" }}>
              {product.description}
            </p>

            <div className="mt-8 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
              <FrameMockup
                imageSrc={product.image}
                basePrice={product.price}
                availableSizes={product.sizes}
                defaultSize={product.defaultSize}
                availableMaterials={product.materials}
                availableFrames={product.frames}
                sizePriceMap={product.sizePriceMap}
                onPriceChange={setCurrentPrice}
                onConfigChange={setFrameConfig}
              />
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setShippingOpen(!shippingOpen)}
                className="flex w-full items-center justify-between py-3"
                style={{ borderTop: "1px solid var(--color-border)" }}
              >
                <span className="text-body-small font-medium" style={{ color: "var(--color-text-primary)" }}>
                  Shipping & Returns
                </span>
                <motion.div animate={{ rotate: shippingOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={18} style={{ color: "var(--color-text-secondary)" }} />
                </motion.div>
              </button>
              <AnimatePresence>
                {shippingOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="text-body-small pb-3" style={{ color: "var(--color-text-secondary)" }}>
                      {product.shippingNote || "Prints ship within 3-5 business days. Framed prints ship within 7-10 business days. Returns are accepted on unframed prints within 30 days."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div ref={atcRef} className="mt-8 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
              <div className="flex items-center gap-4">
                <span className="text-caption font-medium uppercase" style={{ color: "var(--color-text-secondary)" }}>
                  Quantity
                </span>
                <div className="flex h-11 items-center" style={{ border: "1px solid var(--color-border)" }}>
                  <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="flex h-full w-11 items-center justify-center hover:opacity-60" style={{ color: "var(--color-text-primary)" }}>
                    <Minus size={14} />
                  </button>
                  <span className="text-body-small w-14 text-center" style={{ color: "var(--color-text-primary)" }}>
                    {quantity}
                  </span>
                  <button type="button" onClick={() => setQuantity(quantity + 1)} className="flex h-full w-11 items-center justify-center hover:opacity-60" style={{ color: "var(--color-text-primary)" }}>
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {atcButton()}

              <div className="mt-3 flex items-center gap-1.5 text-xs" style={{ color: "var(--color-text-secondary)" }}>
                <Truck size={14} />
                <span>Estimated delivery 7-14 business days · Free over $75</span>
              </div>

              <button type="button" onClick={() => setWishlisted(!wishlisted)} className="mx-auto mt-4 flex items-center gap-2">
                <Heart
                  size={16}
                  fill={wishlisted ? "var(--color-accent-crimson)" : "none"}
                  stroke={wishlisted ? "var(--color-accent-crimson)" : "var(--color-text-secondary)"}
                  className="transition-colors duration-200"
                />
                <span className="text-caption" style={{ color: "var(--color-text-secondary)" }}>
                  {wishlisted ? "Saved" : "Add to Wishlist"}
                </span>
              </button>

              <div className="mt-6 flex items-center justify-between">
                {[
                  { icon: Lock, label: "Secure Checkout" },
                  { icon: Truck, label: "Careful Shipping" },
                  { icon: RefreshCw, label: "30-Day Returns" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-1">
                    <Icon size={18} strokeWidth={1.5} style={{ color: "var(--color-text-tertiary)" }} />
                    <span className="text-caption text-center" style={{ color: "var(--color-text-tertiary)" }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {artistProfile && (
              <div className="mt-12 pt-8" style={{ borderTop: "1px solid var(--color-border)" }}>
                <h3 className="text-h3 font-display" style={{ color: "var(--color-text-primary)" }}>
                  About the Artist
                </h3>
                <div className="mt-4 flex items-center gap-3">
                  <img src={artistProfile.portrait} alt={artistProfile.name} className="h-[60px] w-[60px] rounded-full object-cover" />
                  <div>
                    <p className="text-body font-medium" style={{ color: "var(--color-text-primary)" }}>
                      {artistProfile.name}
                    </p>
                    <p className="text-caption" style={{ color: "var(--color-text-secondary)" }}>
                      {artistProfile.location}
                    </p>
                  </div>
                </div>
                <p className="text-body-small mt-3" style={{ color: "var(--color-text-secondary)" }}>
                  {artistProfile.bio}
                </p>
              </div>
            )}

            <div className="mt-8">
              <h3 className="text-h3 font-display" style={{ color: "var(--color-text-primary)" }}>
                Print Details
              </h3>
              <div className="mt-4 space-y-3">
                {[
                  { label: "Dimensions", value: frameConfig.size },
                  { label: "Paper", value: product.printDetails?.paper || (frameConfig.material === "Canvas" ? "Archival canvas" : "310gsm archival matte paper") },
                  { label: "Ink", value: product.printDetails?.ink || "Archival Pigment" },
                  { label: "Edition", value: product.printDetails?.edition || (product.isLimited ? "Limited Edition, Signed" : "Open Edition, Signed") },
                  { label: "SKU", value: product.sku },
                ].map(({ label, value }) => (
                  <div key={label} className="flex">
                    <span className="text-caption w-28 flex-shrink-0 font-medium" style={{ color: "var(--color-text-secondary)" }}>
                      {label}
                    </span>
                    <span className="text-body-small" style={{ color: "var(--color-text-primary)" }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
      </section>

      {relatedProducts.length > 0 && (
        <section style={{ backgroundColor: "var(--color-bg-secondary)", padding: "var(--space-2xl) 0" }}>
          <div className="container-gallery">
            <div className="flex items-center justify-between gap-6">
              <h2 className="text-h2 font-display" style={{ color: "var(--color-text-primary)" }}>
                You May Also Like
              </h2>
              <Link to="/collection" className="text-nav hidden items-center gap-1 sm:flex" style={{ color: "var(--color-text-secondary)" }}>
                <ArrowLeft size={14} />
                Back to Collection
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-0 left-0 right-0 z-40 flex items-center gap-3 border-t bg-[var(--color-surface)] py-3 px-4 shadow-lg md:hidden"
            style={{ borderColor: "var(--color-border)" }}
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-body-small font-medium" style={{ color: "var(--color-text-primary)" }}>
                {product.title}
              </p>
              <p className="truncate text-xs" style={{ color: "var(--color-text-secondary)" }}>
                {frameConfig.size} / {frameConfig.material} / {frameConfig.frame}
              </p>
            </div>
            <div className="flex-shrink-0">
              {atcButton(true)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
