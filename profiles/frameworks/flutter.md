# Flutter Profile

Status: Current

> Conventions for Flutter projects (cross-platform UI: iOS + Android + web + desktop). Extends `languages/dart.md` — load both.

## 1. Stack identity

Flutter is Google's UI toolkit for building natively compiled applications from a single Dart codebase. The widget tree is the core mental model: everything is a widget; layout, state, and lifecycle all flow through widgets. State management is intentionally unopinionated — projects pick from Provider, Riverpod, Bloc/Cubit, GetX, Redux, or plain `setState` for simple apps. The choice should be documented up front in `docs/concepts/`.

## 2. Conventional repo layout

```
project/
├── pubspec.yaml                  # Manifest: deps, SDK constraints, assets, fonts
├── pubspec.lock                  # Lockfile — commit it
├── analysis_options.yaml         # Lint rules (extend package:flutter_lints/flutter.yaml)
├── README.md
├── AGENTS.md
├── lib/
│   ├── main.dart                 # App entry point
│   ├── app.dart                  # Root MaterialApp / CupertinoApp widget
│   ├── screens/                  # One file per screen / page
│   ├── widgets/                  # Reusable widgets (shared across screens)
│   ├── models/                   # Data classes (or use freezed)
│   ├── services/                 # API clients, persistence, platform wrappers
│   ├── providers/                # Or blocs/, controllers/ — depends on state mgmt
│   ├── theme/                    # ThemeData, colors, text styles
│   └── utils/                    # Helpers
├── test/                         # Widget + unit tests
│   └── *_test.dart
├── integration_test/             # End-to-end (flutter_driver replacement)
├── assets/                       # Images, fonts, JSON
├── ios/                          # Generated Xcode project (do not check in build/)
├── android/                      # Generated Android Studio project
├── web/                          # Web target (if enabled)
├── linux/ / macos/ / windows/    # Desktop targets (if enabled)
└── docs/
```

Use the folder structure as a *team contract*, not a rule. Folder names above are convention only — what matters is consistency within the project.

## 3. Standard manifest files

- **`pubspec.yaml`** — keys to document in `AGENTS.md` Section 5:
  - `environment.sdk` → Dart SDK constraint
  - `environment.flutter` → Flutter SDK constraint
  - `dependencies` / `dev_dependencies`
  - `flutter.uses-material-design` → almost always `true`
  - `flutter.assets` → list of asset paths
  - `flutter.fonts` → font families and weights
  - `flutter.plugin` → only for plugin packages
- **`analysis_options.yaml`** — should `include: package:flutter_lints/flutter.yaml`. Document any disabled lints in `AGENTS.md`.
- **`ios/Podfile`** — only edit when adding/configuring iOS native deps; otherwise managed by Flutter.
- **`android/app/build.gradle`** — `applicationId`, `minSdkVersion`, `targetSdkVersion`, signing config.

## 4. Run / build / test commands

```bash
# Install
flutter pub get
flutter pub upgrade --major-versions      # Bump deps within major-version constraints

# Dev — hot reload on connected device / sim
flutter run                               # Default device
flutter run -d chrome                     # Web
flutter run -d macos                      # Desktop
flutter run --flavor production -t lib/main_production.dart   # Flavored build

# Production builds
flutter build apk --release               # Android APK
flutter build appbundle --release         # Android AAB (Play Store)
flutter build ipa --release               # iOS (requires macOS + Xcode)
flutter build web --release
flutter build macos --release

# Tests
flutter test                              # All unit + widget tests
flutter test test/widgets/
flutter test --coverage                   # Generates coverage/lcov.info
flutter test integration_test/            # Integration / E2E

# Lint / format / analyze
dart analyze
dart format lib/ test/
dart format --output=none --set-exit-if-changed .

# Code generation (build_runner — used by freezed, json_serializable, etc.)
dart run build_runner build --delete-conflicting-outputs
dart run build_runner watch
```

**Always `flutter pub`, never `dart pub`** — Flutter bundles its own Dart SDK; mixing breaks lockfile compatibility.

## 5. Documentation patterns

- **`docs/concepts/`** — document the state management choice, navigation approach (Navigator 1.0 vs 2.0 vs go_router), localisation strategy (intl vs easy_localization). These choices ripple through the entire codebase.
- **`docs/system/02_COMPONENTS.md`** — map the screen graph and major shared widgets. A navigation diagram is more useful than a widget inventory.
- **`docs/system/03_CONFIGURATION.md`** — document `pubspec.yaml` flavors, asset/font registrations, native config files (`Info.plist` keys, `AndroidManifest.xml` permissions).
- **`docs/data/`** — for apps with offline storage or non-trivial models, document data shapes here. Reference `lib/models/` files with line numbers.
- **`AGENTS.md` Section 6** — document `freezed` / `json_serializable` patterns, any custom widgets that everyone touches.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **`setState` after `dispose`** — async work completing on a disposed widget. Document the convention (check `mounted` after every `await`).
- **`BuildContext` across async gaps** — using a context after `await` can hit a different element. Capture references before awaiting; check `mounted` before using.
- **Rebuilds from `MediaQuery.of(context)`** — subscribes to ALL media query changes (keyboard, orientation). Use `.maybeOf` selectors or `MediaQuery.sizeOf(context)` (Flutter 3.10+) to subscribe to just one property.
- **Mixing `flutter pub` and `dart pub`** — corrupts lockfile state. Always `flutter pub` in Flutter projects.
- **Forgetting to add asset paths to `pubspec.yaml`** — file exists, asset doesn't load at runtime. Common confusion.
- **Hot-reload vs hot-restart confusion** — hot reload keeps state, hot restart resets it. Document which to use when in `RUNBOOK.md`.

## 7. `.gitignore` essentials

All of `dart.md`'s patterns, plus:

```
# Flutter
.flutter-plugins
.flutter-plugins-dependencies
.fvm/                            # Flutter Version Management

# iOS
ios/Pods/
ios/.symlinks/
ios/Flutter/Flutter.framework
ios/Flutter/Flutter.podspec
ios/Flutter/Generated.xcconfig
ios/Flutter/ephemeral/
ios/Runner.xcworkspace/xcuserdata/

# Android
android/.gradle/
android/local.properties
android/captures/
android/key.properties           # Signing config — never commit
android/app/release/

# Generated code
*.g.dart
*.freezed.dart                   # Often committed; debated
*.gr.dart                        # auto_route

# Coverage
coverage/
```

## 8. Companion profile pointers

- **`languages/dart.md`** — always load (Flutter is a Dart framework).

---

*Last updated: 2026-05-22*
