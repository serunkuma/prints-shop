<#
.SYNOPSIS
  Health check for a freshly scaffolded Kumachi Prints project.
  Run from the project root. Exits 0 if all checks pass, 1 otherwise.

.DESCRIPTION
  Intended for POST-SCAFFOLDING state — running this against the bare
  template will fail loudly, which is expected. It catches placeholders,
  missing status labels, and generic boilerplate that slipped through.

  The universal scaffold template files (extract.md, HOW_TO.md, prompt.md,
  MERGE_BACK.md, profiles/) are excluded from placeholder checks — they
  are expected to contain generic terms.

.PARAMETER Help
  Show this help message.

.EXAMPLE
  .\scripts\validate_scaffold.ps1
#>

param([switch]$Help)

if ($Help) {
  Get-Help $PSCommandPath -Detailed
  exit 0
}

# ---------- helpers ----------
$PASS_COUNT = 0
$FAIL_COUNT = 0
$FAILURES = @()

function pass($msg) {
  Write-Host "[PASS] $msg" -ForegroundColor Green
  $script:PASS_COUNT++
}

function fail($msg, $detail) {
  Write-Host "[FAIL] $msg" -ForegroundColor Red
  if ($detail) {
    foreach ($line in $detail) { Write-Host "       $line" -ForegroundColor Red }
  }
  $script:FAIL_COUNT++
  $script:FAILURES += $msg
}

# ---------- paths ----------
$PROJECT_ROOT = Split-Path $PSScriptRoot -Parent
Set-Location -LiteralPath $PROJECT_ROOT

Write-Host "Validating scaffold at: $PROJECT_ROOT" -ForegroundColor Cyan
Write-Host "----------------------------------------"

# ---------- excluded files & dirs for placeholder checks ----------
$SCAFFOLD_FILES = @(
  'extract.md', 'HOW_TO.md', 'prompt.md', 'MERGE_BACK.md',
  'scripts\validate_scaffold.sh', 'scripts\validate_scaffold.ps1'
)
$EXCLUDED_DIRS = @('sources', 'node_modules', '.git', 'dist', 'profiles', '.cursor')

# ---------- content search helper ----------
function Search-Files($pattern, $include = '*.md') {
  $files = Get-ChildItem -Recurse -Filter $include -File |
    Where-Object {
      $relative = $_.FullName.Substring($PROJECT_ROOT.Length + 1)
      foreach ($dir in $EXCLUDED_DIRS) {
        if ($relative.StartsWith($dir + [IO.Path]::DirectorySeparatorChar) -or $relative -eq $dir) {
          return $false
        }
      }
      foreach ($sf in $SCAFFOLD_FILES) {
        if ($relative -eq $sf) { return $false }
      }
      $true
    }
  $results = $files | Select-String -Pattern $pattern -CaseSensitive
  return $results
}

# ---------- CHECK 1: No 'Project Name' placeholder ----------
$hits = Search-Files 'Project Name'
if (-not $hits) {
  pass "No 'Project Name' placeholder left in docs"
} else {
  $detail = $hits | Select-Object -First 5 | ForEach-Object {
    $rel = $_.Filename
    if ($rel.Length -gt $PROJECT_ROOT.Length) { $rel = $rel.Substring($PROJECT_ROOT.Length + 1) }
    "$rel`:$($_.LineNumber)"
  }
  fail "'Project Name' placeholder still present" $detail
}

# ---------- CHECK 2: No 'YYYY-MM-DD' placeholder ----------
$hits = Search-Files 'YYYY-MM-DD'
if (-not $hits) {
  pass "No 'YYYY-MM-DD' placeholder left in docs"
} else {
  $detail = $hits | Select-Object -First 5 | ForEach-Object {
    $rel = $_.Filename
    if ($rel.Length -gt $PROJECT_ROOT.Length) { $rel = $rel.Substring($PROJECT_ROOT.Length + 1) }
    "$rel`:$($_.LineNumber)"
  }
  fail "'YYYY-MM-DD' placeholder still present" $detail
}

# ---------- CHECK 3: No 'TODO' as standalone placeholder ----------
$hits = Search-Files 'TODO'
if (-not $hits) {
  pass "No 'TODO' placeholders left in docs"
} else {
  $detail = $hits | Select-Object -First 5 | ForEach-Object {
    $rel = $_.Filename
    if ($rel.Length -gt $PROJECT_ROOT.Length) { $rel = $rel.Substring($PROJECT_ROOT.Length + 1) }
    "$rel`:$($_.LineNumber)"
  }
  fail "'TODO' placeholders still present" $detail
}

# ---------- CHECK 4: AGENTS.md has project-specific content ----------
if (Select-String -Path AGENTS.md -Pattern 'Kumachi Prints' -Quiet) {
  pass "AGENTS.md contains project-specific content"
} else {
  fail "AGENTS.md still has template placeholder content"
}

# ---------- CHECK 5: AGENTS.md has a change log entry ----------
if (Select-String -Path AGENTS.md -Pattern '2026-06' -Quiet) {
  pass "AGENTS.md has change log entry"
} else {
  fail "AGENTS.md missing change log entry"
}

# ---------- CHECK 6: AGENTS.md has a last updated date ----------
if (Select-String -Path AGENTS.md -Pattern '\*\*2026-' -Quiet) {
  pass "AGENTS.md has a recent last updated date"
} else {
  fail "AGENTS.md last updated date is missing or stale"
}

# ---------- CHECK 7: RUNBOOK.md is project-specific ----------
if (Select-String -Path RUNBOOK.md -Pattern 'Printful' -Quiet) {
  pass "RUNBOOK.md contains project-specific content"
} else {
  fail "RUNBOOK.md still has template placeholder content"
}

# ---------- CHECK 8: README.md is project-specific ----------
if (Select-String -Path README.md -Pattern 'Kumachi' -Quiet) {
  pass "README.md contains project-specific content"
} else {
  fail "README.md still has generic scaffold content"
}

# ---------- CHECK 9: docs/planning.md exists and has phase content ----------
if (Test-Path docs/planning.md) {
  if (Select-String -Path docs/planning.md -Pattern 'Phase 1' -Quiet) {
    pass "docs/planning.md exists and has phase content"
  } else {
    fail "docs/planning.md exists but has no phase content"
  }
} else {
  fail "docs/planning.md is missing"
}

# ---------- CHECK 10: docs/index.md exists ----------
if (Test-Path docs/index.md) {
  pass "docs/index.md exists"
} else {
  fail "docs/index.md missing"
}

# ---------- CHECK 11: AI-assistant rule files present ----------
$ruleFiles = @(
  'CLAUDE.md', 'GEMINI.md', '.windsurfrules', '.cursorrules',
  '.aider.conf.yml', '.github\copilot-instructions.md',
  '.cursor\rules\agents.mdc'
)
$missingRuleFiles = $ruleFiles | Where-Object { -not (Test-Path $_) }
if (-not $missingRuleFiles) {
  pass "AI-assistant rule files present"
} else {
  fail "AI-assistant rule files missing" ($missingRuleFiles | ForEach-Object { "Not found: $_" })
}

# ---------- CHECK 12: Status labels on all concept/data/system docs ----------
$knownDocs = @(
  'docs/concepts/01_project_vision.md', 'docs/concepts/02_stack_decisions.md',
  'docs/concepts/03_design_system.md', 'docs/concepts/04_content_strategy.md',
  'docs/concepts/05_ai_studio_vision.md', 'docs/concepts/README.md',
  'docs/data/01_product_model.md', 'docs/data/02_sanity_schemas.md',
  'docs/data/03_cart_and_checkout.md', 'docs/data/04_printful_product_spec.md',
  'docs/data/README.md',
  'docs/system/01_architecture.md', 'docs/system/02_shopify_configuration.md',
  'docs/system/03_routes_and_components.md', 'docs/system/04_operations.md',
  'docs/system/05_deployment.md', 'docs/system/README.md'
)
$totalNd = $knownDocs.Count
$labelHits = 0
$missingLabels = @()
foreach ($doc in $knownDocs) {
  if (Test-Path $doc) {
    $match = Select-String -Path $doc -Pattern '^Status: ' -Quiet
    if ($match) { $labelHits++ } else { $missingLabels += $doc }
  } else {
    $totalNd--
  }
}
if ($totalNd -gt 0 -and $labelHits -ge $totalNd) {
  pass "Status labels present on $labelHits docs (target >= $totalNd)"
} else {
  fail "Status labels missing on some docs" @("Found $labelHits labels, expected >= $totalNd", "Missing on:", $missingLabels)
}

# ---------- CHECK 13: docs/planning/ has phase breakdown files ----------
$phaseFiles = Get-ChildItem -Path docs/planning -Filter '0?_*.md' -File
$phaseCount = ($phaseFiles | Measure-Object).Count
if ($phaseCount -ge 5) {
  pass "docs/planning/ has $phaseCount phase breakdown files"
} else {
  fail "docs/planning/ missing phase breakdown files (found $phaseCount, expected >= 5)"
}

# ---------- CHECK 14: sources/README.md has Status: Historical ----------
if (Test-Path sources/README.md) {
  if (Select-String -Path sources/README.md -Pattern 'Status: Historical' -Quiet) {
    pass "sources/README.md has Status: Historical"
  } else {
    fail "sources/README.md missing Status: Historical"
  }
} else {
  fail "sources/README.md not found"
}

# ---------- CHECK 15: .gitignore exists ----------
if (Test-Path .gitignore) {
  pass ".gitignore exists"
} else {
  fail ".gitignore missing"
}

# ---------- summary ----------
Write-Host "----------------------------------------" -ForegroundColor Cyan
$resultColor = if ($FAIL_COUNT -gt 0) { 'Red' } else { 'Green' }
Write-Host "Results: $PASS_COUNT passed, $FAIL_COUNT failed" -ForegroundColor $resultColor

if ($FAILURES.Count -gt 0) {
  Write-Host "`nFailed checks:" -ForegroundColor Red
  foreach ($f in $FAILURES) { Write-Host "  - $f" -ForegroundColor Red }
  exit 1
}

exit 0
