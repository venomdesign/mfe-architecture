import { Component } from '@angular/core';
import { UiButtonComponent } from '@shared/component-library';
import { UiBadgeComponent } from '@shared/component-library';
import { UiAlertComponent } from '@shared/component-library';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [UiButtonComponent, UiBadgeComponent, UiAlertComponent],
  template: `
    <div class="mb-4">
      <div class="d-flex align-items-center gap-3 mb-2">
        <h1 class="fw-bold mb-0">&#64;shared/component-library</h1>
        <ui-badge label="v1.0.0" variant="primary" [pill]="true"></ui-badge>
        <ui-badge label="Stable" variant="success" [pill]="true"></ui-badge>
      </div>
      <p class="text-muted lead">
        A shared Angular component library — built, versioned, and installed as a real npm package.
        Each MFE installs the version it needs independently.
      </p>
    </div>

    <ui-alert type="info" title="Separate Repo — Proper Implementation">
      This library lives in its own repository (<code>component-library/</code>), is built with
      <strong>ng-packagr</strong>, and installed via <code>npm install &#64;shared/component-library</code>.
      No TypeScript path aliases. No monorepo tricks.
    </ui-alert>

    <div class="row g-4 mt-2">

      <!-- Install -->
      <div class="col-12">
        <h5 class="section-title">Installation</h5>
        <div class="code-block">npm install &#64;shared/component-library</div>
      </div>

      <!-- Components -->
      <div class="col-12">
        <h5 class="section-title">Components (v1.0.0)</h5>
        <div class="row g-3">
          <div class="col-md-6 col-xl-3">
            <div class="preview-box text-center">
              <i class="bi bi-toggles fs-2 text-primary mb-2 d-block"></i>
              <strong>UiButton</strong>
              <p class="text-muted small mb-2">16 variants · 3 sizes · disabled state</p>
              <ui-button variant="primary" size="sm">Example</ui-button>
            </div>
          </div>
          <div class="col-md-6 col-xl-3">
            <div class="preview-box text-center">
              <i class="bi bi-tag fs-2 text-success mb-2 d-block"></i>
              <strong>UiBadge</strong>
              <p class="text-muted small mb-2">8 variants · pill option</p>
              <div class="d-flex gap-1 justify-content-center flex-wrap">
                <ui-badge label="New" variant="success"></ui-badge>
                <ui-badge label="Beta" variant="warning" [pill]="true"></ui-badge>
              </div>
            </div>
          </div>
          <div class="col-md-6 col-xl-3">
            <div class="preview-box text-center">
              <i class="bi bi-card-text fs-2 text-warning mb-2 d-block"></i>
              <strong>UiCard</strong>
              <p class="text-muted small mb-2">7 variants · 4 shadow levels · header/footer slots</p>
              <span class="badge bg-secondary">Composable</span>
            </div>
          </div>
          <div class="col-md-6 col-xl-3">
            <div class="preview-box text-center">
              <i class="bi bi-exclamation-triangle fs-2 text-danger mb-2 d-block"></i>
              <strong>UiAlert</strong>
              <p class="text-muted small mb-2">8 types · dismissible · title support</p>
              <span class="badge bg-secondary">Dismissible</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Usage -->
      <div class="col-12">
        <h5 class="section-title">Basic Usage</h5>
        <div class="code-block">import &#123; UiButtonComponent, UiBadgeComponent &#125; from '&#64;shared/component-library';

&#64;Component(&#123;
  standalone: true,
  imports: [UiButtonComponent, UiBadgeComponent],
  template: &#96;
    <ui-button variant="primary">Save</ui-button>
    <ui-badge label="New" variant="success" [pill]="true"></ui-badge>
  &#96;
&#125;)
export class MyComponent &#123;&#125;</div>
      </div>

      <!-- Version strategy -->
      <div class="col-12">
        <h5 class="section-title">Version Strategy — Why This Matters</h5>
        <div class="table-responsive">
          <table class="table table-bordered table-sm">
            <thead class="table-dark">
              <tr>
                <th>App</th>
                <th>&#64;shared/component-library</th>
                <th>Strategy</th>
                <th>Result</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>shell-app</code></td>
                <td><ui-badge label="2.0.0" variant="primary"></ui-badge></td>
                <td><code>singleton: false</code></td>
                <td>Uses its own bundle</td>
              </tr>
              <tr>
                <td><code>mfe-dashboard</code></td>
                <td><ui-badge label="1.2.0" variant="warning"></ui-badge></td>
                <td><code>singleton: false</code></td>
                <td>Uses its own bundle</td>
              </tr>
              <tr>
                <td><code>mfe-settings</code></td>
                <td><ui-badge label="2.0.0" variant="primary"></ui-badge></td>
                <td><code>singleton: false</code></td>
                <td>Uses its own bundle</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p class="text-muted small mt-2">
          <i class="bi bi-info-circle me-1"></i>
          Because <code>singleton: false</code>, each MFE bundles its own version.
          No coordination needed. Teams upgrade independently.
        </p>
      </div>

    </div>
  `
})
export class OverviewComponent {}
