# Merge Back: Plug Scaffolded Docs Into Your Brownfield Project

> Use after the brownfield workflow: [extract.md](extract.md) produced `PROJECT_CONTEXT.md`, then a fresh clone of this scaffold ran [prompt.md](prompt.md) with that context attached, producing a populated docs tree. This file is the manual copy step.

## Inputs

- **Source:** the scaffolded project produced by `prompt.md` (your fresh clone of the universal scaffold, now populated)
- **Destination:** your brownfield project (the repo where `extract.md` ran)

## What to copy

Default action is *copy* — never overwrite an existing file without diffing first.

| Source path (scaffold) | Destination path (brownfield) | Action |
|-------------------------|-------------------------------|--------|
| `AGENTS.md` | `<brownfield>/AGENTS.md` | **Replace** if no existing AGENTS.md; **merge** if existing (extract.md should have folded the original in already — diff to confirm) |
| `RUNBOOK.md` | `<brownfield>/RUNBOOK.md` | Copy if absent; merge section by section if existing |
| `docs/` | `<brownfield>/docs/` | Copy the directory. If brownfield already has `docs/`, merge file by file (the scaffolded versions reference your code; spot-check links) |
| `sources/` | `<brownfield>/sources/` | Copy the entire directory (frozen historical — includes `PROJECT_CONTEXT.md` and interview transcript) |
| `CLAUDE.md`, `.cursorrules`, `.cursor/rules/agents.mdc`, `.github/copilot-instructions.md`, `.windsurfrules`, `GEMINI.md`, `.aider.conf.yml` | `<brownfield>/` (root or correct subdir) | Copy only the ones for AI tools you actually use. These are thin pointers; safe to overwrite if your existing version is also a pointer |
| `scripts/validate_scaffold.sh` | `<brownfield>/scripts/` | Copy if absent. Make executable: `chmod +x scripts/validate_scaffold.sh` |

## What NOT to copy

- **`README.md`** — your brownfield README is yours. The scaffolded one is generic. Manually add a small "Documentation" cross-reference block to your existing README pointing at `AGENTS.md` and `docs/index.md` if useful.
- **`profiles/`** — scaffold-time inputs only. Never lives in scaffolded projects.
- **`prompt.md`, `extract.md`, `MERGE_BACK.md`** — these are scaffold-time tools. They belong in the universal-scaffold clone, not in your project.
- **Manifests** (`pyproject.toml`, `package.json`, `Gemfile`, `pubspec.yaml`, etc.) — the scaffold doesn't generate these; your brownfield's manifests are authoritative.
- **Source code** — the scaffold contains no code. Your `src/`, `lib/`, `app/`, `tests/` are untouched.

## Step-by-step

Run these from the brownfield repo root:

1. **Set a source variable** for convenience:
   ```bash
   export SRC=/path/to/your/scaffolded-clone
   ```

2. **AGENTS.md** — replace if absent, otherwise diff and merge:
   ```bash
   if [ ! -f AGENTS.md ]; then cp "$SRC/AGENTS.md" AGENTS.md; else diff AGENTS.md "$SRC/AGENTS.md"; fi
   ```

3. **RUNBOOK.md** — same pattern:
   ```bash
   if [ ! -f RUNBOOK.md ]; then cp "$SRC/RUNBOOK.md" RUNBOOK.md; else diff RUNBOOK.md "$SRC/RUNBOOK.md"; fi
   ```

4. **docs/** — copy or merge:
   ```bash
   if [ ! -d docs ]; then cp -r "$SRC/docs" docs; else cp -rn "$SRC/docs/"* docs/; fi
   # The `-n` flag on cp prevents overwriting existing files; diff manually before copying over them.
   ```

5. **sources/** — always copy fresh (the scaffold session's interview transcript is what you want):
   ```bash
   cp -r "$SRC/sources" .
   ```

6. **AI-assistant pointer files** — copy only the ones you use:
   ```bash
   cp "$SRC/CLAUDE.md" .                    # if you use Claude Code
   # cp "$SRC/.cursorrules" .                # if you use Cursor (legacy)
   # cp "$SRC/.github/copilot-instructions.md" .github/copilot-instructions.md  # if you use Copilot
   # ...etc
   ```

7. **Validator script:**
   ```bash
   mkdir -p scripts
   cp "$SRC/scripts/validate_scaffold.sh" scripts/
   chmod +x scripts/validate_scaffold.sh
   ```

8. **Delete `PROJECT_CONTEXT.md` from the brownfield root** — it's now persisted in `sources/`:
   ```bash
   rm -f PROJECT_CONTEXT.md
   ```

9. **Run the validator** to catch placeholders that slipped through:
   ```bash
   bash scripts/validate_scaffold.sh
   ```

10. **Resolve any remaining `> **TODO:**` markers** in `AGENTS.md` and `docs/`. These come from gaps the scaffold couldn't fill (typically Batch 3 items: audiences, operations constraints).

11. **Optional — add a cross-reference block to your existing README.md:**
    ```markdown
    ## Documentation
    - [AGENTS.md](AGENTS.md) — agent guide and project source of truth
    - [docs/index.md](docs/index.md) — full documentation index
    - [RUNBOOK.md](RUNBOOK.md) — operational procedures
    ```

## Done check

- ✅ `AGENTS.md` describes your actual project (not the generic template)
- ✅ `docs/index.md` links all resolve to real files
- ✅ `bash scripts/validate_scaffold.sh` exits 0
- ✅ No `> **TODO:**` markers remain in `AGENTS.md`
- ✅ Your existing code, manifests, and CI are unchanged
- ✅ `PROJECT_CONTEXT.md` no longer at the repo root (it's in `sources/`)

## Troubleshooting

- **Validator fails on broken `docs/index.md` links.** The scaffold listed docs that didn't get generated — likely because the source material was thin. Open `docs/index.md` and remove dead links, or create the missing docs.
- **AGENTS.md merge conflicts.** Open the file; search for `> **TODO:** [merge from extracted context — review]` markers — these are the spots `prompt.md` flagged. Resolve each by picking the right wording.
- **AI-assistant pointer file already exists with different content.** Diff. If your existing one is also a pointer to AGENTS.md, overwrite. If it contains real content, fold that content into AGENTS.md first, then overwrite the pointer.

---

*Last updated: 2026-05-22*
