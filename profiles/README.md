# Profiles

Status: Current

> Stack and framework profiles that the scaffolding prompt loads to make documentation conventions stack-aware. Read-only inputs to the scaffolding process — never copied into scaffolded projects.

## What profiles are for

The universal scaffold is doc-only and language-agnostic. But every stack has its own conventions: where source code lives, how to invoke the test runner, what manifests configure, what gotchas land in agent rules. Without profiles, the AI invents these from scratch every time and gets details wrong.

A profile is a tight (~150–250 lines) reference doc that the AI reads during scaffolding to populate command examples, repo layouts, and anti-pattern notes correctly.

## Two axes

Profiles split along two independent axes:

| Axis | One picked per project | Examples |
|------|------------------------|----------|
| **Language** | Always exactly one | `languages/python.md`, `languages/typescript.md`, `languages/dart.md` |
| **Framework** | Zero or one | `frameworks/react.md`, `frameworks/flutter.md`, `frameworks/angular.md` |

A plain Python CLI loads `languages/python.md` only. A Flutter app loads `languages/dart.md` + `frameworks/flutter.md`. A React app loads `languages/typescript.md` + `frameworks/react.md` (or `languages/nodejs.md` + `frameworks/react.md` for plain JS).

## When the prompt loads profiles

After Batch 2 (Stack & shape) of the interview in [`prompt.md`](../prompt.md), the AI:

1. Maps the user's stack answer to one language profile (or `_generic.md` if none match)
2. Maps any framework answer to one framework profile (or skips)
3. Reads both fully
4. Uses their content to populate:
   - `AGENTS.md` Section 2 (repo tree) — greenfield only
   - `AGENTS.md` Section 3 (run/test/build commands)
   - `RUNBOOK.md` daily-workflow commands
   - `AGENTS.md` Section 7b (anti-patterns seeded from profile gotchas)
   - `docs/system/03_CONFIGURATION.md` placement hints

## File layout

```
profiles/
├── README.md                         # This file
├── _generic.md                       # Fallback when nothing else matches
├── languages/
│   ├── python.md
│   ├── nodejs.md                     # Plain JS / Node runtime
│   ├── typescript.md                 # TS specifically
│   ├── dart.md
│   ├── php.md
│   └── ruby.md
└── frameworks/
    ├── angular.md
    ├── react.md
    ├── react-native.md               # Extends react.md
    └── flutter.md                    # Extends dart.md
```

## Profile structure (the 8 sections)

Every profile file has exactly these sections, in this order:

1. **Stack identity** — one paragraph: what this stack is, what it's good for.
2. **Conventional repo layout** — ASCII tree of standard directories and what lives in each.
3. **Standard manifest files** — what they configure and the keys the AI should reference (NOT generate).
4. **Run / build / test commands** — copy-paste-ready examples using standard CLIs.
5. **Documentation patterns specific to this stack** — what belongs where in `docs/`.
6. **Common gotchas / anti-patterns** — 3–5 bullets, seed material for AGENTS.md Section 7b.
7. **`.gitignore` essentials** — patterns to ensure exist (reference only; we don't generate `.gitignore`).
8. **Companion profile pointers** — which other profiles combine with this one.

Keep each profile tight. If a section grows beyond a screen, you're probably writing a language tutorial instead of a convention reference — trim.

## Adding a new profile

1. Pick the right folder (`languages/` or `frameworks/`).
2. Copy `_generic.md` as a starting template.
3. Fill the 8 sections with stack-specific content.
4. Add a row to the file layout above.
5. Update `prompt.md` Batch 2 if the new stack needs a new question option (rare).

## What profiles are NOT

- Not language tutorials. Don't explain how Python decorators work — assume the AI knows the language.
- Not exhaustive style guides. Reference upstream style guides (PEP 8, Effective Dart) rather than reproducing them.
- Not scaffolding outputs. They are read by the AI; they are never written into the scaffolded project.
- Not opinionated about every choice. Stay neutral on equally-valid options (npm vs pnpm, pytest vs unittest); flag them as decisions to document in `AGENTS.md` Section 7.

---

*Last updated: 2026-05-22*
