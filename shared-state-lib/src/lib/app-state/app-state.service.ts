import { Injectable, signal, computed } from '@angular/core';

/**
 * Shape of the authenticated user stored in app state.
 */
export interface UserState {
  id: string;
  name: string;
  email: string;
}

/**
 * Top-level application state slice.
 */
export interface AppState {
  /** Currently authenticated user, or null when unauthenticated. */
  user: UserState | null;
  /** Active UI theme. */
  theme: 'light' | 'dark';
  /** Number of unread notifications. */
  notifications: number;
}

/**
 * AppStateService — platform-wide signal-based state store.
 *
 * Provided in root so every MFE that imports this library shares the same
 * instance when the library is configured as a singleton in federation config.
 *
 * @example
 * // Read state reactively (works in templates and computed signals)
 * const state = inject(AppStateService);
 * const userName = state.user()?.name;
 *
 * // Write state
 * state.setUser({ id: '1', name: 'Alice', email: 'alice@example.com' });
 * state.setTheme('dark');
 * state.incrementNotifications();
 */
@Injectable({ providedIn: 'root' })
export class AppStateService {
  private readonly _state = signal<AppState>({
    user: null,
    theme: 'light',
    notifications: 0,
  });

  // ── Read-only public signals ───────────────────────────────────────────────

  /** Full state snapshot (read-only). */
  readonly state = this._state.asReadonly();

  /** Currently authenticated user, or null. */
  readonly user = computed(() => this._state().user);

  /** Active UI theme. */
  readonly theme = computed(() => this._state().theme);

  /** Number of unread notifications. */
  readonly notifications = computed(() => this._state().notifications);

  /** True when a user is authenticated. */
  readonly isAuthenticated = computed(() => this._state().user !== null);

  // ── Write methods ──────────────────────────────────────────────────────────

  /**
   * Set (or clear) the authenticated user.
   * @param user - UserState object, or null to sign out.
   */
  setUser(user: UserState | null): void {
    this._state.update(s => ({ ...s, user }));
  }

  /**
   * Switch the active UI theme.
   * @param theme - 'light' or 'dark'
   */
  setTheme(theme: 'light' | 'dark'): void {
    this._state.update(s => ({ ...s, theme }));
  }

  /** Increment the unread notification count by one. */
  incrementNotifications(): void {
    this._state.update(s => ({ ...s, notifications: s.notifications + 1 }));
  }

  /** Reset the unread notification count to zero. */
  clearNotifications(): void {
    this._state.update(s => ({ ...s, notifications: 0 }));
  }

  /**
   * Merge a partial state object into the current state.
   * Useful for bulk updates without calling individual setters.
   *
   * @param partial - Partial<AppState> to merge.
   */
  patchState(partial: Partial<AppState>): void {
    this._state.update(s => ({ ...s, ...partial }));
  }
}
