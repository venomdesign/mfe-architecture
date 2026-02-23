import { Component } from '@angular/core';
import { UiCardComponent } from '@shared/component-library';
import { UiButtonComponent } from '@shared/component-library';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [UiCardComponent, UiButtonComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiCard</h2>
      <p class="text-muted">A flexible card container with 7 variants, 4 shadow levels, and header/footer content projection.</p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiCardComponent &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- Basic -->
    <div class="mb-4">
      <h5 class="section-title">Basic Card</h5>
      <div class="preview-box">
        <div class="row g-3">
          <div class="col-md-4">
            <ui-card title="Simple Card">
              This is the card body content. Any HTML can go here.
            </ui-card>
          </div>
          <div class="col-md-4">
            <ui-card title="With Subtitle" subtitle="Supporting text below the title">
              Card body with a subtitle shown beneath the title.
            </ui-card>
          </div>
          <div class="col-md-4">
            <ui-card title="With Footer">
              Card body content here.
              <div card-footer>
                <ui-button variant="primary" size="sm">Action</ui-button>
                <ui-button variant="outline-secondary" size="sm">Cancel</ui-button>
              </div>
            </ui-card>
          </div>
        </div>
      </div>
      <div class="code-block"><ui-card title="My Card" subtitle="Optional subtitle">
  Card body content
  <div card-footer>
    <ui-button variant="primary">Save</ui-button>
  </div>
</ui-card></div>
    </div>

    <!-- Variants -->
    <div class="mb-4">
      <h5 class="section-title">Variants</h5>
      <div class="preview-box">
        <div class="row g-3">
          @for (v of variants; track v) {
            <div class="col-md-4">
              <ui-card [title]="v" [variant]="v">
                Card with <strong>{{ v }}</strong> variant.
              </ui-card>
            </div>
          }
        </div>
      </div>
      <div class="code-block"><ui-card title="Danger Card" variant="danger">Content</ui-card></div>
    </div>

    <!-- Shadow levels -->
    <div class="mb-4">
      <h5 class="section-title">Shadow Levels</h5>
      <div class="preview-box">
        <div class="row g-3">
          <div class="col-md-3">
            <ui-card title="No Shadow" shadow="none">shadow="none"</ui-card>
          </div>
          <div class="col-md-3">
            <ui-card title="Small Shadow" shadow="sm">shadow="sm"</ui-card>
          </div>
          <div class="col-md-3">
            <ui-card title="Default Shadow" shadow="md">shadow="md" (default)</ui-card>
          </div>
          <div class="col-md-3">
            <ui-card title="Large Shadow" shadow="lg">shadow="lg"</ui-card>
          </div>
        </div>
      </div>
      <div class="code-block"><ui-card title="Card" shadow="lg">Content</ui-card></div>
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
            <tr><td><code>title</code></td><td><code>string</code></td><td><code>''</code></td><td>Card header title</td></tr>
            <tr><td><code>subtitle</code></td><td><code>string</code></td><td><code>''</code></td><td>Optional subtitle below title</td></tr>
            <tr><td><code>variant</code></td><td><code>string</code></td><td><code>'default'</code></td><td>Border/header color variant</td></tr>
            <tr><td><code>shadow</code></td><td><code>'none' | 'sm' | 'md' | 'lg'</code></td><td><code>'md'</code></td><td>Box shadow level</td></tr>
          </tbody>
        </table>
      </div>
      <div class="mt-3">
        <strong>Content Projection:</strong>
        <ul class="mt-2">
          <li>Default slot — card body content</li>
          <li><code>[card-footer]</code> — projected into the card footer</li>
        </ul>
      </div>
    </div>
  `
})
export class CardsComponent {
  variants = ['default', 'primary', 'success', 'danger', 'warning', 'info', 'dark'] as const;
}
