# [DOGFOOD: csv-to-json Python CLI scaffolding run — 2026-05-22]

Status: Historical
Date: 2026-05-22
Scenario: simulated `prompt.md` run on a tiny Python CLI ("csv-to-json")
Outcome: validator passed 10/10 after the AI applied the patches noted below

> First end-to-end test of `prompt.md` against a real scenario. Captures friction points and the fixes applied in the same round.

## Setup

- Scratch project: `/tmp/dogfood-csv-to-json/` (throwaway)
- Starting state: copy of the universal scaffold
- User answers simulated:
  - Greenfield, brand new
  - Python 3.12, no framework, no datastore, CLI tool
  - Single-author / experimental
  - No source documents
  - Claude Code only (one rule pointer file)
- Profile loaded: `profiles/languages/python.md`

## Findings (and where each was applied)

### F1 — Section count discrepancy

**Issue:** `prompt.md` Step 4.1 says "Use the same 10-section structure" then lists 12 entries (1–10 plus 7a, 7b). Off-by-two confuses the AI about whether to skip 7a/7b.

**Fix:** Reword to "Use the section structure from the generic AGENTS.md template (Sections 1–10, with sub-sections 7a and 7b)." Applied to `prompt.md` Step 4.1.

### F2 — When to read profiles

**Issue:** `prompt.md` Step 1 lists `profiles/README.md` among "read every one of these files" — but the *specific* language/framework profile files are read after Batch 2. Ambiguity: read all profiles up-front, or just the index?

**Fix:** Clarified Step 1 to read `profiles/README.md` only (to understand the system); specific profile files are read after Batch 2. Applied to `prompt.md` Step 1.

### F3 — Index regeneration emphasis

**Issue:** `docs/index.md` in the scaffold lists aspirational future docs (e.g. `concepts/01_DOMAIN_PRIMITIVES.md`) that don't exist. The AI must regenerate the index to match the actual file set — but the prompt only says "regenerate with the real file list" once. Easy to miss in a long execution.

**Fix:** Strengthened Step 4.5 to: "Delete the existing `docs/index.md` and write a fresh one listing every doc that *actually exists* in this project. Do not preserve any link from the template." Applied to `prompt.md` Step 4.5.

### F4 — Scaffold guide files lack `Status:` labels

**Issue:** `docs/{system,concepts,data,research}/README.md` are template guide files kept as-is in scaffolded projects, but they don't carry `Status: Current` themselves. The AI must remember to patch them — and the validator (Check 4) fails if it doesn't.

**Fix:** Added `Status: Current` to all four guide files in the source scaffold so they inherit clean into scaffolded projects. Applied to:
- `docs/system/README.md`
- `docs/concepts/README.md`
- `docs/data/README.md`
- `docs/research/README.md`

### F5 — `YYYY-MM-DD` placeholders in existing scaffold files

**Issue:** Every doc in the scaffold has `*Last updated: YYYY-MM-DD*` literal placeholder. Step 4.8 says "stamp every doc with `*Last updated: YYYY-MM-DD*` (use today's actual date)" — wording focuses on *new* files, easy to miss for *existing* files.

**Fix:** Strengthened Step 4.8 to: "Replace every literal `YYYY-MM-DD` in the scaffold (in both newly-created and pre-existing template files) with today's actual date." Applied to `prompt.md` Step 4.8.

### F6 — `docs/research/README.md` missing `Last updated` footer

**Issue:** The scaffold's `docs/research/README.md` ends after the cross-reference section without a `*Last updated:`* footer. Validator Check 5 caught this in the dogfood scratch.

**Fix:** Added footer to scaffold's `docs/research/README.md`.

### F7 — `profiles/` directory leaks into scaffolded projects

**Issue:** `prompt.md` says "Profiles are READ-ONLY at scaffolding time. They are never copied into scaffolded projects" — but doesn't explicitly tell the AI to *delete* `profiles/` from the scratch dir. In the dogfood, I had to manually `rm -rf profiles/`.

**Fix:** Updated Step 4.10 ("Self-destruct") to also remove `profiles/` and `prompt.md`. Applied to `prompt.md`.

### F8 — Validator should detect `profiles/` leak

**Issue:** If the AI forgets to delete `profiles/`, the validator currently doesn't notice. Adding a check makes the leak loud.

**Fix:** Added Check 11 to `scripts/validate_scaffold.sh`: fail if `profiles/` directory exists at the scaffolded project root.

### F9 (positive) — Python profile guidance was used verbatim

**Observation:** Commands in the generated `RUNBOOK.md` and `AGENTS.md` Section 3 came directly from `profiles/languages/python.md` — `.venv/bin/python -m pytest tests/ -q`, src-layout, `pyproject.toml`-only manifest stance. No invention by the AI. This is the profile system working as designed.

**No fix needed.** Profile content is well-targeted; the dogfood confirms profiles save real time and prevent mistakes.

### F10 (positive) — Profile-source attribution feels natural

**Observation:** Adding "> This layout is informed by `profiles/languages/python.md`" as a one-liner under AGENTS.md Section 2 felt natural and informative — it tells future agents where the structure came from.

**No fix needed.** Could become a documented convention later if it proves consistently useful.

### F11 — Decision Log seeding from interview

**Issue:** The Decision Log table needed 3 entries (argparse vs Click, src-layout, no streaming). All came from interview answers + profile gotchas, but the AI had to remember to record them as decisions. Step 4.1 doesn't explicitly say "convert notable interview answers into decision log entries."

**Fix (optional, low priority):** Added to Step 4.1: "Seed the Decision Log (Section 7) with notable choices made during the interview — toolchain picks, structure decisions, deferred features." Applied to `prompt.md`.

---

## Brownfield smoke test

Deferred to a follow-up round. The full brownfield walkthrough requires an existing repo on the machine; rather than rush it, the brownfield branch will be exercised the next time a real existing project is being retrofitted.

The dogfood greenfield path establishes that the prompt's structure is sound; the brownfield branch follows the same template + interview pattern with documented differences (Step 4.1, 4.2). It should be tested before the next major round.

---

## Postscript — 2026-05-22 (later same day): brownfield redesigned

After this dogfood run, the brownfield approach in `prompt.md` was discarded entirely. The in-place merge logic (Step 1.5 mode detection; brownfield variants of Steps 4.1, 4.2, 4.7) is gone.

**Replaced by:** a three-step workflow split across two AI sessions and a manual merge:

1. **Extract** — paste the new [`extract.md`](../../extract.md) into an AI session running inside the brownfield repo. The AI reads code/manifests/docs (cap ~30 reads) and writes a single `PROJECT_CONTEXT.md` at the repo root. Nothing else is modified.
2. **Scaffold** — open a fresh AI session in a clone of the universal scaffold; paste `prompt.md` and attach `PROJECT_CONTEXT.md`. The scaffold's new Step 2.0 detects the attachment and uses it as pre-filled answers to Batches 1–5, asking only about items the context marks `> **TODO:**` (typically Batch 3 — audiences & operations).
3. **Merge** — manually copy the scaffolded docs into the brownfield repo following [`MERGE_BACK.md`](../../MERGE_BACK.md), a checklist that names exactly which files go where and which to skip.

**Why the rework:** the in-place merge conflated two concerns (knowledge extraction + doc generation) inside one AI session running in the live repo. The split design isolates risk — the scaffolding tool never touches the brownfield repo — and gives the user an explicit, reviewable merge step.

**What stayed valid from this dogfood:**
- F1 (section-count discrepancy), F3 (index regeneration), F4 (Status labels on guide files), F5 (YYYY-MM-DD replacement), F6 (research README footer), F7 (profiles/ deletion), F8 (validator profiles/ check), F11 (Decision Log seeding) — all greenfield fixes, all still in place.
- F2 (when to read profiles) — still valid; `prompt.md` Step 1 still reads only `profiles/README.md` up front.

**What changed:**
- F9/F10's references to the brownfield branch are now historical.
- The validator's `--mode={greenfield,brownfield}` flag was removed; the validator is single-mode again. Check 11 was extended to also catch leaks of `prompt.md`, `extract.md`, and `MERGE_BACK.md` into scaffolded projects.

The original dogfood findings list (F1–F11) is preserved above as a record of what surfaced during the first end-to-end run.

## Final validator output

```
Validating scaffold at: /tmp/dogfood-csv-to-json
Mode: greenfield
----------------------------------------
[PASS] No 'Project Name' placeholder left in docs
[PASS] No 'YYYY-MM-DD' placeholder left
[PASS] AGENTS.md has no template HTML-comment placeholders
[PASS] All docs in system/concepts/data/planning have Status: label
[PASS] All docs/ files have 'Last updated' footer
[PASS] AGENTS.md Section 1 has content
[PASS] README.md has been replaced with project-specific content
[PASS] All links in docs/index.md resolve to existing files
[PASS] AGENTS.md Change Log has project-specific entries
[PASS] AGENTS.md has no unresolved TODOs
----------------------------------------
Summary: 10/10 checks passed. Scaffold is clean.
```

---

*Last updated: 2026-05-22*
