# Design System & Visual Identity

Status: Current

## Two Anchor Artworks

The visual identity of Kumachi Prints is rooted in two anchor artworks from the prototype design:

**Majestic Monarch** — A lion in vivid ochre gold, crimson, and teal against a deep void. Full-saturation colour, black ground, high-energy pop. This artwork sets the tone for the brand's confidence and visual power.

**Silence in Spirit** — Abstracted faces in a Pan-African palette (ochre, deep teal, blush, charcoal) with geometric linework. This artwork sets the tone for the brand's cultural memory and editorial depth.

Together they establish the brand's range: bold and celebratory, intimate and reflective.

## Colour System

All colours are defined as CSS custom properties in `app/index.css` with both light and dark mode variants. The Tailwind config maps these to utility classes. Never hardcode hex values in component files.

### Background Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--void` | `#fffaf0` (warm cream) | `#11100d` (deep charcoal) | Page background |
| `--surface` | `#fffdf7` | `#181611` | Card/surface backgrounds |
| `--surface-mid` | `#f4ead8` | `#191611` | Secondary surfaces |
| `--surface-raised` | `#fffdf7` | `#242016` | Raised elements |

### Text Tokens

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--text-primary` | `#15120d` | `#fff8e8` |
| `--text-secondary` | `#665d50` | `#c5b8a5` |
| `--text-muted` | `#938778` | `#847765` |

### Accent Tokens

| Token | Light Mode | Dark Mode | Usage |
|-------|-----------|-----------|-------|
| `--gold` | `#ffc400` | `#ffc400` | Primary accent, CTAs, highlights |
| `--crimson` | `#bd3f2f` | `#df604c` | Editorial accent, price highlights |
| `--teal` | `#1f5a45` | `#57a982` | Secondary accent, nature elements |
| `--blush` | `#c84e6a` | `#df7890` | Editorial accent, feminine energy |
| `--grove` | `#1f5a45` | `#57a982` | Natural accent, earthy tones |

### Border Tokens

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `--border` | `#d9c8aa` | `#3b3325` |
| `--border-active` | `#15120d` | `#fff8e8` |

## Typography

**Display font: Bricolage Grotesque** — Used for headlines (`.text-display`, `.text-h1`, `.text-h2`, `.text-h3`, `.text-h4`). Bold, geometric, modern. Weights: 800 for display, 700 for headings.

**Editorial font: Cormorant Garamond** — Used for editorial body copy (`.text-editorial`). Serif, elegant, story-telling. Weight: 500.

**Body font: Manrope** — Used for UI text, navigation, buttons, prices, captions (`.text-body`, `.text-body-small`, `.text-caption`, `.text-nav`, `.text-button`, `.text-price`). Clean, readable sans-serif. Weights: 400 for body, 500 for nav/button, 600 for price, 700 for caption.

## Typography Scale

| Class | Font | Size | Weight | Line Height |
|-------|------|------|--------|-------------|
| `.text-display` | Bricolage Grotesque | clamp(3.25rem, 9vw, 8.6rem) | 800 | 0.88 |
| `.text-h1` | Bricolage Grotesque | clamp(2.75rem, 6vw, 5.8rem) | 800 | 0.95 |
| `.text-h2` | Bricolage Grotesque | clamp(2rem, 4vw, 4.1rem) | 700 | 1 |
| `.text-h3` | Bricolage Grotesque | clamp(1.45rem, 2.4vw, 2.15rem) | 700 | 1.08 |
| `.text-h4` | Bricolage Grotesque | 1.25rem | 700 | 1.35 |
| `.text-body` | Manrope | 1rem | 400 | 1.65 |
| `.text-body-small` | Manrope | 0.875rem | 400 | 1.6 |
| `.text-caption` | Manrope | 0.75rem | 700 | 1.5 |
| `.text-nav` / `.text-button` | Manrope | 0.875rem | 500 | 1 |
| `.text-editorial` | Cormorant Garamond | clamp(1.5rem, 3vw, 2.45rem) | 500 | 1.12 |
| `.text-price` | Manrope | 1.125rem | 600 | 1 |

## Spacing Philosophy

Gallery breathing room. Spacing is generous compared to a typical e-commerce store — mimicking the whitespace of a physical gallery. The `container-gallery` class provides responsive margins (20px mobile, 40px tablet, 80px desktop) with a max-width of 1440px.

### Spacing Scale

| Token | Value |
|-------|-------|
| `--space-xs` | 4px |
| `--space-sm` | 8px |
| `--space-md` | 16px |
| `--space-lg` | 24px |
| `--space-xl` | 40px |
| `--space-2xl` | 80px |
| `--space-3xl` | 120px |

### Grid

| Token | Value |
|-------|-------|
| `--grid-gutter` | 24px |
| `--grid-margin` | 80px (desktop) |
| `--grid-margin-tablet` | 40px |
| `--grid-margin-mobile` | 20px |

## Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `--radius-sm` | 2px | Cards, buttons (gallery frames are square) |
| `--radius-md` | 4px | Dialogs, modals |
| `--radius-lg` | 8px | Larger surfaces |
| `--radius-full` | 9999px | Pills, badges |

The square-corner decision (2px radius for cards) is intentional: gallery picture frames are square, not rounded. This reinforces the gallery-adjacent positioning.

## Dark Mode

Dark mode is not optional — it is the primary mode. The dark theme is defined in `[data-theme="dark"]` and is the default presentation. Light mode is an opt-in alternative. All colours, shadows, and border treatments have explicit dark variants.

## Shadows

| Token | Value | Usage |
|-------|-------|-------|
| `--shadow-soft` | `0 24px 70px rgba(37, 29, 18, 0.14)` | Cards, surfaces |
| `--shadow-strong` | `0 32px 90px rgba(21, 18, 13, 0.22)` | Modals, drawers |

## Utility Classes

| Class | Purpose |
|-------|---------|
| `.kumachi-section` / `.section-pad` | Section vertical padding (clamp 72px–132px) |
| `.kumachi-card` | Card surface with border and shadow |
| `.accent-rule` | Gold horizontal rule (44×5px) for section headers |
| `.gallery-glass` | Glassmorphism surface for overlays |
| `.ai-gradient` | Conic gradient for AI Studio branding |

*Last updated: 2026-06*
