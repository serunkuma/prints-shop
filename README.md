# Universal Project Kickstart

Copy this entire message (including the prompt below) and paste it to your AI agent with your source documents attached. The agent will populate the `project/` scaffold with full documentation.

---

## Prompt (copy from here)

You are working in a universal project scaffold at `/project/`. Attached to this message are source documents — `.md` files containing requirements, domain knowledge, specifications, notes, design decisions, API references, and any other raw material for a new software engineering project.

Your job is to read every attached source document, synthesise the knowledge, and populate the entire project scaffold with polished, production-quality documentation. The scaffold already has this structure:

```
/project/
├── README.md                  ← this prompt (replace with project overview after population)
├── AGENTS.md                  ← single source of truth for all agents working on this project
└── docs/
    ├── planning.md            ← full project roadmap synthesised from sources
    ├── planning/              ← phase-by-phase breakdown documents
    │   ├── phase-1-*.md
    │   ├── phase-2-*.md
    │   └── ...
    ├── concepts/              ← "why" — design philosophy, rationale, beliefs
    │   ├── README.md          ← guide (already exists, update if needed)
    │   ├── 01_*.md
    │   ├── 02_*.md
    │   └── ...
    ├── data/                  ← "what" — data structures, fields, calculations, pipelines
    │   ├── README.md          ← guide (already exists, update if needed)
    │   ├── 01_*.md
    │   ├── 02_*.md
    │   └── ...
    └── system/                ← "how" — architecture, components, configuration, deployment
        ├── README.md          ← guide (already exists, update if needed)
        ├── 01_*.md
        ├── 02_*.md
        └── ...
```

### What to Do

**1. Read all source attachments.** Every `.md` file attached to this message. Extract all knowledge — domain concepts, data models, architecture decisions, API specs, user workflows, constraints, risks.

**2. Categorise knowledge into the three doc categories:**

| Category | Question | What it holds |
|----------|----------|--------------|
| `docs/concepts/` | Why? | Design philosophy, core beliefs, domain primitives, trade-off rationale, open questions |
| `docs/data/` | What? | Data structures, field definitions, calculation formulas, pipeline stages, validation rules |
| `docs/system/` | How? | Architecture overview, component responsibilities, configuration reference, deployment, API docs, runbooks |

**3. Populate each category with a numbered doc series.** If a category has rich enough source material, generate numbered documents (`01_TOPIC.md`, `02_TOPIC.md`, ...). If source material is thin, leave the category with only its README and a note about what's missing.

**4. Generate `AGENTS.md`** — a comprehensive single-source-of-truth document modeled on the following structure:
- Section 1: What this system does (one-paragraph elevator pitch)
- Section 2: Repository layout (ASCII tree of the project)
- Section 3: How to run / setup (prerequisites, env vars, CLI commands)
- Section 4: System architecture (data flow, key components, state containers)
- Section 5: Configuration (config files, schema references)
- Section 6: Key domain concepts (core data types, algorithms)
- Section 7: Known decisions and rationale (important trade-offs made)
- Section 8: Agent rules (conventions, rules of thumb for future agents)

**5. Generate `docs/planning.md`** — a full project roadmap synthesised from the sources. Include:
- Project vision (one paragraph)
- Phase summaries (2–5 phases) with objectives
- Milestone markers and rough timeline
- Dependency map (what depends on what)
- Risk notes

**6. Generate phase documents in `docs/planning/`** — one `.md` file per phase from the roadmap. Each phase doc contains:
- Objective & scope (what this phase delivers)
- Task checklist (actionable, specific items)
- Deliverables (files, artifacts, decisions)
- Acceptance criteria (how to know it's done)
- Dependencies (upstream phases or external)

**7. Replace this README** with a proper project README that serves as the entry point for humans:
- Project name and one-paragraph description
- Quick start (clone, install, run)
- Architecture overview (2–3 sentences)
- Links to key docs (`docs/concepts/`, `docs/data/`, `docs/system/`)
- Badges or status indicators if applicable

### Documentation Conventions

Follow these conventions (extracted from the pocket-auto-3 project which inspired this scaffold):

- **Numbered doc series** — use `01_`, `02_`, `03_` prefixes for linear reading order within each category
- **Cross-references** — use relative paths: `[01_TOPIC.md](01_TOPIC.md)`, `[docs/system/02_COMPONENTS.md](../system/02_COMPONENTS.md)`, `[src/core/module.py](../../src/core/module.py)`
- **Tables for structured data** — field definitions, config parameters, API endpoints all get tables
- **ASCII diagrams** — use monospace art for architecture flows, state machines, pipeline illustrations
- **Pseudocode** — use fenced code blocks for calculation logic, decision trees, algorithms
- **Horizontal rules** (`---`) between major sections
- **"Last updated" footer** — every doc ends with `*Last updated: YYYY-MM-DD*`
- **Code references** — include file paths with line numbers: `[src/core/module.py:42](../../src/core/module.py:42)`
- **No emojis unless meaningful** — use `✅` for completed, `🟡` for in progress, `🔴` for open issues only

### If Information Is Missing

If the attached sources do not provide enough information to populate a section fully, do NOT fabricate. Instead:
- Generate the section with a clear note: `> **TODO:** No source material found for this section. Populate when design decisions are made.`
- List what information is needed and where it might come from

### Finally

After populating the scaffold, confirm by listing every file you created or modified with a brief description of each.
