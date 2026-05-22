# TypeScript Profile

Status: Current

> Conventions for TypeScript projects. Always load alongside `languages/nodejs.md` (the runtime profile). If the user is also using React/Angular/etc., load the corresponding framework profile.

## 1. Stack identity

TypeScript is a typed superset of JavaScript that compiles to JS. It adds compile-time type checking and richer tooling. The runtime is Node.js (or a browser via a bundler). The build pipeline always involves a compile step — either via `tsc`, or a bundler that handles TS natively (esbuild, Vite, swc, Bun).

## 2. Conventional repo layout

```
project/
├── package.json
├── tsconfig.json              # TS compiler config (the most important config file)
├── tsconfig.build.json        # Optional: stricter config used only for production build
├── .nvmrc
├── README.md
├── AGENTS.md
├── node_modules/              # gitignored
├── src/
│   ├── index.ts               # Library entry (or src/main.ts for apps)
│   ├── types/                 # Shared type definitions (interfaces, type aliases)
│   └── ...
├── dist/                      # Compiled output — gitignored
├── test/
│   └── *.test.ts
└── docs/
```

`types/` is conventional for shared cross-cutting types. Module-local types live alongside their implementation.

## 3. Standard manifest files

- **`tsconfig.json`** — the contract for what TS allows. Keys to document in `AGENTS.md` Section 5:
  - `compilerOptions.target` → ECMAScript version (e.g., `ES2022`)
  - `compilerOptions.module` → module system (`NodeNext`, `ESNext`, `CommonJS`)
  - `compilerOptions.strict` → should be `true`; document any escape hatches enabled
  - `compilerOptions.outDir` → usually `dist/`
  - `compilerOptions.rootDir` → usually `src/`
  - `compilerOptions.paths` → path aliases (e.g., `@/` → `src/`)
  - `include` / `exclude` → what TS sees
- **`package.json`** (see `nodejs.md`) — for TS specifically:
  - `"types"` → path to .d.ts entry (e.g., `dist/index.d.ts`)
  - `"main"` should point to the compiled JS, not source
  - `"scripts.build"` → typically `tsc -p tsconfig.build.json`

## 4. Run / build / test commands

```bash
# Type-check without emitting
.venv/bin/tsc --noEmit                          # NO — wrong runtime
npx tsc --noEmit                                # or: npm run typecheck

# Build (compile to dist/)
npm run build                                   # Wraps tsc / bundler

# Run compiled output
node dist/index.js

# Run TS directly for dev (no build step)
npx tsx src/index.ts                            # Modern, fast
npx ts-node src/index.ts                        # Older alternative

# Tests (with TS support depending on runner)
npm test                                        # Wraps vitest / jest --preset=ts-jest / etc.

# Lint
npm run lint                                    # Usually ESLint with @typescript-eslint
```

Pick one dev-runner (`tsx`, `ts-node`, or bundler watch mode) and document it. Mixing causes confusion.

## 5. Documentation patterns

- **`docs/data/`** — for libraries and APIs, document the public TypeScript types here. One numbered file per major type group (e.g., `01_REQUEST_TYPES.md`, `02_DOMAIN_MODELS.md`). Cross-reference exact file paths.
- **`docs/system/03_CONFIGURATION.md`** — document `tsconfig.json` keys in use, especially non-default ones.
- **`docs/system/04_INTERFACES.md`** — public API surface; for libraries, list every exported symbol.
- **`AGENTS.md` Section 6 (Key Domain Concepts)** — document any complex generic/conditional types here, since they're often the trickiest part of a TS codebase.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **`any` proliferation** — defeats the point of TS. Use `unknown` and narrow.
- **Implicit `any` enabled** — `strict: true` is non-negotiable for new projects.
- **`.d.ts` files committed in `dist/`** — but no source `.ts` files committed there. Confusion follows.
- **Path aliases that don't work at runtime** — `tsconfig.json paths` are compile-time only; runtime requires bundler/resolver support (e.g., `tsx`, `tsconfig-paths`).
- **Mixing CommonJS and ESM imports** — pick one module system per package via `package.json "type"`.

## 7. `.gitignore` essentials

All of `nodejs.md`'s patterns, plus:

```
dist/
build/
*.tsbuildinfo
.tsbuildinfo
```

## 8. Companion profile pointers

- **`languages/nodejs.md`** — always load (TS runs on Node).
- **`frameworks/react.md`** — load if React app.
- **`frameworks/angular.md`** — load if Angular app (Angular requires TS).
- **`frameworks/react-native.md`** — load if RN app.

---

*Last updated: 2026-05-22*
