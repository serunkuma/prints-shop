# Python Profile

Status: Current

> Conventions for Python projects: CLI tools, libraries, web services, ML pipelines. Generic-engineering perspective — opinionated where there's a strong industry consensus, neutral where reasonable people disagree.

## 1. Stack identity

Python is a general-purpose interpreted language with strong defaults for scripting, data work, and web backends. Standard packaging is via `pyproject.toml` + a virtual environment. Most modern projects use one of: FastAPI (web API), Flask (lightweight web), Django (full-stack web), Click/Typer (CLI), or no framework (libraries / scripts).

## 2. Conventional repo layout

```
project/
├── pyproject.toml             # Single source of truth for package metadata + dependencies
├── README.md
├── AGENTS.md
├── .python-version            # Pin a specific version (pyenv) — optional but recommended
├── .venv/                     # Virtual environment (gitignored)
├── src/
│   └── <package_name>/        # Package code (use src-layout, not flat)
│       ├── __init__.py
│       ├── main.py            # Entry point if CLI
│       └── ...
├── tests/
│   ├── __init__.py
│   ├── conftest.py            # Shared pytest fixtures
│   ├── unit/
│   └── integration/
├── scripts/                   # Utility / one-off scripts
└── docs/
```

**Note: prefer `src/` layout** over flat layout (`<package_name>/` at repo root). Src-layout prevents accidental imports from the working directory during testing.

## 3. Standard manifest files

- **`pyproject.toml`** — PEP 621 metadata. Keys to document in `AGENTS.md` Section 5:
  - `[project]` → name, version, requires-python, dependencies, optional-dependencies
  - `[project.scripts]` → CLI entry points
  - `[build-system]` → build backend (hatchling, setuptools, poetry, pdm)
  - `[tool.pytest.ini_options]`, `[tool.ruff]`, `[tool.mypy]` → tooling config
- **`requirements.txt`** (optional, legacy) — only for environments that can't read pyproject.toml. Prefer `pyproject.toml` exclusively for new projects.
- **`.python-version`** — single line, e.g. `3.12.7`. Consumed by pyenv.

Do not generate these files at scaffolding time — only reference them in docs.

## 4. Run / build / test commands

Always invoke through the venv to avoid system-Python contamination:

```bash
# Create venv (one-time, project setup)
python3 -m venv .venv

# Install package + dev dependencies (editable install)
.venv/bin/pip install -e ".[dev]"

# Run the application
.venv/bin/python -m <package_name>            # If package has __main__.py
.venv/bin/python -m <package_name>.main       # Explicit entry-point module
.venv/bin/<console_script_name>               # If [project.scripts] defined

# Tests
.venv/bin/python -m pytest tests/ -q
.venv/bin/python -m pytest tests/unit/ -v
.venv/bin/python -m pytest tests/integration/ -m integration

# Lint / format
.venv/bin/ruff check src/ tests/
.venv/bin/ruff format src/ tests/

# Type-check
.venv/bin/mypy src/
```

**Never write bare `python` or `pytest`** in docs — both can resolve to the wrong interpreter on contributor machines.

## 5. Documentation patterns

- **`docs/system/03_CONFIGURATION.md`** — document `pyproject.toml` `[tool.*]` blocks, environment variables, config-file precedence.
- **`docs/data/`** — document Pydantic/dataclass models here, one numbered file per major data category.
- **`docs/system/02_COMPONENTS.md`** — map Python modules to component table rows. Each row: `src/<package_name>/<module>.py` ↔ responsibility.
- **`AGENTS.md` Section 3** — always show venv-activated commands.
- **`docs/system/07_TESTING.md`** — document pytest markers in use, fixture conventions, integration-test prerequisites.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **Bare `python`/`pytest` in commands** — resolves to system Python on user machines, breaks reproducibility. Always `.venv/bin/python`.
- **Mixing `requirements.txt` and `pyproject.toml`** — pick one; they drift. New projects: pyproject only.
- **Flat-layout imports succeeding accidentally** — tests pass because Python finds the package via the cwd, not the installed venv. Src-layout prevents this.
- **`pip install` without `-e`** — non-editable installs require reinstall on every code change. Use `pip install -e .` for development.
- **Committing `__pycache__/`, `.pytest_cache/`, `.venv/`** — these are local-only.

## 7. `.gitignore` essentials

```
__pycache__/
*.py[cod]
*.pyo
.venv/
venv/
env/
.pytest_cache/
.mypy_cache/
.ruff_cache/
.coverage
htmlcov/
dist/
build/
*.egg-info/
.python-version  # debated — pin in project but not in personal env
.env
.env.local
```

## 8. Companion profile pointers

None in the current set. Python frameworks (Django, FastAPI, Flask) aren't yet broken out into their own profiles — capture framework-specific conventions in `AGENTS.md` Section 6 and `docs/system/` for now.

---

*Last updated: 2026-05-22*
