# Research & Historical Documentation

This folder contains historical context, deprecated features, planning notes, and learning from past development. It is **not authority** — docs/system/ is the current truth.

## What Goes Here

Research and historical docs serve as organizational memory. They capture:

### Deprecated Features
Features that were implemented but removed, with rationale:
```
- [REMOVED: Preset configurations system] - Reason: 90% of users never used presets.
  Complexity cost > value. File: `docs/research/REMOVED_PRESETS_2025-04.md`
```

### Old Approaches
Alternative implementations we tried and rejected:
```
- [ABANDONED: MongoDB-first architecture] - Reason: Overkill for sync model.
  Switched to PostgreSQL. Learning: Start simple. File: `docs/research/MONGODB_LEARNINGS.md`
```

### Planning Notes
Future ideas under discussion, not committed:
```
- [PLANNING: Multi-tenant support] - Status: Blocked on architecture refactor.
  Est. Q3 2025. File: `docs/research/PLANNING_MULTI_TENANT.md`
```

### Learning from Failures
Post-mortems and incident reports:
```
- [INCIDENT: Database migration 2025-03-15] - Root cause: Insufficient testing.
  Fix: Added integration test baseline. File: `docs/research/INCIDENT_DB_MIGRATION.md`
```

## Labeling Convention

Every research doc must be clearly labeled. Use this format in the file header:

```markdown
# [REMOVED: Feature Name]

Status: Historical
Date: 2025-05-22
Context: Why was this removed?
File: docs/research/REMOVED_*.md

[Content about the feature, why it existed, why it was removed]
```

Or for planning:
```markdown
# [PLANNING: Feature Name]

Status: Planning
Target Date: 2025-Q3
Context: What's the idea?
File: docs/research/PLANNING_*.md

[Rough ideas, requirements, open questions]
```

Or for learning:
```markdown
# [INCIDENT: Event Name]

Status: Historical
Date: 2025-03-15
Impact: What happened?
File: docs/research/INCIDENT_*.md

[Timeline, root cause, what we learned, how we fixed it]
```

## How It Differs from docs/system/

| Aspect | docs/system/ | docs/research/ |
|--------|-------------|----------------|
| **Authority** | ✅ Current truth | ❌ Historical context |
| **Usage** | Follow these docs | Learn from these docs |
| **Status** | Always "Current" | Usually "Historical" or "Planning" |
| **When to Read** | Before implementing | When investigating WHY decisions were made |
| **Keep Updated** | YES, agents must keep current | NO, historical docs stay as-is |

## How It Differs from sources/

`sources/` and `docs/research/` are both Historical, but they serve different roles:

| Aspect | sources/ | docs/research/ |
|--------|----------|----------------|
| **Content** | Raw inputs (requirements, interview transcripts, attached docs) | Curated notes (removed features, abandoned approaches, incident reports) |
| **When created** | At scaffolding time, frozen immediately | Throughout the project's life, as decisions and incidents accumulate |
| **Editing** | Never edit — frozen by design | Append new entries; existing entries stay as-is |
| **Author** | The user (provided source material) + the AI (interview transcript) | Developers and agents, post-decision |

Together they tell the full story: `sources/` is what we started with; `docs/research/` is what we learned along the way.

See [sources/README.md](../../sources/README.md) for the full guide.

## When to Move Docs Here

Move a doc from docs/system/ to docs/research/ when:

1. **Feature is removed** — Move its docs to research/, label [REMOVED: Name]
2. **Approach is abandoned** — Document what you learned, move to research/
3. **Architecture changes** — Old architecture docs move to research/, new docs in system/
4. **Decision is overturned** — Keep old rationale in research/ for future reference

Example:
- Old: `docs/system/03_OLD_ARCHITECTURE.md` → `docs/research/ARCHITECTURE_v1_2024.md`
- Mark it: `# [HISTORICAL: Version 1 Architecture - Replaced March 2025]`

## Searching Research Docs

Find historical context quickly:
```bash
# Find all removed features
rg "\[REMOVED:" docs/research/ --type md

# Find all planning items
rg "\[PLANNING:" docs/research/ --type md

# Find all incidents
rg "\[INCIDENT:" docs/research/ --type md

# Find something specific
rg "OAuth" docs/research/ --type md
```

## Quick Index

Popular research categories:

- **Removed Features:** docs/research/REMOVED_*.md
- **Abandoned Approaches:** docs/research/ABANDONED_*.md
- **Planning Ideas:** docs/research/PLANNING_*.md
- **Incidents & Learning:** docs/research/INCIDENT_*.md
- **Old Architecture:** docs/research/ARCHITECTURE_v*.md

## Last Updated

**2025-05-22** — Universal Scaffold Template

When you create this for a real project, update the date.

---

*Last updated: 2026-05-22*
