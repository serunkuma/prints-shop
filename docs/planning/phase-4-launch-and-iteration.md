# Phase 4: Launch & Iteration

> **Objective:** Deploy the system to production / staging, establish monitoring and alerting, and create a feedback loop for continuous improvement.

---

## Scope

- Deploy to target environment (production / staging / distribution)
- Set up monitoring, logging aggregation, and alerting
- Create feedback loop for bug reports, feature requests, and metrics
- Establish iteration cadence for ongoing development
- Write post-launch retrospective
- Verify operational readiness (documentation, runbook, status labels)

---

## Operational Readiness Checklist

Before deploying to production, verify these operational requirements. This ensures operators can run the system without confusion or breakdowns.

### Documentation Status
- [ ] All docs in `docs/system/` marked `Status: Current` (or explicitly `Status: Historical` if superseded)
- [ ] All docs in `docs/planning/` marked `Status: Current` or `Status: Historical`
- [ ] AGENTS.md section 7b "Removed Features" populated with any deprecated items
- [ ] AGENTS.md "Change Log" updated with final changes before launch
- [ ] `docs/index.md` verified to list all current documentation

### RUNBOOK.md Complete and Tested
- [ ] RUNBOOK.md exists at project root
- [ ] Daily workflow section has numbered steps with copy-paste ready commands
- [ ] All bash/CLI commands tested and verified to work (with exact syntax)
- [ ] Troubleshooting section covers 5+ common issues with root cause and solution
- [ ] Weekly tasks documented
- [ ] One operator (preferably new to the project) has tested RUNBOOK.md end-to-end

### Command Documentation
- [ ] Every command in RUNBOOK.md uses full paths (e.g., `.venv/bin/python`, not `python`)
- [ ] Every command includes all required flags and options
- [ ] Every command has been tested before committing docs
- [ ] No abbreviations or assumed environment setup

### Multi-Audience Documentation
- [ ] docs/index.md created and reviewed (file finder for all docs)
- [ ] README.md updated with links to RUNBOOK.md and docs/index.md
- [ ] Operators can find what they need in RUNBOOK.md without reading AGENTS.md
- [ ] Developers can find implementation guidance in AGENTS.md without reading RUNBOOK.md

### Historical Context Captured
- [ ] docs/research/ folder created (or confirmed empty if no removals)
- [ ] Removed features documented in docs/research/ (if any)
- [ ] AGENTS.md "Removed Features" section points to research/ docs (if applicable)

### Deployment & Operations Docs
- [ ] RUNBOOK.md covers daily operations
- [ ] `docs/system/05_DEPLOYMENT.md` (or equivalent) covers deployment topology
- [ ] `docs/system/06_RUNBOOK.md` (or equivalent) covers operational procedures
- [ ] Health check procedures documented and tested

---

## Task Checklist

### Deployment

- [ ] Create deployment configuration (Docker, cloud, package)
- [ ] Write deployment runbook (step-by-step)
- [ ] Set up staging environment for pre-deployment validation
- [ ] Deploy to production
- [ ] Verify deployment with smoke tests
- [ ] Document deployment in `docs/system/10_DEPLOYMENT.md`

### Monitoring

- [ ] Implement health check endpoint / command
- [ ] Set up logging aggregation (if applicable)
- [ ] Set up metrics collection and dashboards
- [ ] Set up alerting for critical failures
- [ ] Document monitoring in `docs/system/11_MONITORING.md`

### Feedback Loop

- [ ] Create issue templates for bugs and feature requests
- [ ] Establish triage process for incoming issues
- [ ] Define iteration cycle (weekly / biweekly sprints)
- [ ] Record all known issues in tracking system

### Retrospective

- [ ] Document what went well
- [ ] Document what could be improved
- [ ] Capture metrics (time to build, bugs found, scope changes)
- [ ] Update roadmap with next-phase plans

---

## Deliverables

- Deployment configuration and runbook
- Monitoring dashboards and alert rules
- `docs/system/10_DEPLOYMENT.md` — deployment guide
- `docs/system/11_MONITORING.md` — monitoring guide
- Issue templates (`.github/ISSUE_TEMPLATE/`)
- Updated `AGENTS.md` with deployment and monitoring details

---

## Acceptance Criteria

- [ ] System runs in target environment for 24h without critical errors
- [ ] Health checks pass consistently
- [ ] Alerts fire correctly on simulated failures
- [ ] Deployment runbook tested by another team member / fresh agent
- [ ] Issue templates and feedback process documented
- [ ] Roadmap updated with next iteration plans

---

## Dependencies

- Phase 3 deliverables accepted (testing, performance, security)
- Target environment access and credentials

---

*Last updated: YYYY-MM-DD*
