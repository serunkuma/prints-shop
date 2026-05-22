# Dart Profile

Status: Current

> Conventions for Dart projects: CLI tools, libraries, server-side Dart, and Flutter apps. For Flutter projects, also load `frameworks/flutter.md`.

## 1. Stack identity

Dart is Google's typed language used primarily for Flutter (mobile/desktop/web UI) and occasionally for backends and CLI tools. Packaging is via `pub.dev` and `pubspec.yaml`. The Dart SDK ships with a powerful unified toolchain (`dart` and `flutter` commands).

## 2. Conventional repo layout

```
project/
├── pubspec.yaml               # Manifest: name, deps, SDK constraints
├── pubspec.lock               # Lockfile — commit it
├── analysis_options.yaml      # Lint rules (extends package:lints or package:flutter_lints)
├── README.md
├── AGENTS.md
├── .dart_tool/                # Local cache — gitignored
├── lib/                       # Source — public API lives here
│   ├── <package_name>.dart    # Library entry point (re-exports public surface)
│   └── src/                   # Implementation; not part of public API
├── bin/                       # CLI entry points (executables)
│   └── main.dart
├── test/                      # Tests — *_test.dart files
│   └── *_test.dart
├── example/                   # Optional: usage examples for libraries
└── docs/
```

By convention, anything in `lib/src/` is implementation detail; `lib/*.dart` files are the public API.

## 3. Standard manifest files

- **`pubspec.yaml`** — keys to document in `AGENTS.md` Section 5:
  - `name`, `version`, `description`, `homepage`, `repository`
  - `environment.sdk` → Dart SDK constraint (e.g., `'>=3.0.0 <4.0.0'`)
  - `environment.flutter` → only for Flutter projects
  - `dependencies` / `dev_dependencies`
  - `executables` → CLI entry points
  - `flutter:` block (Flutter projects only) — assets, fonts, plugin metadata
- **`analysis_options.yaml`** — lint rules. Always start by `include:`-ing `package:lints/recommended.yaml` (Dart) or `package:flutter_lints/flutter.yaml` (Flutter).
- **`pubspec.lock`** — commit for apps and CLIs; debate for libraries (Dart docs recommend committing for both).

## 4. Run / build / test commands

```bash
# Install dependencies
dart pub get                  # Plain Dart
flutter pub get               # Flutter projects — uses the Flutter-bundled Dart

# Run the application
dart run                      # If pubspec has an executables entry
dart run bin/main.dart
flutter run                   # Flutter projects

# Tests
dart test                     # Plain Dart
flutter test                  # Flutter projects

# Lint / format / analyze
dart analyze
dart format .
dart format --output=none --set-exit-if-changed .   # CI: fail on unformatted code

# Build (Dart CLI compiles to native)
dart compile exe bin/main.dart -o build/<name>      # Native binary
dart compile js bin/main.dart -o build/<name>.js    # JS output
```

**Never mix `dart pub` and `flutter pub`** in the same repo. Flutter projects always use `flutter pub` — the Flutter SDK bundles its own Dart version.

## 5. Documentation patterns

- **`docs/system/02_COMPONENTS.md`** — for libraries, map exported symbols in `lib/` to their purposes.
- **`docs/system/03_CONFIGURATION.md`** — document `pubspec.yaml` and `analysis_options.yaml` choices, especially non-default lint rules.
- **`docs/concepts/`** — for libraries with non-trivial API design, document the design rationale here.
- **`AGENTS.md` Section 6** — list active state-management or DI conventions if relevant.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **Mixing `dart pub` and `flutter pub`** in Flutter projects — always use `flutter pub` for Flutter; the Dart SDK in Flutter is bundled and pinned.
- **Publishing `lib/src/` symbols** — anything under `lib/src/` is private convention. Don't import it from outside the package.
- **Forgetting `analysis_options.yaml`** — without it, lint is minimal. Always inherit from `package:lints` or `package:flutter_lints`.
- **`build/` checked in** — never. Build outputs are local.
- **Async-without-await** — Dart's analyzer warns; treat warnings as errors in CI.

## 7. `.gitignore` essentials

```
.dart_tool/
.packages
build/
pubspec.lock                  # Only for libraries — apps/CLIs commit this; flip per project
.flutter-plugins
.flutter-plugins-dependencies
*.iml
.idea/
```

(For Flutter projects, see `frameworks/flutter.md` for additional ignores.)

## 8. Companion profile pointers

- **`frameworks/flutter.md`** — load if the project is a Flutter app. Most Dart users come via Flutter; check explicitly in the interview.

---

*Last updated: 2026-05-22*
