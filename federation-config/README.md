# @shared/federation-config

> **The single source of truth for Native Federation sharing config across all MFEs.**

This package lives in its own git repository and is published to your private npm registry. Every MFE installs it and spreads its config into `federation.config.js`. To update shared library settings across **all** MFEs, you change **one file** here, publish, and CI/CD handles the rest.

---

## How it works

```
┌──────────────────────────────────────────────────────────────────┐
│              @shared/federation-config  (this repo)              │
│                           index.js                               │
│   sharedLibraries: {                                             │
│     '@shared/component-library': {...},                          │
│     '@shared/state-lib':         {...},                          │
│   }                                                              │
└──────────────────────────┬───────────────────────────────────────┘
                           │  published to private registry
              ┌────────────┼────────────┐
              │            │            │
              ▼            ▼            ▼
       shell-app     mfe-dashboard  mfe-settings
   (separate repo) (separate repo) (separate repo)
   "latest"         "latest"        "latest"
```

Each MFE's CI/CD runs `npm install` → gets `latest` → new config applied automatically.

---

## Installation (in each MFE repo)

### Private registry (production)

```bash
# .npmrc in each MFE repo
@shared:registry=https://your-private-registry.example.com

# package.json devDependencies
npm install --save-dev @shared/federation-config@latest
```

### Local Verdaccio (development)

```bash
# Start Verdaccio
npx verdaccio

# Publish this package
npm publish --registry http://localhost:4873

# Install in each MFE
npm install --save-dev @shared/federation-config@latest --registry http://localhost:4873
```

### File path (monorepo / local demo only)

```bash
npm install --save-dev file:../federation-config
```

---

## Usage in `federation.config.js`

```js
const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const { sharedLibraries } = require('@shared/federation-config');

module.exports = withNativeFederation({
  name: 'mfe-dashboard',

  exposes: {
    './Component': './src/app/app.component.ts',
  },

  shared: {
    // Angular core — always singleton, managed per-MFE
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),

    // Custom shared libraries — settings come from @shared/federation-config
    ...sharedLibraries,

    // ── Optional: override a specific library for THIS MFE only ──────────────
    // Uncomment to pin this MFE to a specific version regardless of central config:
    // '@shared/component-library': { singleton: false, strictVersion: false, requiredVersion: '1.2.0' },
  },

  skip: ['rxjs/ajax', 'rxjs/fetch', 'rxjs/testing', 'rxjs/webSocket'],
  features: { ignoreUnusedDeps: true }
});
```

---

## Updating shared library settings (the whole point)

### To change singleton mode or versions across ALL MFEs:

1. **Edit `index.js`** in this repo — change `singleton`, `strictVersion`, `requiredVersion`, or add/remove libraries
2. **Bump the version** in `package.json` (semver)
3. **Publish:**
   ```bash
   npm publish --registry https://your-private-registry.example.com
   ```
4. **Done.** Each MFE's CI/CD pipeline runs `npm install` on next build → picks up `latest` → new config applied

**Zero PRs needed in any MFE repo.**

---

## Per-MFE overrides

MFEs remain fully independent. Any MFE can override a specific library by adding an entry **after** the `...sharedLibraries` spread:

```js
shared: {
  ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  ...sharedLibraries,                    // central defaults
  '@shared/component-library': {         // override component library for THIS MFE only
    singleton: false,
    strictVersion: false,
    requiredVersion: '1.2.0',            // pin to specific version
  },
  '@shared/state-lib': {                 // override state library for THIS MFE only
    singleton: true,
    strictVersion: true,
    requiredVersion: 'auto',
  },
}
```

The local entry wins because it comes after the spread.

---

## Registry options

| Registry | Best for | Setup |
|---|---|---|
| [Verdaccio](https://verdaccio.org/) | Local / self-hosted | `npx verdaccio` |
| [GitHub Packages](https://docs.github.com/en/packages) | GitHub orgs | `.npmrc` + PAT |
| [Azure Artifacts](https://azure.microsoft.com/en-us/products/devops/artifacts) | Azure DevOps | Feed URL + PAT |
| [npm private](https://www.npmjs.com/products/teams) | Public npm with private packages | `npm login` |

---

## Version history

| Version | Change |
|---|---|
| 1.1.0 | Added `@shared/state-lib` — singleton: false |
| 1.0.0 | Initial release — `@shared/component-library` singleton: false |
