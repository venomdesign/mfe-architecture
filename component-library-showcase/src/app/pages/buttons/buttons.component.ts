import { Component } from '@angular/core';
import { UiButtonComponent } from '@shared/component-library';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [UiButtonComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiButton</h2>
      <p class="text-muted">A versatile button component with 16 variants, 3 sizes, and disabled state support.</p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiButtonComponent &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- Variants -->
    <div class="mb-4">
      <h5 class="section-title">Variants</h5>
      <div class="preview-box">
        <div class="d-flex flex-wrap gap-2 mb-3">
          <ui-button variant="primary">Primary</ui-button>
          <ui-button variant="secondary">Secondary</ui-button>
          <ui-button variant="success">Success</ui-button>
          <ui-button variant="danger">Danger</ui-button>
          <ui-button variant="warning">Warning</ui-button>
          <ui-button variant="info">Info</ui-button>
          <ui-button variant="light">Light</ui-button>
          <ui-button variant="dark">Dark</ui-button>
        </div>
        <div class="d-flex flex-wrap gap-2">
          <ui-button variant="outline-primary">Outline Primary</ui-button>
          <ui-button variant="outline-secondary">Outline Secondary</ui-button>
          <ui-button variant="outline-success">Outline Success</ui-button>
          <ui-button variant="outline-danger">Outline Danger</ui-button>
          <ui-button variant="outline-warning">Outline Warning</ui-button>
          <ui-button variant="outline-info">Outline Info</ui-button>
          <ui-button variant="outline-light">Outline Light</ui-button>
          <ui-button variant="outline-dark">Outline Dark</ui-button>
        </div>
      </div>
      <div class="code-block"><ui-button variant="primary">Primary</ui-button>
<ui-button variant="outline-danger">Outline Danger</ui-button></div>
    </div>

    <!-- Sizes -->
    <div class="mb-4">
      <h5 class="section-title">Sizes</h5>
      <div class="preview-box d-flex align-items-center gap-3 flex-wrap">
        <ui-button variant="primary" size="sm">Small</ui-button>
        <ui-button variant="primary" size="md">Medium (default)</ui-button>
        <ui-button variant="primary" size="lg">Large</ui-button>
      </div>
      <div class="code-block"><ui-button variant="primary" size="sm">Small</ui-button>
<ui-button variant="primary" size="md">Medium</ui-button>
<ui-button variant="primary" size="lg">Large</ui-button></div>
    </div>

    <!-- Disabled -->
    <div class="mb-4">
      <h5 class="section-title">Disabled State</h5>
      <div class="preview-box d-flex gap-3 flex-wrap">
        <ui-button variant="primary" [disabled]="true">Disabled Primary</ui-button>
        <ui-button variant="success" [disabled]="true">Disabled Success</ui-button>
        <ui-button variant="outline-danger" [disabled]="true">Disabled Outline</ui-button>
      </div>
      <div class="code-block"><ui-button variant="primary" [disabled]="true">Disabled</ui-button></div>
    </div>

    <!-- Button types -->
    <div class="mb-4">
      <h5 class="section-title">Button Types</h5>
      <div class="preview-box d-flex gap-3 flex-wrap">
        <ui-button variant="primary" type="button">type="button"</ui-button>
        <ui-button variant="secondary" type="submit">type="submit"</ui-button>
        <ui-button variant="outline-secondary" type="reset">type="reset"</ui-button>
      </div>
      <div class="code-block"><ui-button variant="primary" type="submit">Submit</ui-button></div>
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
            <tr><td><code>variant</code></td><td><code>string</code></td><td><code>'primary'</code></td><td>Bootstrap variant (16 options)</td></tr>
            <tr><td><code>size</code></td><td><code>'sm' | 'md' | 'lg'</code></td><td><code>'md'</code></td><td>Button size</td></tr>
            <tr><td><code>disabled</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Disables the button</td></tr>
            <tr><td><code>type</code></td><td><code>'button' | 'submit' | 'reset'</code></td><td><code>'button'</code></td><td>HTML button type</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class ButtonsComponent {}
