# Data Documentation — "What"

> Documents in this folder specify **data structures, fields, calculation formulas, pipeline stages, and validation rules** — the precise definition of what data flows through the system and how it transforms at each stage.

---

## What Goes Here

This category answers **"what are the data and how are they computed?"** — the unambiguous specification of every data element.

| Type | Examples from pocket-auto-3 | When to Create |
|------|---------------------------|----------------|
| Data models / schemas | TickData, Signal, RuntimeState, FVAState | When domain models are defined |
| Calculation formulas | FVA computation, velocity/acceleration, 40/40/20 weighting | When algorithms are specified |
| Pipeline stages | Tick ingestion → physics layer → FVA layer → SAN layer | When data flows are designed |
| Validation rules | Min/max ranges, required fields, type constraints | When data quality matters |
| Output formats | CSV column specs, JSON schemas, stream payloads | When interfaces are defined |

---

## Numbering Convention

Pipeline stages should follow data flow order:

```
data/
├── README.md
├── 01_RAW_INPUTS.md
├── 02_PROCESSING_LAYER.md
├── 03_STORAGE_SCHEMA.md
├── 04_OUTPUT_FORMATS.md
├── 05_VALIDATION_RULES.md
└── DATA_CATALOG.md          ← Single reference for all fields
```

The `DATA_CATALOG.md` pattern (a single-file reference of every field, its type, source, and description) is highly recommended for projects with many data elements.

---

## Population Process

1. **First pass** — Agent extracts data specifications from attached source documents
2. **During implementation** — When code reveals data shapes or edge cases not covered in sources
3. **During testing** — When validation rules are refined based on test findings

---

## Relationship to Other Categories

```
docs/concepts/  ──►  "Why" — philosophy, beliefs, rationale
docs/data/      ──►  "What" — data structures, formulas, pipelines  ← You are here
docs/system/    ──►  "How" — architecture, components, deployment
```

Data docs are the contract between concepts (what we want to achieve) and system (how we achieve it). Every data element should trace back to a concept in `docs/concepts/`.

---

## Key Principles

- **Precision over prose** — use tables, pseudocode, and schemas; minimise vague descriptions
- **Single source of truth** — every field is defined in exactly one place (cross-reference don't duplicate)
- **Examples required** — every calculation doc includes at least one worked example with inputs and expected output
- **Validation rules explicit** — don't say "validated" — say "must be > 0 and ≤ 1000"

---

## Doc Template (Data Layer)

When creating a new data layer doc, follow this structure:

```markdown
# Layer Name — Brief Description

## Overview
What this layer does, when it runs, what it consumes.

## Input
Table of input fields with types and sources.

## Output
Table of output fields with types, descriptions, and units.

## Calculation
Pseudocode or formula in fenced code block.

## Key Principles
Design constraints or invariants that shape this layer.

## Validation Rules
Assertions that must hold for output to be valid.

## Related Documentation
```

---

## Related

- `docs/concepts/README.md` — design philosophy behind the data
- `docs/system/README.md` — component architecture that processes this data
- `AGENTS.md` Section 6 (key concepts) draws from here

---

*Last updated: YYYY-MM-DD*
