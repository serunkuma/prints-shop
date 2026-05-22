# React Profile

Status: Current

> Conventions for React projects (web). Always load alongside a runtime profile — `languages/nodejs.md` for plain JS, `languages/typescript.md` (which transitively includes nodejs) for TS. For React Native, load `frameworks/react-native.md` instead.

## 1. Stack identity

React is a UI library, not a framework. Real React projects always sit on top of one or more meta-frameworks/build tools: Vite (SPA), Next.js (SSR/SSG/app router), Remix, Astro, Gatsby, CRA (legacy). The choice of meta-framework drives routing, data fetching, and build conventions — document it explicitly in `AGENTS.md` Section 7 (Decisions).

## 2. Conventional repo layout

Vite-style SPA layout (most common for non-Next.js projects):

```
project/
├── package.json
├── vite.config.ts             # Or Next.js config / other
├── tsconfig.json
├── index.html                 # Vite SPA entry (NOT in src/)
├── README.md
├── AGENTS.md
├── src/
│   ├── main.tsx               # React DOM render
│   ├── App.tsx                # Root component
│   ├── components/            # Reusable presentational components
│   ├── pages/                 # Or routes/, views/ — per-route components
│   ├── hooks/                 # Custom hooks
│   ├── contexts/              # React contexts
│   ├── lib/                   # Utilities, API clients, helpers
│   ├── styles/                # Global CSS / SCSS / CSS modules
│   ├── assets/                # Images, fonts (if not in public/)
│   └── types/                 # Shared TS types (if TS)
├── public/                    # Static assets served as-is
└── docs/
```

Next.js / app-router differs: `app/` directory, file-system routing, special files (`layout.tsx`, `page.tsx`, `loading.tsx`). Document which structure is in use.

## 3. Standard manifest files

- **`package.json`** — `dependencies` include `react`, `react-dom`, and either the meta-framework (`next`, `vite` (dev), `@remix-run/*`) or a bundler.
- **`vite.config.ts`** / **`next.config.js`** — meta-framework config. Keys to document in `AGENTS.md` Section 5:
  - Vite: `plugins`, `resolve.alias`, `server.proxy`, `build.target`
  - Next.js: `experimental`, `images`, `redirects`, `rewrites`, `output`
- **`tsconfig.json`** — if TS; `compilerOptions.jsx` should be `react-jsx` (or `preserve` for Next.js).

## 4. Run / build / test commands

```bash
# Dev server
npm run dev                              # Vite / Next.js default

# Production build
npm run build                            # Compiles to dist/ (Vite) or .next/ (Next.js)

# Production preview / start
npm run preview                          # Vite local prod preview
npm start                                # Next.js production server

# Tests (depends on chosen runner — Vitest, Jest, Testing Library, Playwright)
npm test
npm run test:e2e

# Lint / format
npm run lint                             # ESLint with eslint-plugin-react + react-hooks
npm run format                           # Prettier
```

Always go through `npm run <script>` — package.json scripts are the public contract.

## 5. Documentation patterns

- **`docs/concepts/`** — document cross-cutting decisions: state management choice (Redux / Zustand / Jotai / Context / TanStack Query), data-fetching pattern (client vs server, SWR vs RTK Query), styling approach (CSS modules / Tailwind / styled-components / vanilla-extract).
- **`docs/system/02_COMPONENTS.md`** — high-level component map. Don't enumerate every component — focus on top-level pages/routes, layout components, and any non-obvious shared widgets.
- **`docs/system/04_INTERFACES.md`** — document API surfaces consumed (backend endpoints, GraphQL queries, third-party SDKs).
- **`AGENTS.md` Section 6** — document hook conventions, accessibility commitments, internationalisation approach.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **State management chosen incidentally** — first useState turns into prop-drilling, becomes Context, becomes Redux without a decision. Pick early; document in `docs/concepts/`.
- **`useEffect` for derived state** — almost always a bug. Compute during render.
- **Missing `key` props in lists** — silent rendering bugs; React warning often ignored.
- **Server/client component confusion** (Next.js app router) — `"use client"` boundaries matter; document the convention.
- **Bundle size creep** — track it. `next-bundle-analyzer`, `rollup-plugin-visualizer`, or similar should run in CI.

## 7. `.gitignore` essentials

All of `nodejs.md`'s patterns, plus:

```
dist/
build/
.next/
out/
.vercel/
.turbo/
storybook-static/
playwright-report/
test-results/
```

## 8. Companion profile pointers

- **`languages/typescript.md`** — recommended; TS is the de facto default for React projects.
- **`languages/nodejs.md`** — always load.
- **`frameworks/react-native.md`** — load *instead of* this profile for mobile.

---

*Last updated: 2026-05-22*
