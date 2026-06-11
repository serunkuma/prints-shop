# AI Studio Vision

Status: Planning

## What It Is

The Kumachi AI Studio is a forthcoming feature where a user describes a print in natural language, and the Kumachi AI generates a ready-to-order physical print. The output is style-locked to the Kumachi visual aesthetic — this is not an open-ended image generator. It is a creative tool constrained to a specific artistic identity, producing prints that are recognisably Kumachi.

## Why Style-Locking Matters

**Brand coherence:** An open-ended image generator produces anything. A style-locked generator produces Kumachi prints. Every AI-generated print that ships reinforces the brand identity rather than diluting it.

**Output quality:** The fine-tuned model (SDXL or Flux LoRA trained on Kumachi's catalogue) produces images that meet the same editorial standard as the curated catalogue. The style lock prevents generic, uncanny-valley, or off-brand outputs.

**Defensibility:** A style-locked generator trained on a specific artist's catalogue cannot be replicated by competitors. The model itself is a differentiator.

## The Technical Path

1. **User prompt** → User describes the desired print in natural language
2. **Style-locked generation** → Prompt fed to fine-tuned SDXL/Flux LoRA (hosted on Replicate or self-hosted)
3. **Upscaling** → Output image upscaled to print resolution via Real-ESRGAN
4. **Printful integration** → Upscaled image sent to Printful's custom product API as a one-off product
5. **Checkout** → One-off product added to Shopify cart, user checks out normally
6. **Fulfilment** → Printful produces and ships the print
7. **Certificate of Generation** → Each print ships with a PDF certificate documenting the generation timestamp, style lock signature, and edition number

## The Wall Mockup

In the prototype, the wall mockup feature renders a generated (or selected) print in a photorealistic room setting. This is the highest-converting feature in art e-commerce. The AI Studio must include this to match conversion expectations.

## Current Status

- **UI stub exists** in the Vite prototype at `sources/protoype/`. The AI Studio tab, prompt input, and placeholder output are wired
- **No real API call** — the stub shows placeholder content
- **Waitlist** — email collection is active (or should be enabled) during Phases 1–3 to gauge demand

## Waitlist-as-Launch-Audience Strategy

The AI Studio waitlist serves two purposes:
1. **Demand validation** — how many people actually want AI-generated Kumachi prints?
2. **Launch audience** — when the AI Studio launches, the waitlist is the first notified group, creating immediate initial users

## Phase Placement

Post-Phase 3 feature. The AI Studio requires:
- The editorial layer to be complete (Phase 3) so users understand what "Kumachi style" means
- The Hydrogen storefront to be stable on Oxygen (Phase 2)
- A separate API/infrastructure project for the generation pipeline
- Sufficient waitlist demand

## Certificate of Generation

Each AI-generated print includes a PDF certificate with:
- Unique generation ID
- Timestamp of generation
- The original prompt text
- Style lock model version (e.g., "Kumachi LoRA v1.0")
- Print edition number
- QR code linking to the generation record

This certificate is the equivalent of the provenance documentation that accompanies a limited-edition print. It is what makes an AI-generated print feel like a collectible rather than a computer output.

*Last updated: 2026-06*
