import { Component, Input } from '@angular/core';

/**
 * UiAlertComponent — Bootstrap 5 alert with optional title, icon, and dismiss button.
 *
 * @example
 * <ui-alert type="success" title="Done!">Your changes have been saved.</ui-alert>
 * <ui-alert type="danger" [dismissible]="true">Something went wrong.</ui-alert>
 */
@Component({
  selector: 'ui-alert',
  standalone: true,
  template: `
    <div [class]="alertClass" [hidden]="!visible" role="alert">
      <div class="d-flex align-items-start w-100">
        <span class="me-2 fs-5">{{ icon }}</span>
        <div class="flex-grow-1">
          @if (title) {
            <strong class="d-block mb-1">{{ title }}</strong>
          }
          <ng-content></ng-content>
        </div>
        @if (dismissible) {
          <button type="button" class="btn-close ms-2" (click)="dismiss()" aria-label="Close"></button>
        }
      </div>
    </div>
  `
})
export class UiAlertComponent {
  /** Alert severity / colour */
  @Input() type: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' = 'info';

  /** Optional bold heading above the message */
  @Input() title = '';

  /** Shows a close button that hides the alert */
  @Input() dismissible = false;

  visible = true;

  get alertClass(): string {
    return `alert alert-${this.type} mb-0`;
  }

  get icon(): string {
    const icons: Record<string, string> = {
      success: '✅',
      danger: '❌',
      warning: '⚠️',
      info: 'ℹ️',
      primary: '🔵',
      secondary: '⚫',
      light: '💡',
      dark: '🌑'
    };
    return icons[this.type] ?? 'ℹ️';
  }

  dismiss(): void {
    this.visible = false;
  }
}
