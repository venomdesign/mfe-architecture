import { Component } from '@angular/core';
import {
  UiDocumentEditorComponent,
  DocumentEditorConfig
} from '@shared/component-library';

@Component({
  selector: 'app-document-editor',
  standalone: true,
  imports: [UiDocumentEditorComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiDocumentEditor</h2>
      <p class="text-muted">
        A config-driven wrapper around the Syncfusion EJ2 Document Editor Container.
        Renders a full-featured DOCX-compatible word-processor. Pass a single
        <code>DocumentEditorConfig</code> object to control height, toolbar visibility,
        read-only mode, and the optional server-side service URL.
      </p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiDocumentEditorComponent, DocumentEditorConfig &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- Full Editor -->
    <div class="mb-5">
      <h5 class="section-title">Full Editor (with Toolbar)</h5>
      <p class="text-muted small mb-3">
        Complete word-processor experience with toolbar, properties pane, and all editing features.
        Uses the Syncfusion demo service for server-side operations.
      </p>
      <div class="preview-box p-0">
        <ui-document-editor [config]="fullConfig"></ui-document-editor>
      </div>
      <div class="code-block">fullConfig: DocumentEditorConfig = &#123;
  height: '600px',
  enableToolbar: true,
  showPropertiesPane: true,
  serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/',
&#125;;</div>
    </div>

    <!-- Toolbar Only (no properties pane) -->
    <div class="mb-5">
      <h5 class="section-title">Compact Editor (Toolbar, No Properties Pane)</h5>
      <p class="text-muted small mb-3">
        Hides the right-hand properties pane for a more compact editing experience.
      </p>
      <div class="preview-box p-0">
        <ui-document-editor [config]="compactConfig"></ui-document-editor>
      </div>
      <div class="code-block">compactConfig: DocumentEditorConfig = &#123;
  height: '500px',
  enableToolbar: true,
  showPropertiesPane: false,
&#125;;</div>
    </div>

    <!-- Read-Only Viewer -->
    <div class="mb-5">
      <h5 class="section-title">Read-Only Viewer</h5>
      <p class="text-muted small mb-3">
        Locks the document for viewing only — no toolbar, no editing.
        Ideal for document preview panels.
      </p>
      <div class="preview-box p-0">
        <ui-document-editor [config]="readOnlyConfig"></ui-document-editor>
      </div>
      <div class="code-block">readOnlyConfig: DocumentEditorConfig = &#123;
  height: '400px',
  enableToolbar: false,
  showPropertiesPane: false,
  isReadOnly: true,
&#125;;</div>
    </div>

    <!-- API Reference -->
    <div class="mb-4">
      <h5 class="section-title">DocumentEditorConfig API Reference</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>Property</th><th>Type</th><th>Default</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>height</code></td>
              <td><code>string</code></td>
              <td><code>'600px'</code></td>
              <td>Height of the editor container (any valid CSS height string)</td>
            </tr>
            <tr>
              <td><code>serviceUrl</code></td>
              <td><code>string</code></td>
              <td>—</td>
              <td>
                URL of the server-side Web API for spell-check, restrict-editing, and export.
                Omit to run in client-only mode.
              </td>
            </tr>
            <tr>
              <td><code>enableToolbar</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show or hide the built-in formatting toolbar</td>
            </tr>
            <tr>
              <td><code>showPropertiesPane</code></td>
              <td><code>boolean</code></td>
              <td><code>true</code></td>
              <td>Show or hide the right-hand properties / styles pane</td>
            </tr>
            <tr>
              <td><code>isReadOnly</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Open the editor in read-only / viewer mode.
                Users can select and copy text but cannot make edits.
              </td>
            </tr>
            <tr>
              <td><code>restrictEditing</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>
                Enforce editing restrictions at the document level.
                <code>isReadOnly</code> takes precedence when both are set.
              </td>
            </tr>
            <tr>
              <td><code>enableLocalPaste</code></td>
              <td><code>boolean</code></td>
              <td><code>false</code></td>
              <td>Handle clipboard paste from outside the browser locally</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Notes -->
    <div class="mb-4">
      <h5 class="section-title">Notes</h5>
      <ul class="text-muted small">
        <li class="mb-1">
          The Syncfusion Document Editor requires a license key for production use.
          Register a free community license at
          <a href="https://www.syncfusion.com/products/communitylicense" target="_blank" rel="noopener">
            syncfusion.com/products/communitylicense
          </a>.
        </li>
        <li class="mb-1">
          Server-side features (spell-check, mail-merge, server export) require a
          .NET or Node.js Web API endpoint. The demo uses the public Syncfusion
          service at
          <code>https://ej2services.syncfusion.com/production/web-services/api/documenteditor/</code>.
        </li>
        <li>
          Import the Syncfusion Document Editor CSS in your application's
          <code>angular.json</code> styles array:
          <code>node_modules/@syncfusion/ej2-angular-documenteditor/styles/material.css</code>
        </li>
      </ul>
    </div>
  `
})
export class DocumentEditorShowcaseComponent {

  readonly fullConfig: DocumentEditorConfig = {
    height: '600px',
    enableToolbar: true,
    showPropertiesPane: true,
    serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/',
  };

  readonly compactConfig: DocumentEditorConfig = {
    height: '500px',
    enableToolbar: true,
    showPropertiesPane: false,
  };

  readonly readOnlyConfig: DocumentEditorConfig = {
    height: '400px',
    enableToolbar: false,
    showPropertiesPane: false,
    isReadOnly: true,
  };
}
