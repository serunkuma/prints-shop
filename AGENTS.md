# Project Name — Agent Guide

> **This file is the single source of truth for any AI agent working in this repo.**
> Read it fully before making any change. Keep it updated when you change anything significant.

---

## 1. What This System Does

<!-- One-paragraph description of the project. What does it build? Who is it for? What problem does it solve? -->

---

## 2. Repository Layout

```
project/
├── README.md                  # Project entry point
├── AGENTS.md                  # THIS FILE — agent guide & memory
├── requirements.txt           # Python dependencies (if applicable)
├── package.json               # Node dependencies (if applicable)
├── docker-compose.yml         # (if applicable)
├── src/                       # Source code
│   ├── __init__.py
│   ├── main.py                # Entry point
│   ├── core/                  # Core domain logic, data models
│   ├── services/              # Business logic layer
│   ├── api/                   # API endpoints / interfaces
│   └── utils/                 # Shared utilities
├── tests/                     # Test suite
│   ├── unit/
│   └── integration/
├── config/                    # Configuration files
│   └── default.yaml           # Default configuration
├── scripts/                   # Utility scripts (setup, deploy, data tasks)
├── data/                      # Data files (runtime, samples, fixtures)
├── docs/                      # All documentation
│   ├── planning.md            # Project roadmap
│   ├── planning/              # Phase breakdowns
│   ├── concepts/              # Design philosophy, rationale
│   ├── data/                  # Data structures, specifications
│   └── system/                # Architecture, components, configuration
├── logs/                      # Runtime logs
└── reports/                   # Generated reports
```

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

---

## 9. Change Log

| Date | Change | Author |
|------|--------|--------|
| YYYY-MM-DD | Initial scaffold created | Agent |
