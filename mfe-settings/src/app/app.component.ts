import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  UiButtonComponent,
  UiBadgeComponent,
  UiCardComponent,
  UiAlertComponent
} from '@shared/component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, UiButtonComponent, UiBadgeComponent, UiCardComponent, UiAlertComponent],
  template: `
    <div class="container-fluid py-3">

      <!-- Header -->
      <div class="d-flex align-items-center gap-2 mb-4">
        <h2 class="mb-0">
          <i class="bi bi-gear-fill me-2 text-success"></i>Settings
        </h2>
        <ui-badge label="MFE" variant="success"></ui-badge>
        <ui-badge label="Repo: mfe-settings" variant="secondary"></ui-badge>
        <ui-badge label="Port: 4202" variant="info"></ui-badge>
      </div>

      <!-- Settings Sections using UiCard + UiButton -->
      <div class="row g-4 mb-4">
        <div class="col-md-6">
          <ui-card title="User Preferences" variant="success" shadow="sm">
            <div class="mb-3">
              <label class="form-label fw-semibold">Display Name</label>
              <input type="text" class="form-control" value="John Developer" />
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Theme</label>
              <select class="form-select">
                <option selected>Light</option>
                <option>Dark</option>
                <option>System Default</option>
              </select>
            </div>
            <div class="mb-3">
              <label class="form-label fw-semibold">Language</label>
              <select class="form-select">
                <option selected>English (US)</option>
                <option>English (UK)</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>
            <ui-button variant="success">
              <i class="bi bi-check-lg me-1"></i>Save Preferences
            </ui-button>
          </ui-card>
        </div>

        <div class="col-md-6">
          <ui-card title="Notifications" variant="success" shadow="sm">
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" checked />
              <label class="form-check-label">Email Notifications</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" checked />
              <label class="form-check-label">Push Notifications</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" />
              <label class="form-check-label">SMS Alerts</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" checked />
              <label class="form-check-label">Deployment Alerts</label>
            </div>
            <div class="form-check form-switch mb-3">
              <input class="form-check-input" type="checkbox" />
              <label class="form-check-label">Weekly Digest</label>
            </div>
            <ui-button variant="success">
              <i class="bi bi-check-lg me-1"></i>Save Notifications
            </ui-button>
          </ui-card>
        </div>
      </div>

      <!-- Danger Zone using UiCard + UiAlert + UiButton -->
      <div class="mb-4">
        <ui-card title="Danger Zone" variant="danger" shadow="sm">
          <ui-alert type="warning" title="Caution" [dismissible]="false">
            These actions are irreversible. Please proceed with care.
          </ui-alert>
          <div class="d-flex flex-wrap gap-2 mt-3">
            <ui-button variant="outline-danger" size="sm">
              <i class="bi bi-trash me-1"></i>Clear Cache
            </ui-button>
            <ui-button variant="outline-danger" size="sm">
              <i class="bi bi-arrow-counterclockwise me-1"></i>Reset to Defaults
            </ui-button>
          </div>
        </ui-card>
      </div>

      <!-- Federation Info using UiCard + UiAlert -->
      <ui-card title="Federation Info — This MFE" variant="success" shadow="sm">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <div class="p-3 bg-light rounded">
              <p class="text-muted small mb-1">Remote Name</p>
              <code class="fs-6">mfe-settings</code>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-light rounded">
              <p class="text-muted small mb-1">Exposed As</p>
              <code class="fs-6">./Component</code>
            </div>
          </div>
          <div class="col-md-4">
            <div class="p-3 bg-light rounded">
              <p class="text-muted small mb-1">Loaded By Shell Via</p>
              <code class="fs-6">loadRemoteModule('mfe-settings', './Component')</code>
            </div>
          </div>
        </div>
        <ui-alert type="success" title="Loaded from separate repository">
          This component was loaded at runtime. The shell did not need to be redeployed to include this MFE.
          Components rendered using <strong>&#64;shared/component-library v1.0.0</strong>.
        </ui-alert>
      </ui-card>

      <router-outlet />
    </div>
  `
})
export class AppComponent {}
