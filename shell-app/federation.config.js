const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'shell-app',

  shared: {
    // Angular core packages MUST be singleton - same version across all MFEs
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }),

    // Custom shared libraries - singleton: false allows each MFE to use its own version
    '@shared/component-library': { singleton: false, strictVersion: false, requiredVersion: 'auto' },
    // 'state-library':     { singleton: false, strictVersion: false, requiredVersion: 'auto' },
    // 'shared-ui-library': { singleton: false, strictVersion: false, requiredVersion: 'auto' },
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
