import { bootstrapApplication } from '@angular/platform-browser';
import { registerLicense } from '@syncfusion/ej2-base';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// ── Syncfusion License ────────────────────────────────────────────────────────
// Register your Syncfusion license key before the application bootstraps.
// Obtain a free community license at:
//   https://www.syncfusion.com/products/communitylicense
// For production, store this key in an environment variable and reference it via
//   environment.syncfusionLicenseKey (see src/environments/environment.ts).
// ─────────────────────────────────────────────────────────────────────────────
registerLicense('YOUR-SYNCFUSION-LICENSE-KEY-HERE');

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
