import { Component, Input } from '@angular/core';

/**
 * UiButtonComponent — a versatile button with Bootstrap 5 variants and sizes.
 *
 * @example
 * <ui-button variant="primary" size="md">Click me</ui-button>
 * <ui-button variant="outline-danger" size="lg" [disabled]="true">Delete</ui-button>
 */
@Component({
  selector: 'ui-button',
  standalone: true,
  template: `
    <button [class]="buttonClass" [disabled]="disabled" [type]="type">
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    button { cursor: pointer; }
    button:disabled { cursor: not-allowed; }
  `]
})
export class UiButtonComponent {
  /** Bootstrap colour variant */
  @Input() variant:
    | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
    | 'outline-primary' | 'outline-secondary' | 'outline-success' | 'outline-danger'
    | 'outline-warning' | 'outline-info' | 'outline-light' | 'outline-dark'
    = 'primary';

  /** Bootstrap size modifier */
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  /** Disables the button */
  @Input() disabled = false;

  /** HTML button type */
  @Input() type: 'button' | 'submit' | 'reset' = 'button';

  get buttonClass(): string {
    const sizeClass = this.size === 'sm' ? 'btn-sm' : this.size === 'lg' ? 'btn-lg' : '';
    return ['btn', `btn-${this.variant}`, sizeClass].filter(Boolean).join(' ');
  }
}
