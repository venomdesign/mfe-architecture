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
          <i class="bi bi-speedometer2 me-2 text-primary"></i>Dashboard
        </h2>
        <ui-badge label="MFE" variant="primary"></ui-badge>
        <ui-badge label="Repo: mfe-dashboard" variant="secondary"></ui-badge>
        <ui-badge label="Port: 4201" variant="info"></ui-badge>
      </div>

      <!-- ── Shared Library Version Demo ──────────────────────────────────── -->
      <div class="card border-primary mb-4">
        <div class="card-header bg-primary text-white d-flex align-items-center gap-2">
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
                  <span class="badge bg-primary">v{{ stateService.libVersion }}</span>
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
          <div class="p-3 rounded mb-3" style="background:#f0f7ff;border:2px solid #005288">
            <div class="d-flex align-items-start gap-3">
              <div class="flex-grow-1">
                <p class="fw-bold mb-1" style="color:#005288">
                  <i class="bi bi-fingerprint me-1"></i>AppStateService Instance ID
                </p>
                <div class="d-flex align-items-center gap-2 mb-2">
                  <span class="font-monospace fs-4 fw-bold" style="color:#005288;letter-spacing:.15em">
                    {{ stateService.instanceId }}
                  </span>
                  <span class="badge bg-primary">Dashboard MFE</span>
                </div>
                <p class="text-muted small mb-0">
                  This ID is generated <strong>once</strong> when the service is constructed.
                  Compare it with the Settings MFE:
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
                    <button class="btn btn-primary btn-sm" (click)="stateService.incrementNotifications()">
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
                    <strong>singleton: false</strong> — increment here, navigate to Settings MFE.
                    Count stays at 0 there. <em>Isolated instances.</em>
                  </li>
                  <li>
                    <strong>singleton: true</strong> — increment here, navigate to Settings MFE.
                    Count is the same. <em>Shared instance.</em>
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

      <!-- Stat Cards using UiCard -->
      <div class="row g-4 mb-4">
        <div class="col-sm-6 col-xl-3">
          <ui-card shadow="sm">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <p class="text-muted small mb-1">Total Users</p>
                <h3 class="fw-bold mb-0">12,483</h3>
                <small class="text-success"><i class="bi bi-arrow-up"></i> 8.2% this month</small>
              </div>
              <div class="bg-primary bg-opacity-10 rounded p-2">
                <i class="bi bi-people-fill text-primary fs-4"></i>
              </div>
            </div>
          </ui-card>
        </div>

        <div class="col-sm-6 col-xl-3">
          <ui-card shadow="sm">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <p class="text-muted small mb-1">Revenue</p>
                <h3 class="fw-bold mb-0">$84,320</h3>
                <small class="text-success"><i class="bi bi-arrow-up"></i> 12.5% this month</small>
              </div>
              <div class="bg-success bg-opacity-10 rounded p-2">
                <i class="bi bi-currency-dollar text-success fs-4"></i>
              </div>
            </div>
          </ui-card>
        </div>

        <div class="col-sm-6 col-xl-3">
          <ui-card shadow="sm">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <p class="text-muted small mb-1">Active Sessions</p>
                <h3 class="fw-bold mb-0">1,247</h3>
                <small class="text-warning"><i class="bi bi-dash"></i> 0.3% this hour</small>
              </div>
              <div class="bg-warning bg-opacity-10 rounded p-2">
                <i class="bi bi-activity text-warning fs-4"></i>
              </div>
            </div>
          </ui-card>
        </div>

        <div class="col-sm-6 col-xl-3">
          <ui-card shadow="sm">
            <div class="d-flex justify-content-between align-items-start">
              <div>
                <p class="text-muted small mb-1">Deployments</p>
                <h3 class="fw-bold mb-0">38</h3>
                <small class="text-success"><i class="bi bi-arrow-up"></i> 4 today</small>
              </div>
              <div class="bg-info bg-opacity-10 rounded p-2">
                <i class="bi bi-rocket-takeoff text-info fs-4"></i>
              </div>
            </div>
          </ui-card>
        </div>
      </div>

      <!-- Quick Actions using UiButton -->
      <div class="mb-4">
        <ui-card title="Quick Actions" shadow="sm">
          <div class="d-flex flex-wrap gap-2">
            <ui-button variant="primary" size="sm">
              <i class="bi bi-plus-circle me-1"></i>New Report
            </ui-button>
            <ui-button variant="outline-success" size="sm">
              <i class="bi bi-download me-1"></i>Export Data
            </ui-button>
            <ui-button variant="outline-warning" size="sm">
              <i class="bi bi-arrow-clockwise me-1"></i>Refresh
            </ui-button>
            <ui-button variant="outline-secondary" size="sm">
              <i class="bi bi-gear me-1"></i>Configure
            </ui-button>
          </div>
        </ui-card>
      </div>

      <!-- Federation Info using UiCard + UiAlert -->
      <ui-card title="Federation Info — This MFE" variant="primary" shadow="sm">
        <div class="row g-3 mb-3">
          <div class="col-md-4">
            <div class="p-3 bg-light rounded">
              <p class="text-muted small mb-1">Remote Name</p>
              <code class="fs-6">mfe-dashboard</code>
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
              <code class="fs-6">loadRemoteModule('mfe-dashboard', './Component')</code>
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
