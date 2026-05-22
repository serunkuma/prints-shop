# Node.js Profile

Status: Current

> Conventions for Node.js projects in plain JavaScript: CLI tools, backend services, libraries, scripts. For TypeScript projects, also load `typescript.md`.

## 1. Stack identity

Node.js is a JavaScript runtime for server-side and CLI work. Package management is via `package.json` + a lockfile (one of `package-lock.json`, `pnpm-lock.yaml`, `yarn.lock`). The ecosystem is fragmented around package managers (npm, pnpm, yarn, bun) — pick one per project and document it.

## 2. Conventional repo layout

```
project/
├── package.json               # Manifest + scripts
├── package-lock.json          # Or pnpm-lock.yaml / yarn.lock — pick one
├── .nvmrc                     # Pin Node version (consumed by nvm)
├── README.md
├── AGENTS.md
├── node_modules/              # Installed deps (gitignored)
├── src/                       # Source code
│   ├── index.js               # Library entry point
│   └── ...
├── bin/
│   └── cli.js                 # CLI entry point (set executable in package.json "bin")
├── test/                      # Or tests/ — convention varies; pick one
│   └── *.test.js
├── scripts/                   # Build/deploy/utility scripts
└── docs/
```

For libraries that publish to npm, `index.js` (or `dist/index.js` post-build) is the main entry referenced from `package.json` `"main"`.

## 3. Standard manifest files

- **`package.json`** — keys to document in `AGENTS.md` Section 5:
  - `name`, `version`, `description`, `license`
  - `engines.node` → pin minimum Node version, e.g., `">=20.0.0"`
  - `main` / `exports` → library entry point(s)
  - `bin` → CLI entry points
  - `scripts` → all run/build/test commands live here
  - `dependencies` vs `devDependencies` → keep cleanly separated
  - `type: "module"` → ESM (modern); absence implies CommonJS
- **Lockfile** — commit one, only one. Switching package managers mid-project causes pain.
- **`.nvmrc`** — single line, e.g. `20.11.1`. Run `nvm use` to switch.
- **`.npmrc`** (optional) — npm config for the project (registry, auth, etc.).

## 4. Run / build / test commands

Substitute your chosen package manager (`npm` / `pnpm` / `yarn` / `bun`). Examples assume npm:

```bash
# Install dependencies (uses lockfile)
npm ci                      # CI / reproducible install
npm install                 # Dev: also updates lockfile

# Run the application
node src/index.js
node bin/cli.js
npm start                   # If "start" script defined

# Tests (depends on test runner — node:test, mocha, jest, vitest)
npm test
node --test test/

# Lint / format
npm run lint
npm run format

# Build (if applicable — bundlers like esbuild, Rollup, webpack)
npm run build
```

Always go through `npm run <script>` for build/test/lint — don't invoke the underlying binary directly in docs. The package.json `scripts` block is the public contract.

## 5. Documentation patterns

- **`docs/system/03_CONFIGURATION.md`** — document `package.json` `scripts`, `engines`, environment variables, config-file precedence (e.g., `.env` loading order).
- **`docs/system/02_COMPONENTS.md`** — map `src/` modules to components. Each row: `src/<module>.js` ↔ responsibility.
- **`AGENTS.md` Section 3** — show the chosen package manager's commands; note in Section 7 if a switch happened.
- **`docs/system/04_INTERFACES.md`** — for libraries, document the public API surface (what's in `exports`).

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **Mixed package managers** — leftover `package-lock.json` after switching to pnpm causes silent dep drift. Delete the unused lockfile.
- **Missing `engines.node`** — contributors install on different Node versions; bugs reproduce inconsistently. Always pin.
- **`npm install` in CI** — modifies the lockfile. Use `npm ci` for reproducible installs.
- **ESM/CJS interop confusion** — `"type": "module"` changes import semantics; mixing is painful. Pick one per package.
- **Committing `node_modules/`** — never. Always gitignored.

## 7. `.gitignore` essentials

```
node_modules/
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
.npm
.pnpm-store/
.yarn/cache
.yarn/install-state.gz
dist/
build/
coverage/
.nyc_output/
.env
.env.local
*.tsbuildinfo  # if TS also in use
```

## 8. Companion profile pointers

- **`languages/typescript.md`** — load alongside if the project uses TypeScript (very common; default to "yes" unless the user says plain JS).
- **`frameworks/react.md`**, **`frameworks/angular.md`**, **`frameworks/react-native.md`** — load when the user names the framework.

---

*Last updated: 2026-05-22*
