const { withNativeFederation, shareAll } = require('@angular-architects/native-federation/config');

module.exports = withNativeFederation({
  name: 'mfe-dashboard',

  exposes: {
    // This is what the shell loads via loadRemoteModule('mfe-dashboard', './Component')
    './Component': './src/app/app.component.ts',
  },

  shared: {
    // Angular MUST be singleton - same instance as shell
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    }),

    // Custom libraries - singleton: false means this MFE uses its OWN version
    // independently from the shell or other MFEs
    '@shared/component-library': { singleton: false, strictVersion: false, requiredVersion: 'auto' },
    // 'state-library':     { singleton: false, strictVersion: false, requiredVersion: 'auto' },
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
