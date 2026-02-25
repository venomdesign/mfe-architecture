# MFE Architecture — Documentation

A reference implementation of a **Micro-Frontend (MFE) architecture** using Angular and Native Federation. The repository contains five independent projects that work together to demonstrate runtime module federation with a shared component library.

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [Project Structure](#2-project-structure)
3. [How the Pieces Connect](#3-how-the-pieces-connect)
4. [Prerequisites](#4-prerequisites)
5. [First-Time Setup](#5-first-time-setup)
6. [Starting & Stopping Each Project](#6-starting--stopping-each-project)
7. [Component Library](#7-component-library)
8. [Component Library Showcase](#8-component-library-showcase)
9. [Shared State Library](#9-shared-state-library)
10. [Shell App](#10-shell-app)
11. [Micro-Frontends](#11-micro-frontends)
12. [Centralised Federation Config — @shared/federation-config](#12-centralised-federation-config--sharedfederation-config)
13. [Development Workflow](#13-development-workflow)
14. [Port Reference](#14-port-reference)
15. [Singleton Mode — Forcing All MFEs onto One Shared Version](#15-singleton-mode--forcing-all-mfes-onto-one-shared-version)

---

## 1. Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        component-library                            │
│              @shared/component-library  (v1.0.0)                   │
│   UiButton · UiBadge · UiCard · UiAlert  →  dist/component-library │
└───────────────────────┬─────────────────────────────────────────────┘
                        │  file: path reference (npm install)
          ┌─────────────┼──────────────────┐
          │             │                  │
          ▼             ▼                  ▼
┌──────────────┐ ┌─────────────┐  ┌───────────────┐
│  component-  │ │mfe-dashboard│  │  mfe-settings │
│   library-   │ │  :4201      │  │    :4202      │
│  showcase    │ │  (remote)   │  │   (remote)    │
│  :4300       │ └──────┬──────┘  └───────┬───────┘
└──────────────┘        │                 │
  (standalone,          │  Native Federation
   no federation)       │  remoteEntry.json
                        │                 │
                        ▼                 ▼
              ┌─────────────────────────────┐
              │          shell-app          │
              │           :4200             │
              │  federation.manifest.json   │
              │  loadRemoteModule(...)      │
              └─────────────────────────────┘
```

**Key relationships:**

| Relationship | Mechanism |
|---|---|
| Component library → MFEs / Showcase | `file:` path in `package.json` (local npm install) |
| MFEs → Shell | Native Federation `remoteEntry.json` loaded at runtime |
| Shell discovers MFEs | `public/federation.manifest.json` |
| Shell lazy-loads MFE components | `loadRemoteModule('mfe-name', './Component')` |

---

## 2. Project Structure

```
mfe-architecture/
├── component-library/            # Standalone Angular library (ng-packagr)
│   ├── src/
│   │   ├── public-api.ts         # Barrel export for all components
│   │   └── lib/
│   │       ├── button/           # UiButtonComponent
│   │       ├── badge/            # UiBadgeComponent
│   │       ├── card/             # UiCardComponent
│   │       └── alert/            # UiAlertComponent
│   ├── ng-package.json           # ng-packagr config → builds to dist/
│   └── package.json              # name: @shared/component-library
│
├── shared-state-lib/             # Standalone Angular library (ng-packagr)
│   ├── src/
│   │   ├── public-api.ts         # Barrel export for all services
│   │   └── lib/
│   │       └── app-state/        # AppStateService (signal-based)
│   ├── ng-package.json           # ng-packagr config → builds to dist/
│   └── package.json              # name: @shared/state-lib
│
├── component-library-showcase/   # Angular app — visual docs for the library
│   └── src/app/pages/            # One page per component (buttons, badges…)
│
├── shell-app/                    # Angular host app (Native Federation host)
│   ├── public/
│   │   └── federation.manifest.json  # Points to MFE remoteEntry URLs
│   ├── src/main.ts               # initFederation() before bootstrap
│   └── federation.config.js      # Shared dependency config
│
├── mfe-dashboard/                # Angular remote MFE (Native Federation remote)
│   ├── federation.config.js      # Exposes ./Component
│   └── src/app/app.component.ts  # The exposed component
│
└── mfe-settings/                 # Angular remote MFE (Native Federation remote)
    ├── federation.config.js      # Exposes ./Component
    └── src/app/app.component.ts  # The exposed component
```

---

## 3. How the Pieces Connect

### Step 1 — Component Library is built first

The component library is **not an application** — it is a publishable Angular library compiled by `ng-packagr`. Running `npm run build` inside `component-library/` produces a distributable package at:

```
component-library/dist/component-library/
```

This output directory is what every other project installs.

### Step 2 — MFEs and Showcase install the library via a `file:` path

Each consuming project references the built output directly in its `package.json`:

```json
// mfe-dashboard/package.json
// mfe-settings/package.json
// component-library-showcase/package.json
"@shared/component-library": "file:../component-library/dist/component-library"
```

After running `npm install` in each project, the library is symlinked/copied into that project's `node_modules/@shared/component-library`. This means **the library must be built before `npm install` is run in any consuming project**.

### Step 3 — MFEs expose components via Native Federation

Each MFE's `federation.config.js` declares what it exposes to the outside world:

```js
// mfe-dashboard/federation.config.js
exposes: {
  './Component': './src/app/app.component.ts',
}
```

When the MFE dev server starts, Native Federation generates a `remoteEntry.json` file served at the root of the MFE's origin (e.g. `http://localhost:4201/remoteEntry.json`). This file is the contract between the remote and the host.

### Step 4 — Shell discovers MFEs via the federation manifest

The shell reads `shell-app/public/federation.manifest.json` at startup:

```json
{
  "mfe-dashboard": "http://localhost:4201/remoteEntry.json",
  "mfe-settings":  "http://localhost:4202/remoteEntry.json"
}
```

The shell's `main.ts` calls `initFederation()` **before** bootstrapping Angular, so the federation runtime can fetch and register all remote manifests:

```ts
// shell-app/src/main.ts
import { initFederation } from '@angular-architects/native-federation';

initFederation('/federation.manifest.json')
  .catch(err => console.error(err))
  .then(_ => import('./bootstrap'))   // Angular bootstraps AFTER federation is ready
  .catch(err => console.error(err));
```

### Step 5 — Shell lazy-loads MFE components via the router

The shell's router uses `loadRemoteModule` to pull in MFE components on demand — no static import, no rebuild required:

```ts
// shell-app/src/app/app.routes.ts
{
  path: 'dashboard',
  loadComponent: () =>
    loadRemoteModule('mfe-dashboard', './Component').then(m => m.AppComponent)
},
{
  path: 'settings',
  loadComponent: () =>
    loadRemoteModule('mfe-settings', './Component').then(m => m.AppComponent)
}
```

The string `'mfe-dashboard'` matches the key in `federation.manifest.json`. The string `'./Component'` matches the key in the MFE's `exposes` block.

### Shared dependency negotiation

All federation configs use `shareAll` for Angular core packages with `singleton: true` — this guarantees a single Angular instance across the shell and all MFEs (required for Angular to work correctly).

The component library is configured separately with `singleton: false`:

```js
// shell-app/federation.config.js  (and each MFE's federation.config.js)
'@shared/component-library': {
  singleton: false,
  strictVersion: false,
  requiredVersion: 'auto'
}
```

`singleton: false` means each MFE **bundles and uses its own copy** of the component library independently. This allows different MFEs to run different versions of the library without conflict. See [Section 11](#11-overriding-mfes-with-one-shared-version-of-the-component-library) to change this behaviour.

---

## 4. Prerequisites

| Tool | Version | Notes |
|---|---|---|
| Node.js | 18+ | LTS recommended |
| npm | 9+ | Comes with Node |
| Angular CLI | 20+ | `npm install -g @angular/cli` |

---

## 5. First-Time Setup

> **Order matters.** Both shared libraries must be built before any consuming project runs `npm install`.

### 1. Build the component library

```bash
cd component-library
npm install
npm run build
```

The compiled library is now at `component-library/dist/component-library/`.

### 2. Build the shared state library

```bash
cd ../shared-state-lib
npm install
npm run build
```

The compiled library is now at `shared-state-lib/dist/state-lib/`.

### 3. Install dependencies for each project

Open a separate terminal for each project (or run sequentially):

```bash
# Component library showcase
cd ../component-library-showcase
npm install

# Shell app
cd ../shell-app
npm install

# MFE Dashboard
cd ../mfe-dashboard
npm install

# MFE Settings
cd ../mfe-settings
npm install
```

> If you ever rebuild either shared library, you must re-run `npm install` in every consuming project to pick up the updated build.

---

## 6. Starting & Stopping Each Project

Each project is an independent process. Start them in separate terminal windows/tabs.

### Component Library — build only (no dev server)

```bash
# One-time build
cd component-library
npm run build

# Watch mode — rebuilds automatically on source changes
npm run build:watch
```

To stop watch mode: `Ctrl + C`

### Component Library Showcase

```bash
cd component-library-showcase
npm start          # or: ng serve
```

- Runs at **http://localhost:4300**
- To stop: `Ctrl + C`

### Shell App

```bash
cd shell-app
npm start          # or: ng serve
```

- Runs at **http://localhost:4200**
- To stop: `Ctrl + C`

### MFE Dashboard

```bash
cd mfe-dashboard
npm start          # or: ng serve
```

- Runs at **http://localhost:4201**
- Serves `remoteEntry.json` at `http://localhost:4201/remoteEntry.json`
- To stop: `Ctrl + C`

### MFE Settings

```bash
cd mfe-settings
npm start          # or: ng serve
```

- Runs at **http://localhost:4202**
- Serves `remoteEntry.json` at `http://localhost:4202/remoteEntry.json`
- To stop: `Ctrl + C`

### Running the full MFE stack

To run the complete shell + both MFEs, open **three terminals**:

```bash
# Terminal 1
cd mfe-dashboard && npm start

# Terminal 2
cd mfe-settings && npm start

# Terminal 3
cd shell-app && npm start
```

Then open **http://localhost:4200** in your browser. The shell will load the Dashboard and Settings MFEs on demand when you navigate to those routes.

### Hot-reload development setup (component library changes)

All consuming projects (`component-library-showcase`, `mfe-dashboard`, `mfe-settings`) reference the component library via a `file:` path in their `package.json`. npm resolves `file:` paths as **symlinks** on all platforms:

```
component-library-showcase/node_modules/@shared/component-library  → component-library/dist/
mfe-dashboard/node_modules/@shared/component-library               → component-library/dist/
mfe-settings/node_modules/@shared/component-library                → component-library/dist/
```

Angular's esbuild-based dev server follows symlinks and watches the files behind them. This means:

> **Run `npm run build:watch` in the component library once. All four dev servers hot-reload automatically whenever you save a library source file — no `npm install` needed between changes.**

Open **five terminals** for the full hot-reload stack:

```bash
# Terminal 1 — one watch process feeds ALL consumers simultaneously
cd component-library && npm run build:watch

# Terminal 2
cd component-library-showcase && npm start   # hot-reloads via symlink

# Terminal 3
cd mfe-dashboard && npm start                # hot-reloads via symlink

# Terminal 4
cd mfe-settings && npm start                 # hot-reloads via symlink

# Terminal 5
cd shell-app && npm start                    # loads MFEs at runtime
```

**Flow:** edit `component-library/src/` → ng-packagr rebuilds to `dist/` → all four dev servers detect the changed files through their symlinks → hot-reload in parallel.

**When `npm install` IS still needed** (symlink breaks):
- After deleting `node_modules/` in any consuming project and reinstalling from scratch
- After cloning the repo for the first time (see [Section 5](#5-first-time-setup))

---

## 7. Component Library

**Location:** `component-library/`  
**Package name:** `@shared/component-library`  
**Version:** `1.0.0`  
**Build tool:** `ng-packagr`

### Exported components

| Component | Selector | Description |
|---|---|---|
| `UiButtonComponent` | `<ui-button>` | Bootstrap 5 button with variant and size inputs |
| `UiBadgeComponent` | `<ui-badge>` | Bootstrap 5 badge with label and variant inputs |
| `UiCardComponent` | `<ui-card>` | Bootstrap 5 card with optional title, variant, and shadow |
| `UiAlertComponent` | `<ui-alert>` | Bootstrap 5 alert with type, title, and dismissible inputs |

All components are standalone and exported from `src/public-api.ts`.

### Build commands

```bash
cd component-library

# Production build (one-time)
npm run build

# Watch mode (rebuilds on every save)
npm run build:watch
```

### After rebuilding

If you are running `npm run build:watch` alongside the consuming project's dev server, changes propagate automatically through the npm symlink — **no `npm install` needed**.

`npm install` is only required in a consuming project if:
- You deleted its `node_modules/` and are reinstalling from scratch
- You cloned the repo for the first time

```bash
# Only needed after a fresh clone or node_modules deletion:
cd mfe-dashboard && npm install
```

See [Hot-reload development setup](#hot-reload-development-setup-component-library-changes) in Section 6 for the full workflow.

---

## 8. Component Library Showcase

**Location:** `component-library-showcase/`  
**Purpose:** A standalone Angular application that visually documents every component in the library.  
**Port:** `4300`

### Routes

| Path | Page |
|---|---|
| `/overview` | Introduction and library info |
| `/buttons` | `UiButtonComponent` examples |
| `/badges` | `UiBadgeComponent` examples |
| `/cards` | `UiCardComponent` examples |
| `/alerts` | `UiAlertComponent` examples |

### Start

```bash
cd component-library-showcase
npm start
```

Open **http://localhost:4300**

> The showcase is a **regular Angular app** — it has no federation config and is completely independent of the shell and MFEs.

---

## 9. Shared State Library

**Location:** `shared-state-lib/`  
**Package name:** `@shared/state-lib`  
**Version:** `1.0.0`  
**Build tool:** `ng-packagr`

The shared state library provides a platform-wide, signal-based state store that can be shared across the shell and all MFEs. It follows the exact same structure and federation config pattern as `@shared/component-library`.

### Exported services

| Service | Description |
|---|---|
| `AppStateService` | Signal-based store for user, theme, and notification state |
| `AppState` | Interface — top-level state shape |
| `UserState` | Interface — authenticated user shape |

All exports are available from `src/public-api.ts`.

### AppStateService API

```ts
import { inject } from '@angular/core';
import { AppStateService } from '@shared/state-lib';

const state = inject(AppStateService);

// ── Read (reactive signals) ───────────────────────────────────────────────────
state.state()            // full AppState snapshot
state.user()             // UserState | null
state.theme()            // 'light' | 'dark'
state.notifications()    // number
state.isAuthenticated()  // boolean

// ── Write ─────────────────────────────────────────────────────────────────────
state.setUser({ id: '1', name: 'Alice', email: 'alice@example.com' });
state.setUser(null);                  // sign out
state.setTheme('dark');
state.incrementNotifications();
state.clearNotifications();
state.patchState({ theme: 'dark', notifications: 3 });
```

`AppStateService` is provided in root (`providedIn: 'root'`). When the library is configured as a **singleton** in the federation config, the shell and all MFEs share the exact same service instance — state changes in one MFE are immediately visible in all others.

### Build commands

```bash
cd shared-state-lib

# Install dependencies (first time only)
npm install

# Production build (one-time)
npm run build

# Watch mode (rebuilds on every save)
npm run build:watch
```

The compiled library is output to `shared-state-lib/dist/state-lib/`.

### Consuming projects

| Project | Dependency entry |
|---|---|
| `shell-app` | `"@shared/state-lib": "file:../shared-state-lib/dist/state-lib"` |
| `mfe-dashboard` | `"@shared/state-lib": "file:../shared-state-lib/dist/state-lib"` |
| `mfe-settings` | `"@shared/state-lib": "file:../shared-state-lib/dist/state-lib"` |

### Federation config

`@shared/state-lib` is registered in `federation-config/index.js` alongside `@shared/component-library`:

```js
sharedLibraries: {
  '@shared/component-library': {
    singleton: false,
    strictVersion: false,
    requiredVersion: 'auto',
  },
  '@shared/state-lib': {
    singleton: false,      // ← change to true to share one instance across all MFEs
    strictVersion: false,
    requiredVersion: 'auto',
  },
},
```

> **Singleton mode is especially important for a state library.** When `singleton: false`, each MFE gets its own isolated state store — changes in one MFE are invisible to others. When `singleton: true`, all MFEs and the shell share a single `AppStateService` instance, enabling true cross-MFE state sharing. See [Section 15](#15-singleton-mode--forcing-all-mfes-onto-one-shared-version).

### First-time setup

The state library must be built before any consuming project runs `npm install` (same rule as the component library):

```bash
cd shared-state-lib
npm install
npm run build
```

Then re-run `npm install` in each consuming project:

```bash
cd shell-app && npm install
cd ../mfe-dashboard && npm install
cd ../mfe-settings && npm install
```

---

## 10. Shell App

**Location:** `shell-app/`  
**Port:** `4200`  
**Role:** Native Federation **host** — the entry point users navigate to.

### What it does

- Provides the top-level navigation bar (Home / Dashboard / Settings)
- Reads `public/federation.manifest.json` at startup to discover MFE locations
- Lazy-loads MFE components at runtime using `loadRemoteModule`
- Owns the Angular router — MFE routes are registered here

### Federation manifest

`shell-app/public/federation.manifest.json` tells the shell where to find each remote's entry point:

```json
{
  "mfe-dashboard": "http://localhost:4201/remoteEntry.json",
  "mfe-settings":  "http://localhost:4202/remoteEntry.json"
}
```

To point the shell at deployed MFEs (e.g. in staging/production), update the URLs in this file — **no code changes required**.

### Start

```bash
cd shell-app
npm start
```

Open **http://localhost:4200**

> The MFEs must be running (ports 4201 and 4202) before you navigate to their routes in the shell. The shell itself will start fine without them, but navigating to `/dashboard` or `/settings` will fail if the remotes are offline.

---

## 11. Micro-Frontends

Both MFEs follow the same pattern.

### mfe-dashboard

| Property | Value |
|---|---|
| Location | `mfe-dashboard/` |
| Port | `4201` |
| Remote name | `mfe-dashboard` |
| Exposed as | `./Component` |
| Loaded by shell via | `loadRemoteModule('mfe-dashboard', './Component')` |

### mfe-settings

| Property | Value |
|---|---|
| Location | `mfe-settings/` |
| Port | `4202` |
| Remote name | `mfe-settings` |
| Exposed as | `./Component` |
| Loaded by shell via | `loadRemoteModule('mfe-settings', './Component')` |

### How an MFE exposes itself

Each MFE's `federation.config.js` declares the `exposes` map:

```js
exposes: {
  './Component': './src/app/app.component.ts',
}
```

The key (`'./Component'`) is the public name the shell uses. The value is the source file path. Native Federation compiles this into the `remoteEntry.json` that the shell fetches.

### Start

```bash
# Dashboard
cd mfe-dashboard && npm start

# Settings
cd mfe-settings && npm start
```

Each MFE can also be opened directly in a browser at its own port for standalone development — it runs as a full Angular app independently of the shell.

---

## 12. Centralised Federation Config — @shared/federation-config

### The problem

Each MFE lives in its own repository. Every `federation.config.js` contains the same shared library settings (`singleton`, `strictVersion`, `requiredVersion`). When you need to change those settings — for example to enforce a new version of `@shared/component-library` across all teams — you must open a pull request in **every single MFE repo**. That is N repos × 1 PR each, all for an identical one-line change.

### The solution

`@shared/federation-config` is a **standalone npm package** (its own git repo, published to your private registry) that exports the shared library config. Every MFE installs it and spreads it into `federation.config.js`. To update shared library settings across all MFEs, you change **one file**, publish one new version, and CI/CD handles the rest — **zero PRs in MFE repos**.

```
┌──────────────────────────────────────────────────────────────┐
│         @shared/federation-config  (own repo + registry)     │
│                       index.js                               │
│  sharedLibraries: { '@shared/component-library': { ... } }   │
└──────────────────────────┬───────────────────────────────────┘
                           │  published to private registry
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
       shell-app     mfe-dashboard  mfe-settings
   (separate repo) (separate repo) (separate repo)
   "latest"         "latest"        "latest"
        │                │               │
        └────────────────┴───────────────┘
        npm install → picks up latest → new config applied
        No PR needed in any MFE repo
```

### How each MFE uses it

Each `federation.config.js` now looks like this:

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const { sharedLibraries } = require('@shared/federation-config');

module.exports = withNativeFederation({
  name: 'mfe-dashboard',
  exposes: { './Component': './src/app/app.component.ts' },

  shared: {
    // Angular core — always singleton, managed per-repo (not centralised)
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

    // ── Central shared library config ────────────────────────────────────────
    // All settings come from @shared/federation-config.
    // Change that package → publish → all MFEs pick it up on next npm install.
    ...sharedLibraries,

    // ── Per-MFE override (optional) ──────────────────────────────────────────
    // Uncomment to override a specific library for THIS MFE only.
    // This entry wins because it comes AFTER the ...sharedLibraries spread.
    // '@shared/component-library': { singleton: false, strictVersion: false, requiredVersion: '1.2.0' },
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
  features: { ignoreUnusedDeps: true }
});
```

### The one file you ever change

`federation-config/index.js` (in the `@shared/federation-config` repo):

```js
module.exports = {
  sharedLibraries: {
    '@shared/component-library': {
      singleton: false,      // ← change this to true to enforce singleton across all MFEs
      strictVersion: false,
      requiredVersion: 'auto',
    },
    // Add more shared libraries here as your platform grows:
    // '@shared/state-library': { singleton: false, strictVersion: false, requiredVersion: 'auto' },
  },
};
```

### Workflow — updating all MFEs at once

```
1. Edit federation-config/index.js
   └─ e.g. change singleton: false → true

2. Bump version in federation-config/package.json
   └─ e.g. 1.0.0 → 1.1.0

3. Publish to private registry
   └─ npm publish --registry https://your-registry.example.com

4. Done — no PRs needed in any MFE repo.
   Each MFE's CI/CD pipeline runs `npm install` on next build,
   fetches `latest`, and the new config is applied automatically.
```

### Per-MFE independence is preserved

MFEs remain fully independent. Any MFE can override a specific library by adding an entry **after** the `...sharedLibraries` spread in its own `federation.config.js`. The local entry wins because JavaScript object spread is last-write-wins:

```js
shared: {
  ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  ...sharedLibraries,                    // central defaults from the package
  '@shared/component-library': {         // this MFE's local override
    singleton: false,
    strictVersion: false,
    requiredVersion: '1.2.0',            // pinned to a specific version
  },
}
```

### Installing the package

#### Production — private registry

```bash
# Add to .npmrc in each MFE repo:
@shared:registry=https://your-private-registry.example.com

# Install:
npm install --save-dev @shared/federation-config@latest
```

#### Local development — file path (this demo)

```bash
npm install --save-dev file:../federation-config
```

#### Registry options

| Registry | Best for | Notes |
|---|---|---|
| [Verdaccio](https://verdaccio.org/) | Self-hosted / local | `npx verdaccio` to start |
| [GitHub Packages](https://docs.github.com/en/packages) | GitHub orgs | Requires PAT in `.npmrc` |
| [Azure Artifacts](https://azure.microsoft.com/en-us/products/devops/artifacts) | Azure DevOps | Feed URL + PAT |
| npm private | Public npm with private packages | `npm login` |

### Why you cannot avoid this package for separate repos

The federation protocol is a **build-time contract**. Each repo must declare its own sharing config when it is compiled — there is no runtime injection mechanism. The `@shared/federation-config` package is the only way to centralise that config across separate repos while keeping each repo independently deployable.

---

## 13. Development Workflow

### Adding a new component to the library

1. Create the component in `component-library/src/lib/<name>/`
2. Export it from `component-library/src/public-api.ts`
3. Rebuild the library:
   ```bash
   cd component-library && npm run build
   ```
4. Re-install in any project that needs the new component:
   ```bash
   cd mfe-dashboard && npm install
   ```
5. Import and use the component in the MFE/showcase.

### Adding a new MFE

1. Create a new Angular app with Native Federation:
   ```bash
   ng new mfe-newfeature
   cd mfe-newfeature
   ng add @angular-architects/native-federation --type remote --port 4203
   ```
2. Add `@shared/component-library` to its `package.json` dependencies:
   ```json
   "@shared/component-library": "file:../component-library/dist/component-library"
   ```
3. Run `npm install` in the new MFE.
4. Configure `federation.config.js` to expose the root component.
5. Register the new MFE in `shell-app/public/federation.manifest.json`:
   ```json
   "mfe-newfeature": "http://localhost:4203/remoteEntry.json"
   ```
6. Add a route in `shell-app/src/app/app.routes.ts`:
   ```ts
   {
     path: 'newfeature',
     loadComponent: () =>
       loadRemoteModule('mfe-newfeature', './Component').then(m => m.AppComponent)
   }
   ```

### Updating the component library version

1. Update the `version` field in `component-library/package.json`
2. Rebuild: `npm run build`
3. Re-install in all consuming projects: `npm install`
4. If using singleton mode, ensure all `requiredVersion` values are consistent (or leave as `'auto'`)

---

## 14. Port Reference

| Project | Port | URL |
|---|---|---|
| `shell-app` | 4200 | http://localhost:4200 |
| `component-library-showcase` | 4300 | http://localhost:4300 |
| `mfe-dashboard` | 4201 | http://localhost:4201 |
| `mfe-settings` | 4202 | http://localhost:4202 |
| `mfe-dashboard` remoteEntry | 4201 | http://localhost:4201/remoteEntry.json |
| `mfe-settings` remoteEntry | 4202 | http://localhost:4202/remoteEntry.json |

---

## 15. Singleton Mode — Forcing All MFEs onto One Shared Version

By default, `@shared/federation-config` sets `singleton: false` — each MFE bundles its own independent copy of every shared library. This is the safe default: different MFEs can run different versions without conflict.

When you want all MFEs and the shell to share **a single instance** of a library (e.g. to reduce bundle size or enforce a consistent version), switch to singleton mode via `@shared/federation-config`.

### How to enable singleton mode (the centralised way)

Edit `federation-config/index.js` — the **one file** that controls all MFEs:

```js
// federation-config/index.js
module.exports = {
  sharedLibraries: {
    '@shared/component-library': {
      singleton: true,       // ← was false
      strictVersion: true,   // ← was false — throws if version mismatch
      requiredVersion: 'auto',
    },
  },
};
```

Then publish and let CI/CD propagate (see [Section 11](#11-centralised-federation-config--sharedfederation-config)).

### How singleton resolution works at runtime

When `singleton: true`, the Native Federation runtime negotiates which version to use at load time:

1. The shell and each MFE each declare the version they were built with (`requiredVersion: 'auto'` reads from their own `package.json`).
2. The federation runtime picks the **highest compatible version** and loads it once.
3. All other remotes reuse that single loaded instance.

With `strictVersion: true`, if a remote requires a version **incompatible** with the negotiated singleton, the runtime throws at load time rather than silently loading a mismatched version.

### Ensuring all MFEs are on the same version

For singleton mode to work cleanly, all MFEs must have the same version of the library installed. Update `package.json` in each MFE repo to reference the same version, then run `npm install`.

```bash
# In each MFE repo — update to the same version
npm install @shared/component-library@1.2.0

# Restart all servers after reinstalling
```

### Reverting to independent versions

To go back to each MFE using its own copy, update `federation-config/index.js`:

```js
'@shared/component-library': {
  singleton: false,
  strictVersion: false,
  requiredVersion: 'auto',
},
```

Publish the new version — all MFEs revert on next `npm install` in CI/CD.

### Comparison

| Mode | `singleton` | Bundle size | Version flexibility | Use when |
|---|---|---|---|---|
| Independent (default) | `false` | Larger (each MFE bundles its own copy) | Each MFE can use a different version | Teams upgrade independently |
| Singleton | `true` | Smaller (one shared copy) | All MFEs must use the same version | Enforcing a platform-wide version |

