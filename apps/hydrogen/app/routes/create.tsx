import {useCallback, useState} from 'react';
import type {Easing} from 'framer-motion';
import {motion, AnimatePresence} from 'framer-motion';
import {Award, ChevronDown, ChevronUp} from 'lucide-react';
import {toast} from 'sonner';
import {formatPrice} from '~/lib/format';

const STYLES = ['Monarch', 'Spirit', 'Bold Colour', 'Earth Tones', 'Your Vision'];

const COLOUR_SWATCHES = ['#E8B84B', '#D94F3D', '#3CBFAA', '#E86B8A', '#4A9E6B', '#F0EDE6'];

const SIZES = [
  {label: 'A4', value: 'a4', price: 2900},
  {label: 'A3', value: 'a3', price: 3900},
  {label: 'A2', value: 'a2', price: 5900},
];

const easeOut: Easing = [0.22, 1, 0.36, 1];

const CONIC_GRADIENT = 'conic-gradient(from 0deg, #E8B84B, #D94F3D, #3CBFAA, #E86B8A, #4A9E6B, #F0EDE6)';

function Dots() {
  return (
    <span className="inline-flex">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="text-current"
          animate={{opacity: [0, 1, 0]}}
          transition={{duration: 1.2, repeat: Infinity, delay: i * 0.4, ease: easeOut}}
        >
          .
        </motion.span>
      ))}
    </span>
  );
}

export const meta = () => [
  {title: 'AI Studio — Kumachi Prints'},
  {name: 'description', content: 'Create your own Kumachi print. Your imagination. Kumachi\'s hand.'},
];

export default function CreateRoute() {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [style, setStyle] = useState(STYLES[0]);
  const [selectedColours, setSelectedColours] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [printName, setPrintName] = useState('');
  const [printSize, setPrintSize] = useState('a4');

  const toggleColour = useCallback((hex: string) => {
    setSelectedColours((prev) =>
      prev.includes(hex) ? prev.filter((c) => c !== hex) : [...prev, hex],
    );
  }, []);

  const handleGenerate = useCallback(() => {
    if (isGenerating) return;
    if (!prompt.trim()) {
      toast.error('Please describe your print first');
      return;
    }
    setIsGenerating(true);
    setGenerated(false);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast.success('Print generated successfully');
    }, 2500);
  }, [isGenerating, prompt]);

  const handleOrder = useCallback(() => {
    const size = SIZES.find((s) => s.value === printSize);
    const label = size?.label ?? printSize;
    toast.success(`Added "${printName || 'Untitled Print'}" (${label}) to demo cart`);
  }, [printName, printSize]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-[480px_1fr] gap-0 min-h-screen" style={{paddingTop: '80px'}}>
      <section className="p-8 md:p-12 flex flex-col gap-8 overflow-y-auto" style={{backgroundColor: 'var(--color-surface)'}}>
        <div>
          <p className="text-xs uppercase tracking-widest" style={{color: 'var(--color-accent-ochre)'}}>
            Kumachi AI Studio
          </p>
          <h1 className="mt-2 font-display text-3xl" style={{color: 'var(--color-text-primary)'}}>
            Your imagination. Kumachi's hand.
          </h1>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{color: 'var(--color-text-secondary)'}}>
            STYLE
          </p>
          <div className="flex flex-wrap gap-2">
            {STYLES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStyle(s)}
                className="rounded-full border px-4 py-1.5 text-sm transition-colors"
                style={{
                  backgroundColor: style === s ? 'var(--color-accent-ochre)' : 'transparent',
                  color: style === s ? '#15120d' : 'var(--color-text-secondary)',
                  borderColor: style === s ? 'var(--color-accent-ochre)' : 'var(--color-border)',
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest mb-3" style={{color: 'var(--color-text-secondary)'}}>
            COLOUR MOOD
          </p>
          <div className="flex flex-wrap gap-3">
            {COLOUR_SWATCHES.map((hex) => (
              <button
                key={hex}
                type="button"
                onClick={() => toggleColour(hex)}
                className="h-9 w-9 rounded-full transition-shadow"
                style={{
                  backgroundColor: hex,
                  boxShadow: selectedColours.includes(hex)
                    ? '0 0 0 2px var(--color-accent-ochre), 0 0 0 4px var(--color-surface)'
                    : 'none',
                }}
                aria-label={`Colour ${hex}`}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="text-xs uppercase tracking-widest mb-2" style={{color: 'var(--color-text-secondary)'}}>
            DESCRIBE YOUR PRINT
          </p>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A lion at rest. Gold light from the left. Flat colour, no shadows."
            className="w-full min-h-[120px] p-3 text-sm resize-none rounded-md"
            style={{backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)'}}
            maxLength={200}
          />
          <p className="text-xs mt-1 text-right" style={{color: 'var(--color-text-tertiary)'}}>
            {prompt.length}/200
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setAdvancedOpen(!advancedOpen)}
            className="text-xs flex items-center gap-1 transition-colors"
            style={{color: 'var(--color-text-tertiary)'}}
          >
            {advancedOpen ? <ChevronUp className="size-3" /> : <ChevronDown className="size-3" />}
            + Advanced
          </button>
          {advancedOpen && (
            <div className="pt-2 space-y-2">
              <p className="text-xs uppercase tracking-widest" style={{color: 'var(--color-text-secondary)'}}>
                EXCLUDE FROM RESULT
              </p>
              <textarea
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                placeholder="e.g. text, watermark, hands"
                className="w-full min-h-[80px] p-3 text-sm resize-none rounded-md"
                style={{backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)'}}
              />
            </div>
          )}
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="w-full min-h-12 rounded-md text-sm font-semibold transition-all"
            style={{
              backgroundColor: generated && !isGenerating ? 'transparent' : 'var(--color-accent-ochre)',
              color: generated && !isGenerating ? 'var(--color-accent-ochre)' : '#15120d',
              border: generated && !isGenerating ? '1px solid var(--color-accent-ochre)' : '1px solid var(--color-accent-ochre)',
            }}
          >
            {isGenerating ? (
              <>
                Generating<span className="inline-flex ml-1"><Dots /></span>
              </>
            ) : generated ? (
              'Regenerate'
            ) : (
              'Generate Print'
            )}
          </button>
          <p className="text-xs text-center" style={{color: 'var(--color-text-tertiary)'}}>
            Each generation is unique. Results are in the Kumachi visual style.
          </p>
        </div>
      </section>

      <section className="p-8 md:p-12 sticky top-20 flex flex-col items-center justify-center" style={{backgroundColor: 'var(--color-bg-primary)'}}>
        <AnimatePresence mode="wait">
          {!isGenerating && !generated ? (
            <motion.div
              key="empty"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-[280px] h-[360px] rounded-lg flex items-center justify-center overflow-hidden" style={{border: '1px solid rgba(255,196,0,0.2)'}}>
                <motion.div
                  className="absolute inset-0"
                  style={{background: CONIC_GRADIENT, opacity: 0.06}}
                  animate={{rotate: 360}}
                  transition={{repeat: Infinity, duration: 20, ease: 'linear'}}
                />
                <p className="relative z-10 font-display italic text-lg text-center px-6" style={{color: 'var(--color-text-tertiary)'}}>
                  Your print will appear here.
                </p>
              </div>
            </motion.div>
          ) : isGenerating ? (
            <motion.div
              key="loading"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="flex flex-col items-center gap-6"
            >
              <div className="relative w-[280px] h-[360px] rounded-lg flex items-center justify-center overflow-hidden" style={{border: '1px solid rgba(255,196,0,0.2)'}}>
                <motion.div
                  className="absolute inset-0"
                  style={{background: CONIC_GRADIENT, opacity: 0.15}}
                  animate={{rotate: 360}}
                  transition={{repeat: Infinity, duration: 1.5, ease: 'linear'}}
                />
                <p className="relative z-10 font-display italic text-lg text-center px-6" style={{color: 'var(--color-text-tertiary)'}}>
                  Generating your print
                  <Dots />
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
              className="flex flex-col items-center gap-6 w-full max-w-sm"
            >
              <motion.div
                initial={{opacity: 0, scale: 0.96}}
                animate={{opacity: 1, scale: 1}}
                transition={{duration: 0.5, ease: easeOut}}
                className="w-[280px] h-[360px] rounded-lg overflow-hidden"
                style={{border: '1px solid var(--color-border)'}}
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${selectedColours[0] || COLOUR_SWATCHES[0]} 0%, transparent 60%), linear-gradient(135deg, ${COLOUR_SWATCHES[1] || COLOUR_SWATCHES[2]}, ${COLOUR_SWATCHES[3] || COLOUR_SWATCHES[4]})`,
                  }}
                />
              </motion.div>

              <div className="w-full space-y-2">
                <p className="text-xs uppercase tracking-widest" style={{color: 'var(--color-text-secondary)'}}>
                  Name your print
                </p>
                <input
                  value={printName}
                  onChange={(e) => setPrintName(e.target.value)}
                  placeholder="e.g. Golden Slumber"
                  className="w-full px-3 py-2 text-sm rounded-md"
                  style={{backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', color: 'var(--color-text-primary)'}}
                />
              </div>

              <div className="w-full space-y-2">
                <p className="text-xs uppercase tracking-widest" style={{color: 'var(--color-text-secondary)'}}>
                  Size
                </p>
                <div className="flex gap-2">
                  {SIZES.map((size) => (
                    <button
                      key={size.value}
                      type="button"
                      onClick={() => setPrintSize(size.value)}
                      className="flex-1 rounded-md border px-3 py-2 text-sm transition-colors text-center"
                      style={{
                        borderColor: printSize === size.value ? 'var(--color-accent-ochre)' : 'var(--color-border)',
                        color: printSize === size.value ? 'var(--color-accent-ochre)' : 'var(--color-text-secondary)',
                        backgroundColor: printSize === size.value ? 'rgba(255,196,0,0.1)' : 'transparent',
                      }}
                    >
                      <span className="block">{size.label}</span>
                      <span className="block text-xs" style={{color: 'var(--color-text-tertiary)'}}>
                        {formatPrice(size.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={handleOrder}
                className="w-full min-h-12 rounded-md text-sm font-semibold"
                style={{backgroundColor: 'var(--color-accent-ochre)', color: '#15120d'}}
              >
                Order Print
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-2 rounded-md px-4 py-3 text-xs" style={{border: '1px solid var(--color-border)', color: 'var(--color-text-secondary)'}}>
          <Award className="size-4 shrink-0" style={{color: 'var(--color-accent-ochre)'}} />
          Includes a Certificate of Generation
        </div>

        <p className="mt-4 text-xs text-center" style={{color: 'var(--color-text-tertiary)'}}>
          47 people on the waitlist
        </p>
      </section>
    </main>
  );
}
