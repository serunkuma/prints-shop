# PHP Profile

Status: Current

> Conventions for modern PHP projects (PHP 8+): web apps, CLIs, libraries. Framework-specific concerns (Laravel, Symfony, WordPress) are not yet broken out — capture them in `AGENTS.md` Section 6.

## 1. Stack identity

PHP is a server-side language commonly used for web backends. Modern projects use PHP 8.x, Composer for dependency management, PSR-4 for autoloading, and PHPUnit for testing. Frameworks (Laravel, Symfony, Slim) impose additional structure; this profile covers the language-level conventions that apply to all of them.

## 2. Conventional repo layout

```
project/
├── composer.json              # Manifest: deps, autoload, scripts
├── composer.lock              # Lockfile — commit it
├── README.md
├── AGENTS.md
├── vendor/                    # Composer-installed deps — gitignored
├── src/                       # Source code (PSR-4 root)
│   └── <Namespace>/
│       └── *.php
├── tests/                     # PHPUnit tests
│   └── *Test.php
├── bin/                       # CLI entry points (if any)
├── public/                    # Web entry point (web apps only): index.php + static assets
└── docs/
```

For web apps, `public/` is the document root. For libraries, omit it.

## 3. Standard manifest files

- **`composer.json`** — keys to document in `AGENTS.md` Section 5:
  - `name`, `description`, `type` (e.g., `library`, `project`)
  - `require` → runtime deps; pin `php` version (e.g., `"php": ">=8.2"`)
  - `require-dev` → dev-only deps
  - `autoload.psr-4` → namespace → directory mapping (e.g., `"App\\": "src/"`)
  - `autoload-dev.psr-4` → tests namespace
  - `scripts` → composer-invokable commands
- **`composer.lock`** — commit for apps; recommended for libraries too (use latest in CI matrix to detect drift).
- **`phpunit.xml`** / **`phpunit.xml.dist`** — PHPUnit config (test paths, coverage settings).

## 4. Run / build / test commands

```bash
# Install dependencies (uses lockfile)
composer install                    # Dev install
composer install --no-dev           # Production (no dev deps)
composer update                     # Update lockfile to latest within constraints

# Run the application (web)
php -S localhost:8000 -t public/    # Built-in dev server

# Run CLI
php bin/<script>.php

# Tests
vendor/bin/phpunit
vendor/bin/phpunit tests/Unit/
vendor/bin/phpunit --coverage-text

# Lint / static analysis
vendor/bin/phpcs                    # PHP_CodeSniffer (style)
vendor/bin/phpstan analyse src/     # Static analysis (level 0–9)
vendor/bin/psalm                    # Alternative static analyser
```

**Use `vendor/bin/<tool>` everywhere** — never a global install. Composer-installed binaries are the project's pinned versions.

## 5. Documentation patterns

- **`docs/system/03_CONFIGURATION.md`** — document `composer.json` autoload structure, `.env` keys, `phpunit.xml` test groups.
- **`docs/system/02_COMPONENTS.md`** — map namespace → directory → responsibility. PHP's PSR-4 structure makes this clean.
- **`docs/data/`** — for APIs, document request/response shapes (typed via DTOs / readonly classes in PHP 8.1+).
- **`AGENTS.md` Section 6** — note any framework-specific conventions (Eloquent models, Symfony entities, etc.).

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **Committing `vendor/`** — never. Always gitignored. Reinstall via `composer install`.
- **Missing PHP version constraint** in `composer.json` — leads to "works on my machine" with version-specific syntax (enums, readonly properties).
- **Bare `phpunit`** — uses globally-installed version, drifts from project's pinned version. Always `vendor/bin/phpunit`.
- **PSR-4 autoload misconfiguration** — `composer dump-autoload` fixes most "class not found" issues; run it after autoload changes.
- **Direct file includes** — modern PHP uses autoloading; manual `require_once` is a code smell outside bootstrap.

## 7. `.gitignore` essentials

```
vendor/
composer.phar
.phpunit.result.cache
.phpunit.cache/
.php-cs-fixer.cache
.phpstan-cache/
.psalm-cache/
.env
.env.local
storage/logs/*.log              # Laravel
var/cache/                      # Symfony
var/log/
```

## 8. Companion profile pointers

None yet. Laravel, Symfony, and WordPress conventions are not yet broken into framework profiles — document framework specifics inline in `AGENTS.md`.

---

*Last updated: 2026-05-22*
