import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AppStateService } from '@shared/state-lib';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="container py-4">

      <!-- ── Title ──────────────────────────────────────────────────────── -->
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

      <!-- ── Shell Instance ID ──────────────────────────────────────────── -->
      <div class="alert alert-primary d-flex align-items-center gap-3 mb-4">
        <i class="bi bi-fingerprint fs-4"></i>
        <div>
          <strong>Shell AppStateService Instance ID:</strong>
          <span class="font-monospace fw-bold ms-2" style="letter-spacing:.12em">
            {{ stateService.instanceId }}
          </span>
          <span class="ms-2 text-muted small">
            — compare this with the IDs shown inside each MFE panel
          </span>
        </div>
      </div>

      <!-- ── MFE Cards ──────────────────────────────────────────────────── -->
      <div class="row g-4 mb-5">
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
                <li><i class="bi bi-check-circle text-success me-2"></i>Can pin its own version of shared libs</li>
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
                <li><i class="bi bi-check-circle text-success me-2"></i>Can pin its own version of shared libs</li>
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
      </div>

      <!-- ── Singleton vs Non-Singleton Explanation ─────────────────────── -->
      <h4 class="fw-bold mb-3">
        <i class="bi bi-diagram-3 me-2 text-primary"></i>
        Singleton vs Non-Singleton — How It Works
      </h4>

      <div class="row g-4 mb-4">

        <!-- Non-singleton -->
        <div class="col-md-6">
          <div class="card h-100 border-success">
            <div class="card-header bg-success text-white">
              <i class="bi bi-boxes me-2"></i>
              <strong>singleton: false</strong>
              <span class="badge bg-light text-success ms-2">Current default</span>
            </div>
            <div class="card-body">
              <p class="small mb-2">
                Native Federation creates a <strong>separate module scope</strong> for each MFE.
                The shared library is loaded independently per MFE.
              </p>
              <ul class="small mb-3">
                <li class="mb-1">✅ Each MFE can use a <strong>different version</strong> of the library</li>
                <li class="mb-1">✅ No version conflicts between MFEs</li>
                <li class="mb-1">✅ MFEs can upgrade independently</li>
                <li class="mb-1">❌ State is <strong>isolated</strong> — changes in one MFE are not visible in another</li>
                <li class="mb-1">❌ Multiple copies of the library are loaded (larger bundle)</li>
              </ul>
              <div class="p-2 rounded" style="background:#f8f9fa;font-size:.8rem">
                <strong>Live proof:</strong> Open Dashboard MFE and Settings MFE.
                Their <code>instanceId</code> values will be <strong>different</strong>.
                Incrementing notifications in one MFE will <strong>not</strong> affect the other.
              </div>
            </div>
          </div>
        </div>

        <!-- Singleton -->
        <div class="col-md-6">
          <div class="card h-100 border-danger">
            <div class="card-header bg-danger text-white">
              <i class="bi bi-box me-2"></i>
              <strong>singleton: true</strong>
              <span class="badge bg-light text-danger ms-2">Force one version</span>
            </div>
            <div class="card-body">
              <p class="small mb-2">
                Native Federation ensures <strong>only one copy</strong> of the library is loaded.
                All MFEs share the same module instance.
              </p>
              <ul class="small mb-3">
                <li class="mb-1">✅ State is <strong>shared</strong> — changes in one MFE are visible in all</li>
                <li class="mb-1">✅ Single copy loaded (smaller bundle)</li>
                <li class="mb-1">✅ Services like <code>AppStateService</code> work as a true platform store</li>
                <li class="mb-1">❌ All MFEs <strong>must use the same version</strong></li>
                <li class="mb-1">❌ Version mismatch throws at runtime (with <code>strictVersion: true</code>)</li>
              </ul>
              <div class="p-2 rounded" style="background:#f8f9fa;font-size:.8rem">
                <strong>Live proof:</strong> After switching to singleton, Dashboard and Settings
                will show the <strong>same instanceId</strong>.
                Incrementing in one MFE <strong>updates the count in both</strong>.
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ── How to Switch ──────────────────────────────────────────────── -->
      <div class="card border-warning mb-4">
        <div class="card-header bg-warning">
          <i class="bi bi-sliders me-2"></i>
          <strong>How to Force Singleton Mode (One Version for All MFEs)</strong>
        </div>
        <div class="card-body">
          <p class="small mb-3">
            All MFE federation configs import from <code>&#64;shared/federation-config</code>.
            Changing that one file propagates to every MFE on next build.
          </p>

          <p class="fw-semibold small mb-1">
            <strong>Step 1</strong> — Edit <code>federation-config/index.js</code>:
          </p>
          <pre class="p-3 rounded mb-3" style="background:#1e293b;color:#e2e8f0;font-size:.8rem;overflow-x:auto"><code>sharedLibraries: &#123;
  '&#64;shared/component-library': &#123;
    singleton: true,        // ← change from false
    strictVersion: true,    // ← throw on version mismatch
    requiredVersion: 'auto',
  &#125;,
  '&#64;shared/state-lib': &#123;
    singleton: true,        // ← change from false
    strictVersion: true,
    requiredVersion: 'auto',
  &#125;,
&#125;</code></pre>

          <p class="fw-semibold small mb-1">
            <strong>Step 2</strong> — Rebuild all MFEs:
          </p>
          <pre class="p-3 rounded mb-3" style="background:#1e293b;color:#e2e8f0;font-size:.8rem"><code># Rebuild state library first (source of truth)
cd shared-state-lib &amp;&amp; npm run build

# Then rebuild each MFE
cd ../shell-app &amp;&amp; npm run build
cd ../mfe-dashboard &amp;&amp; npm run build
cd ../mfe-settings &amp;&amp; npm run build</code></pre>

          <p class="fw-semibold small mb-1">
            <strong>Step 3</strong> — Verify:
          </p>
          <p class="small mb-0">
            Open Dashboard and Settings MFEs. Both should show the <strong>same Instance ID</strong>.
            Incrementing notifications in one should update the count in the other and in the shell navbar.
          </p>
        </div>
      </div>

      <!-- ── Version Matrix ─────────────────────────────────────────────── -->
      <div class="card border-secondary mb-4">
        <div class="card-header">
          <i class="bi bi-table me-2"></i><strong>Current Dependency Matrix</strong>
        </div>
        <div class="card-body p-0">
          <div class="table-responsive">
            <table class="table table-sm table-bordered mb-0">
              <thead class="table-dark">
                <tr>
                  <th>Package</th>
                  <th>Shell</th>
                  <th>MFE Dashboard</th>
                  <th>MFE Settings</th>
                  <th>Current Strategy</th>
                  <th>Recommended for State</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>&#64;angular/core</code></td>
                  <td>20.x</td><td>20.x</td><td>20.x</td>
                  <td><span class="badge bg-danger">singleton: true</span></td>
                  <td><span class="badge bg-danger">singleton: true</span></td>
                </tr>
                <tr>
                  <td><code>&#64;shared/state-lib</code></td>
                  <td>1.0.0</td><td>1.0.0</td><td>1.0.0</td>
                  <td><span class="badge bg-success">singleton: false</span></td>
                  <td><span class="badge bg-danger">singleton: true</span></td>
                </tr>
                <tr>
                  <td><code>&#64;shared/component-library</code></td>
                  <td>—</td><td>1.0.0</td><td>1.0.0</td>
                  <td><span class="badge bg-success">singleton: false</span></td>
                  <td><span class="badge bg-success">singleton: false</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer text-muted small">
          See <code>docs/shared-library-versioning.md</code> for the full decision guide.
        </div>
      </div>

    </div>
  `
})
export class HomeComponent {
  readonly stateService = inject(AppStateService);
}
