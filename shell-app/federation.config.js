const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const { sharedLibraries } = require('@shared/federation-config');

module.exports = withNativeFederation({
  name: 'shell-app',

  shared: {
    // Angular core packages MUST be singleton — same version across all MFEs.
    // This is managed per-repo and is NOT centralised (Angular version is each
    // team's own responsibility).
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }),

    // ── Central shared library config ────────────────────────────────────────
    // Sourced from @shared/federation-config (separate repo + private registry).
    // To change singleton mode or versions for ALL MFEs, update that package
    // and publish — no PR needed here.
    ...sharedLibraries,

    // ── Per-app overrides (optional) ─────────────────────────────────────────
    // Uncomment to override a specific library for THIS app only.
    // The local entry wins because it comes after the ...sharedLibraries spread.
    // '@shared/component-library': { singleton: false, strictVersion: false, requiredVersion: '1.2.0' },
  },

  skip: [
    'rxjs/ajax',
    'rxjs/fetch',
    'rxjs/testing',
    'rxjs/webSocket',
  ],

  features: {
    ignoreUnusedDeps: true
  }
});
