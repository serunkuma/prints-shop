# Brownfield Context Extraction — Prompt

> **What this is:** a paste-into-any-AI-coding-assistant prompt that runs *inside* an existing project to extract a project-context document. The output, `PROJECT_CONTEXT.md`, is then attached to a separate run of the universal scaffold's [`prompt.md`](prompt.md) to generate documentation. The brownfield project itself is never modified except for that single file.
>
> **How to use:** copy everything below the `---` and paste it as your first message to an AI session running inside your brownfield repo. Attach nothing — the AI will read the repo. When it finishes, you'll have `PROJECT_CONTEXT.md` at the repo root; move it to wherever you'll run the scaffold from, then follow the workflow in the universal scaffold's [README.md](README.md) (workflow C).

---

You are an AI coding assistant inside a **brownfield project** (an existing codebase). Your single job is to read the repo enough to produce **one file**, `PROJECT_CONTEXT.md`, at the repo root. You write no other files. You modify nothing.

`PROJECT_CONTEXT.md` will be attached to a separate AI session running in a fresh clone of the *universal documentation-driven scaffold* — that session will use your file as pre-filled answers to its scaffolding interview. So write the file with that consumer in mind: structured, factual, no fabrication.

## Step 1 — Read the repo (cheaply)

Read enough to understand the project. Hard cap: ~30 file reads total.

**Read in full:**
- `README.md` (if present)
- Any existing `AGENTS.md`, `CLAUDE.md`, `.cursorrules`, `.windsurfrules`, `GEMINI.md`, `.github/copilot-instructions.md`, `.cursor/rules/*` — these may contain prior agent guidance that must be preserved
- `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`, `RUNBOOK.md` (if present)
- The primary manifest: `package.json`, `pyproject.toml` (and `requirements.txt`), `Gemfile` + `*.gemspec`, `composer.json`, `pubspec.yaml`, `Cargo.toml`, `go.mod`, `*.csproj`, `pom.xml`, `build.gradle` — whatever is there
- `tsconfig.json` (if TS), `analysis_options.yaml` (if Dart), `phpunit.xml` (if PHP), or the equivalent dominant tooling config
- Top-level `.gitignore` (for inferring build outputs / ignored dirs)

**Read directory listings (not file content) for:**
- `src/`, `lib/`, `app/`, `bin/` — whichever holds the source
- `tests/`, `test/`, `spec/`, `__tests__/`
- `docs/` if present (then read 2–3 representative files)
- `.github/workflows/` (then read one workflow file to understand CI)

**Read 2–3 representative source files** to confirm stack and conventions (e.g., one component, one test, one entry point). Don't try to understand the business logic.

**Skip entirely:** `node_modules/`, `vendor/`, `.venv/`, `dist/`, `build/`, `.git/`, anything in `.gitignore`.

When done, briefly tell the user: "Read N files. Now writing PROJECT_CONTEXT.md."

## Step 2 — Write `PROJECT_CONTEXT.md`

Write the file at the repo root with **exactly** the structure below. Fill every section. Mark anything inferred (not directly stated) with `> **INFERRED:**`. Mark anything missing with `> **TODO:**`. **No fabrication.**

```markdown
# Project Context — extracted <YYYY-MM-DD>

Status: Historical
Source: extracted from <repo name or path> by extract.md
For use with: universal scaffold's prompt.md (workflow C)

---

## Batch 1 — Project basics
- **Name:** <from package.json `name` / pyproject `name` / repo dir name>
- **One-line description:** <inferred from README first paragraph or manifest `description`>
- **Problem solved:** > **TODO:** (rarely extractable; user will fill in)
- **Brand-new or existing:** existing

## Batch 2 — Stack & shape
- **Primary language:** <inferred from manifest, with version constraint>
- **Frameworks:** <list from deps — e.g., react, fastapi, rails, flutter>
- **Datastores:** <inferred from deps — pg, mysql2, redis, mongoose, sqlite3, etc.; if none, say "none">
- **Runtime target:** <inferred from project shape — CLI, server, web SPA, mobile, library>
- **Project type:** <pick the closest: CLI tool / web app / library / microservice / ML pipeline / mobile app / desktop app / other>

## Batch 3 — Audiences & operations
> **TODO:** extract.md can't infer audiences. The user must fill in when running prompt.md:
> - Who runs it (just the author / team / external operators)?
> - Production-critical or experimental?
> - Hard constraints (latency, security, compliance, offline-first, single-binary)?
> - Operator role distinct from developer?

## Batch 4 — Source material
Authoritative source documents found in the repo:
- README.md (<N> lines)
- <list any AGENTS.md / CLAUDE.md / .cursorrules etc. found>
- <list any docs/* files>
- <list CONTRIBUTING.md, ADRs, design docs>

The scaffolding session should treat these as the source-of-truth for project knowledge that already exists.

## Batch 5 — AI assistants used
Rule files detected in the repo (suggesting which assistants are or have been in use):
- <list each found, e.g., "CLAUDE.md present", ".cursorrules present">

If none detected: > **TODO:** ask the user which AI tools they use.

---

## Repo layout (factual)

ASCII tree of top 2-3 levels, omitting gitignored directories:

\`\`\`
<tree here>
\`\`\`

## Existing commands (extracted from manifests)

| Task | Command | Source |
|------|---------|--------|
| Install | <e.g., `npm install`> | package.json |
| Build | <e.g., `npm run build`> | package.json scripts |
| Test | <e.g., `npm test`> | same |
| Run | <e.g., `node src/index.js`> | inferred |
| Lint | <if found> | same |
| Format | <if found> | same |

If a command is missing from the manifest: > **INFERRED:** <best guess> — or > **TODO:** ask the user.

## Existing documentation found

Per file, give a one-line summary:
- `README.md` — <one-line summary>
- `AGENTS.md` — <one-line summary> (if exists)
- `docs/<file>` — <one-line summary>
- ...

## Existing AGENTS.md content (verbatim)

If an `AGENTS.md` (or `CLAUDE.md` with substantive content) exists, embed its **full content** below, fenced. This lets prompt.md merge it into the new AGENTS.md without re-reading the brownfield repo.

\`\`\`markdown
<paste verbatim, or write "No existing AGENTS.md found.">
\`\`\`

## Notable decisions / conventions observed

Bullet what's evident from the code and existing docs. Be specific, cite files:
- <e.g., "Uses src-layout (`src/<pkg_name>/`) — confirmed at `src/<pkg>/__init__.py`">
- <e.g., "Tests run via pytest with markers `unit` and `integration` — per `pyproject.toml [tool.pytest.ini_options]`">
- <e.g., "State management: Riverpod (deps include `flutter_riverpod`)">
- <e.g., "TypeScript strict mode enabled — `tsconfig.json compilerOptions.strict: true`">

If nothing notable: write "No strong conventions detected; treat as fresh ground for documentation."

## Open questions for the user

List specifically what extract.md couldn't determine. The user resolves these when running prompt.md:
- <e.g., "Problem statement / target user not stated in README">
- <e.g., "No tests directory — is there a test suite?">
- <e.g., "Multiple state-management libraries in deps; which is canonical?">

---

*Last updated: <YYYY-MM-DD>*
```

## Step 3 — Hand off

After writing `PROJECT_CONTEXT.md`, output exactly this message (substituting real numbers/paths):

```
✅ PROJECT_CONTEXT.md written to: <absolute path>

Summary of extracted context:
- Stack: <one-line summary>
- Project type: <one word>
- Existing AGENTS.md: <yes/no>
- Open TODOs for user to resolve: <count>

Next steps (do these in a fresh session, NOT this one):

1. Clone or copy the universal documentation-driven scaffold to a separate directory.
2. Open a new AI session in that scaffold directory. Paste the contents of `prompt.md` from the scaffold, and attach `PROJECT_CONTEXT.md` (the file you just created).
3. The scaffold will use the context as pre-filled interview answers, ask about the TODOs, then generate the docs tree.
4. When the scaffolded docs are ready, follow `MERGE_BACK.md` in the scaffold to copy the right files back into this repo.

This session is done. You can close it.
```

## Guardrails

- **One file written, ever.** Only `PROJECT_CONTEXT.md` at the repo root. Nothing else.
- **No interview questions to the user.** Extract from code; mark gaps as `> **TODO:**`. The user fills gaps in the next session.
- **No modifications to code, manifests, or existing docs.** Read-only on everything except the new file.
- **Hard cap ~30 file reads.** Read directory listings before reading file content. Sample, don't exhaust.
- **No fabrication.** If you don't know, mark TODO. If you're guessing, mark INFERRED. Never assert as fact.
- **Plain text in the handoff message.** No markdown headers or formatting in the final message — just the literal block above with substitutions.

---

*Last updated: 2026-05-22*
