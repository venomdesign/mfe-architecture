import { Component, Input } from '@angular/core';

/**
 * UiBadgeComponent — inline label/tag with Bootstrap 5 colour variants.
 *
 * @example
 * <ui-badge label="New" variant="success"></ui-badge>
 * <ui-badge label="Beta" variant="warning" [pill]="true"></ui-badge>
 */
@Component({
  selector: 'ui-badge',
  standalone: true,
  template: `<span [class]="badgeClass">{{ label }}</span>`
})
export class UiBadgeComponent {
  /** Text content of the badge */
  @Input() label = '';

  /** Bootstrap colour variant */
  @Input() variant:
    | 'primary' | 'secondary' | 'success' | 'danger'
    | 'warning' | 'info' | 'light' | 'dark'
    = 'primary';

  /** Renders as a pill (fully rounded) */
  @Input() pill = false;

  get badgeClass(): string {
    return ['badge', `text-bg-${this.variant}`, this.pill ? 'rounded-pill' : '']
      .filter(Boolean).join(' ');
  }
}
