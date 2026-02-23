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
9. [Shell App](#9-shell-app)
10. [Micro-Frontends](#10-micro-frontends)
11. [Overriding MFEs with One Shared Version of the Component Library](#11-overriding-mfes-with-one-shared-version-of-the-component-library)
12. [Development Workflow](#12-development-workflow)
13. [Port Reference](#13-port-reference)

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

> **Order matters.** The component library must be built before any consuming project runs `npm install`.

### 1. Build the component library

```bash
cd component-library
npm install
npm run build
```

The compiled library is now at `component-library/dist/component-library/`.

### 2. Install dependencies for each project

Open a separate terminal for each project (or run sequentially):

```bash
# Component library showcase
cd component-library-showcase
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

> If you ever rebuild the component library (e.g. after adding a new component), you must re-run `npm install` in every consuming project to pick up the updated build.

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

If you change the library source and rebuild, consuming projects need to re-install to pick up the new build:

```bash
# In each consuming project directory:
npm install
```

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

## 9. Shell App

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

## 10. Micro-Frontends

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

## 11. Overriding MFEs with One Shared Version of the Component Library

By default, each MFE bundles its **own independent copy** of `@shared/component-library` (`singleton: false`). This is intentional — it lets different MFEs run different versions without conflict.

However, you may want all MFEs and the shell to share **a single instance** of the component library (e.g. to reduce bundle size, or to enforce a consistent version across the entire application). This is done by switching the library to **singleton mode**.

### What changes

You need to update `federation.config.js` in **three places**:

1. `shell-app/federation.config.js`
2. `mfe-dashboard/federation.config.js`
3. `mfe-settings/federation.config.js`

### The change

In each of the three files, find the `@shared/component-library` entry and change:

```js
// BEFORE — each MFE uses its own copy
'@shared/component-library': {
  singleton: false,
  strictVersion: false,
  requiredVersion: 'auto'
}
```

```js
// AFTER — all MFEs share one instance (negotiated by the federation runtime)
'@shared/component-library': {
  singleton: true,
  strictVersion: true,
  requiredVersion: 'auto'
}
```

### How singleton resolution works

When `singleton: true`, the Native Federation runtime negotiates which version to use at load time:

1. The shell and each MFE each declare the version of `@shared/component-library` they were built with (via `requiredVersion: 'auto'`, which reads from `package.json`).
2. The federation runtime picks the **highest compatible version** and loads it once.
3. All other remotes reuse that single loaded instance instead of loading their own copy.

With `strictVersion: true`, if a remote requires a version that is **incompatible** with the negotiated singleton version, the federation runtime will throw an error at load time rather than silently loading a mismatched version.

### Ensuring all projects use the same version

For singleton mode to work cleanly, all projects should reference the same built version of the library. Since all projects currently use a `file:` path reference, they all point to the same `dist/` folder — so they are always in sync as long as you rebuild the library before restarting the apps.

```bash
# 1. Rebuild the library
cd component-library && npm run build

# 2. Re-install in each consuming project (picks up the new build)
cd ../mfe-dashboard && npm install
cd ../mfe-settings && npm install
cd ../shell-app && npm install

# 3. Restart all three servers
```

### Reverting to independent versions

To go back to each MFE using its own copy, set `singleton: false` and `strictVersion: false` in all three `federation.config.js` files.

---

## 12. Development Workflow

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

## 13. Port Reference

| Project | Port | URL |
|---|---|---|
| `shell-app` | 4200 | http://localhost:4200 |
| `component-library-showcase` | 4300 | http://localhost:4300 |
| `mfe-dashboard` | 4201 | http://localhost:4201 |
| `mfe-settings` | 4202 | http://localhost:4202 |
| `mfe-dashboard` remoteEntry | 4201 | http://localhost:4201/remoteEntry.json |
| `mfe-settings` remoteEntry | 4202 | http://localhost:4202/remoteEntry.json |

