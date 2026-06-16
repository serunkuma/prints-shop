# [PLANNING] Kumachi AI Studio — Product Vision & Technical Roadmap

Status: Historical

> **Note:** This document is the original AI Studio product specification and technical roadmap. It is preserved for historical context. Current AI Studio doctrine lives in `docs/planning/06_ai_studio.md`.

*Classification: Strategic product document*
*Author: Ernest Serunkuma (Kuma) + planning session*
*Date: June 2026*

---

## The vision in one paragraph

Kumachi AI Studio is a creative platform layered on top of Kumachi Prints. It uses open-weight AI image generation models to let anyone create a one-of-a-kind art print in the Kumachi visual language — style-locked, culturally rooted, physically printable. It enriches every product page with AI-generated cultural context and mythology. It monetises through a token-based subscription system. The result: a print shop that generates recurring revenue from creativity itself, not just from catalogue sales. People come back to generate more. Every generation is a potential print sale. Every print sale funds more mythology.

---

## Part 1 — The three layers

### Layer 1: AI Enrichment (the invisible layer)

Every product page on Kumachi Prints gets enriched by an AI call that runs server-side and returns structured data to enhance the Sanity CMS content.

**What it generates per product:**
- Extended mythology context ("In Buganda tradition, the lion represents...")
- Colour analysis tied to African cultural meaning (not generic colour theory — specific: what does cadmium red mean in East African visual culture?)
- Three "this print belongs in a room where..." placement suggestions, generated fresh per session
- A "Tales of Kuma" connection — which character or story from the mythology universe is this print's closest relative
- "You might also connect with..." — AI-generated cross-product suggestions based on mythology proximity, not just sales data

**How it works:**
- A GraphQL query hits the Kumachi AI API layer
- The API layer calls an LLM (Claude via Anthropic API, or a locally-hosted open-weight model) with a carefully engineered prompt containing the product's Sanity data
- Response is cached in Supabase (so the same product doesn't get re-generated on every page load — only refreshes on new sessions or when Sanity content changes)
- Returns structured JSON that Hydrogen renders alongside the Sanity content

**This costs nothing to the user.** It's a product enhancement, not a billable feature. The cost is absorbed into the product margin.

---

### Layer 2: AI Print Studio (the generative layer)

The "Create your print" feature — already stubbed in the prototype. This is now defined in full.

**User flow:**
```
1. User arrives at /create
2. Selects a STYLE (Kumachi-specific, not generic):
   Monarch · Spirit · Bold Colour · Earth Tones · Tales of Kuma
3. Selects COLOUR MOOD (multi-select from brand palette)
4. Writes a DESCRIPTION (max 200 chars)
   Optional: selects a TALES OF KUMA CHARACTER as a starting point
5. Clicks GENERATE
6. System deducts 1 token from their balance
7. FLUX.1-dev or FLUX.1-schnell generates the image
   (style-locked via a LoRA trained on Kumachi artwork)
8. Image is upscaled via Real-ESRGAN to print resolution
9. User sees result in the wall mockup preview
10. User can: REGENERATE (1 more token) · SAVE to their gallery · ORDER as a print
11. If they ORDER: Printful custom product API creates a product on the fly
    → adds to Shopify cart → standard checkout flow
12. Ordered print ships with a Certificate of Generation
```

**Style locking is non-negotiable.** The AI does not generate anything. It generates *Kumachi art*. Every output must look like it belongs in the catalogue. This is achieved through:
- A fine-tuned LoRA on top of FLUX.1-dev, trained on Kumachi artwork
- Hard system prompts that constrain style parameters
- A moderation/rejection layer that rejects outputs that fall outside the visual style (re-generates automatically, transparent to user)

---

### Layer 3: Kumachi AI Subscription (the monetisation layer)

**The core mechanism: Kuma Tokens (KT)**

Everything in the AI Studio costs tokens. Tokens are purchased in bundles or earned through a subscription. This is not a crypto product — tokens are simply usage credits, like printer ink cartridges.

**Free tier (no account needed for browsing):**
- 3 free generations on sign-up (to hook the experience)
- 0 recurring tokens
- Can save generated images to account (requires sign-up)
- Can order prints (no token cost for ordering — ordering is always free)

**Starter — $9/month:**
- 20 Kuma Tokens per month
- Tokens roll over (max 40 banked at any time)
- Access to all style presets
- Priority generation queue (faster than free)
- Save up to 50 generations in personal gallery

**Creator — $25/month:**
- 75 Kuma Tokens per month
- Tokens roll over (max 150 banked)
- Early access to new Tales of Kuma style packs
- 10% discount on all print orders
- Save unlimited generations
- Access to FLUX.1-dev (higher quality, slower) vs Schnell (faster, good quality)
- Certificate of Generation included with every print at no extra cost

**Studio — $75/month:**
- 300 Kuma Tokens per month
- Tokens roll over (max 600 banked)
- Access to Tales of Kuma character reference packs (generate art featuring Kuma mythology characters)
- 20% discount on all print orders
- Commercial licence on generated art (use your generations in your own projects)
- API access (generate programmatically — for designers, small studios)
- Priority support

**Token top-ups (any tier):**
- 10 tokens — $5
- 30 tokens — $12
- 100 tokens — $35

**Token costs per action:**
```
Generate (FLUX Schnell, 512px base)     → 1 token
Generate (FLUX Dev, 1024px base)        → 2 tokens
Upscale to print resolution             → 1 token (included automatically on "Order")
Regenerate (same prompt, new seed)      → 1 token
Style variation (same image, new style) → 1 token
Save to gallery                         → 0 tokens (free always)
Order as print                          → 0 tokens (always free — this is the revenue event)
```

**Why tokens work for this business:**
- Creates a reason to return (top up, use monthly allocation)
- Separates the creativity cost from the print cost (ordering is free — removes friction at the purchase moment)
- Natural upsell path: free user generates 3 times, loves it, hits the paywall, upgrades to Starter
- The print order is where the real margin is — subscription revenue funds infrastructure, print sales fund the business

---

## Part 2 — Technical architecture

### The GraphQL AI layer

```
Hydrogen route loader
  └── Apollo Client or urql → GraphQL API layer
        └── Supabase Edge Functions (serverless)
              ├── Auth check (Supabase Auth JWT)
              ├── Token balance check
              ├── Model router (Schnell vs Dev based on tier)
              ├── Prompt engineering layer (style locking)
              └── AI model call
                    ├── Replicate API → FLUX model
                    └── Anthropic API → Claude (for enrichment text)
                          ↓
              ├── Real-ESRGAN upscale (Replicate)
              ├── Store result in Supabase Storage
              ├── Deduct tokens from user balance
              └── Return structured response to Hydrogen
```

**Why GraphQL over REST:**
- Single query can fetch: product data + AI enrichment + user token balance + related generations — in one round trip
- Schema is self-documenting (useful when the Studio API goes external in Studio tier)
- Subscriptions (GraphQL subscriptions via Supabase Realtime) for live generation progress ("Generating... 40%...")
- The external API access in the Studio tier is just exposing the same GraphQL schema with API key auth

### Supabase schema

```sql
-- Users (extends Supabase Auth)
users (
  id uuid references auth.users,
  display_name text,
  subscription_tier text default 'free',
  subscription_status text default 'active',
  stripe_customer_id text,
  created_at timestamptz default now()
)

-- Token balances
token_balances (
  user_id uuid references users(id),
  balance integer default 3,  -- 3 free tokens on signup
  lifetime_earned integer default 3,
  lifetime_spent integer default 0,
  updated_at timestamptz default now()
)

-- Token transactions (full audit trail)
token_transactions (
  id uuid default gen_random_uuid(),
  user_id uuid references users(id),
  amount integer,  -- positive = credit, negative = debit
  action text,     -- 'signup_bonus' | 'subscription' | 'topup' | 'generate_schnell' | 'generate_dev' | 'upscale'
  metadata jsonb,  -- generation_id, prompt, etc.
  created_at timestamptz default now()
)

-- Generations
generations (
  id uuid default gen_random_uuid(),
  user_id uuid references users(id),
  prompt text,
  style text,
  colour_mood text[],
  model_used text,  -- 'flux-schnell' | 'flux-dev'
  status text,      -- 'pending' | 'generating' | 'upscaling' | 'complete' | 'failed'
  output_url text,  -- Supabase Storage URL
  upscaled_url text,
  tokens_spent integer,
  tales_character text,  -- if a Tales of Kuma character was used
  ordered boolean default false,
  shopify_product_id text,  -- set if ordered
  certificate_id text,      -- unique cert ID for Certificate of Generation
  created_at timestamptz default now()
)

-- Product enrichments (cached AI enrichment per Shopify product handle)
product_enrichments (
  shopify_handle text primary key,
  mythology_context text,
  colour_meaning jsonb,
  placement_suggestions text[],
  tales_connection text,
  model_version text,
  generated_at timestamptz default now(),
  expires_at timestamptz  -- regenerate after this date
)

-- Subscriptions (mirrors Stripe subscription state)
subscriptions (
  id uuid default gen_random_uuid(),
  user_id uuid references users(id),
  stripe_subscription_id text unique,
  tier text,  -- 'starter' | 'creator' | 'studio'
  status text,
  current_period_start timestamptz,
  current_period_end timestamptz,
  created_at timestamptz default now()
)
```

### GraphQL schema (key types)

```graphql
type Query {
  # Product enrichment (cached, free)
  productEnrichment(handle: String!): ProductEnrichment

  # User's generation gallery
  myGenerations(limit: Int, offset: Int): GenerationConnection

  # Current user state
  me: User

  # Token balance
  myTokenBalance: TokenBalance
}

type Mutation {
  # Start a generation (costs tokens)
  generatePrint(input: GenerateInput!): GenerationResult

  # Upscale a completed generation
  upscaleGeneration(generationId: ID!): GenerationResult

  # Order a generation as a physical print
  orderGeneration(
    generationId: ID!
    size: PrintSize!
    frame: FrameOption!
  ): OrderResult

  # Purchase tokens
  purchaseTokens(bundle: TokenBundle!): PaymentIntent
}

type Subscription {
  # Real-time generation progress
  generationProgress(generationId: ID!): GenerationProgress
}

type ProductEnrichment {
  shopifyHandle: String!
  mythologyContext: String!
  colourMeaning: [ColourMeaning!]!
  placementSuggestions: [String!]!
  talesConnection: TalesCharacter
  generatedAt: DateTime!
}

type GenerationResult {
  id: ID!
  status: GenerationStatus!
  outputUrl: String
  upscaledUrl: String
  tokensSpent: Int!
  remainingBalance: Int!
  estimatedSeconds: Int
}

type GenerationProgress {
  generationId: ID!
  status: GenerationStatus!
  percentComplete: Int
  outputUrl: String  # available when complete
}

enum GenerationStatus {
  PENDING
  GENERATING
  UPSCALING
  COMPLETE
  FAILED
}

enum PrintSize {
  A4
  A3
  A2
  SIZE_50x70
  SIZE_70x100
}

enum FrameOption {
  NO_FRAME
  BLACK_FRAME
  WHITE_FRAME
  NATURAL_WOOD
}

enum TokenBundle {
  TEN    # $5
  THIRTY # $12
  HUNDRED # $35
}
```

---

## Part 3 — AI model selection and cost analysis

### Model recommendation: FLUX.1-schnell (primary) + FLUX.1-dev (premium)

**FLUX.1-schnell via Replicate:**
- Cost: ~$0.003 per image (512px base)
- Speed: 1–4 steps, typically 3–8 seconds
- Quality: excellent for the style-locked use case (LoRA constrains variation anyway)
- Commercial use: Apache 2.0 — fully free commercial use

**FLUX.1-dev via Replicate:**
- Cost: ~$0.055 per image (1024px base)
- Speed: 20–50 steps, 15–30 seconds
- Quality: significantly higher detail, better prompt adherence
- Commercial use: requires commercial API licence (Replicate handles this)

**Real-ESRGAN upscaling via Replicate:**
- Cost: ~$0.005 per upscale (4× resolution increase)
- Takes a 1024px output to ~4096px — sufficient for 70×100cm at 150 DPI

**Claude via Anthropic API (enrichment text):**
- Cost: ~$0.003 per product enrichment (claude-haiku, cached in Supabase)
- Runs once per product, cached indefinitely until content changes
- Used for: mythology context, colour meaning, placement suggestions, Tales connection

### Unit economics per generation

```
FLUX Schnell generation:
  Cost to Kumachi:   $0.003 (generation) + $0.005 (upscale) = $0.008
  Token price to user: 2 tokens (1 generate + 1 upscale)
  Token cost to user (Starter tier): $9/20 tokens = $0.45/token → $0.90 for 2 tokens
  Gross margin on tokens: ($0.90 - $0.008) / $0.90 = 99.1% gross margin on API costs
  
FLUX Dev generation:
  Cost to Kumachi:   $0.055 + $0.005 = $0.060
  Token price to user: 3 tokens (2 generate + 1 upscale)
  Token cost to user (Creator tier, $25/75 tokens): $0.333/token → $1.00 for 3 tokens
  Gross margin on tokens: ($1.00 - $0.060) / $1.00 = 94% gross margin on API costs
```

The real revenue event is the **print order**: an A2 print at $85 retail with Printful base cost of ~$25 yields $60 gross margin. Every generation that converts to an order is a $60+ revenue event. The subscription and token revenue funds infrastructure and keeps users generating. The print sale is the business.

### Enrichment cost (near-zero)

```
Claude Haiku per product enrichment: ~$0.003
Cached in Supabase for 30 days
With 100 products: $0.30 total per month for all enrichments
This rounds to zero as a cost centre.
```

---

## Part 4 — Authentication with Supabase

**Why Supabase Auth:**
- Works natively with Supabase database (RLS policies protect token balances, generations, subscriptions)
- Email/password + OAuth (Google, Apple) out of the box
- JWT tokens integrate cleanly with Hydrogen's session model
- Edge functions authenticate via JWT — no separate auth server needed

**Auth flows in Kumachi Prints:**

```
Anonymous browsing → no auth required
  ↓
/create page → sees studio, can explore but can't generate
  ↓
Clicks "Generate" → auth gate: "Create a free account for 3 tokens"
  ↓
Sign up (email or Google) → Supabase creates user
  → trigger creates token_balance row with balance: 3
  → creates token_transaction: signup_bonus +3
  ↓
User generates → tokens deducted, generation stored
  ↓
Tokens run out → paywall: "Get more tokens" → pricing page → Stripe
  ↓
Stripe subscription created → webhook → Supabase subscription row created
  → token_balance topped up per tier monthly via Supabase cron job
```

**Row Level Security (RLS) policies:**
- Users can only read/write their own rows in: token_balances, generations, token_transactions, subscriptions
- product_enrichments is publicly readable (no auth needed — it's the enrichment layer)
- Token deduction happens in a Supabase Edge Function (server-side, cannot be spoofed client-side)

---

## Part 5 — Payments with Stripe

**Why Stripe over Shopify billing for this:**
- Subscriptions and token top-ups are platform revenue, not product sales
- Shopify billing API is designed for Shopify apps, not for billing end-customers
- Stripe has a cleaner webhook system for Supabase integration
- Stripe's customer portal handles subscription management (cancel, upgrade, downgrade) without building UI

**Stripe products to create:**
```
Product: Kumachi AI Studio — Starter
  Price: $9.00/month recurring
  Metadata: tier=starter, monthly_tokens=20

Product: Kumachi AI Studio — Creator
  Price: $25.00/month recurring
  Metadata: tier=creator, monthly_tokens=75

Product: Kumachi AI Studio — Studio
  Price: $75.00/month recurring
  Metadata: tier=studio, monthly_tokens=300

Product: Token Bundle — 10 tokens
  Price: $5.00 one-time
  Metadata: tokens=10

Product: Token Bundle — 30 tokens
  Price: $12.00 one-time
  Metadata: tokens=30

Product: Token Bundle — 100 tokens
  Price: $35.00 one-time
  Metadata: tokens=100
```

**Stripe webhook → Supabase Edge Function flow:**
```
stripe.checkout.session.completed
  → if subscription: create subscriptions row, set user tier, top up tokens
  → if token bundle: add tokens to balance, create transaction record

stripe.invoice.payment_succeeded (monthly renewal)
  → top up token balance for the month
  → create transaction record: subscription_renewal +N tokens

stripe.customer.subscription.deleted (cancellation)
  → set subscription status to cancelled
  → user retains banked tokens until they expire
  → downgrade tier to free at period end
```

---

## Part 6 — The LoRA training plan

A style-locked generation system requires a fine-tuned LoRA. Without it, FLUX generates anything — which is not the Kumachi product. The LoRA is what makes every generation recognisably Kumachi.

**Training data needed:**
- Minimum 15–20 high-quality images of Kumachi artwork
- Consistent captioning format: "a painting by kuma, flat fill colour, pure black background, [subject], bold saturation, african visual style"
- The trigger word in all captions: `kuma_style` — users don't see this, it's injected by the prompt engineering layer

**Training pipeline:**
- Platform: Replicate (they offer LoRA training via the FLUX trainer model)
- Cost: approximately $3–8 per training run
- Time: 30–60 minutes per run
- Iteration: train, test with 20 prompts, evaluate visual consistency, retrain with adjusted captions

**The prompt engineering layer (what runs server-side, invisible to user):**
```python
def build_generation_prompt(user_input: dict) -> str:
    style_map = {
        "monarch": "powerful animal portrait, explosive flat fill colour, pure black background",
        "spirit": "stylised african figures, geometric linework, ritual geometry, tricolor field",
        "bold_colour": "maximum saturation, flat fill zones, bold graphic composition",
        "earth_tones": "ochre warm palette, textured surface, grounded organic forms",
        "tales_of_kuma": "mythological narrative scene, dramatic composition, african deity energy"
    }
    
    base_prompt = f"""
    a painting by kuma_style, {style_map[user_input['style']]},
    {user_input['description']},
    colour mood: {', '.join(user_input['colour_mood'])},
    gallery grade art print, high detail, 300gsm paper texture implied
    """
    
    negative_prompt = """
    photorealistic, photograph, 3d render, watermark, text, 
    western art style, generic illustration, low quality,
    blurry, distorted anatomy
    """
    
    return base_prompt.strip(), negative_prompt.strip()
```

---

## Part 7 — The Tales of Kuma integration

This is the feature that makes Kumachi AI Studio more than a generic print generator. The Tales of Kuma mythology universe becomes a **creative resource** that subscribers can access.

**Character reference packs (Creator tier and above):**
Each Tales of Kuma character becomes a reference pack in the Studio:
- Character description (visual identity)
- Associated colour palette
- Mythological context
- A set of example prompts that feature this character well

**First characters to define:**
```
KUMA — The Thunder Artist
  Visual: tall figure, dark skin, paint-stained hands, eyes that hold lightning
  Colours: black, gold, electric blue
  Domain: creation, thunder, announcement of arrival
  Prompt prefix: "kuma_style, kuma the thunder artist, "

THE ENKUMA — The Spirit Lion
  Visual: a lion rendered in flat-fill abstraction, crown of colour
  Colours: full spectrum on black
  Domain: governance, power, the right to occupy space
  Prompt prefix: "kuma_style, enkuma spirit lion, "

THE THREE WITNESSES — The Spirit Figures
  Visual: three circular-headed figures with half-lidded eyes
  Colours: pan-african tricolor, white linework
  Domain: memory, ceremony, things held in the body
  Prompt prefix: "kuma_style, three witnesses, ritual geometry, "
```

**The Tales of Kuma lore page (`/tales`):**
A separate route in Hydrogen — not the shop, not the drops, something new. This is where the mythology lives. Short story fragments. Character profiles. World lore. It feeds the creative context for the AI Studio and builds the audience for future Tales of Kuma games and illustrated books.

The lore page is **always free to read**. It's the top of the funnel — someone discovers the mythology, wants to create art in that world, opens the Studio, generates their first print.

---

## Part 8 — Roadmap

### Phase 1 — Foundation (Weeks 1–2, parallel with Hydrogen build)

- [ ] Supabase project created (`kumachi-ai`)
- [ ] Database schema deployed (all 6 tables above)
- [ ] Supabase Auth configured (email + Google OAuth)
- [ ] Row Level Security policies written and tested
- [ ] Replicate account created, FLUX.1-schnell tested via API
- [ ] Claude API key obtained (Anthropic console)
- [ ] Basic product enrichment Edge Function written and tested
- [ ] Enrichment cached in `product_enrichments` table
- [ ] GraphQL layer scaffolded (use `graphql-yoga` on a Supabase Edge Function or standalone Node server)

### Phase 2 — Studio MVP (Weeks 3–4)

- [ ] Auth gate on `/create` route in Hydrogen
- [ ] Sign-up flow with 3 free token bonus
- [ ] Generation Edge Function (prompt engineering + FLUX Schnell call)
- [ ] Real-ESRGAN upscale Edge Function
- [ ] Token deduction logic with transaction record
- [ ] Generation storage in Supabase Storage
- [ ] Wall mockup preview in the Studio UI (the frame + generated image)
- [ ] "Name your print" input
- [ ] GraphQL subscription for real-time generation progress
- [ ] Free tier paywall (0 tokens → "Get more tokens" CTA)

### Phase 3 — Monetisation (Week 4–5)

- [ ] Stripe account and products configured
- [ ] Stripe Checkout for token bundles
- [ ] Stripe Checkout for subscriptions (Starter, Creator, Studio)
- [ ] Stripe webhook → Supabase Edge Function handler
- [ ] Monthly token top-up cron job (Supabase pg_cron)
- [ ] Pricing page (`/studio/pricing`) in Hydrogen
- [ ] Stripe Customer Portal for subscription management
- [ ] Certificate of Generation generation (PDF or beautiful HTML page with unique ID)

### Phase 4 — LoRA and Style Lock (Week 5–6)

- [ ] Gather minimum 20 Kumachi artwork images at high resolution
- [ ] Write captions in consistent format with `kuma_style` trigger word
- [ ] Train LoRA on Replicate FLUX trainer
- [ ] Evaluate: test with 50 diverse prompts, check visual consistency
- [ ] Integrate LoRA into generation Edge Function
- [ ] Test all 5 style presets with real generations
- [ ] Iterate captioning and retrain if needed (budget 3–5 training runs)

### Phase 5 — Tales of Kuma integration (Week 6–7)

- [ ] `/tales` route in Hydrogen with lore page layout
- [ ] First three character profiles published (Kuma, Enkuma, Three Witnesses)
- [ ] Character reference packs in Studio (Creator tier gate)
- [ ] Opening of first Tales of Kuma story published on lore page
- [ ] Cross-links: lore page → Studio → print order

### Phase 6 — Studio tier and API (Week 7–8)

- [ ] Studio tier API key generation (Supabase, per-user)
- [ ] API documentation page (`/studio/api-docs`)
- [ ] Rate limiting on API (Supabase Edge Function middleware)
- [ ] Commercial licence terms for Studio tier generations
- [ ] `/studio/gallery` — personal generation gallery for all tiers

---

## Part 9 — The business case

**Conservative monthly revenue projection at 6 months:**

```
Assumptions:
- 500 monthly active users on the AI Studio
- Conversion: 15% to paid (industry standard for creative tools is 3–15%)
- 75 paid subscribers
- Mix: 50 Starter ($9) + 20 Creator ($25) + 5 Studio ($75)
- Token top-ups: ~20% of users buy at least one bundle/month: 15 × $8 avg = $120
- Print orders: 30% of paid subscribers order at least one print/month: 22 × $65 avg margin

Monthly recurring revenue (subscriptions): (50×$9) + (20×$25) + (5×$75) = $450 + $500 + $375 = $1,325
Token top-up revenue: $120
Print gross margin from AI-generated orders: $1,430
Total monthly: ~$2,875

At 12 months with growth:
- 2,000 MAU on Studio
- 300 paid subscribers (same mix ratio)
- Monthly recurring: ~$5,300
- Print margin: ~$5,720
- Total: ~$11,000/month
```

This is the path from "art print shop" to "creative platform." The prints fund the mythology. The mythology builds the audience. The audience funds the Studio. The Studio generates more print sales. It compounds.

---

## The one-line version

*Kumachi AI Studio is a token-based creative platform where anyone can generate art in the Kumachi visual language, order it as a physical print from Kampala, and enter a growing mythology universe called Tales of Kuma — priced as a creative subscription, powered by open-weight AI, built on Supabase and Stripe, and designed to make people come back every month to create more.*

---

*This document is the original product specification and technical roadmap for the Kumachi AI Studio feature set.*
*Archived to `docs/research/` as Historical. Current doctrine lives in `docs/planning/06_ai_studio.md`.*
*Last updated: June 2026*
