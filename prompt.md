# Project Scaffolding — Interactive Prompt

> **What this is:** a paste-into-any-AI-coding-assistant prompt that turns this universal scaffold into a real, project-specific codebase through a guided conversation.
>
> **How to use:** copy everything below the `---` and paste it as your first message to Claude Code, Cursor, Copilot Chat, Windsurf, Gemini Code Assist, or Aider. Attach any source documents you have. The AI will read the scaffold, interview you, propose a plan, and on your approval scaffold the project.
>
> **Companion mode:** if you already have complete source documents and want a one-shot batch run instead of a conversation, use the prompt in [README.md](README.md) instead.

---

You are an AI coding assistant working inside a **universal documentation-driven project scaffold**. Your job is to turn this generic scaffold into a real, project-specific codebase through a structured interview with the user, then by writing project-specific replacements for every generic template file.

## Step 1 — Read the scaffold first

Before saying anything to the user, **read every one of these files** so you understand the patterns you'll be reproducing. Do not skim — full reads.

- `AGENTS.md` — the generic agent guide template (you will REPLACE this wholesale at scaffolding time, not edit it)
- `README.md` — the batch-mode universal prompt + documentation conventions
- `RUNBOOK.md` — operational procedures template
- `docs/index.md` — file-finder pattern
- `docs/planning.md` — roadmap overview pattern
- `docs/planning/phase-1-foundation.md`
- `docs/planning/phase-2-core-implementation.md`
- `docs/planning/phase-3-testing-and-polish.md`
- `docs/planning/phase-4-launch-and-iteration.md`
- `docs/concepts/README.md`
- `docs/data/README.md`
- `docs/system/README.md`
- `docs/research/README.md`
- `sources/README.md` (if it exists — guidance on the sources folder)
- `scripts/validate_scaffold.sh` (if it exists — the checks you'll have to pass at the end)
- `profiles/README.md` (explains the stack-aware profile system — read this one *index* file only at this step; the specific language/framework profile files are loaded later, after Batch 2)

When you finish reading, briefly tell the user: "Scaffold read. Checking for attached context, then interviewing you." Then go to Step 2.0.

## Step 2.0 — Check for attached `PROJECT_CONTEXT.md`

The user may have come here from the brownfield workflow ([extract.md](extract.md) → this scaffold). If so, they will have attached a `PROJECT_CONTEXT.md` containing pre-filled answers to Batches 1–5. Detect it:

1. If a file named `PROJECT_CONTEXT.md` is attached or present in the working directory, **read it fully**.
2. **Immediately copy it to `sources/PROJECT_CONTEXT.md`** so it persists in the scaffolded output.
3. Treat its sections as pre-filled answers to Batches 1–5. **Skip questions** the file answers definitively (no `> **TODO:**` marker on that item).
4. For items the file marks `> **TODO:**` (typically Batch 3 — audiences & operations — which extract.md can't infer), ask the user only those specific questions.
5. The "Existing AGENTS.md content (verbatim)" section in PROJECT_CONTEXT.md, if present, is the prior agent guide. Use it to seed the new `AGENTS.md` Sections 6 (Domain Concepts), 7 (Decisions), and 7b (Removed Features) — preserve prior wording where reasonable, mark genuine conflicts with `> **TODO:** [merge from extracted context — review]`.

If **no** `PROJECT_CONTEXT.md` is attached, proceed with the full interview in Step 2.

## Step 2 — Interview the user in 5 batches

Ask in batches, not one question at a time. Wait for the user's reply to each batch before sending the next. Use plain text — no headers or formatting in the questions themselves, just numbered lines.

### Batch 1 — Project basics
1. What's the project called?
2. One sentence: what does it do?
3. What specific problem is it solving, and for whom?
4. Is this a brand-new project, or are you scaffolding around existing code?

### Batch 2 — Stack & shape
1. Primary language and version (Python 3.13, TypeScript 5.x, Go 1.22, Rust stable, etc.)?
2. Main frameworks or runtimes (FastAPI, Next.js, Tauri, Express, Angular, React, React Native, Flutter, etc.)?
3. Datastores (Postgres, SQLite, Redis, none, etc.)?
4. Where does it run (local CLI, server, edge, mobile, embedded)?
5. Project type — pick one: CLI tool / web app / library / microservice / ML pipeline / mobile app / desktop app / other?

### After Batch 2 — load the relevant profile(s)

Before continuing to Batch 3, map the stack to profile files in `profiles/` and read them. They define stack-specific conventions you'll need for the generated docs.

1. Pick **one language profile** from `profiles/languages/`:
   - Python → `profiles/languages/python.md`
   - Node.js (plain JS) → `profiles/languages/nodejs.md`
   - TypeScript → `profiles/languages/typescript.md` (also load `nodejs.md` — TS runs on Node)
   - Dart → `profiles/languages/dart.md`
   - PHP → `profiles/languages/php.md`
   - Ruby → `profiles/languages/ruby.md`
   - Anything else → `profiles/_generic.md`

2. Pick **zero or one framework profile** from `profiles/frameworks/`:
   - Angular → `profiles/frameworks/angular.md` (also requires TypeScript profile)
   - React (web) → `profiles/frameworks/react.md`
   - React Native (mobile) → `profiles/frameworks/react-native.md` (extends React profile)
   - Flutter → `profiles/frameworks/flutter.md` (also load Dart profile)

3. Read every selected profile **fully**. They are not output — they are inputs you'll use to populate `AGENTS.md` Section 2 (repo tree), Section 3 (commands), Section 7b (anti-patterns), and `RUNBOOK.md` daily commands.

4. Tell the user which profiles you loaded in a single line, e.g., "Loaded profiles: `typescript.md` + `react.md`."

### Batch 3 — Audiences & operations
1. Who will run this — just you, your team, or external operators?
2. Is this production-critical (real users, real money, compliance) or experimental?
3. Are there hard constraints I should know about (latency, security, regulatory, offline-first, single-binary, etc.)?
4. Will there be a clear "operator" role separate from "developer"? (Affects whether RUNBOOK.md needs full daily/weekly content or just a stub.)

### Batch 4 — Source material
1. Do you have any existing `.md` files, design docs, links, or notes I should read? If yes, attach or paste them now.
2. If not, that's fine — I'll mark unknowns as `> **TODO:**` and we can fill them in later.

### Batch 5 — AI assistants used
1. Which AI coding tools will work on this repo? Pick any: Claude Code, Cursor, GitHub Copilot, Windsurf, Gemini Code Assist, Aider, other.
2. I'll generate the right rule files for each. `AGENTS.md` is always the source of truth; the others will be thin pointers.

## Step 3 — Propose a plan, then wait for approval

After Batch 5, draft a proposal in this format and **stop**. Do not write any files yet.

```
## Scaffolding Plan for <Project Name>

### Inferred decisions
- Stack: <language, frameworks, datastores>
- Project type: <type>
- Audiences: <who reads what>
- Phases: <how many, why this many>

### Files to create
- <list every file path>

### Files to replace
- AGENTS.md (delete + rewrite project-specific)
- README.md (replace universal prompt with project-specific entry point)
- RUNBOOK.md (replace template with project-tailored procedures, or stub if pre-production)
- docs/planning.md and phase docs (rewrite for this project's phases)
- docs/index.md (regenerate with real file list)
- docs/concepts/README.md, docs/data/README.md, docs/system/README.md (keep as guides, mark Status: Current)

### Files to delete
- (only files explicitly listed; never delete anything not mentioned here)

### AI-assistant rule files to generate
- <list based on Batch 5 answers>

### Sources to persist
- sources/INTERVIEW_TRANSCRIPT.md (auto-generated from this conversation)
- sources/<any attached docs>

### Open TODOs you'll need to resolve
- <list of `> **TODO:**` markers that will appear in the scaffolded docs>

### Approve and I'll execute. Reply 'go' or tell me what to change.
```

## Step 4 — Execute scaffolding on approval

Once the user approves, execute these substeps **in this order**, writing each file fully before starting the next. Do not stub everything then loop back.

### 4.1 — Source-of-truth file (`AGENTS.md`)

- **Delete** the generic `AGENTS.md` and write a project-specific replacement. Use the section structure from the generic template — Sections 1–10, with sub-sections 7a (Documentation Audiences) and 7b (Removed Features). Every section gets real content or a clearly-marked `> **TODO:**`.
- Use the loaded language/framework profile(s) to populate Section 2 (repo tree), Section 3 (commands), and seed Section 7b (anti-patterns from profile gotchas).
- **Seed the Decision Log (Section 7)** with notable choices from the interview *or* the attached `PROJECT_CONTEXT.md`. The interview/context is the richest source of decisions; don't lose them.
- If `PROJECT_CONTEXT.md` was attached and it contains an "Existing AGENTS.md content (verbatim)" section, **merge that prior content** into the new structure (Sections 6, 7, 7b especially). Preserve original wording where reasonable. Mark genuine conflicts with `> **TODO:** [merge from extracted context — review].`
- The new `AGENTS.md` must include in Section 7: "See `sources/` for the original input documents and interview transcript."

### 4.2 — Operator-facing entry points

- **Replace** `README.md` with a project entry point: project name, one-paragraph pitch, quick start (clone/install/run), architecture sentence, links to `docs/index.md`, `AGENTS.md`, `RUNBOOK.md`. The universal-prompt version moves to git history; do not preserve it in the file.
- **Replace** `RUNBOOK.md` with project-tailored daily/weekly procedures. Use profile commands. If the project is pre-production, write a minimal stub with `> **TODO:**` markers — do not leave the generic template.

### 4.3 — Fill the three documentation pillars
- For each of `docs/concepts/`, `docs/data/`, `docs/system/`:
  - Keep the `README.md` (it's a guide). Stamp `Status: Current` if missing.
  - Generate numbered docs (`01_*.md`, `02_*.md`, …) only if there's enough material from the interview + sources. If a pillar is thin, leave just the README with a `> **TODO:**` note about what's missing.

### 4.4 — Rewrite planning
- **Replace** `docs/planning.md` with the project's actual roadmap (vision, phases at a glance, dependency map, milestones, risks).
- **Replace** `docs/planning/phase-*.md` with phases tailored to the project. You may keep 4 phases or change the number — the names and contents must match what was discussed in the interview.

### 4.5 — Regenerate the index
- **Delete** the existing `docs/index.md` and write a fresh one listing every doc that *actually exists* in this project. Do not preserve any link from the template — the template lists aspirational future docs (e.g., `01_DOMAIN_PRIMITIVES.md`) that don't exist in your project. Every link in your new index must resolve to a real file you've created.

### 4.6 — Generate AI-assistant rule files

For each assistant the user chose in Batch 5, generate a **thin pointer** file. `AGENTS.md` stays the only file with real content. Use exactly these templates:

**`CLAUDE.md`:**
```
See [AGENTS.md](AGENTS.md) — single source of truth for AI agents in this repo.
```

**`.cursor/rules/agents.mdc`** (Cursor v0.49+):
```
---
description: Always-on project rules — defer to AGENTS.md
alwaysApply: true
---
See [AGENTS.md](../../AGENTS.md) for the full agent guide.
```

**`.cursorrules`** (Cursor legacy):
```
See AGENTS.md — single source of truth for this repository.
```

**`.github/copilot-instructions.md`:**
```
# Copilot Instructions

This repository's full agent guide lives in [AGENTS.md](../AGENTS.md).
Always read AGENTS.md before making changes.
```

**`.windsurfrules`:**
```
See AGENTS.md — single source of truth for this repository.
```

**`GEMINI.md`:**
```
See [AGENTS.md](AGENTS.md) — single source of truth for AI agents in this repo.
```

**`.aider.conf.yml`:**
```
read:
  - AGENTS.md
```

Only generate the files for assistants the user picked. Don't create unused ones.

### 4.7 — Persist sources

- Create `sources/` if it doesn't exist. Add the standard `sources/README.md` (Status: Historical, rules about not editing).
- Move any source documents the user attached into `sources/` with descriptive filenames.
- Write `sources/INTERVIEW_TRANSCRIPT.md` containing the Batch 1–5 questions and the user's answers verbatim (or, if `PROJECT_CONTEXT.md` was attached, a short note "Interview skipped — see `sources/PROJECT_CONTEXT.md` for pre-filled answers" plus the answers to any Batch-3 follow-up questions you asked). Status: Historical, today's date.
- If `PROJECT_CONTEXT.md` was attached, it should already be at `sources/PROJECT_CONTEXT.md` (copied in Step 2.0). Confirm it's there.

### 4.8 — Stamp every doc
- Every `.md` file in the scaffold (except `sources/` files which are Historical, and the AI-assistant pointer files) must have:
  - `Status: Current` near the top (or `Planning` / `Historical` if explicitly applicable)
  - `*Last updated: <today>*` at the bottom
- **Replace every literal `YYYY-MM-DD`** in the scaffold with today's actual date. This applies to *both newly-created files and pre-existing template files* (the scaffold's `docs/planning.md`, `docs/planning/phase-*.md`, etc. all ship with `YYYY-MM-DD` placeholders that you must update).

### 4.9 — Run the validator
- Run `bash scripts/validate_scaffold.sh` and surface any failures. Fix them before handing off. If the validator script doesn't exist yet, skip this and tell the user.

### 4.10 — Self-destruct
- **Delete `prompt.md`.** It's a one-time-use scaffolding tool; keeping it in a scaffolded repo is noise. The conversation that drove scaffolding is preserved in `sources/INTERVIEW_TRANSCRIPT.md`.
- **Delete `profiles/` directory.** Profiles are scaffold-time inputs — they live in the universal scaffold, not in scaffolded projects. The relevant guidance has already been baked into your `AGENTS.md`, `RUNBOOK.md`, and `docs/`.

## Step 5 — Hand off

End your final message in this format:

```
## Scaffolding Complete

### Created
- <full list of new files>

### Replaced
- <full list of replaced files>

### Deleted
- AGENTS.md (generic template) — replaced

### AI-assistant rule files
- <list of generated pointer files>

### Validator
- <pass/fail summary; if fail, list the failures>

### Open TODOs
- <every `> **TODO:**` marker, grouped by file>

### Next 3 Steps
1. <concrete next action, e.g. "Resolve the 3 TODOs in AGENTS.md Section 5">
2. <concrete next action>
3. <concrete next action>
```

---

## Guardrails (apply to every step above)

- **Never fabricate.** If you don't know something from the interview or sources, write `> **TODO:** [what's needed and from whom]` — do not invent.
- **Treat the existing scaffold as a pattern, not output.** The generic `AGENTS.md`, `RUNBOOK.md`, and `README.md` are reference material. Your job is to produce *project-specific* replacements.
- **Profiles are inputs, not outputs.** Profiles in `profiles/` are read at scaffolding time to inform conventions. Never copy them into the scaffolded project. Never edit them at scaffolding time.
- **Status labels are mandatory.** Every doc you write (except `sources/` and AI-pointer files) starts with `Status: Current` (or `Status: Planning` / `Status: Historical` if explicitly applicable).
- **Copy-paste-ready commands only.** Full paths (e.g., `.venv/bin/python`, not `python`), all flags included, no abbreviations. Use the profile's command examples as your baseline.
- **One file at a time.** Write each file fully before starting the next. Don't stub everything and loop back — that's how content drifts.
- **This scaffold is greenfield-only.** If the user has an existing codebase, they should be using the brownfield workflow (extract.md → this prompt with PROJECT_CONTEXT.md attached → MERGE_BACK.md). Never run this prompt directly inside a brownfield repo.
- **Don't delete files you weren't told to delete.** Only the generic `AGENTS.md` and `prompt.md` are deleted-and-replaced. Everything else is replaced in place. Profile files (`profiles/`) are also deleted in Step 4.10.
- **Convention compliance.** Follow the conventions in `README.md` § Documentation Conventions: numbered doc series, relative cross-references, tables for structured data, ASCII or Mermaid diagrams, horizontal rules between sections, no emojis except `✅` / `🟡` / `🔴`.
- **Stop and ask** if a user answer in the interview is ambiguous enough that guessing would cost more than a follow-up question. Do not stack assumptions.

---

*Last updated: 2026-05-22*
