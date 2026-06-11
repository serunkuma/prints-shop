import { useCallback, useState } from "react";
import type { Easing } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

const STYLES = ["Monarch", "Spirit", "Bold Colour", "Earth Tones", "Your Vision"];

const COLOUR_SWATCHES = [
  "#E8B84B",
  "#D94F3D",
  "#3CBFAA",
  "#E86B8A",
  "#4A9E6B",
  "#F0EDE6",
];

const SIZES = [
  { label: "A4", value: "a4", price: 2900 },
  { label: "A3", value: "a3", price: 3900 },
  { label: "A2", value: "a2", price: 5900 },
];

const easeOut: Easing = [0.22, 1, 0.36, 1];

const CONIC_GRADIENT =
  "conic-gradient(from 0deg, #E8B84B, #D94F3D, #3CBFAA, #E86B8A, #4A9E6B, #F0EDE6)";

function Dots() {
  return (
    <span className="inline-flex">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="text-current"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.4, ease: easeOut }}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

export default function CreatePage() {
  const [prompt, setPrompt] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");
  const [style, setStyle] = useState(STYLES[0]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [printName, setPrintName] = useState("");
  const [printSize, setPrintSize] = useState("a4");

  const toggleColour = useCallback((hex: string) => {
    setSelectedColours((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex],
    );
  }, []);

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;
    if (!prompt.trim()) {
      toast.error("Please describe your print first");
      return;
    }
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast.success("Print generated successfully");
    }, 2500);
  }, [isGenerating, prompt]);

  const handleOrder = useCallback(() => {
    const size = SIZES.find((s) => s.value === printSize);
    const label = size?.label ?? printSize;
    toast.success(`Added "${printName || "Untitled Print"}" (${label}) to cart`);
  }, [printName, printSize]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[480px_1fr] gap-0 min-h-screen">
      {/* Left Panel — The Studio */}
      <section className="bg-surface p-8 md:p-12 flex flex-col gap-8 overflow-y-auto">
        <div>
          <p className="text-xs uppercase tracking-widest text-gold">
            Kumachi AI Studio
          </p>
          <h1 className="mt-2 font-display text-3xl text-text-primary">
            Your imagination. Kumachi's hand.
          </h1>
        </div>

        {/* Style selector */}
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary mb-3">
            STYLE
          </p>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className={cn(
                  "rounded-full border px-4 py-1.5 text-sm transition-colors",
                  style === s
                    ? "bg-gold text-void border-gold"
                    : "border-border-mid text-text-secondary hover:text-text-primary",
                )}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Colour mood */}
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary mb-3">
            COLOUR MOOD
          </p>
          <div className="flex flex-wrap gap-3">
            {COLOUR_SWATCHES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => toggleColour(hex)}
                className={cn(
                  "h-9 w-9 rounded-full transition-shadow",
                  selectedColours.includes(hex)
                    ? "ring-2 ring-offset-2 ring-offset-surface ring-gold"
                    : "",
                )}
                style={{ backgroundColor: hex }}
                aria-label={`Colour ${hex}`}
              />
            ))}
          </div>
        </div>

        {/* Subject textarea */}
        <div>
          <p className="text-xs uppercase tracking-widest text-text-secondary mb-2">
            DESCRIBE YOUR PRINT
          </p>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A lion at rest. Gold light from the left. Flat colour, no shadows."
            className="min-h-[120px] bg-surface-mid border border-border-mid rounded-md resize-none"
            maxLength={200}
          />
          <p className="text-xs text-text-muted text-right mt-1">
            {prompt.length}/200
          </p>
        </div>

        {/* Negative prompt — collapsible */}
        <Collapsible open={advancedOpen} onOpenChange={setAdvancedOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              className="text-xs text-text-muted flex items-center gap-1 hover:text-text-secondary transition-colors"
            >
              {advancedOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
              + Advanced
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent className="pt-2 space-y-2">
            <p className="text-xs uppercase tracking-widest text-text-secondary">
              EXCLUDE FROM RESULT
            </p>
            <Textarea
              value={negativePrompt}
              onChange={(e) => setNegativePrompt(e.target.value)}
              placeholder="e.g. text, watermark, hands"
              className="min-h-[80px] bg-surface-mid border border-border-mid rounded-md resize-none text-sm"
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Generate button */}
        <div className="space-y-3">
          <Button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className={cn(
              "w-full min-h-12 rounded-md text-sm font-semibold transition-all cursor-pointer",
              generated && !isGenerating
                ? "bg-transparent border border-gold text-gold hover:bg-gold/10"
                : "bg-gold text-void hover:bg-gold/90",
            )}
          >
            {isGenerating ? (
              <>
                <Spinner className="mr-2 size-4" />
                Generating...
              </>
            ) : generated ? (
              "Regenerate"
            ) : (
              "Generate Print"
            )}
          </Button>
          <p className="text-xs text-text-muted text-center">
            Each generation is unique. Results are in the Kumachi visual style.
          </p>
        </div>
      </section>

      {/* Right Panel — The Preview */}
      <section className="bg-void p-8 md:p-12 sticky top-16 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {!isGenerating && !generated ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-[280px] h-[360px] border border-gold/20 rounded-lg flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: CONIC_GRADIENT, opacity: 0.06 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                />
                <p className="relative z-10 font-display italic text-lg text-text-muted text-center px-6">
                  Your print will appear here.
                </p>
              </div>
            </motion.div>
          ) : isGenerating ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-[280px] h-[360px] border border-gold/20 rounded-lg flex items-center justify-center overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  style={{ background: CONIC_GRADIENT, opacity: 0.15 }}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
                <p className="relative z-10 font-display italic text-lg text-text-muted text-center px-6">
                  Generating your print
                  <Dots />
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-6 w-full max-w-sm"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: easeOut }}
                className="w-[280px] h-[360px] rounded-lg border border-border-mid overflow-hidden"
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selectedColours[0] || COLOUR_SWATCHES[0]} 0%, transparent 60%), linear-gradient(135deg, ${COLOUR_SWATCHES[1] || COLOUR_SWATCHES[2]}, ${COLOUR_SWATCHES[3] || COLOUR_SWATCHES[4]})`,
                  }}
                />
              </motion.div>

              <div className="w-full space-y-2">
                <p className="text-xs uppercase tracking-widest text-text-secondary">
                  Name your print
                </p>
                <Input
                  value={printName}
                  onChange={(e) => setPrintName(e.target.value)}
                  placeholder="e.g. Golden Slumber"
                  className="bg-surface-mid border-border-mid text-text-primary"
                />
              </div>

              <div className="w-full space-y-2">
                <p className="text-xs uppercase tracking-widest text-text-secondary">
                  Size
                </p>
                <div className="flex gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => setPrintSize(size.value)}
                      className={cn(
                        "flex-1 rounded-md border px-3 py-2 text-sm transition-colors text-center",
                        printSize === size.value
                          ? "border-gold text-gold bg-gold/10"
                          : "border-border-mid text-text-secondary hover:text-text-primary",
                      )}
                    >
                      <span className="block">{size.label}</span>
                      <span className="block text-xs text-text-muted">
                        {formatPrice(size.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <Button
                type="button"
                onClick={handleOrder}
                className="w-full min-h-12 rounded-md bg-gold text-void text-sm font-semibold hover:bg-gold/90 cursor-pointer"
              >
                Order Print
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-2 rounded-md border border-border-mid bg-surface/50 px-4 py-3 text-xs text-text-secondary">
          <Award className="size-4 text-gold shrink-0" />
          Includes a Certificate of Generation
        </div>

        <p className="mt-4 text-xs text-text-muted text-center">
          47 people on the waitlist
        </p>
      </section>
    </main>
  );
}
