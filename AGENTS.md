# Project Name — Agent Guide

> **This file is the single source of truth for any AI agent working in this repo.**
> Read it fully before making any change. Keep it updated when you change anything significant.

---

## 1. What This System Does

<!-- One-paragraph description of the project. What does it build? Who is it for? What problem does it solve? -->

---

## 2. Repository Layout

> **Note (template only):** the tree below is a *Python example*. The scaffolding prompt replaces this section with the actual project layout, informed by the loaded profile (`profiles/languages/<lang>.md` and optionally `profiles/frameworks/<fw>.md`).

```
project/
├── README.md                       # Project entry point (humans)
├── AGENTS.md                       # THIS FILE — agent guide & memory (source of truth)
├── RUNBOOK.md                      # Daily/weekly operational procedures (operators)
├── prompt.md                       # Interactive scaffolding prompt (only present in unscaffolded repos)
├── CLAUDE.md                       # Thin pointer → AGENTS.md (Claude Code)
├── .cursor/rules/agents.mdc        # Thin pointer → AGENTS.md (Cursor v0.49+)
├── .cursorrules                    # Thin pointer → AGENTS.md (Cursor legacy)
├── .github/copilot-instructions.md # Thin pointer → AGENTS.md (Copilot)
├── .windsurfrules                  # Thin pointer → AGENTS.md (Windsurf)
├── GEMINI.md                       # Thin pointer → AGENTS.md (Gemini Code Assist)
├── .aider.conf.yml                 # Aider config — reads AGENTS.md
├── requirements.txt                # Python dependencies (if applicable)
├── package.json                    # Node dependencies (if applicable)
├── docker-compose.yml              # (if applicable)
├── src/                            # Source code
│   ├── __init__.py
│   ├── main.py                     # Entry point
│   ├── core/                       # Core domain logic, data models
│   ├── services/                   # Business logic layer
│   ├── api/                        # API endpoints / interfaces
│   └── utils/                      # Shared utilities
├── tests/                          # Test suite
│   ├── unit/
│   └── integration/
├── config/                         # Configuration files
│   └── default.yaml                # Default configuration
├── scripts/                        # Utility scripts (setup, deploy, data tasks)
│   └── validate_scaffold.sh        # Health check: placeholders, status labels, boilerplate
├── data/                           # Data files (runtime, samples, fixtures)
├── sources/                        # Frozen input docs (Status: Historical) — interview transcript, requirements, etc.
├── docs/                           # All documentation
│   ├── index.md                    # File finder
│   ├── planning.md                 # Project roadmap
│   ├── planning/                   # Phase breakdowns
│   ├── concepts/                   # Design philosophy, rationale ("why")
│   ├── data/                       # Data structures, specifications ("what")
│   ├── system/                     # Architecture, components, configuration ("how")
│   └── research/                   # Historical context, removed features, incidents
├── logs/                           # Runtime logs
└── reports/                        # Generated reports
```

Note: only rule files for the AI assistants actually in use need to exist — the table above lists all supported targets, not required ones.

---

## 3. How to Run / Setup

<!--
  Prerequisites (language version, OS, databases, services)
  Installation steps (clone, install deps, configure)
  How to run (CLI commands, flags, environment variables)
  How to test (test runner, coverage)
-->

### Prerequisites

<!-- e.g. Python 3.13+, Node 20+, Docker, PostgreSQL -->

### Installation

```bash
# Example
git clone <repo-url>
cd project
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

### Running

```bash
# Example
python src/main.py --config config/default.yaml
```

### Testing

```bash
# Example
pytest tests/ -q
```

---

## 4. System Architecture

<!--
  High-level architecture description.
  ASCII diagram showing data flow.
  Key components and their responsibilities.
  State containers / data models.
-->

### Data Flow

```
[Input] → Component A → Component B → [Output]
                ↓
          Storage / Database
```

### Key Components

| Component | Responsibility | Location |
|-----------|---------------|----------|
| ... | ... | `src/services/...` |

### Key State / Data Containers

| Class / Struct | Purpose |
|----------------|---------|
| ... | ... |

---

## 5. Configuration

<!--
  Configuration files, schema, environment variables.
  Hot-reload behavior if applicable.
-->

Config file: `config/default.yaml`

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| ... | ... | ... | ... |

---

## 6. Key Domain Concepts

<!--
  Core algorithms, data types, domain primitives.
  Important formulas, decision trees, or business logic.
-->

---

## 7. Known Decisions & Rationale

<!--
  Architectural decisions (ADRs in brief).
  Trade-offs made, alternatives considered.
  Known limitations.
-->

### Decision Log

| Date | Decision | Rationale |
|------|----------|-----------|
| ... | ... | ... |

### Known Limitations

- ...

---

## 7a. Documentation Audiences

Different audiences use different documentation entry points. Know which docs to read:

| Audience | Primary Docs | Purpose |
|----------|-------------|---------|
| **AI Agents & Developers** | AGENTS.md (this file) | Single source of truth; code-level architecture; what to implement |
| **Operators & Stakeholders** | README.md, RUNBOOK.md | How to run, setup, operate, troubleshoot |
| **System Designers** | docs/system/ | Current architecture, components, design decisions |
| **Learning & Context** | docs/research/ | Historical decisions, removed features, why we abandoned approaches |
| **Project Managers** | docs/planning/ | Timeline, phases, deliverables, roadmap |
| **Everyone** | docs/index.md | File finder and quick navigation |

---

## 7b. Removed Features (Won't Be Reimplemented)

Features, approaches, or systems that were removed. Listed here to prevent re-inventing them.

Document removed items as you deprecate them:
```
- [REMOVED: Feature Name] — Reason: [why]. Date: YYYY-MM-DD.
```

Examples:
```
- [REMOVED: Legacy authentication system] — Reason: Security audit required modernization. Date: 2025-03-15.
- [REMOVED: Plugin architecture] — Reason: Lack of adoption, high maintenance burden. Date: 2025-04-01.
```

**Your removed features:**
- (None yet — add as you deprecate features)

---

## 8. Agent Rules

1. **Keep AGENTS.md current** — update when you fix bugs, change architecture, or add features
2. **Cross-reference source code** — include file paths and line numbers: `[src/core/module.py:42](src/core/module.py:42)`
3. **Follow doc conventions** — see `docs/concepts/README.md`, `docs/data/README.md`, `docs/system/README.md` for category-specific guidance
4. **Run tests after changes** — `pytest tests/ -q` (or equivalent)
5. **Upstream fix over workaround** — fix root causes, not symptoms
6. **Keep docs organised** — concepts for "why", data for "what", system for "how"
7. **No emojis unless meaningful** — `✅` completed, `🟡` in progress, `🔴` open issue only
8. **Numbered series for depth** — use `01_`, `02_`, `03_` prefixes when a category needs multiple docs
9. **All scripts in `scripts/`** — never in root
10. **Secrets never committed** — `.env`, credentials in `.gitignore`
11. **Maintain status labels** — All docs (except research/ and sources/) must start with `Status: Current`, `Status: Planning`, or `Status: Historical`. Update when superseded.
12. **Copy-paste ready commands** — Every command/code example in docs must be: complete, tested, use full paths (not abbreviations), include all flags. Test before committing.
13. **Run the scaffold validator after structural changes** — After scaffolding or any change that adds/renames docs, run `bash scripts/validate_scaffold.sh` and resolve failures before handing off.
14. **`sources/` is frozen** — never edit files in `sources/`. To update knowledge, edit the relevant `docs/` file instead. `sources/` preserves the original inputs that informed scaffolding.
15. **AGENTS.md is the only rule file with real content** — `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `GEMINI.md`, `.github/copilot-instructions.md`, and `.cursor/rules/agents.mdc` are thin pointers. Never duplicate guidance across them — update AGENTS.md instead.
16. **The universal scaffold operates greenfield only.** `prompt.md` runs in an empty/fresh scaffold clone — never directly inside an existing codebase. To document an existing project (brownfield), use the three-step workflow: [extract.md](extract.md) in your repo → [prompt.md](prompt.md) in a fresh scaffold clone (with `PROJECT_CONTEXT.md` attached) → [MERGE_BACK.md](MERGE_BACK.md) to copy results back. The brownfield repo is never modified by scaffolding; the merge step is explicit and reviewable.

---

## 9. Change Log

Record all significant changes here. Format:

```
- YYYY-MM-DD HH:MM UTC: [Description of change]. 
  Reason: [why]. 
  Impact: [what changed]. 
  (Author Name)
```

Example:
```
- 2025-05-22 14:30 UTC: Added status labels convention to all docs.
  Reason: Prevent agents from following stale historical docs.
  Impact: All docs now have Status: Current/Historical/Planning label.
  (Alice)
```

**Entries:**

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial scaffold created | Agent |

---

## 10. Last Updated

**YYYY-MM-DD by [Your Name or Agent]**

Update this whenever you make significant changes to AGENTS.md.
