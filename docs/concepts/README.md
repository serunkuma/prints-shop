# Concepts Documentation — "Why"

> Documents in this folder explain **design philosophy, core beliefs, and architectural rationale** — the reasoning behind decisions, not just the decisions themselves.

---

## What Goes Here

This category answers **"why is it built this way?"** — the thinking, trade-offs, and domain understanding that shaped the system.

| Type | Examples from pocket-auto-3 | When to Create |
|------|---------------------------|----------------|
| Domain primitives | Time semantics, tick definition, auction theory | Sources reveal key domain concepts |
| Design philosophy | Backtest beliefs, risk philosophy, probability weighting | During architecture design |
| Trade-off rationale | Why MongoDB was chosen over Postgres, why async over sync | When a decision has significant implications |
| Open questions | Known unknowns, areas needing research | Ongoing — add as they arise |

---

## Numbering Convention

When a concept needs more depth than a single file, use numbered prefixes for linear reading:

```
concepts/
├── README.md
├── 01_DOMAIN_PRIMITIVES.md
├── 02_DESIGN_PHILOSOPHY.md
├── 03_ARCHITECTURE_RATIONALE.md
└── 04_OPEN_QUESTIONS.md
```

Not every project needs all of these. Create only what the source documents justify.

---

## Population Process

1. **First pass** — Agent extracts from attached source documents during initial kickstart
2. **During design** — When significant decisions are made, document the alternatives considered and the chosen path
3. **During review** — When inconsistencies or gaps are found, add clarifying documents

---

## Relationship to Other Categories

```
docs/concepts/  ──►  "Why" — philosophy, beliefs, rationale
docs/data/      ──►  "What" — data structures, formulas, pipelines
docs/system/    ──►  "How" — architecture, components, deployment
```

Concepts drive the data design and system architecture. If you're unsure why something is the way it is, the answer is here.

---

## Key Principles

- **Rationale over opinion** — every "why" should reference a concrete trade-off or constraint
- **Alternatives considered** — when documenting a decision, list what was rejected and why
- **Living documents** — concepts evolve as understanding deepens; update when the team learns something new
- **Open questions are valuable** — admitting what you don't know is better than pretending you do

---

## Related

- `docs/data/README.md` — data structures and specifications
- `docs/system/README.md` — architecture and components
- `AGENTS.md` Sections 4 (architecture) and 6 (key concepts) draw from here

---

*Last updated: YYYY-MM-DD*
