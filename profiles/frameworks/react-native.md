# React Native Profile

Status: Current

> Conventions for React Native mobile projects (iOS + Android). Extends `frameworks/react.md` — load both. Choose Expo (managed) or bare workflow up front; the layout and tooling diverge meaningfully.

## 1. Stack identity

React Native compiles React components to native iOS and Android UIs via native bridges. Two workflows: **Expo managed** (no native code, easier dev, OTA updates, restricted to Expo-supported APIs) and **bare** (full native access via Xcode/Android Studio, more setup, can use any native module). New projects should default to Expo unless they need bare-only APIs from day one.

## 2. Conventional repo layout

### Expo managed

```
project/
├── package.json
├── app.json (or app.config.ts)         # Expo config — name, slug, plugins
├── tsconfig.json                       # If TS (recommended)
├── README.md
├── AGENTS.md
├── App.tsx                             # Root component
├── src/
│   ├── screens/                        # One file per screen (or routes/ if expo-router)
│   ├── components/                     # Reusable UI
│   ├── hooks/
│   ├── contexts/
│   ├── navigation/                     # Stack / tab navigators (React Navigation)
│   ├── lib/                            # API clients, utilities
│   └── assets/                         # Local images, fonts
├── assets/                             # Top-level assets referenced from app.json (icons, splash)
└── docs/
```

### Bare workflow

Adds `ios/` and `android/` directories with native projects:

```
project/
├── ios/
│   ├── <ProjectName>/                  # Xcode project
│   ├── Podfile                         # CocoaPods deps
│   └── Podfile.lock
├── android/
│   ├── app/                            # Android Gradle module
│   ├── build.gradle
│   └── settings.gradle
├── App.tsx
├── src/                                # Same as Expo
└── ...
```

Document which workflow is in use in `AGENTS.md` Section 7 — it affects every subsequent decision.

## 3. Standard manifest files

- **`app.json`** / **`app.config.ts`** (Expo) — keys to document in `AGENTS.md` Section 5:
  - `expo.name`, `expo.slug`, `expo.version`, `expo.orientation`
  - `expo.ios.bundleIdentifier`, `expo.android.package`
  - `expo.plugins` — Expo config plugins
  - `expo.updates`, `expo.runtimeVersion` — OTA settings
- **`package.json`** — pin `react-native` and the matching `react` version exactly (they're tightly coupled).
- **`Podfile`** (bare iOS) — pinned CocoaPods deps; document in `AGENTS.md` if non-default.
- **`android/app/build.gradle`** (bare) — `applicationId`, `versionCode`, `versionName`, `minSdkVersion`, `targetSdkVersion`.

## 4. Run / build / test commands

### Expo

```bash
# Install
npm install

# Dev — Metro bundler + Expo Go on device, or simulator
npx expo start
npx expo start --ios
npx expo start --android
npx expo start --clear                   # Reset Metro cache

# Build for production (EAS)
npx eas build --platform ios --profile production
npx eas build --platform android --profile production

# Submit to stores
npx eas submit --platform ios
npx eas submit --platform android
```

### Bare

```bash
# Install
npm install
cd ios && pod install && cd ..           # iOS only — CocoaPods deps

# Dev — Metro + native build
npx react-native start                   # Metro
npx react-native run-ios                 # Builds + runs iOS sim
npx react-native run-android             # Builds + runs Android emulator

# Tests (Jest is default)
npm test
```

Always `cd ios && pod install` after adding/removing native dependencies — forgetting this is the #1 source of "works for me" issues.

## 5. Documentation patterns

- **`docs/system/03_CONFIGURATION.md`** — document the workflow choice (Expo vs bare), Expo plugins in use, native module list (bare), and any platform-specific config divergence.
- **`docs/system/02_COMPONENTS.md`** — map screens to navigation graph. A high-level navigator tree is worth more than per-component lists.
- **`docs/concepts/`** — state management choice (matters more in RN — context-heavy apps re-render expensively), navigation library decisions (React Navigation vs Expo Router), styling approach.
- **`AGENTS.md` Section 7b** — track removed native modules (they leave behind config), removed Expo plugins.

## 6. Common gotchas (seed for AGENTS.md Section 7b)

- **`react-native` and `react` version mismatch** — must be the exact pair listed in the RN release notes.
- **Forgetting `pod install`** after `npm install` (bare workflow) — silent runtime crashes.
- **Hermes vs JSC** — Hermes is default on modern RN; document if your project flipped to JSC and why (rare).
- **Platform-specific code without `.ios.tsx` / `.android.tsx` suffixes** — Metro's resolver respects these; use them rather than `Platform.OS` ladders.
- **Native module upgrades requiring native build changes** — `npx pod-install` and rebuild from Xcode/Android Studio after RN or native-module bumps. Document this in `RUNBOOK.md`.

## 7. `.gitignore` essentials

All of `nodejs.md`'s patterns, plus:

```
# Metro
.metro-health-check*
metro-cache/

# Expo
.expo/
.expo-shared/
dist/
web-build/

# iOS (bare)
ios/Pods/
ios/build/
ios/*.xcworkspace/xcuserdata/
ios/*.xcodeproj/xcuserdata/
ios/*.xcodeproj/project.xcworkspace/xcuserdata/

# Android (bare)
android/.gradle/
android/build/
android/app/build/
android/local.properties
android/captures/

# Native build artefacts
*.keystore
!debug.keystore
```

## 8. Companion profile pointers

- **`frameworks/react.md`** — always load; RN extends React patterns.
- **`languages/typescript.md`** — strongly recommended (Expo defaults to TS in new projects).
- **`languages/nodejs.md`** — load transitively.

---

*Last updated: 2026-05-22*
