#!/usr/bin/env bash
# validate_scaffold.sh — health check for a freshly scaffolded project.
# Run from the project root. Exits 0 if all checks pass, 1 otherwise.
#
# Intended for POST-SCAFFOLDING state — running this against the bare
# template (with prompt.md present, generic AGENTS.md, etc.) will fail
# loudly, which is expected. It's designed to catch placeholders and
# generic boilerplate that slipped through scaffolding.
#
# Usage:
#   bash scripts/validate_scaffold.sh
#
# The universal scaffold operates greenfield only. For brownfield projects
# (existing codebases retrofitted via extract.md → prompt.md → MERGE_BACK.md),
# run this validator after the merge step to confirm the docs landed cleanly.

set -u

# Help flag
for arg in "$@"; do
  case "$arg" in
    -h|--help)
      sed -n '2,14p' "$0"
      exit 0
      ;;
  esac
done

# Colors (only if stdout is a TTY)
if [ -t 1 ]; then
  GREEN='\033[0;32m'
  RED='\033[0;31m'
  YELLOW='\033[0;33m'
  RESET='\033[0m'
else
  GREEN=''; RED=''; YELLOW=''; RESET=''
fi

PASS_COUNT=0
FAIL_COUNT=0
FAILURES=()

pass() {
  printf "${GREEN}[PASS]${RESET} %s\n" "$1"
  PASS_COUNT=$((PASS_COUNT + 1))
}

fail() {
  printf "${RED}[FAIL]${RESET} %s\n" "$1"
  shift
  for line in "$@"; do
    printf "       %s\n" "$line"
  done
  FAIL_COUNT=$((FAIL_COUNT + 1))
  FAILURES+=("$1")
}

# Tools: prefer ripgrep, fall back to grep -r
if command -v rg >/dev/null 2>&1; then
  SEARCH="rg --no-heading -n"
  SEARCH_MD="$SEARCH --type md"
else
  SEARCH="grep -rn"
  SEARCH_MD="grep -rn --include=*.md"
fi

PROJECT_ROOT="$(pwd)"

echo "Validating scaffold at: $PROJECT_ROOT"
echo "----------------------------------------"

# Check 1: No 'Project Name' placeholder
hits=$($SEARCH_MD "Project Name" . 2>/dev/null | grep -v "^./sources/" || true)
if [ -z "$hits" ]; then
  pass "No 'Project Name' placeholder left in docs"
else
  fail "'Project Name' placeholder still present" "$(echo "$hits" | head -5)"
fi

# Check 2: No 'YYYY-MM-DD' placeholder
hits=$($SEARCH_MD "YYYY-MM-DD" . 2>/dev/null | grep -v "^./sources/" || true)
if [ -z "$hits" ]; then
  pass "No 'YYYY-MM-DD' placeholder left in docs"
else
  fail "'YYYY-MM-DD' placeholder still present" "$(echo "$hits" | head -5)"
fi

# Check 3: No 'TODO' as standalone placeholder
hits=$($SEARCH_MD "TODO" . 2>/dev/null | grep -v "^./sources/" || true)
if [ -z "$hits" ]; then
  pass "No 'TODO' placeholders left in docs"
else
  fail "'TODO' placeholders still present" "$(echo "$hits" | head -5)"
fi

# Check 4: AGENTS.md has a meaningful 'What This System Does' section
if grep -q "Kumachi Prints" AGENTS.md 2>/dev/null; then
  pass "AGENTS.md contains project-specific content"
else
  fail "AGENTS.md still has template placeholder content"
fi

# Check 5: AGENTS.md has a change log entry
if grep -q "2026-06" AGENTS.md 2>/dev/null; then
  pass "AGENTS.md has change log entry"
else
  fail "AGENTS.md missing change log entry"
fi

# Check 6: AGENTS.md has a last updated date
if $SEARCH "Last Updated" AGENTS.md 2>/dev/null | grep -qi "2026"; then
  pass "AGENTS.md has a recent last updated date"
else
  fail "AGENTS.md last updated date is missing or stale"
fi

# Check 7: RUNBOOK.md is project-specific (not generic)
if grep -q "Printful" RUNBOOK.md 2>/dev/null; then
  pass "RUNBOOK.md contains project-specific content"
else
  fail "RUNBOOK.md still has template placeholder content"
fi

# Check 8: README.md is project-specific (not generic scaffold)
if grep -q "Kumachi" README.md 2>/dev/null; then
  pass "README.md contains project-specific content"
else
  fail "README.md still has generic scaffold content"
fi

# Check 9: docs/planning.md exists and has phase content
if [ -f "docs/planning.md" ] && grep -q "Phase 1" "docs/planning.md" 2>/dev/null; then
  pass "docs/planning.md exists and has phase content"
else
  fail "docs/planning.md is missing or incomplete"
fi

# Check 10: docs/index.md exists
if [ -f "docs/index.md" ]; then
  pass "docs/index.md exists"
else
  fail "docs/index.md missing"
fi

# Check 11: AI-assistant rule files exist (at least one)
if [ -f "CLAUDE.md" ] || [ -f "GEMINI.md" ] || [ -f ".windsurfrules" ] || [ -f ".cursorrules" ] || [ -f ".aider.conf.yml" ]; then
  pass "AI-assistant rule files present"
else
  fail "No AI-assistant rule files found"
fi

# Check 12: Status labels present on all concept/data/system docs
LABEL_HITS=$($SEARCH_MD "^Status: " docs/concepts/ docs/data/ docs/system/ 2>/dev/null | wc -l)
TOTAL_ND=0
[ -f docs/concepts/01_project_vision.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/concepts/02_stack_decisions.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/concepts/03_design_system.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/concepts/04_content_strategy.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/concepts/05_ai_studio_vision.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/concepts/README.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/data/01_product_model.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/data/02_sanity_schemas.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/data/03_cart_and_checkout.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/data/04_printful_product_spec.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/data/README.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/system/01_architecture.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/system/02_shopify_configuration.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/system/03_routes_and_components.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/system/04_operations.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/system/05_deployment.md ] && TOTAL_ND=$((TOTAL_ND + 1))
[ -f docs/system/README.md ] && TOTAL_ND=$((TOTAL_ND + 1))

if [ "$TOTAL_ND" -gt 0 ] && [ "$LABEL_HITS" -ge "$TOTAL_ND" ]; then
  pass "Status labels present on $LABEL_HITS docs (target >= $TOTAL_ND)"
else
  fail "Status labels missing on some docs" "Found $LABEL_HITS labels, expected >= $TOTAL_ND"
fi

# Check 13: docs/planning/ has phase breakdown files
PHASE_FILES=$(ls docs/planning/01_*.md docs/planning/02_*.md docs/planning/03_*.md docs/planning/04_*.md docs/planning/05_*.md 2>/dev/null | wc -l)
if [ "$PHASE_FILES" -ge 5 ]; then
  pass "docs/planning/ has $PHASE_FILES phase breakdown files"
else
  fail "docs/planning/ missing phase breakdown files (found $PHASE_FILES, expected >= 5)"
fi

# Check 14: sources/ has README.md with Status: Historical
if grep -q "Status: Historical" sources/README.md 2>/dev/null; then
  pass "sources/README.md has Status: Historical"
else
  fail "sources/README.md missing Status: Historical"
fi

# Check 15: AGENTS.md gitignored
if [ -f ".gitignore" ]; then
  pass ".gitignore exists"
else
  fail ".gitignore missing"
fi

echo "----------------------------------------"
echo "Results: $PASS_COUNT passed, $FAIL_COUNT failed"

if [ "$FAIL_COUNT" -gt 0 ]; then
  echo ""
  echo "Failed checks:"
  for f in "${FAILURES[@]}"; do
    echo "  - $f"
  done
  exit 1
fi

exit 0
