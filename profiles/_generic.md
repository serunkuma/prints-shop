# Generic Profile (Fallback)

Status: Current

> Loaded when no specific language profile matches the user's stack. Conservative defaults; flags everything the AI would otherwise invent for the user to confirm.

## 1. Stack identity

The user's stack doesn't match any of the built-in language profiles (Python, NodeJS, TypeScript, Dart, PHP, Ruby). The AI must rely on the user's own descriptions in Batch 2 and treat all stack-specific decisions as `> **TODO:**` items in the scaffolded docs.

## 2. Conventional repo layout

```
project/
├── src/                # Source code (or lib/, app/, depending on stack)
├── tests/              # Test suite (or test/, spec/)
├── docs/               # Documentation (created by scaffolding)
├── scripts/            # Utility scripts
└── [manifest]          # Stack-specific: e.g., Cargo.toml, go.mod, *.csproj
```

> **TODO:** Confirm with the user what their actual top-level layout looks like. Replace placeholders above with the real directories before stamping the final `AGENTS.md` Section 2.

## 3. Standard manifest files

Unknown — ask the user. Common manifest filenames to look for if brownfield:

- `Cargo.toml` (Rust)
- `go.mod` (Go)
- `Package.swift` (Swift)
- `build.gradle` / `build.gradle.kts` (Kotlin/Java)
- `pom.xml` (Maven)
- `*.csproj` (.NET)
- `mix.exs` (Elixir)
- `rebar.config` (Erlang)

Document what was found in `AGENTS.md` Section 3 with a `> **TODO:**` for any whose contents the AI couldn't fully understand.

## 4. Run / build / test commands

> **TODO:** Ask the user for the exact commands their stack uses to:
> 1. Install dependencies
> 2. Build / compile (if applicable)
> 3. Run the project
> 4. Run tests
> 5. Lint / format
>
> Record them as copy-paste-ready commands with full paths. Do not guess.

## 5. Documentation patterns

Default to the universal three-pillar structure (`docs/concepts/`, `docs/data/`, `docs/system/`) with no stack-specific placement hints. The AI should ask the user where stack-specific items live (e.g., "Where does your build configuration live?").

## 6. Common gotchas

Stack-unknown — leave `AGENTS.md` Section 7b empty initially. Populate as the user reports gotchas.

## 7. `.gitignore` essentials

Generic patterns the AI can suggest the user verify:

```
# OS
.DS_Store
Thumbs.db

# Editor
.vscode/
.idea/
*.swp

# Secrets
.env
.env.local
*.pem
*.key

# Build / output (stack-specific — ask the user)
build/
dist/
out/
```

## 8. Companion profile pointers

None. The user's stack is unrecognised, so no framework profile is loaded by default. Ask the user if they want to flag a stack for a future profile contribution.

---

*Last updated: 2026-05-22*
