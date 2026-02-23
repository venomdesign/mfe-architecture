import { Component } from '@angular/core';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  template: `
    <div class="api-docs-wrapper">
      <iframe
        src="/docs/index.html"
        title="@shared/component-library — API Documentation"
        class="docs-iframe">
      </iframe>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
    .api-docs-wrapper {
      /* Pull out of the showcase-main padding so the iframe fills edge-to-edge */
      margin: -2rem -2rem -2rem -2rem;
      height: calc(100vh - 0px);
      display: flex;
      flex-direction: column;
    }
    .docs-iframe {
      flex: 1;
      width: 100%;
      border: none;
      min-height: 0;
    }
  `]
})
export class ApiDocsComponent {}
