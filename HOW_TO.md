# How To Use This Scaffold

> Practical guide to using the universal documentation-driven project scaffold. Read this once when you come back to the repo and want to remember how everything fits together.

---

## What this scaffold does

It turns the messy first hours of a new project — figuring out what to document, where, and in what shape — into a structured, AI-assisted scaffolding step. You paste a prompt into an AI assistant, the AI interviews you (or reads your existing project), and you get a complete documentation tree that follows consistent conventions: `AGENTS.md` as the single source of truth, a three-pillar `docs/` structure (concepts/data/system), planning phases, a runbook, and pointer files for any AI assistants you use.

It works in three ways depending on where you're starting from. Pick a workflow below.

---

## The file map

Top-level files of this scaffold, grouped by purpose:

### Scaffolding tools (you use these; they don't ship to scaffolded projects)
- [`prompt.md`](prompt.md) — the main scaffolding prompt. Paste into an AI assistant in a fresh clone of this scaffold; it interviews you and produces the docs.
- [`extract.md`](extract.md) — runs *inside* an existing repo to produce a `PROJECT_CONTEXT.md` describing it.
- [`MERGE_BACK.md`](MERGE_BACK.md) — the manual checklist for copying scaffolded docs into a brownfield project.
- [`profiles/`](profiles/) — read-only stack profiles (Python, NodeJS, TypeScript, Dart, PHP, Ruby, Angular, React, React Native, Flutter, plus a generic fallback). The AI loads one or two during scaffolding to make output stack-aware.
- [`scripts/validate_scaffold.sh`](scripts/validate_scaffold.sh) — 11 health checks for scaffolded output. Copies into the scaffolded project too.

### Generic templates (the AI replaces these with project-specific versions)
- [`AGENTS.md`](AGENTS.md) — agent guide template (10 sections + 7a/7b sub-sections).
- [`README.md`](README.md) — project README (currently this scaffold's own README; gets replaced).
- [`RUNBOOK.md`](RUNBOOK.md) — daily/weekly operational procedures template.
- [`docs/`](docs/) — three-pillar doc structure (concepts/data/system) + planning/ + research/ + an index.

### Persistent storage that scaffolded projects keep
- [`sources/`](sources/) — frozen input docs (interview transcript, attached source `.md` files, extracted `PROJECT_CONTEXT.md`). Read-only after scaffolding.

---

## Workflow A — Greenfield Interactive

**Use when:** you're starting a brand-new project and have a fuzzy idea, not finished spec documents.

### Steps

1. **Clone or copy this scaffold** to a new directory (the place where your new project will live):
   ```bash
   git clone <this-scaffold-repo> ~/projects/my-new-thing
   cd ~/projects/my-new-thing
   ```

2. **Open an AI coding assistant session** in that directory (Claude Code, Cursor, Windsurf, Copilot Chat, Aider, etc.).

3. **Paste the entire contents of [`prompt.md`](prompt.md)** as your first message. Attach nothing.

4. The AI will:
   - Read every scaffold file to understand the patterns
   - Tell you "Scaffold read. Checking for attached context, then interviewing you."
   - Run a 5-batch interview (project basics, stack, audiences, source material, AI assistants used). Answer each batch in plain text.
   - After Batch 2, tell you which stack profile it loaded (e.g., "Loaded profiles: typescript.md + react.md")
   - Propose a plan — list of files to create/replace/delete. **Wait for your approval.**

5. **Reply with `go`** (or change the plan) to approve. The AI then:
   - Deletes the generic `AGENTS.md` and writes a project-specific one
   - Replaces `README.md`, `RUNBOOK.md`, generates `docs/` content, regenerates `docs/index.md`
   - Creates `sources/INTERVIEW_TRANSCRIPT.md` containing your interview verbatim
   - Generates the AI-assistant pointer files (CLAUDE.md, .cursorrules, etc.) for the tools you chose
   - Deletes `prompt.md` and `profiles/` (scaffold-time only)
   - Runs `bash scripts/validate_scaffold.sh` — should exit 0

6. **Verify**:
   ```bash
   bash scripts/validate_scaffold.sh
   ```
   Should report `Summary: 11/11 checks passed. Scaffold is clean.`

7. **Start building.** Your project now has full docs scaffolding; fill in code under `src/` (or wherever your stack lives).

---

## Workflow B — Greenfield Batch

**Use when:** you already have complete source documents (requirements, specs, domain notes) as `.md` files and want a one-shot scaffolding pass instead of a conversation.

### Steps

1. **Clone this scaffold** as in Workflow A.

2. **Open an AI session** in the cloned directory.

3. **Paste the prompt at the bottom of [`README.md`](README.md)** (the "Batch-mode Prompt" section, starting at "You are working in a universal project scaffold...") and **attach your source `.md` files** to the same message.

4. The AI executes the 14-task list in one pass — no interview. Same end state as Workflow A.

5. **Verify** with the validator as in A.

---

## Workflow C — Brownfield Extract → Scaffold → Merge

**Use when:** you have an existing codebase you want to retrofit with documentation. The scaffolding tool never touches your code.

### Visual

```
[your existing repo]      [fresh clone of this scaffold]      [your existing repo]
       │                              │                                  ▲
   extract.md  ─────────────────►  prompt.md   ──────────►   MERGE_BACK.md
       │   PROJECT_CONTEXT.md         │   scaffolded docs                │
       ▼                              ▼                                  │
PROJECT_CONTEXT.md             docs/, AGENTS.md, ...   ─────────────────┘
```

### Step 1 — Extract context from your existing repo

1. **Open an AI session inside your existing project** (not the scaffold).
   ```bash
   cd ~/projects/my-existing-app
   # open Claude Code / Cursor / etc. here
   ```

2. **Paste the entire contents of [`extract.md`](extract.md) from the scaffold** (you'll need to either have the scaffold cloned alongside, or just copy the file's contents).

3. The AI reads up to ~30 files (manifests, README, existing `AGENTS.md`/`CLAUDE.md`, sample source files, CI configs) and writes a single file: `PROJECT_CONTEXT.md` at your repo root. It modifies nothing else.

4. The AI ends with a handoff message saying the file is ready and what to do next. **Close that session.**

### Step 2 — Scaffold using the extracted context

1. **In a separate directory, clone the universal scaffold**:
   ```bash
   git clone <this-scaffold-repo> ~/scratch/my-app-scaffold
   cd ~/scratch/my-app-scaffold
   ```

2. **Copy `PROJECT_CONTEXT.md` from your project into this scaffold directory** (or have it ready to attach).

3. **Open a new AI session** in the scaffold directory.

4. **Paste [`prompt.md`](prompt.md) and attach `PROJECT_CONTEXT.md`** to the same message.

5. The AI's Step 2.0 detects the attachment, copies it to `sources/PROJECT_CONTEXT.md`, and uses its sections as pre-filled answers to Batches 1–5. It will only ask you about items the context marks `> **TODO:**` — typically Batch 3 (audiences, operations).

6. Approve the plan as in Workflow A. The AI scaffolds the docs.

7. **Verify**: `bash scripts/validate_scaffold.sh` in the scaffold directory. Expect 11/11 pass.

### Step 3 — Merge the docs back into your existing repo

1. Open [`MERGE_BACK.md`](MERGE_BACK.md) in the scaffold directory and follow it step by step. The summary:

   ```bash
   # In your existing repo:
   cd ~/projects/my-existing-app
   export SRC=~/scratch/my-app-scaffold

   # Replace AGENTS.md if you don't have one, else diff first
   if [ ! -f AGENTS.md ]; then cp "$SRC/AGENTS.md" .; else diff AGENTS.md "$SRC/AGENTS.md"; fi

   # Copy RUNBOOK.md, docs/, sources/ (manifest-style)
   [ ! -f RUNBOOK.md ] && cp "$SRC/RUNBOOK.md" .
   [ ! -d docs ] && cp -r "$SRC/docs" . || cp -rn "$SRC/docs/"* docs/
   cp -r "$SRC/sources" .

   # AI-assistant pointer files for the tools you actually use
   cp "$SRC/CLAUDE.md" .

   # Validator script
   mkdir -p scripts
   cp "$SRC/scripts/validate_scaffold.sh" scripts/
   chmod +x scripts/validate_scaffold.sh

   # Clean up
   rm -f PROJECT_CONTEXT.md   # it's now in sources/

   # Validate
   bash scripts/validate_scaffold.sh
   ```

2. **Resolve any `> **TODO:**` markers** the AI left in `AGENTS.md` or `docs/`.

3. **Add a small "Documentation" cross-reference block to your existing `README.md`** so people can find the new docs:
   ```markdown
   ## Documentation
   - [AGENTS.md](AGENTS.md) — agent guide and project source of truth
   - [docs/index.md](docs/index.md) — full documentation index
   - [RUNBOOK.md](RUNBOOK.md) — operational procedures
   ```

4. **Commit.** Code, manifests, and CI are unchanged; you're just adding docs.

---

## What you'll see after scaffolding

A scaffolded project (whichever workflow) ends up with this layout:

```
your-project/
├── README.md                                # Project overview (humans)
├── AGENTS.md                                # Single source of truth (AI agents + devs)
├── RUNBOOK.md                               # Daily/weekly operations
├── CLAUDE.md                                # Thin pointer → AGENTS.md (if Claude Code is used)
├── .cursor/rules/agents.mdc                 # Thin pointer (if Cursor is used)
├── .github/copilot-instructions.md          # Thin pointer (if Copilot is used)
├── ... (other AI-assistant pointers as needed)
├── src/                                     # Your code (Workflow A/B) or unchanged (Workflow C)
├── tests/
├── scripts/
│   └── validate_scaffold.sh                 # The doc-health validator
├── sources/
│   ├── README.md                            # Status: Historical
│   ├── INTERVIEW_TRANSCRIPT.md              # The Q&A that drove scaffolding
│   └── PROJECT_CONTEXT.md                   # (Workflow C only) the extracted context
└── docs/
    ├── index.md                             # File finder
    ├── planning.md                          # Roadmap
    ├── planning/                            # Phase docs (phase-1...phase-4)
    ├── concepts/                            # "Why" docs (01_DESIGN.md etc.)
    ├── data/                                # "What" docs (schemas, formulas)
    ├── system/                              # "How" docs (architecture, components)
    └── research/                            # Historical / deprecated / planning notes
```

What's **gone**:
- `prompt.md`, `extract.md`, `MERGE_BACK.md` — scaffold-time tools, not for scaffolded projects
- `profiles/` — scaffold-time inputs

Every doc has `Status: Current` (or `Historical` / `Planning`) and a `*Last updated: YYYY-MM-DD*` footer. The validator enforces both.

---

## Extending the scaffold

### Adding a new stack profile

If you work with a stack that's not in the built-in 10 (Python, NodeJS, TypeScript, Dart, PHP, Ruby, Angular, React, React Native, Flutter), add a profile.

1. **Decide whether it's a language or a framework.**
   - Language: a primary toolchain (Go, Rust, Swift, Kotlin, Java, C#, Elixir)
   - Framework: sits on top of a language (Rails over Ruby, Django over Python, Nest over Node, Spring over Java)

2. **Create the file:**
   ```bash
   cp profiles/_generic.md profiles/languages/<stack>.md   # or frameworks/
   ```

3. **Fill the 8 standard sections.** Open an existing profile (e.g., [`profiles/languages/python.md`](profiles/languages/python.md)) as your template. The sections are:
   1. Stack identity — one paragraph
   2. Conventional repo layout — ASCII tree
   3. Standard manifest files — what they configure, keys to document
   4. Run / build / test commands — copy-paste-ready
   5. Documentation patterns specific to this stack
   6. Common gotchas / anti-patterns — 3–5 bullets
   7. `.gitignore` essentials
   8. Companion profile pointers

4. **Keep it tight.** Target 150–250 lines. Profiles are reference, not tutorial.

5. **Add it to [`profiles/README.md`](profiles/README.md)** in the file-layout block.

6. **Update [`prompt.md`](prompt.md)** at "After Batch 2 — load the relevant profile(s)" to include the new stack in the mapping list.

7. **Optional but recommended:** dogfood the new profile by walking [`prompt.md`](prompt.md) against a hypothetical tiny project in that stack, then refine based on what was missing.

### Adding a new validator check

Open [`scripts/validate_scaffold.sh`](scripts/validate_scaffold.sh). It's bash, ~150 lines. Add a new `# Check N:` block following the existing pattern; use `pass "..."` and `fail "..."` helpers. Update the file header comment if needed.

### Adding a new workflow

The three workflows (A/B/C) cover greenfield-interactive, greenfield-batch, and brownfield-extract→merge. A new workflow would be a meaningfully different entry point — for example, a "library publication" workflow that includes PyPI/npm publishing setup. Document any new workflow in:
1. [`README.md`](README.md) workflow table
2. A new top-level prompt file (`prompt-<workflow-name>.md`) if it's a distinct prompt
3. This [`HOW_TO.md`](HOW_TO.md) with a worked walkthrough

---

## Troubleshooting

### "Validator fails on `Project Name` placeholder"

The AI didn't replace the template placeholder. Open the failing file (path in the validator output) and replace `Project Name` (or `[Project Name]`) with your real project name.

### "Validator fails on `YYYY-MM-DD` placeholder"

Same issue — the AI left date placeholders. Replace every literal `YYYY-MM-DD` with today's actual date:
```bash
# macOS / Linux:
find . -name "*.md" -exec sed -i.bak "s/YYYY-MM-DD/$(date +%Y-%m-%d)/g" {} \;
find . -name "*.bak" -delete
```

### "Validator fails on broken `docs/index.md` links"

The AI listed docs that don't exist (likely it copied from the template index without regenerating). Open `docs/index.md` and either remove the dead links or create the missing docs.

### "AGENTS.md Section 1 is empty"

The AI didn't fill the "What This System Does" paragraph. Open `AGENTS.md` and write a 1-3 sentence description of the project. Without this, the validator (and any future agent reading the file) has no project context.

### "Validator fails on scaffold-time artefacts leaked"

`profiles/`, `prompt.md`, `extract.md`, or `MERGE_BACK.md` ended up in your scaffolded project. Remove them:
```bash
rm -rf profiles/ prompt.md extract.md MERGE_BACK.md
```
The scaffolded project doesn't need these — they live only in the universal-scaffold repo.

### "AI ran prompt.md inside my existing codebase and tried to modify code"

You skipped Workflow C and used Workflow A on a non-empty repo. Stop the session, revert any changes, and use Workflow C instead (extract → scaffold → merge). The universal scaffold is greenfield-only.

### "PROJECT_CONTEXT.md is sparse / missing key info"

`extract.md` couldn't infer everything from code alone. That's expected for Batch 3 (audiences, operations) and the project's problem statement. Two options:
1. Hand-edit `PROJECT_CONTEXT.md` to fill the gaps before attaching it to `prompt.md`.
2. Attach `PROJECT_CONTEXT.md` as-is and answer the AI's follow-up questions when `prompt.md`'s Step 2.0 asks about the `> **TODO:**` items.

### "Existing AGENTS.md content didn't get preserved during brownfield merge"

In `prompt.md` Step 4.1, the AI is supposed to merge the verbatim "Existing AGENTS.md content" section from `PROJECT_CONTEXT.md`. If something got lost, check:
1. Did `extract.md` actually embed the existing AGENTS.md content? Look at the "Existing AGENTS.md content (verbatim)" section in `PROJECT_CONTEXT.md`.
2. Did `prompt.md` see the attachment? It should have copied it to `sources/PROJECT_CONTEXT.md`.
3. Look for `> **TODO:** [merge from extracted context — review]` markers in the new `AGENTS.md` — these flag conflicts that need your judgement.

### "Brownfield merge conflicts with existing `docs/`"

You used Workflow C on a repo that already had its own `docs/`. The MERGE_BACK.md `cp -rn` command preserves existing files. Diff each new vs existing doc by hand:
```bash
diff -r ~/scratch/my-app-scaffold/docs ~/projects/my-existing-app/docs
```
Keep your own docs as the source of truth; treat scaffolded versions as suggestions you can adopt selectively.

### "Two AI assistants in the project disagree about conventions"

Only `AGENTS.md` should have real content. Every other rule file (`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`, etc.) should be a thin pointer. If one rule file drifted to include actual rules, delete those rules and leave only the pointer to `AGENTS.md`. This is enforced as agent rule 15 in the `AGENTS.md` template.

---

## Quick reference

### "I want to start a new project right now"
Workflow A. Clone scaffold → paste `prompt.md` → answer interview → approve plan.

### "I have docs already and want a one-shot scaffold"
Workflow B. Clone scaffold → paste the README's batch-mode prompt with `.md` attachments.

### "I want to add docs to my existing project"
Workflow C. Three steps: `extract.md` in your repo → `prompt.md` in a fresh scaffold clone with the extracted context attached → `MERGE_BACK.md` checklist.

### "I want to verify my scaffolded project is clean"
```bash
bash scripts/validate_scaffold.sh
```
Expect `11/11 checks passed`.

### "I want to understand a scaffolded project as an AI"
Read [`AGENTS.md`](AGENTS.md) first. That's the contract.

### "I want to update something"
Edit the relevant doc, then update `AGENTS.md`'s Section 9 Change Log with one line: what, why, who, when.

### "I want to add a new stack"
Copy `profiles/_generic.md` → fill 8 sections → register in `profiles/README.md` + `prompt.md` mapping list.

---

## Related reading inside this scaffold

- [`README.md`](README.md) — top-level project intro + workflow table + the Workflow B batch prompt
- [`prompt.md`](prompt.md) — the interactive scaffolding prompt itself (read this if you want to understand what the AI does step-by-step)
- [`extract.md`](extract.md) — the brownfield extraction prompt
- [`MERGE_BACK.md`](MERGE_BACK.md) — the brownfield merge checklist
- [`profiles/README.md`](profiles/README.md) — profile system documentation
- [`docs/research/DOGFOOD_TEST_2026-05-22.md`](docs/research/DOGFOOD_TEST_2026-05-22.md) — record of the first end-to-end test and the friction it surfaced
- [`AGENTS.md`](AGENTS.md) — the template that becomes your scaffolded project's source of truth

---

*Last updated: 2026-05-22*
