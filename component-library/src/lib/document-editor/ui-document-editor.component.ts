import { Component, Input } from '@angular/core';
import {
  DocumentEditorContainerModule,
  ToolbarService
} from '@syncfusion/ej2-angular-documenteditor';

/**
 * Top-level configuration object for UiDocumentEditorComponent.
 */
export interface DocumentEditorConfig {
  /**
   * Height of the document editor container (CSS string, default: '600px').
   * @example '600px' | '80vh'
   */
  height?: string;

  /**
   * URL of the server-side Web API service used for operations such as
   * spell-check, restrict-editing, and server-side export.
   * Leave undefined to run in client-only mode (most features still work).
   * @example 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'
   */
  serviceUrl?: string;

  /**
   * Show the built-in toolbar (default: true).
   * Set to false to embed the editor without any toolbar chrome.
   */
  enableToolbar?: boolean;

  /**
   * Show the properties pane on the right-hand side (default: true).
   */
  showPropertiesPane?: boolean;

  /**
   * Open the editor in read-only / viewer mode (default: false).
   * Users can still select and copy text but cannot make edits.
   */
  isReadOnly?: boolean;

  /**
   * Prevent the user from editing the document (default: false).
   * Similar to isReadOnly but enforced at the document level.
   */
  restrictEditing?: boolean;

  /**
   * Enable local clipboard paste support (default: false).
   * When true, content pasted from outside the browser is handled locally.
   */
  enableLocalPaste?: boolean;
}

/**
 * UiDocumentEditorComponent — a config-driven wrapper around the
 * Syncfusion EJ2 Document Editor Container.
 *
 * Renders a full-featured DOCX-compatible word-processor inside your Angular
 * application. Pass a single `DocumentEditorConfig` object to control height,
 * toolbar visibility, read-only mode, and the optional server-side service URL.
 *
 * @example
 * <ui-document-editor [config]="editorConfig"></ui-document-editor>
 *
 * editorConfig: DocumentEditorConfig = {
 *   height: '600px',
 *   enableToolbar: true,
 *   showPropertiesPane: true,
 *   serviceUrl: 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/',
 * };
 */
@Component({
  selector: 'ui-document-editor',
  standalone: true,
  imports: [DocumentEditorContainerModule],
  providers: [ToolbarService],
  template: `
    <ejs-documenteditorcontainer
      [height]="config.height ?? '600px'"
      [serviceUrl]="config.serviceUrl ?? ''"
      [enableToolbar]="config.enableToolbar ?? true"
      [showPropertiesPane]="config.showPropertiesPane ?? true"
      [restrictEditing]="config.isReadOnly ?? config.restrictEditing ?? false"
      [enableLocalPaste]="config.enableLocalPaste ?? false">
    </ejs-documenteditorcontainer>
  `
})
export class UiDocumentEditorComponent {
  /** Document editor configuration object */
  @Input({ required: true }) config!: DocumentEditorConfig;
}
