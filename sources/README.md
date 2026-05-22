# Sources

Status: Historical

> Raw input documents that informed this project's scaffolding. Frozen by design — do not edit.

## What lives here

| File pattern | What it is |
|--------------|------------|
| `INTERVIEW_TRANSCRIPT.md` | Auto-generated record of the Batch 1–5 Q&A from `prompt.md` interactive scaffolding. Captures decisions at scaffolding time. |
| `REQUIREMENTS.md` | (Optional) The original requirements document the user attached when scaffolding. |
| `DOMAIN_NOTES.md` | (Optional) Domain knowledge, glossary fragments, or research notes the user provided. |
| `*.md` | Any other raw source documents the user attached at scaffolding time. |

Files are named descriptively. There is no numbering scheme — these are inputs, not a curriculum.

## Rules

1. **Do not edit anything in here.** These are frozen inputs. To update project knowledge, edit the relevant `docs/concepts/`, `docs/data/`, or `docs/system/` file instead.
2. **Commit everything to git.** Traceability matters more than repo size for `.md` files. Future agents need to see *why* decisions were made.
3. **Status: Historical, always.** Every file here is historical the moment scaffolding finishes. Do not relabel.
4. **No status label needed inside individual files.** This README declares the entire folder Historical; individual source docs can have their own structure (they're inputs from outside the convention).
5. **If a source doc gets superseded,** leave it here untouched and add a note to the relevant `docs/` file explaining what changed and when.

## Why this folder exists

Without preserved inputs, six months from now no one (human or agent) can answer "why did we make this decision?" The `docs/` tree captures current state; `sources/` captures the inputs that produced it. Together they tell the full story.

## Cross-references

- See [AGENTS.md](../AGENTS.md) § 7 (Known Decisions & Rationale) for the curated decision log.
- See [docs/research/README.md](../docs/research/README.md) for the difference between `sources/` (inputs) and `docs/research/` (post-decision notes, removed features, incidents).

---

*Last updated: 2026-05-22*
