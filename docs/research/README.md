# Research — Historical Context & Incidents

Status: Current

## What Goes Here

The `docs/research/` directory captures information that is **not current doctrine** but worth keeping for context. This includes:

| Label | Meaning | Example |
|-------|---------|---------|
| `[REMOVED]` | Feature was built but deliberately removed | GA4 analytics (deferred to post-launch) |
| `[ABANDONED]` | Approach was tried and rejected | Astro for the prints store |
| `[PLANNING]` | A future idea that was explored but not committed to | Loyalty/rewards program evaluation notes |
| `[INCIDENT]` | A production incident with root cause and resolution | Printful sync failure and resolution |

## Difference From docs/system/

`docs/system/` is the **current authority** — if you are deploying, configuring, or developing the system, read those docs.

`docs/research/` is **optional context** — read these when you need to understand why a decision was made, why a feature was removed, or what went wrong in the past.

If a `system/` doc contradicts a `research/` doc, the `system/` doc is correct by definition.

## Difference From sources/

`sources/` contains the **original input documents** that informed the project's scaffolding — interview transcripts, requirements documents, and raw knowledge captured at the start.

`research/` contains **post-scaffolding documentation** — things that were actively decided or changed after the initial design phase.

## When to Move Something to Research

- When a feature is removed and marked `[REMOVED]` in AGENTS.md
- When a `docs/system/` document is superseded and a new one takes its place
- When an incident occurs and we want to preserve the learning
- When a planning idea is explored but archived without action

## Labelling Convention

Every file in `research/` should:

1. Start with the label in brackets: `[REMOVED]`, `[ABANDONED]`, `[PLANNING]`, or `[INCIDENT]`
2. Include the date in the filename: `[REMOVED]_ga4_at_launch.md`
3. Have a `Status: Historical` label on line 3

## Kumachi-Specific Research Topics

- GA4 analytics — deferred rationale (see AGENTS.md §7b)
- Ayrshare social posting — rejected in favour of owned infrastructure
- Astro for prints store — rejected in favour of Hydrogen
- UGX-only pricing — rejected in favour of USD

*Last updated: 2026-06*
