import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { AppStateService } from '@shared/state-lib';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" routerLink="/home">
          <i class="bi bi-grid-3x3-gap-fill me-2"></i>Shell App
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a class="nav-link" routerLink="/home" routerLinkActive="active">
                <i class="bi bi-house me-1"></i>Home
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/dashboard" routerLinkActive="active">
                <i class="bi bi-speedometer2 me-1"></i>Dashboard
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" routerLink="/settings" routerLinkActive="active">
                <i class="bi bi-gear me-1"></i>Settings
              </a>
            </li>
          </ul>

          <!-- ── Shared State Indicator ──────────────────────────────────── -->
          <div class="d-flex align-items-center gap-3 ms-auto">

            <!-- Notification badge — updates only if state-lib is singleton -->
            <div class="d-flex align-items-center gap-1" title="Notification count from AppStateService">
              <i class="bi bi-bell text-light"></i>
              <span class="badge rounded-pill"
                    [class.bg-danger]="stateService.notifications() > 0"
                    [class.bg-secondary]="stateService.notifications() === 0">
                {{ stateService.notifications() }}
              </span>
            </div>

            <!-- Instance ID pill — proves singleton vs non-singleton -->
            <div class="d-flex align-items-center gap-1"
                 title="AppStateService instance ID — compare with MFE panels">
              <i class="bi bi-fingerprint text-light" style="font-size:.85rem"></i>
              <span class="badge bg-secondary font-monospace" style="letter-spacing:.08em;font-size:.7rem">
                Shell:{{ stateService.instanceId }}
              </span>
            </div>

          </div>
        </div>
      </div>
    </nav>

    <main class="container-fluid mt-3">
      <router-outlet />
    </main>
  `,
  styles: [`
    .navbar-brand { font-weight: 700; }
    main { padding: 1rem; }
  `]
})
export class App {
  readonly stateService = inject(AppStateService);
}
