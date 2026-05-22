# Ruby Profile

Status: Current

> Conventions for Ruby projects: gems (libraries), CLI tools, scripts, and the language-level concerns of Ruby web apps. Rails-specific structure is not yet broken out; document it inline.

## 1. Stack identity

Ruby is a dynamic, object-oriented language with strong conventions around expressiveness. Dependency management is via Bundler + `Gemfile`. Ruby version managers (rbenv, rvm, asdf, chruby) handle version isolation. Rails is the dominant web framework; non-Rails projects often use Sinatra, Rack apps, or pure Ruby.

## 2. Conventional repo layout

For a gem / library:

```
project/
├── Gemfile                    # App-style deps (gems use *.gemspec primarily)
├── Gemfile.lock               # Lockfile — commit for apps; debated for gems
├── <gem_name>.gemspec         # Gem manifest (libraries)
├── .ruby-version              # Pin via rbenv/rvm/asdf
├── Rakefile                   # Task automation
├── README.md
├── AGENTS.md
├── lib/
│   ├── <gem_name>.rb          # Entry: require'd as `require '<gem_name>'`
│   └── <gem_name>/            # Implementation modules
│       └── *.rb
├── spec/                      # RSpec tests — *_spec.rb
│   ├── spec_helper.rb
│   └── *_spec.rb
├── test/                      # Minitest alternative — *_test.rb
├── bin/                       # Executables (gems with CLI surface)
└── docs/
```

For Rails apps, the convention is the Rails-generated structure (`app/`, `config/`, `db/`, etc.) — document deviations from defaults.

## 3. Standard manifest files

- **`Gemfile`** — keys to document in `AGENTS.md` Section 5:
  - `ruby '<version>'` → required Ruby version
  - `source 'https://rubygems.org'` → default source
  - `gem '<name>', '~> <version>'` → deps with pessimistic version constraints
  - `group :development, :test` → dev-only gems
- **`<gem_name>.gemspec`** (libraries) — gem metadata: `name`, `version`, `summary`, `authors`, `dependencies`, `required_ruby_version`.
- **`.ruby-version`** — single line, e.g. `3.3.0`. Consumed by all major version managers.
- **`Rakefile`** — defines `rake test`, `rake build`, etc. Standard tasks for gems are: `test`, `build`, `install`, `release`.

## 4. Run / build / test commands

```bash
# Install gems (uses Gemfile.lock)
bundle install
bundle install --jobs=4

# Run the application / CLI
bundle exec ruby bin/<script>.rb
bundle exec <gem_name>

# Tests
bundle exec rspec                       # RSpec
bundle exec rspec spec/unit/
bundle exec rake test                   # Minitest via Rake

# Lint
bundle exec rubocop
bundle exec rubocop --autocorrect

# Build / release a gem
bundle exec rake build
bundle exec rake release                # Build + push + tag

# Rails-specific (if Rails)
bundle exec rails server
bundle exec rails console
bundle exec rails db:migrate
```

**Always prefix with `bundle exec`** — it uses gems from the project's `Gemfile.lock`, not globally-installed versions.

## 5. Documentation patterns

- **`docs/system/03_CONFIGURATION.md`** — document `Gemfile` groups, `.env` keys, Rakefile tasks.
- **`docs/system/02_COMPONENTS.md`** — for gems, map `lib/<gem_name>/` modules. For Rails, document beyond the default conventions.
- **`docs/data/`** — for APIs, document JSON shapes; for Rails, document significant model attributes and DB schema highlights.
- **`AGENTS.md` Section 6** — note any monkey-patches or core-extension gems in use (these have outsized impact on debugging).

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **Bare `rspec` / `rake` / `ruby` invocations** — use the system Ruby and globally-installed gems; bypasses bundler. Always `bundle exec`.
- **Missing `.ruby-version`** — contributors get random Ruby versions; subtle bugs follow.
- **Committing `vendor/bundle/`** — never. It's a local cache. Always gitignored.
- **Forgetting to update `Gemfile.lock`** in a separate commit — Bundler regenerates it on every install; check what changed.
- **Monkey-patching core classes** without documentation — Ruby allows it, but it makes debugging miserable. Document in `AGENTS.md`.

## 7. `.gitignore` essentials

```
vendor/bundle/
.bundle/
*.gem
*.rbc
.byebug_history
.rspec_status
coverage/
log/*.log                       # Rails
tmp/                            # Rails
.env
.env.local
# IDEs
.idea/
.vscode/
```

## 8. Companion profile pointers

None yet. Rails as a framework profile is a future addition.

---

*Last updated: 2026-05-22*
