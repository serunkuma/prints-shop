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
  pass "No 'YYYY-MM-DD' placeholder left"
else
  fail "'YYYY-MM-DD' placeholder still present (run a real date)" "$(echo "$hits" | head -5)"
fi

# Check 3: No HTML-comment placeholders left in AGENTS.md
hits=$(grep -n "<!-- One-paragraph" AGENTS.md 2>/dev/null || true)
if [ -z "$hits" ]; then
  pass "AGENTS.md has no template HTML-comment placeholders"
else
  fail "AGENTS.md still has template placeholders" "$hits"
fi

# Check 4: Every doc in docs/{system,concepts,data,planning} has a Status: line in the top 5 lines
missing_status=()
while IFS= read -r f; do
  if ! head -5 "$f" 2>/dev/null | grep -qE "^Status:"; then
    missing_status+=("$f")
  fi
done < <(find docs/system docs/concepts docs/data docs/planning -name "*.md" -type f 2>/dev/null)

if [ ${#missing_status[@]} -eq 0 ]; then
  pass "All docs in system/concepts/data/planning have Status: label"
else
  fail "${#missing_status[@]} doc(s) missing Status: label" "${missing_status[@]}"
fi

# Check 5: Every doc ends with 'Last updated:' footer
missing_footer=()
while IFS= read -r f; do
  if ! tail -5 "$f" 2>/dev/null | grep -q "Last updated"; then
    missing_footer+=("$f")
  fi
done < <(find docs -name "*.md" -type f 2>/dev/null)

if [ ${#missing_footer[@]} -eq 0 ]; then
  pass "All docs/ files have 'Last updated' footer"
else
  fail "${#missing_footer[@]} doc(s) missing 'Last updated' footer" "${missing_footer[@]}"
fi

# Check 6: AGENTS.md Section 1 is not empty (has content between heading and next ---)
if [ -f AGENTS.md ]; then
  section1=$(awk '/^## 1\. What This System Does/,/^---$/' AGENTS.md | sed '1d;$d' | grep -v '^<!--' | grep -v '^$' | head -1)
  if [ -n "$section1" ]; then
    pass "AGENTS.md Section 1 has content"
  else
    fail "AGENTS.md Section 1 is empty (no project description)" "Add a one-paragraph description in '## 1. What This System Does'"
  fi
else
  fail "AGENTS.md not found at project root" ""
fi

# Check 7: README.md is not the universal prompt template
if [ -f README.md ]; then
  if grep -q "Universal Project Kickstart" README.md 2>/dev/null; then
    fail "README.md still contains 'Universal Project Kickstart' (the scaffolding template)" "Replace README.md with a project-specific entry point"
  else
    pass "README.md has been replaced with project-specific content"
  fi
else
  fail "README.md not found at project root" ""
fi

# Check 8: docs/index.md references files that exist
broken_links=()
if [ -f docs/index.md ]; then
  # Extract markdown links of the form [text](path) — relative paths only
  links=$(grep -oE '\]\([^)]+\.md[^)]*\)' docs/index.md | sed -E 's/^\]\(//; s/\)$//; s/#.*$//' | sort -u)
  while IFS= read -r link; do
    [ -z "$link" ] && continue
    # Skip absolute URLs
    case "$link" in
      http*|/*) continue ;;
    esac
    # Resolve relative to docs/
    resolved="docs/$link"
    # Normalize ../ paths
    resolved=$(cd docs 2>/dev/null && readlink -f "$link" 2>/dev/null || echo "")
    if [ -z "$resolved" ]; then
      # readlink -f not available on macOS by default; use python fallback
      resolved=$(python3 -c "import os,sys; print(os.path.normpath(os.path.join('docs', sys.argv[1])))" "$link" 2>/dev/null || echo "")
    fi
    if [ -n "$resolved" ] && [ ! -f "$resolved" ]; then
      broken_links+=("$link -> $resolved")
    fi
  done <<< "$links"

  if [ ${#broken_links[@]} -eq 0 ]; then
    pass "All links in docs/index.md resolve to existing files"
  else
    fail "${#broken_links[@]} broken link(s) in docs/index.md" "${broken_links[@]}"
  fi
else
  fail "docs/index.md not found" ""
fi

# Check 9: AGENTS.md Change Log has at least one entry beyond the template row
if [ -f AGENTS.md ]; then
  changelog=$(awk '/^## 9\. Change Log/,0' AGENTS.md | grep -E "^\| [0-9]{4}-[0-9]{2}-[0-9]{2}" | grep -v "Initial scaffold created" || true)
  if [ -n "$changelog" ]; then
    pass "AGENTS.md Change Log has project-specific entries"
  else
    fail "AGENTS.md Change Log only has the template entry" "Add at least one real change-log entry"
  fi
fi

# Check 10: No '> **TODO:**' left in AGENTS.md (TODOs allowed elsewhere, not in source of truth)
if [ -f AGENTS.md ]; then
  todo_hits=$(grep -n "> \*\*TODO:\*\*" AGENTS.md 2>/dev/null || true)
  if [ -z "$todo_hits" ]; then
    pass "AGENTS.md has no unresolved TODOs"
  else
    fail "AGENTS.md has unresolved TODOs (resolve before handing off)" "$todo_hits"
  fi
fi

# Check 11: scaffold-time-only artefacts should not exist in a scaffolded project
# (profiles/, prompt.md, extract.md, MERGE_BACK.md are scaffold-time tools;
#  prompt.md Step 4.10 deletes profiles/ and prompt.md;
#  extract.md and MERGE_BACK.md never belong in a scaffolded project.)
leaks=()
[ -d profiles ] && leaks+=("profiles/ directory")
[ -f prompt.md ] && leaks+=("prompt.md")
[ -f extract.md ] && leaks+=("extract.md")
[ -f MERGE_BACK.md ] && leaks+=("MERGE_BACK.md")
if [ ${#leaks[@]} -eq 0 ]; then
  pass "No scaffold-time artefacts present (correct for a scaffolded project)"
else
  fail "${#leaks[@]} scaffold-time artefact(s) leaked into the scaffolded project" "${leaks[@]}"
fi

# Summary
echo "----------------------------------------"
TOTAL=$((PASS_COUNT + FAIL_COUNT))
if [ "$FAIL_COUNT" -eq 0 ]; then
  printf "${GREEN}Summary: %d/%d checks passed. Scaffold is clean.${RESET}\n" "$PASS_COUNT" "$TOTAL"
  exit 0
else
  printf "${YELLOW}Summary: %d/%d checks passed. Fix the %d failure(s) above and re-run.${RESET}\n" "$PASS_COUNT" "$TOTAL" "$FAIL_COUNT"
  exit 1
fi
