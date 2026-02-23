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
          <i class="bi bi-speedometer2 me-2 text-primary"></i>Dashboard
        </h2>
        <ui-badge label="MFE" variant="primary"></ui-badge>
        <ui-badge label="Repo: mfe-dashboard" variant="secondary"></ui-badge>
        <ui-badge label="Port: 4201" variant="info"></ui-badge>
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
export class AppComponent {}
