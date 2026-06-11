# Future — AI Studio

Status: Planning

## Objective

Build the Kumachi AI Studio — a feature where a user describes a print in natural language, the Kumachi AI generates it in the Kumachi visual style (style-locked to brand), the result is upscaled to print resolution, offered as a product via Printful's custom product API, and shipped as a physical print. Each AI-generated print comes with a Certificate of Generation.

## Scope

**In scope:** Style-locked image generation using a fine-tuned model (SDXL or Flux LoRA), Real-ESRGAN upscaling pipeline, Printful custom product API integration, Certificate of Generation PDF, waitlist collection during Phases 1–3.

**Out of scope:** Open-ended image generation (style is locked to Kumachi aesthetic), competing with Midjourney/DALL·E, real-time generation (images are generated asynchronously).

## Task Checklist

- [ ] UI stub already exists in Vite prototype — wire into Hydrogen
- [ ] Collect AI Studio waitlist emails during Phases 1–3
- [ ] Train/fine-tune a LoRA on Kumachi artwork style (Replicate or self-hosted)
- [ ] Build generation endpoint: prompt → SDXL/Flux → output image
- [ ] Implement Real-ESRGAN upscaling pipeline for print-resolution output
- [ ] Integrate with Printful custom product API for one-off print creation
- [ ] Build Certificate of Generation PDF (includes style lock signature, timestamp, edition number)
- [ ] Launch dedicated `/ai-studio` route
- [ ] Implement usage limits and cost tracking
- [ ] Add Gallery-style wall mockup rendering (highest-converting feature in art e-commerce)
- [ ] Monitor generation quality and collect user feedback

## Deliverables

- `/ai-studio` route with prompt input, style preview, and ordering flow
- Style-locked generation pipeline
- Printful custom product order flow
- Certificate of Generation PDF

## Acceptance Criteria

A user can visit the AI Studio, describe a print, see a generation in the Kumachi style, upscale it, and order it as a physical print that ships via Printful. The print arrives with a Certificate of Generation.

## Dependencies

- Phase 3 editorial layer complete
- Replicate account or self-hosted Stable Diffusion infrastructure
- Printful custom product API integration (separate from standard product sync)
- Sufficient waitlist demand to justify build investment

*Last updated: 2026-06*
