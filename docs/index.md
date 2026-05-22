# Documentation Index

Quick reference for all documentation files. Organized by category with one-line descriptions.

---

## Concepts (Why We Built It This Way)

Understanding philosophy, principles, and design rationale.

- [01_DOMAIN_PRIMITIVES.md](concepts/01_DOMAIN_PRIMITIVES.md) — Core domain model and key entities
- [02_DESIGN_PHILOSOPHY.md](concepts/02_DESIGN_PHILOSOPHY.md) — Principles and beliefs guiding the project
- [03_TRADE_OFFS.md](concepts/03_TRADE_OFFS.md) — Key decisions and trade-offs made
- [04_CONSTRAINTS.md](concepts/04_CONSTRAINTS.md) — Technical and business constraints

**Use When:** You need to understand WHY something was designed a certain way.

---

## Data (What Flows Through the System)

Data structures, schemas, pipelines, validation rules, and transformations.

- [01_RAW_INPUTS.md](data/01_RAW_INPUTS.md) — Input data sources and formats
- [02_PROCESSING_LAYER.md](data/02_PROCESSING_LAYER.md) — Data transformations and pipeline stages
- [03_STORAGE_SCHEMA.md](data/03_STORAGE_SCHEMA.md) — Database schema and storage format
- [04_OUTPUT_FORMATS.md](data/04_OUTPUT_FORMATS.md) — Output data structures and formats
- [05_VALIDATION_RULES.md](data/05_VALIDATION_RULES.md) — Data validation and constraints
- [06_DATA_CATALOG.md](data/06_DATA_CATALOG.md) — Complete data reference (optional, can consolidate above)

**Use When:** You need to understand data contracts, schemas, or how data transforms.

---

## System (How We Built It)

Current architecture, components, configuration, deployment, and operations.

- [01_OVERVIEW.md](system/01_OVERVIEW.md) — Architecture overview and system components
- [02_COMPONENTS.md](system/02_COMPONENTS.md) — Component descriptions and responsibilities
- [03_CONFIGURATION.md](system/03_CONFIGURATION.md) — All configurable options and their meanings
- [04_INTERFACES.md](system/04_INTERFACES.md) — APIs, event contracts, and interfaces
- [05_DEPLOYMENT.md](system/05_DEPLOYMENT.md) — How to deploy the system
- [06_RUNBOOK.md](system/06_RUNBOOK.md) — Daily/weekly operational procedures
- [07_TESTING.md](system/07_TESTING.md) — Testing strategy and how to run tests
- [08_SECURITY.md](system/08_SECURITY.md) — Security considerations and best practices

**Use When:** You need to implement, deploy, operate, or debug the system.

**Status Rule:** All system docs should be marked "Status: Current" at the top.

---

## Planning (How We're Building It)

Project roadmap and phased delivery breakdown.

- [planning.md](planning.md) — Project roadmap overview and phase summary
- [phase-1-foundation.md](planning/phase-1-foundation.md) — Phase 1 tasks, deliverables, acceptance criteria
- [phase-2-core-implementation.md](planning/phase-2-core-implementation.md) — Phase 2 tasks, deliverables, acceptance criteria
- [phase-3-testing-and-polish.md](planning/phase-3-testing-and-polish.md) — Phase 3 tasks, deliverables, acceptance criteria
- [phase-4-launch-and-iteration.md](planning/phase-4-launch-and-iteration.md) — Phase 4 tasks, deliverables, acceptance criteria

**Use When:** You need to understand project timeline, phases, or what's coming next.

---

## Research & Historical (What We Learned)

Historical context, deprecated features, planning ideas, and incident reports.

- [research/README.md](research/README.md) — Guide to historical documentation
- [research/REMOVED_*.md](research/) — Features that were removed and why
- [research/ABANDONED_*.md](research/) — Approaches we tried and rejected
- [research/PLANNING_*.md](research/) — Future ideas under discussion
- [research/INCIDENT_*.md](research/) — Incident reports and learnings

**Use When:** You're investigating historical decisions or learning from past failures.

**Status Rule:** Research docs are marked "Status: Historical" or "Status: Planning", NOT "Status: Current".

---

## Operations

- [../RUNBOOK.md](../RUNBOOK.md) — Daily/weekly operational procedures
- [../README.md](../README.md) — Project overview and getting started
- [../AGENTS.md](../AGENTS.md) — Single source of truth for AI agents and developers

**Use When:** Setting up, running, or operating the system.

---

## How to Use This Index

1. **Don't know where to start?** Check what you need to understand:
   - *Why* → Concepts/
   - *What* → Data/
   - *How* → System/
   - *When* → Planning/

2. **Looking for historical context?** Check Research/

3. **Need to operate the system?** Start with RUNBOOK.md or AGENTS.md

4. **Debugging a problem?** Start with AGENTS.md "Architecture" section, then System/ docs

---

## Status Legend

Every doc (except research/) should have a status label at the top:

- **Status: Current** — Use this doc, it's authoritative
- **Status: Planning** — Upcoming, not yet implemented
- **Status: Historical** — Outdated, kept for reference only

If you see a doc without a status label, it's incomplete. Report it.

---

## Quick Find by Topic

| Topic | Doc |
|-------|-----|
| System architecture | [system/01_OVERVIEW.md](system/01_OVERVIEW.md) |
| Component list | [system/02_COMPONENTS.md](system/02_COMPONENTS.md) |
| How to configure | [system/03_CONFIGURATION.md](system/03_CONFIGURATION.md) |
| Data schema | [data/03_STORAGE_SCHEMA.md](data/03_STORAGE_SCHEMA.md) |
| How to deploy | [system/05_DEPLOYMENT.md](system/05_DEPLOYMENT.md) |
| How to operate | [../RUNBOOK.md](../RUNBOOK.md) |
| How to test | [system/07_TESTING.md](system/07_TESTING.md) |
| Project timeline | [planning.md](planning.md) |
| Design philosophy | [concepts/02_DESIGN_PHILOSOPHY.md](concepts/02_DESIGN_PHILOSOPHY.md) |
| What was removed | [research/README.md](research/README.md) |
| What failed | [research/](research/) (search for [INCIDENT:) |

---

## Last Updated

**2025-05-22** — Universal Scaffold Template

When you generate this for a real project, update the date and links.
