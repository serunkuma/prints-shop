# E2E Tests

Playwright BDD-style end-to-end tests for the Hydrogen storefront.

## How to Run

From `apps/hydrogen`:

| Command | Mode |
|---------|------|
| `npm run test:e2e` | Headless (CI default) |
| `npm run test:e2e:ui` | UI mode (interactive test runner) |
| `npm run test:e2e:headed` | Headed browser (visible) |

## File Convention

```
tests/
├── sitemap.spec.ts   ← Sitemap XML validation (10 tests)
├── robots.spec.ts    ← Robots.txt validation (2 tests)
└── pages.spec.ts     ← Homepage + PDP smoke tests (2 tests)
```

Each file tests one concern and uses Given/When/Then naming for readability.

## Test Coverage

- **Sitemap**: Valid XML, canonical domain (`https://kumachiprints.art`), includes expected URL patterns, excludes private routes, deduplicates
- **Robots.txt**: References canonical sitemap, allows all agents
- **Pages**: Homepage renders, PDP for `majestic-monarch` loads

## Environment Variables

| Var | Default | Purpose |
|-----|---------|---------|
| `E2E_BASE_URL` | `http://localhost:3000` | Override target URL |
| `CI` | unset | Uses `npm run build && npm run preview` if set |

## Adding Tests

Add new `.spec.ts` files in `tests/`. Import from `@playwright/test`. Use `test.describe` to group related scenarios. Prefer `request` context for API-response tests (sitemap, robots) and `page` context for visual/rendering tests.
