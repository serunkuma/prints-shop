# RUNBOOK: Operating [Project Name]

## Core Operational Rules

These rules are immutable and apply to all operational procedures:

1. **Documentation is Authority** — AGENTS.md is the single source of truth. Verify any questions against AGENTS.md before proceeding.
2. **Pre-flight Validation Required** — Never run production workflows without verifying all prerequisites in the preflight checklist.
3. **Status Labels Matter** — Always check doc status labels. Only follow docs marked "Status: Current".
4. **Copy-Paste Safely** — All commands in this runbook are tested and complete. Use them as-is; don't abbreviate or simplify.
5. **Keep This Updated** — Update this runbook when procedures change. Stale runbooks cause failures.

---

## Daily Operational Workflow

Follow this sequence every day before operational tasks:

1. **Read Today's Status**
   - Confirm AGENTS.md is current (check "Last Updated" footer)
   - Review any "Status: Historical" docs to avoid deprecated workflows
   - Identify any active incidents in AGENTS.md

2. **Preflight Checklist**
   - [ ] Environment variables loaded: `source .env` (or equivalent)
   - [ ] All dependencies installed: `./scripts/preflight_check.sh` (or language equivalent)
   - [ ] Service connectivity verified: `./scripts/health_check.sh`
   - [ ] Documentation status verified: all system docs marked "Status: Current"

3. **Run Daily Tasks** (numbered in order)
   - Task 1: Review yesterday's logs
     ```bash
     cat logs/daily_$(date -d yesterday +%Y-%m-%d).log
     ```
   - Task 2: Start services
     ```bash
     ./scripts/start_services.sh
     ```
   - Task 3: Run data pipeline
     ```bash
     .venv/bin/python -m src.pipeline.daily_run --timestamp $(date +%Y-%m-%d)
     ```
   - Task 4: Verify pipeline completed
     ```bash
     tail -50 logs/pipeline_$(date +%Y-%m-%d).log | grep -E "SUCCESS|ERROR"
     ```

4. **Monitor Throughout Day**
   - Check logs every hour: `tail -f logs/production.log`
   - Alert on errors: `grep ERROR logs/production.log`
   - Verify performance baseline: `./scripts/performance_check.sh`

5. **End of Day**
   - Archive logs: `./scripts/archive_logs.sh`
   - Generate summary report: `.venv/bin/python -m src.reporting.daily_summary`
   - Update RUNBOOK.md if any procedures changed

---

## Weekly Operational Tasks

Run weekly (every Monday morning, 9 AM):

- [ ] **Verify All Docs Current**
  ```bash
  rg "Status: Historical|Status: Planning" docs/ --type md | wc -l
  # Should be < 5 (only docs explicitly marked as non-current)
  ```

- [ ] **Backup Configuration**
  ```bash
  tar -czf backups/config_$(date +%Y-%m-%d).tar.gz AGENTS.md settings.json
  ```

- [ ] **Test Recovery Procedures**
  ```bash
  ./scripts/test_recovery.sh
  ```

- [ ] **Review Removed Features Log**
  - Open AGENTS.md, section "Removed Features (Won't Be Reimplemented)"
  - Confirm no requests came in for removed features
  - Update removal log if new features were deprecated

- [ ] **Sync Documentation**
  - Check if any system changes happened, update docs/system/ accordingly
  - Verify all code references in docs still point to correct files/line numbers
  - Update AGENTS.md "Last Updated" timestamp

---

## Troubleshooting Common Issues

### Issue: Pipeline Failed with "Connection Timeout"

**Diagnosis:**
```bash
tail -100 logs/pipeline.log | grep -A 5 "timeout"
```

**Solution:**
1. Verify service is running: `./scripts/health_check.sh`
2. Check network: `ping api.example.com`
3. Restart service: `./scripts/restart_service.sh connection`
4. Re-run pipeline: `.venv/bin/python -m src.pipeline.daily_run --retry 3`

**If still failing:** Check AGENTS.md "Known Limitations" section and docs/research/ for historical context.

---

### Issue: Documentation Mismatch (Docs Say X, Code Does Y)

**Root Cause:** Docs are stale or code wasn't updated when docs changed.

**Resolution:**
1. Check status label: Is doc marked "Status: Current"?
2. If marked Current but code differs: Code needs update (doc is authority)
3. If doc is Historical: Find current docs in docs/system/
4. Update AGENTS.md decision log to explain the change
5. Re-test to confirm code matches docs

**Prevention:** Always update AGENTS.md when implementing code changes.

---

### Issue: Can't Reproduce Issue from Documentation

**Diagnosis:** Run command from docs with `-v` flag:
```bash
<command from docs> -v
```

**Checklist:**
- [ ] Using exact command from docs (no abbreviations)
- [ ] All flags and parameters included
- [ ] Environment variables set (check `env | grep -i <VAR>`)
- [ ] Dependencies version-matched (`.venv/bin/python --version`)

**If Still Stuck:** Open docs/research/ and search for similar issues tagged "[REMOVED: ...]" or "[DEBUGGING: ...]".

---

## Maintenance Procedures

### Monthly Full Validation

Run on the 1st of each month:

```bash
# 1. Validate all documentation
./scripts/validate_docs.sh

# 2. Test all commands in docs
./scripts/test_all_doc_commands.sh

# 3. Check for stale language in docs
rg "legacy|deprecated|old system|TODO|FIXME" docs/ --type md | head -20

# 4. Update AGENTS.md changelog
# Open AGENTS.md "Change Log" section and add entry:
# - 2025-05-22: Monthly validation passed, no issues found (Your Name)
```

### Quarterly Dependency Update

Every 3 months, update dependencies:

```bash
# 1. Check for updates
pip list --outdated

# 2. Update critical security packages
pip install --upgrade <package1> <package2> ...

# 3. Run full test suite
.venv/bin/pytest tests/

# 4. Update AGENTS.md with new versions
```

### Annual Documentation Audit

Once per year, validate against pocket-auto-3 patterns:

1. Check if docs still follow three-pillar structure (Concepts/Data/System)
2. Verify AGENTS.md has Removed Features section
3. Confirm docs/research/ captures historical decisions
4. Review Phase 4 operational readiness checklist
5. Update AGENTS.md with audit results

---

## How to Report Changes in AGENTS.md

Whenever you complete an operational task that required docs updates:

1. Edit AGENTS.md "Change Log" section at bottom
2. Add entry in format:
   ```
   - 2025-05-22 14:30 UTC: [Description of change]. Reason: [why]. Impact: [what changed]. (Your Name)
   ```
3. Update "Last Updated" footer
4. Example:
   ```
   - 2025-05-22: Increased daily rate limit from 1000 to 5000 RPS. 
     Reason: Performance testing showed no impact. 
     Impact: Faster data pipeline by ~40%. (Alice)
   ```

---

## Quick Reference: Core Commands

| Task | Command | Notes |
|------|---------|-------|
| Start services | `./scripts/start_services.sh` | Verify with health_check.sh after |
| Stop services | `./scripts/stop_services.sh` | Graceful shutdown, ~30s |
| View logs | `tail -f logs/production.log` | Real-time, Ctrl+C to exit |
| Run pipeline | `.venv/bin/python -m src.pipeline.daily_run` | Single run, no arguments |
| Check health | `./scripts/health_check.sh` | Returns 0 (all good) or 1 (problem) |
| Backup config | `tar -czf backups/config_$(date +%Y-%m-%d).tar.gz *.json` | Include all .json files |
| View AGENTS.md | `less AGENTS.md` or `cat AGENTS.md` | Single source of truth |

---

## Last Updated

**2025-05-22** by Universal Scaffold Template

When you generate this document for a real project, update the date and author.

See AGENTS.md for full change history.
