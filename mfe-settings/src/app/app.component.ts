import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppStateService } from '@shared/state-lib';
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

      <!-- ── Shared Library Version Demo ──────────────────────────────────── -->
      <div class="card border-success mb-4">
        <div class="card-header bg-success text-white d-flex align-items-center gap-2">
          <i class="bi bi-diagram-3-fill"></i>
          <strong>Shared Library Demo — Singleton vs Non-Singleton</strong>
        </div>
        <div class="card-body">

          <!-- Library versions row -->
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="p-3 rounded border">
                <p class="text-muted small mb-1 fw-semibold text-uppercase" style="font-size:.7rem;letter-spacing:.06em">
                  @shared/state-lib
                </p>
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="badge bg-success">v{{ stateService.libVersion }}</span>
                  <code class="small text-muted">singleton: {{ currentSingletonMode }}</code>
                </div>
                <p class="text-muted small mb-0">
                  Installed via <code>package.json</code> — each MFE can pin a different version.
                </p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded border">
                <p class="text-muted small mb-1 fw-semibold text-uppercase" style="font-size:.7rem;letter-spacing:.06em">
                  @shared/component-library
                </p>
                <div class="d-flex align-items-center gap-2 mb-1">
                  <span class="badge bg-secondary">v1.0.0</span>
                  <code class="small text-muted">singleton: {{ currentSingletonMode }}</code>
                </div>
                <p class="text-muted small mb-0">
                  UI components — can differ per MFE when non-singleton.
                </p>
              </div>
            </div>
          </div>

          <!-- Instance ID — the live proof -->
          <div class="p-3 rounded mb-3" style="background:#f0fff4;border:2px solid #198754">
            <div class="d-flex align-items-start gap-3">
              <div class="flex-grow-1">
                <p class="fw-bold mb-1" style="color:#198754">
                  <i class="bi bi-fingerprint me-1"></i>AppStateService Instance ID
                </p>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="font-monospace fs-4 fw-bold" style="color:#198754;letter-spacing:.15em">
                    {{ stateService.instanceId }}
                  </span>
                  <span class="badge bg-success">Settings MFE</span>
                </div>
                <p class="text-muted small mb-0">
                  Compare this ID with the Dashboard MFE:
                  <strong>same ID = singleton (shared instance)</strong>,
                  <strong>different ID = non-singleton (isolated instance)</strong>.
                </p>
              </div>
            </div>
          </div>

          <!-- Notification counter — live state proof -->
          <div class="row g-3 mb-3">
            <div class="col-md-6">
              <div class="p-3 rounded border">
                <p class="text-muted small mb-1 fw-semibold text-uppercase" style="font-size:.7rem;letter-spacing:.06em">
                  Notification Count (this instance)
                </p>
                <div class="d-flex align-items-center gap-3">
                  <span class="display-6 fw-bold">{{ stateService.notifications() }}</span>
                  <div class="d-flex flex-column gap-1">
                    <button class="btn btn-success btn-sm" (click)="stateService.incrementNotifications()">
                      <i class="bi bi-plus-lg me-1"></i>Increment
                    </button>
                    <button class="btn btn-outline-secondary btn-sm" (click)="stateService.clearNotifications()">
                      <i class="bi bi-x-lg me-1"></i>Reset
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="p-3 rounded border h-100">
                <p class="text-muted small mb-1 fw-semibold text-uppercase" style="font-size:.7rem;letter-spacing:.06em">
                  What to observe
                </p>
                <ul class="small mb-0">
                  <li class="mb-1">
                    <strong>singleton: false</strong> — increment in Dashboard MFE, come here.
                    Count stays at 0. <em>Isolated instances.</em>
                  </li>
                  <li>
                    <strong>singleton: true</strong> — increment in Dashboard MFE, come here.
                    Count matches. <em>Shared instance.</em>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- How to switch -->
          <div class="alert alert-warning mb-0 d-flex align-items-start gap-2">
            <i class="bi bi-gear-fill mt-1"></i>
            <div>
              <strong>To force singleton mode:</strong> open
              <code>federation-config/index.js</code> and set
              <code>singleton: true, strictVersion: true</code> for both libraries,
              then rebuild all MFEs. See <code>docs/shared-library-versioning.md</code> for full instructions.
            </div>
          </div>
        </div>
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
export class AppComponent {
  readonly stateService = inject(AppStateService);

  /** Reflects the current federation-config setting for display purposes. */
  readonly currentSingletonMode = 'false';
}
