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
    // singleton: false  →  each MFE uses its own installed version independently
    // Change to true + strictVersion: true to force all MFEs onto one version
    '@shared/component-library': {
      singleton: false,
      strictVersion: false,
      requiredVersion: 'auto',
    },

    // ── State Library (example — uncomment when added) ───────────────────────
    // '@shared/state-library': {
    //   singleton: false,
    //   strictVersion: false,
    //   requiredVersion: 'auto',
    // },

    // ── Any other shared library ─────────────────────────────────────────────
    // 'some-other-library': {
    //   singleton: false,
    //   strictVersion: false,
    //   requiredVersion: 'auto',
    // },
  },
};
