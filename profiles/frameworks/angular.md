# Angular Profile

Status: Current

> Conventions for Angular SPA projects. Always load alongside `languages/typescript.md` (Angular requires TS). Covers Angular 17+ with both NgModule and standalone-component approaches.

## 1. Stack identity

Angular is Google's opinionated SPA framework: TypeScript-first, dependency-injection-based, with built-in routing, forms, and HTTP. The CLI (`ng`) generates and builds; the framework has strong conventions that should be documented in `AGENTS.md` Section 7 (decisions like "we use OnPush change detection" or "we're on standalone components").

## 2. Conventional repo layout

```
project/
├── angular.json               # Workspace / build config
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.spec.json
├── README.md
├── AGENTS.md
├── src/
│   ├── main.ts                # Bootstrap entry
│   ├── index.html             # Single HTML shell
│   ├── styles.scss            # Global styles
│   ├── app/
│   │   ├── app.config.ts      # Standalone: app-level providers
│   │   ├── app.routes.ts      # Routing config
│   │   ├── app.component.ts   # Root component
│   │   ├── core/              # Singleton services, guards, interceptors
│   │   ├── shared/            # Reusable components, directives, pipes
│   │   ├── features/          # Feature modules / standalone feature areas
│   │   │   └── <feature>/
│   │   │       ├── <feature>.component.ts
│   │   │       ├── <feature>.routes.ts
│   │   │       └── <feature>.service.ts
│   │   └── ...
│   ├── assets/                # Static assets
│   └── environments/          # environment.ts, environment.prod.ts
├── e2e/                       # End-to-end tests (Cypress / Playwright)
└── docs/
```

`core/` for app-wide singletons; `shared/` for reusable UI; `features/` for domain-aligned feature folders. Document deviations in `AGENTS.md`.

## 3. Standard manifest files

- **`angular.json`** — workspace config. Keys to document in `AGENTS.md` Section 5:
  - `projects.<name>.architect.build.options` → build entry, polyfills, styles, scripts
  - `projects.<name>.architect.serve.configurations` → dev/prod URL bases, proxy config
  - `projects.<name>.architect.test.options` → karma/jest config
  - `cli.analytics` → telemetry opt-out
- **`package.json`** — `dependencies` will include `@angular/core`, `@angular/router`, etc. — pin major version.
- **`tsconfig.*.json`** — Angular ships three: base, app, spec. Note non-default `compilerOptions` and `angularCompilerOptions`.

## 4. Run / build / test commands

```bash
# Install
npm install

# Dev server
ng serve                                  # Default http://localhost:4200
ng serve --port 4300 --open               # Custom port + open browser
ng serve --configuration=development

# Production build
ng build --configuration=production       # Output: dist/<project>/
ng build --stats-json                     # Generate bundle stats for analysis

# Tests
ng test                                   # Karma + Jasmine (default)
ng test --watch=false --browsers=ChromeHeadless --code-coverage
ng e2e                                    # End-to-end (depends on configured runner)

# Lint
ng lint
ng lint --fix
```

Use `ng` (from `node_modules/.bin/ng` via `npx ng` or `npm run`-scripts) rather than a global install.

## 5. Documentation patterns

- **`docs/system/02_COMPONENTS.md`** — map feature folders to responsibilities. List each top-level feature with its route prefix.
- **`docs/system/04_INTERFACES.md`** — for SPAs that talk to backends, document the API client services (`*.service.ts` in `core/` or feature folders).
- **`docs/concepts/`** — capture cross-cutting decisions: state management choice (NgRx / signals / services), change-detection strategy (default vs OnPush), routing strategy (lazy vs eager).
- **`AGENTS.md` Section 6** — document any custom decorators, RxJS conventions, or signal-based patterns in use.
- **`AGENTS.md` Section 7 (Decisions)** — Angular projects accumulate consequential decisions: form style (template-driven vs reactive), HTTP error handling, auth flow. Log them here.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **Mixing NgModule and standalone-component approaches** without explicit convention — pick one as the default for new code.
- **Memory leaks from un-unsubscribed observables** — document the convention (`takeUntilDestroyed`, `async` pipe, manual `Subject`) and stick to it.
- **Change-detection performance issues** — using default CD on large lists. Either OnPush + immutable inputs or signals.
- **`environment.ts` committed with secrets** — never. Use runtime config (loaded from API or `assets/config.json`) for anything sensitive.
- **Pinning to a too-old Angular major** — Angular has a strict 6-month release cadence; stay within current + 1 LTS to receive security patches.

## 7. `.gitignore` essentials

All of `nodejs.md`'s patterns, plus:

```
.angular/cache/
dist/
tmp/
out-tsc/
e2e/test-results/
```

## 8. Companion profile pointers

- **`languages/typescript.md`** — always load (Angular requires TS).
- **`languages/nodejs.md`** — load transitively via TS profile.

---

*Last updated: 2026-05-22*
