const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');
const { sharedLibraries } = require('@shared/federation-config');

module.exports = withNativeFederation({
  name: 'mfe-settings',

  exposes: {
    // This is what the shell loads via loadRemoteModule('mfe-settings', './Component')
    './Component': './src/app/app.component.ts',
  },

  shared: {
    // Angular core MUST be singleton — same instance as shell.
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

    // ── Per-MFE overrides (optional) ─────────────────────────────────────────
    // Uncomment to override a specific library for THIS MFE only.
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
