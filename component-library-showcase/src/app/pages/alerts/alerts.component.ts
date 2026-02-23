import { Component } from '@angular/core';
import { UiAlertComponent } from '@shared/component-library';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [UiAlertComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiAlert</h2>
      <p class="text-muted">A contextual alert component with 8 types, optional title, and dismissible support.</p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiAlertComponent &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- All types -->
    <div class="mb-4">
      <h5 class="section-title">Alert Types</h5>
      <div class="preview-box d-flex flex-column gap-2">
        <ui-alert type="primary">This is a <strong>primary</strong> alert.</ui-alert>
        <ui-alert type="secondary">This is a <strong>secondary</strong> alert.</ui-alert>
        <ui-alert type="success">This is a <strong>success</strong> alert — operation completed.</ui-alert>
        <ui-alert type="danger">This is a <strong>danger</strong> alert — something went wrong.</ui-alert>
        <ui-alert type="warning">This is a <strong>warning</strong> alert — proceed with caution.</ui-alert>
        <ui-alert type="info">This is an <strong>info</strong> alert — here's some information.</ui-alert>
        <ui-alert type="light">This is a <strong>light</strong> alert.</ui-alert>
        <ui-alert type="dark">This is a <strong>dark</strong> alert.</ui-alert>
      </div>
      <div class="code-block"><ui-alert type="success">Operation completed successfully.</ui-alert>
<ui-alert type="danger">Something went wrong.</ui-alert></div>
    </div>

    <!-- With title -->
    <div class="mb-4">
      <h5 class="section-title">With Title</h5>
      <div class="preview-box d-flex flex-column gap-2">
        <ui-alert type="success" title="Deployment Successful">
          Your changes have been deployed to production. All health checks passed.
        </ui-alert>
        <ui-alert type="danger" title="Build Failed">
          The CI pipeline failed at the test stage. Check the logs for details.
        </ui-alert>
        <ui-alert type="warning" title="Deprecation Notice">
          This API endpoint will be removed in v2.0.0. Please migrate to the new endpoint.
        </ui-alert>
        <ui-alert type="info" title="New Version Available">
          &#64;shared/component-library v1.1.0 is now available with new features.
        </ui-alert>
      </div>
      <div class="code-block"><ui-alert type="success" title="Deployment Successful">
  Your changes have been deployed to production.
</ui-alert></div>
    </div>

    <!-- Dismissible -->
    <div class="mb-4">
      <h5 class="section-title">Dismissible Alerts</h5>
      <div class="preview-box d-flex flex-column gap-2">
        <ui-alert type="info" title="Dismissible Alert" [dismissible]="true">
          Click the × button to dismiss this alert. It will hide until the page reloads.
        </ui-alert>
        <ui-alert type="warning" [dismissible]="true">
          This warning can be dismissed by the user.
        </ui-alert>
        <ui-alert type="success" title="Done!" [dismissible]="true">
          Task completed. You can dismiss this notification.
        </ui-alert>
      </div>
      <div class="code-block"><ui-alert type="info" title="Notice" [dismissible]="true">
  This alert can be dismissed.
</ui-alert></div>
    </div>

    <!-- Real-world -->
    <div class="mb-4">
      <h5 class="section-title">Real-World Examples</h5>
      <div class="preview-box d-flex flex-column gap-3">
        <ui-alert type="info" title="MFE Loaded Successfully">
          <code>mfe-dashboard</code> was loaded from <code>http://localhost:4201/remoteEntry.json</code>
          via Native Federation at runtime.
        </ui-alert>
        <ui-alert type="warning" title="Version Mismatch Detected">
          <code>mfe-dashboard</code> is using <code>&#64;shared/component-library@1.2.0</code>
          while the shell uses <code>2.0.0</code>. This is expected — <code>singleton: false</code> allows independent versions.
        </ui-alert>
        <ui-alert type="danger" title="Remote Entry Unavailable" [dismissible]="true">
          Could not load <code>mfe-settings</code> from <code>http://localhost:4202/remoteEntry.json</code>.
          Ensure the MFE is running on port 4202.
        </ui-alert>
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
            <tr><td><code>type</code></td><td><code>string</code></td><td><code>'info'</code></td><td>Alert type (8 Bootstrap variants)</td></tr>
            <tr><td><code>title</code></td><td><code>string</code></td><td><code>''</code></td><td>Optional bold title above content</td></tr>
            <tr><td><code>dismissible</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Shows × close button; hides on click</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class AlertsComponent {}
