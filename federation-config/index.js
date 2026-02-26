/**
 * @shared/federation-config  v1.0.0
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * THE ONE FILE YOU EVER NEED TO CHANGE.
 *
 * This package lives in its own git repository and is published to your private
 * npm registry (Verdaccio / GitHub Packages / Azure Artifacts / npm private).
 *
 * Every MFE installs it as:
 *   "@shared/federation-config": "latest"
 *
 * Workflow to update ALL MFEs at once (zero PRs in MFE repos):
 *   1. Edit sharedLibraries below
 *   2. Bump the version in package.json
 *   3. npm publish  →  registry receives new version
 *   4. Each MFE's CI/CD runs `npm install`  →  picks up `latest`  →  done
 *
 * MFEs can still override individual entries locally if they need a different
 * version or singleton setting (see federation.config.js in each MFE).
 * ─────────────────────────────────────────────────────────────────────────────
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SINGLETON MODE QUICK REFERENCE                                         │
 * │                                                                         │
 * │  singleton: false  (default)                                            │
 * │    • Each MFE loads its own copy of the library                         │
 * │    • Different MFEs can use different versions                          │
 * │    • State is ISOLATED — AppStateService instances are independent      │
 * │    • Live proof: Dashboard and Settings show DIFFERENT instanceId       │
 * │                                                                         │
 * │  singleton: true                                                        │
 * │    • All MFEs share ONE loaded copy of the library                      │
 * │    • All MFEs MUST use the same version (strictVersion enforces this)   │
 * │    • State is SHARED — one AppStateService instance for the platform    │
 * │    • Live proof: Dashboard and Settings show the SAME instanceId        │
 * │                                                                         │
 * │  To switch ALL MFEs to singleton in one step:                           │
 * │    1. Change singleton: false → true below                              │
 * │    2. Change strictVersion: false → true below                          │
 * │    3. Rebuild shared-state-lib, then rebuild all MFEs                   │
 * │    See docs/shared-library-versioning.md for the full guide.            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * singleton: false  →  each MFE bundles its own copy (independent versions OK)
 * singleton: true   →  all MFEs share ONE instance (all must be same version)
 * strictVersion     →  throw if version mismatch when singleton: true
 * requiredVersion   →  'auto' reads from the MFE's own package.json
 */

module.exports = {
  /**
   * Shared library federation settings.
   *
   * Spread this into the `shared` block of every federation.config.js AFTER
   * the shareAll() call so these entries take precedence over the defaults.
   *
   * Example in federation.config.js:
   *
   *   const { sharedLibraries } = require('@shared/federation-config');
   *
   *   shared: {
   *     ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
   *     ...sharedLibraries,   // ← central overrides applied here
   *   }
   */
  sharedLibraries: {

    // ── Component Library ────────────────────────────────────────────────────
    //
    // CURRENT:  singleton: false
    //   → Each MFE loads its own copy. MFEs can use different versions.
    //   → UI components are independent per MFE (safe for gradual upgrades).
    //
    // TO FORCE ONE VERSION:  set singleton: true, strictVersion: true
    //   → All MFEs must have the same version in their package.json.
    //   → Runtime throws if versions differ (prevents silent mismatches).
    //
    '@shared/component-library': {
      singleton: false,         // ← change to true to force one version
      strictVersion: false,     // ← change to true to throw on mismatch
      requiredVersion: 'auto',
    },

    // ── State Library ────────────────────────────────────────────────────────
    //
    // CURRENT:  singleton: false
    //   → Each MFE has its own AppStateService instance (isolated state).
    //   → AppStateService.instanceId will be DIFFERENT across MFEs.
    //   → Notification counts, user state etc. are NOT shared between MFEs.
    //
    // TO SHARE STATE ACROSS ALL MFEs:  set singleton: true, strictVersion: true
    //   → One AppStateService instance for the entire platform.
    //   → AppStateService.instanceId will be the SAME across all MFEs.
    //   → Incrementing notifications in Dashboard updates count in Settings too.
    //
    '@shared/state-lib': {
      singleton: false,         // ← change to true to share state across MFEs
      strictVersion: false,     // ← change to true to throw on mismatch
      requiredVersion: 'auto',
    },

    // ── Any other shared library ─────────────────────────────────────────────
    // 'some-other-library': {
    //   singleton: false,
    //   strictVersion: false,
    //   requiredVersion: 'auto',
    // },
  },
};
