import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import {
  frameOptions,
  sizePrices,
  materialPrices,
  framePrices,
} from "@/data/products";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FrameMockupProps {
  imageSrc: string;
  basePrice: number;
  availableSizes?: string[];
  defaultSize?: string;
  availableMaterials?: string[];
  availableFrames?: string[];
  sizePriceMap?: Record<string, number>;
  showPurchaseFooter?: boolean;
  onPriceChange?: (price: number) => void;
  onConfigChange?: (config: {
    size: string;
    material: string;
    frame: string;
  }) => void;
}

const sizeGuideRows = [
  { size: "A4", dimensions: "8.3 × 11.7 in", best: "Desk, shelf, small wall cluster" },
  { size: "A3", dimensions: "11.7 × 16.5 in", best: "Feature wall accent" },
  { size: "A2", dimensions: "16.5 × 23.4 in", best: "Statement piece, above sofa" },
  { size: "50×70cm", dimensions: "19.7 × 27.6 in", best: "Gallery wall anchor" },
  { size: "70×100cm", dimensions: "27.6 × 39.4 in", best: "Full room statement" },
];

const frameOptionsInfo = [
  { name: "No Frame", color: "transparent", material: "—" },
  { name: "Black Frame", color: "var(--void)", material: "Aluminium / Wood" },
  { name: "White Frame", color: "var(--text-primary)", material: "Aluminium / Wood" },
  { name: "Natural Wood", color: "var(--gold-dim)", material: "Solid Pinewood" },
];

export default function FrameMockup({
  imageSrc,
  basePrice,
  availableSizes,
  defaultSize,
  availableMaterials,
  availableFrames,
  sizePriceMap,
  showPurchaseFooter = false,
  onPriceChange,
  onConfigChange,
}: FrameMockupProps) {
  const sizeOptions = availableSizes?.length ? availableSizes : ['8"×10"', '11"×14"', '16"×20"', '24"×36"'];
  const materialOptions = availableMaterials?.length ? availableMaterials : ["Matte Paper", "Canvas"];
  const frameIds = availableFrames?.length ? availableFrames : ["black-metal", "light-oak", "walnut", "unframed"];
  const frameChoices = frameOptions.filter((frame) => frameIds.includes(frame.id));
  const [selectedSize, setSelectedSize] = useState(defaultSize || sizeOptions[0]);
  const [selectedMaterial, setSelectedMaterial] = useState(materialOptions[0]);
  const [selectedFrame, setSelectedFrame] = useState(frameChoices[0]?.id || "unframed");
  const [added, setAdded] = useState(false);

  const currentFrame = frameOptions.find((f) => f.id === selectedFrame);
  const isLight = document.documentElement.getAttribute("data-theme") !== "dark";

  const calculatedPrice =
    (sizePriceMap?.[selectedSize] ?? basePrice + (sizePrices[selectedSize] || 0)) +
    (materialPrices[selectedMaterial] || 0) +
    (framePrices[selectedFrame] || 0);

  const calculatePrice = (size: string, material: string, frame: string) =>
    (sizePriceMap?.[size] ?? basePrice + (sizePrices[size] || 0)) +
    (materialPrices[material] || 0) +
    (framePrices[frame] || 0);

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    onConfigChange?.({ size, material: selectedMaterial, frame: selectedFrame });
    onPriceChange?.(calculatePrice(size, selectedMaterial, selectedFrame));
  };

  const handleMaterialChange = (material: string) => {
    setSelectedMaterial(material);
    onConfigChange?.({ size: selectedSize, material, frame: selectedFrame });
    onPriceChange?.(calculatePrice(selectedSize, material, selectedFrame));
  };

  const handleFrameChange = (frame: string) => {
    setSelectedFrame(frame);
    onConfigChange?.({ size: selectedSize, material: selectedMaterial, frame });
    onPriceChange?.(calculatePrice(selectedSize, selectedMaterial, frame));
  };

  const handleAddToCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <div className="w-full">
      <div
        className="relative w-full flex items-center justify-center p-8 sm:p-12"
        style={{
          aspectRatio: "1/1",
          backgroundColor: "var(--color-bg-tertiary)",
        }}
      >
        <div
          className="absolute"
          style={{
            width: "65%",
            height: "75%",
            boxShadow: isLight
                ? "0 20px 60px rgba(0,0,0,0.15)"
                : "0 20px 60px rgba(0,0,0,0.4)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          className="relative"
          style={{
            width: "65%",
            height: "75%",
            border:
              selectedFrame === "unframed"
                ? "none"
                : `${currentFrame?.width}px solid ${currentFrame?.color}`,
            boxShadow:
              selectedFrame === "unframed"
                ? "0 0 0 1px var(--color-border)"
                : "none",
            padding: selectedFrame === "unframed" ? "0" : "40px",
            backgroundColor: "#FAFAF5",
          }}
        >
          <img
            src={imageSrc}
            alt="Art print preview"
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="mt-6">
        <div className="flex items-center gap-3 mb-3">
          <p
            className="text-caption font-medium uppercase"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Size
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="text-xs text-gold underline leading-none">Size guide</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Size Guide</DialogTitle>
              </DialogHeader>
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-body-small" style={{ color: "var(--color-text-primary)" }}>
                  <thead>
                    <tr className="text-caption uppercase" style={{ color: "var(--color-text-secondary)" }}>
                      <th className="pb-3 pr-4">Size</th>
                      <th className="pb-3 pr-4">Dimensions</th>
                      <th className="pb-3">Best for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeGuideRows.map((row) => (
                      <tr key={row.size} style={{ borderTop: "1px solid var(--color-border)" }}>
                        <td className="py-2.5 pr-4 font-medium">{row.size}</td>
                        <td className="py-2.5 pr-4" style={{ color: "var(--color-text-secondary)" }}>{row.dimensions}</td>
                        <td className="py-2.5" style={{ color: "var(--color-text-secondary)" }}>{row.best}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => handleSizeChange(size)}
              className="px-4 py-1.5 text-caption transition-all duration-200"
              style={{
                border:
                  selectedSize === size
                    ? "none"
                    : "1px solid var(--color-border)",
                borderRadius: "100px",
                backgroundColor:
                  selectedSize === size
                    ? "var(--color-text-primary)"
                    : "transparent",
                color:
                  selectedSize === size
                    ? "var(--color-bg-primary)"
                    : "var(--color-text-primary)",
              }}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <p
          className="text-caption font-medium uppercase mb-3"
          style={{ color: "var(--color-text-secondary)" }}
        >
          Material
        </p>
        <div
          className="flex h-10 p-0.5"
          style={{
            backgroundColor: "var(--color-bg-tertiary)",
            border: "1px solid var(--color-border)",
            borderRadius: "100px",
          }}
        >
          {materialOptions.map((material) => (
            <button
              key={material}
              onClick={() => handleMaterialChange(material)}
              className="flex-1 text-caption transition-all duration-200"
              style={{
                borderRadius: "100px",
                backgroundColor:
                  selectedMaterial === material
                    ? "var(--color-bg-primary)"
                    : "transparent",
                color:
                  selectedMaterial === material
                    ? "var(--color-text-primary)"
                    : "var(--color-text-secondary)",
                boxShadow:
                  selectedMaterial === material
                    ? "0 1px 3px rgba(0,0,0,0.08)"
                    : "none",
              }}
            >
              {material}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5">
        <div className="flex items-center gap-3 mb-3">
          <p
            className="text-caption font-medium uppercase"
            style={{ color: "var(--color-text-secondary)" }}
          >
            Frame
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <button type="button" className="text-xs text-gold underline leading-none">What's included?</button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Framing Options</DialogTitle>
              </DialogHeader>
              <p className="text-body-small mt-4" style={{ color: "var(--color-text-secondary)" }}>
                Every framed print arrives ready to hang with a hand-finished solid wood or aluminium frame,
                archival-quality matting, UV-protective acrylic glazing, and pre-installed hanging hardware.
              </p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {frameOptionsInfo.map((fo) => (
                  <div
                    key={fo.name}
                    className="flex items-center gap-3 rounded p-3"
                    style={{ border: "1px solid var(--color-border)" }}
                  >
                    <div
                      className="h-8 w-8 flex-shrink-0 rounded"
                      style={{
                        backgroundColor: fo.color === "transparent" ? "var(--color-bg-primary)" : fo.color,
                        border: fo.color === "transparent" ? "1px solid var(--color-border)" : "none",
                      }}
                    />
                    <div>
                      <p className="text-body-small font-medium" style={{ color: "var(--color-text-primary)" }}>{fo.name}</p>
                      <p className="text-caption" style={{ color: "var(--color-text-tertiary)" }}>{fo.material}</p>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-3">
          {frameChoices.map((frame) => (
            <button
              key={frame.id}
              onClick={() => handleFrameChange(frame.id)}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="w-12 h-12 transition-all duration-200"
                style={{
                  border:
                    selectedFrame === frame.id
                      ? "2px solid var(--color-border-active)"
                      : "1px solid var(--color-border)",
                  backgroundColor:
                    frame.id === "unframed"
                      ? "var(--color-bg-primary)"
                      : frame.color,
                }}
              />
              <span
                className="text-caption"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {frame.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {showPurchaseFooter && (
        <div
          className="mt-6 flex items-center justify-between pt-6"
          style={{ borderTop: "1px solid var(--color-border)" }}
        >
          <div>
            <AnimatePresence mode="wait">
              <motion.p
                key={calculatedPrice}
                className="text-price"
                style={{ color: "var(--color-text-primary)" }}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
              >
                ${calculatedPrice.toFixed(2)}
              </motion.p>
            </AnimatePresence>
          </div>

          <button
            onClick={handleAddToCart}
            className="text-button flex h-11 items-center gap-2 px-6 transition-opacity duration-150 hover:opacity-85"
            style={{
              backgroundColor: "var(--color-text-primary)",
              color: "var(--color-bg-primary)",
            }}
          >
            <AnimatePresence mode="wait">
              {added ? (
                <motion.span
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} />
                  Added
                </motion.span>
              ) : (
                <motion.span
                  key="add"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Add to Cart
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      )}
    </div>
  );
}
