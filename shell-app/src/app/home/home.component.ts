import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container py-4">
      <div class="row mb-4">
        <div class="col">
          <h1 class="display-5 fw-bold">
            <i class="bi bi-grid-3x3-gap-fill me-3 text-primary"></i>Shell App
          </h1>
          <p class="lead text-muted">
            Micro-Frontend Architecture — Separate Repos with Native Federation
          </p>
        </div>
      </div>

      <div class="row g-4">
        <!-- Architecture Info -->
        <div class="col-12">
          <div class="alert alert-info d-flex align-items-start">
            <i class="bi bi-info-circle-fill me-3 mt-1 fs-5"></i>
            <div>
              <strong>How this works:</strong> Each MFE is a completely separate repository with its own
              <code>package.json</code>, CI/CD pipeline, and deployment. The shell loads them at runtime
              via <code>federation.manifest.json</code>.
            </div>
          </div>
        </div>

        <!-- MFE Dashboard Card -->
        <div class="col-md-6">
          <div class="card h-100 border-primary">
            <div class="card-header bg-primary text-white">
              <i class="bi bi-speedometer2 me-2"></i>
              <strong>MFE Dashboard</strong>
              <span class="badge bg-light text-primary ms-2">Port 4201</span>
            </div>
            <div class="card-body">
              <p class="card-text">Separate repository: <code>mfe-dashboard/</code></p>
              <ul class="list-unstyled small text-muted">
                <li><i class="bi bi-check-circle text-success me-2"></i>Own package.json &amp; dependencies</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Own CI/CD pipeline</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Own version of component-library</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Deploys independently</li>
              </ul>
            </div>
            <div class="card-footer">
              <a routerLink="/dashboard" class="btn btn-primary w-100">
                <i class="bi bi-box-arrow-up-right me-2"></i>Open Dashboard MFE
              </a>
            </div>
          </div>
        </div>

        <!-- MFE Settings Card -->
        <div class="col-md-6">
          <div class="card h-100 border-success">
            <div class="card-header bg-success text-white">
              <i class="bi bi-gear me-2"></i>
              <strong>MFE Settings</strong>
              <span class="badge bg-light text-success ms-2">Port 4202</span>
            </div>
            <div class="card-body">
              <p class="card-text">Separate repository: <code>mfe-settings/</code></p>
              <ul class="list-unstyled small text-muted">
                <li><i class="bi bi-check-circle text-success me-2"></i>Own package.json &amp; dependencies</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Own CI/CD pipeline</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Own version of component-library</li>
                <li><i class="bi bi-check-circle text-success me-2"></i>Deploys independently</li>
              </ul>
            </div>
            <div class="card-footer">
              <a routerLink="/settings" class="btn btn-success w-100">
                <i class="bi bi-box-arrow-up-right me-2"></i>Open Settings MFE
              </a>
            </div>
          </div>
        </div>

        <!-- Architecture Summary -->
        <div class="col-12">
          <div class="card border-secondary">
            <div class="card-header">
              <i class="bi bi-diagram-3 me-2"></i><strong>Dependency Rules</strong>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-sm table-bordered mb-0">
                  <thead class="table-dark">
                    <tr>
                      <th>Package</th>
                      <th>Shell</th>
                      <th>MFE Dashboard</th>
                      <th>MFE Settings</th>
                      <th>Strategy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code>&#64;angular/core</code></td>
                      <td>20.x</td><td>20.x</td><td>20.x</td>
                      <td><span class="badge bg-danger">singleton: true</span></td>
                    </tr>
                    <tr>
                      <td><code>component-library</code></td>
                      <td>2.0.0</td><td>1.2.0</td><td>2.0.0</td>
                      <td><span class="badge bg-success">singleton: false</span></td>
                    </tr>
                    <tr>
                      <td><code>state-library</code></td>
                      <td>4.0.0</td><td>3.0.0</td><td>4.0.0</td>
                      <td><span class="badge bg-success">singleton: false</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class HomeComponent {}
