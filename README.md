# Universal Project Kickstart

This scaffold turns a generic project skeleton into a real, project-specific codebase using an AI coding assistant. Two modes are supported — pick whichever fits how you're starting.

## Three Workflows

Pick the workflow that matches your starting point. All three produce the same end state in your project — a project-specific `AGENTS.md`, populated `docs/` tree, `RUNBOOK.md`, and AI-assistant pointer files.

| Workflow | When | How |
|----------|------|-----|
| **A. Greenfield interactive** *(recommended for fuzzy starts)* | Fresh project, no source docs yet | Paste [prompt.md](prompt.md) into your AI assistant inside a fresh clone of this scaffold. The AI interviews you in 5 batches, proposes a plan, scaffolds on approval. |
| **B. Greenfield batch** | Fresh project, complete source docs ready | Paste the prompt at the bottom of this README with your `.md` source documents attached. The AI populates everything in one pass. |
| **C. Brownfield extract→scaffold→merge** | Existing codebase to retrofit with docs | Three steps: (1) paste [extract.md](extract.md) into an AI session **inside your existing repo** → produces `PROJECT_CONTEXT.md`. (2) Open a fresh clone of *this* scaffold; paste [prompt.md](prompt.md) **and attach** `PROJECT_CONTEXT.md` → produces scaffolded docs. (3) Follow [MERGE_BACK.md](MERGE_BACK.md) to copy the generated docs into your project. |

### Workflow C in a diagram

```
[your brownfield repo]      [fresh universal scaffold clone]      [your brownfield repo]
       │                              │                                    ▲
   extract.md  ────────────────►  prompt.md   ────────────►   MERGE_BACK.md
       │   PROJECT_CONTEXT.md         │    scaffolded docs                 │
       ▼                              ▼                                    │
PROJECT_CONTEXT.md              docs/, AGENTS.md, ...   ───────────────────┘
```

The universal scaffold **only ever operates greenfield**. Workflow C uses two AI sessions (one in your repo for extraction, one in a fresh scaffold for generation) so that your codebase is never touched by the scaffolding tool. The merge step is manual and reviewable.

### Stack-aware via profiles

Greenfield scaffolding (workflows A, B, and the scaffold-step of C) loads a relevant profile from [`profiles/`](profiles/) — Python, NodeJS, TypeScript, Dart, PHP, Ruby, Angular, React, React Native, or Flutter — so the generated `AGENTS.md` and `RUNBOOK.md` use that ecosystem's conventional repo layout, manifests, commands, and anti-patterns. Stacks outside the built-in set fall back to [`profiles/_generic.md`](profiles/_generic.md) with TODOs for the user to confirm.

## What gets scaffolded (both modes)

- `AGENTS.md` — project-specific single source of truth (deletes + replaces the generic template)
- `README.md` — project entry point (replaces this file)
- `RUNBOOK.md` — daily/weekly operational procedures, tailored to the project
- `docs/` — populated `concepts/`, `data/`, `system/`, `planning/`, `research/`, plus `index.md`
- `sources/` — frozen input documents (interview transcript + any attached source docs) for traceability
- **AI-assistant rule files** — thin pointers to `AGENTS.md` for the assistants you actually use: `CLAUDE.md`, `.cursor/rules/agents.mdc`, `.cursorrules`, `.github/copilot-instructions.md`, `.windsurfrules`, `GEMINI.md`, `.aider.conf.yml`

After scaffolding, run `bash scripts/validate_scaffold.sh` to catch any unfilled placeholders, missing status labels, or generic boilerplate that slipped through.

---

## Batch-mode Prompt (copy from here)

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
- Section 7a: Documentation audiences (who reads what)
- Section 7b: Removed features (deprecation log)
- Section 8: Agent rules (conventions, rules of thumb for future agents)
- Section 9: Change log (track significant updates)

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

**7. Generate `RUNBOOK.md`** — daily and weekly operational procedures. Include:
- Core operational rules (immutable principles)
- Daily workflow checklist (numbered steps with copy-paste ready commands)
- Weekly tasks (status verification, backups, maintenance)
- Troubleshooting guide (common issues and solutions)
- Maintenance procedures (monthly, quarterly, annual)
- Quick reference table of core commands

**8. Create `docs/research/README.md`** — a guide for historical documentation. Include:
- What goes in research/ (deprecated features, abandoned approaches, planning notes, incident reports)
- Labelling convention (`[REMOVED: ...]`, `[ABANDONED: ...]`, `[PLANNING: ...]`, `[INCIDENT: ...]`)
- Difference from docs/system/ (research is optional context, system is current authority)
- How to search and reference research docs

**9. Generate `docs/index.md`** — a file finder and navigation hub. Include:
- Quick index of all doc files organized by category (Concepts, Data, System, Planning, Research)
- One-line description of each doc
- Status legend (Current/Historical/Planning)
- Quick find table by topic

**10. Update `AGENTS.md` with removed features** — as you deprecate features during implementation:
- Add to Section 7b "Removed Features" any features, approaches, or systems that won't be reimplemented
- Format: `- [REMOVED: Feature Name] — Reason: [why]. Date: YYYY-MM-DD.`
- Purpose: prevent re-inventing deprecated features

**11. Replace this README** with a proper project README that serves as the entry point for humans:
- Project name and one-paragraph description
- Quick start (clone, install, run)
- Architecture overview (2–3 sentences)
- Links to key docs (`docs/index.md`, `docs/concepts/`, `docs/data/`, `docs/system/`)
- Badges or status indicators if applicable

**12. Generate AI-assistant rule files.** `AGENTS.md` is the source of truth; every other rule file is a thin pointer. Ask the user (or default to all common ones) which assistants will work on the repo, then generate only those. Use these exact templates:

| File | Content |
|------|---------|
| `CLAUDE.md` | `See [AGENTS.md](AGENTS.md) — single source of truth for AI agents in this repo.` |
| `.cursor/rules/agents.mdc` | Frontmatter `description` + `alwaysApply: true`, body points to `AGENTS.md` |
| `.cursorrules` (legacy) | `See AGENTS.md — single source of truth for this repository.` |
| `.github/copilot-instructions.md` | `# Copilot Instructions\n\nSee [AGENTS.md](../AGENTS.md). Always read AGENTS.md before changes.` |
| `.windsurfrules` | `See AGENTS.md — single source of truth for this repository.` |
| `GEMINI.md` | `See [AGENTS.md](AGENTS.md) — single source of truth for AI agents in this repo.` |
| `.aider.conf.yml` | `read:\n  - AGENTS.md` |

**13. Persist sources.** Create `sources/` at the project root with:
- `sources/README.md` — `Status: Historical`, rules about not editing
- Any attached source documents moved into `sources/` with descriptive filenames
- (If in interactive mode) `sources/INTERVIEW_TRANSCRIPT.md` containing the Q&A verbatim, `Status: Historical`

**14. Run the validator.** After scaffolding, run `bash scripts/validate_scaffold.sh` and resolve any failures before handing off.

### Documentation Conventions

Follow these conventions (extracted from the pocket-auto-3 project which inspired this scaffold):

#### Status Labels
- **Every doc must declare status** — add to the top of each file: `Status: Current` (authoritative), `Status: Planning` (upcoming), or `Status: Historical` (outdated, kept for reference)
- **Example:** `# 01_Architecture Overview\n\nStatus: Current\n\n[content]`
- **Purpose:** Prevents agents and operators from following stale documentation

#### Writing Style
- **Operator-first for operator docs** — RUNBOOK.md and README.md should start with "what to do" before "why it works"
- **Production warnings upfront** — real-money/production cautions belong in the introduction, not buried
- **Copy-paste ready commands** — every command in docs is tested, complete, uses full paths (not abbreviations)
  - ✅ Good: `.venv/bin/python -m pytest tests/ -q`
  - ❌ Bad: `pytest tests/`

#### Formatting
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
