import { Component, Input } from '@angular/core';

/**
 * UiCardComponent — Bootstrap 5 card with optional header, body, and footer slots.
 *
 * @example
 * <ui-card title="My Card" subtitle="Optional subtitle" variant="primary">
 *   <p>Card body content goes here.</p>
 *   <div card-footer>Footer content</div>
 * </ui-card>
 */
@Component({
  selector: 'ui-card',
  standalone: true,
  template: `
    <div [class]="cardClass">
      @if (title) {
        <div [class]="headerClass">
          <strong>{{ title }}</strong>
          @if (subtitle) {
            <small class="text-muted ms-2">{{ subtitle }}</small>
          }
        </div>
      }
      <div class="card-body">
        <ng-content></ng-content>
      </div>
      <div class="card-footer text-muted">
        <ng-content select="[card-footer]"></ng-content>
      </div>
    </div>
  `
})
export class UiCardComponent {
  /** Card header title */
  @Input() title = '';

  /** Optional subtitle shown next to the title */
  @Input() subtitle = '';

  /** Border colour variant */
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' = 'default';

  /** Box shadow size */
  @Input() shadow: 'none' | 'sm' | 'md' | 'lg' = 'sm';

  get cardClass(): string {
    const border = this.variant !== 'default' ? `border-${this.variant}` : '';
    const sh = this.shadow === 'sm' ? 'shadow-sm' : this.shadow === 'lg' ? 'shadow-lg' : this.shadow === 'md' ? 'shadow' : '';
    return ['card', border, sh].filter(Boolean).join(' ');
  }

  get headerClass(): string {
    return this.variant !== 'default'
      ? `card-header bg-${this.variant} text-white`
      : 'card-header';
  }
}
