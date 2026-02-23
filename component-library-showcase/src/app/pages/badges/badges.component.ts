import { Component } from '@angular/core';
import { UiBadgeComponent } from '@shared/component-library';

@Component({
  selector: 'app-badges',
  standalone: true,
  imports: [UiBadgeComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiBadge</h2>
      <p class="text-muted">A compact label component with 8 variants and optional pill shape.</p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiBadgeComponent &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- Variants -->
    <div class="mb-4">
      <h5 class="section-title">Variants</h5>
      <div class="preview-box d-flex flex-wrap gap-2">
        <ui-badge label="Primary" variant="primary"></ui-badge>
        <ui-badge label="Secondary" variant="secondary"></ui-badge>
        <ui-badge label="Success" variant="success"></ui-badge>
        <ui-badge label="Danger" variant="danger"></ui-badge>
        <ui-badge label="Warning" variant="warning"></ui-badge>
        <ui-badge label="Info" variant="info"></ui-badge>
        <ui-badge label="Light" variant="light"></ui-badge>
        <ui-badge label="Dark" variant="dark"></ui-badge>
      </div>
      <div class="code-block"><ui-badge label="Success" variant="success"></ui-badge>
<ui-badge label="Danger" variant="danger"></ui-badge></div>
    </div>

    <!-- Pill -->
    <div class="mb-4">
      <h5 class="section-title">Pill Shape</h5>
      <div class="preview-box d-flex flex-wrap gap-2">
        <ui-badge label="Primary" variant="primary" [pill]="true"></ui-badge>
        <ui-badge label="Secondary" variant="secondary" [pill]="true"></ui-badge>
        <ui-badge label="Success" variant="success" [pill]="true"></ui-badge>
        <ui-badge label="Danger" variant="danger" [pill]="true"></ui-badge>
        <ui-badge label="Warning" variant="warning" [pill]="true"></ui-badge>
        <ui-badge label="Info" variant="info" [pill]="true"></ui-badge>
      </div>
      <div class="code-block"><ui-badge label="New" variant="success" [pill]="true"></ui-badge></div>
    </div>

    <!-- Real-world examples -->
    <div class="mb-4">
      <h5 class="section-title">Real-World Examples</h5>
      <div class="preview-box">
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="fw-semibold">Status:</span>
          <ui-badge label="Active" variant="success" [pill]="true"></ui-badge>
        </div>
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="fw-semibold">Version:</span>
          <ui-badge label="v1.0.0" variant="primary" [pill]="true"></ui-badge>
          <ui-badge label="Stable" variant="success" [pill]="true"></ui-badge>
        </div>
        <div class="d-flex align-items-center gap-2 mb-3">
          <span class="fw-semibold">Environment:</span>
          <ui-badge label="Production" variant="danger"></ui-badge>
          <ui-badge label="Staging" variant="warning"></ui-badge>
          <ui-badge label="Dev" variant="secondary"></ui-badge>
        </div>
        <div class="d-flex align-items-center gap-2">
          <span class="fw-semibold">MFE Tags:</span>
          <ui-badge label="shell-app" variant="dark"></ui-badge>
          <ui-badge label="mfe-dashboard" variant="primary"></ui-badge>
          <ui-badge label="mfe-settings" variant="success"></ui-badge>
        </div>
      </div>
    </div>

    <!-- API -->
    <div class="mb-4">
      <h5 class="section-title">API Reference</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-dark">
            <tr><th>Input</th><th>Type</th><th>Default</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>label</code></td><td><code>string</code></td><td><code>''</code></td><td>Text displayed in the badge</td></tr>
            <tr><td><code>variant</code></td><td><code>string</code></td><td><code>'primary'</code></td><td>Bootstrap color variant (8 options)</td></tr>
            <tr><td><code>pill</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Renders as a pill (fully rounded)</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class BadgesComponent {}
