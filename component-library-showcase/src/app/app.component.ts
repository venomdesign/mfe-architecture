import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="showcase-layout">

      <!-- Sidebar -->
      <aside class="showcase-sidebar">
        <div class="p-4 border-bottom border-secondary border-opacity-25">
          <div class="d-flex align-items-center gap-2 mb-1">
            <i class="bi bi-box-seam-fill text-indigo fs-5" style="color:#818cf8"></i>
            <span class="fw-bold text-white fs-6">component-library</span>
          </div>
          <div class="d-flex align-items-center gap-2">
            <span class="version-badge">v1.0.0</span>
            <span class="text-secondary small">&#64;shared</span>
          </div>
        </div>

        <nav class="sidebar-nav py-3 flex-grow-1">
          <div class="px-4 mb-2">
            <span class="text-uppercase text-secondary" style="font-size:0.7rem;letter-spacing:.08em;font-weight:700">
              Components
            </span>
          </div>

          <a routerLink="/overview" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
            <i class="bi bi-house-door"></i> Overview
          </a>
          <a routerLink="/buttons" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
            <i class="bi bi-toggles"></i> Buttons
          </a>
          <a routerLink="/badges" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
            <i class="bi bi-tag"></i> Badges
          </a>
          <a routerLink="/cards" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
            <i class="bi bi-card-text"></i> Cards
          </a>
          <a routerLink="/alerts" routerLinkActive="active" class="nav-link d-flex align-items-center gap-2">
            <i class="bi bi-exclamation-triangle"></i> Alerts
          </a>
        </nav>

        <div class="p-4 border-top border-secondary border-opacity-25">
          <div class="text-secondary small mb-1">Separate repo — installed as:</div>
          <code class="text-success small">npm install &#64;shared/component-library</code>
        </div>
      </aside>

      <!-- Main content -->
      <main class="showcase-main">
        <router-outlet />
      </main>

    </div>
  `
})
export class AppComponent {}
