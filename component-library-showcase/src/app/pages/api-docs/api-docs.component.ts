import { Component, ElementRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-api-docs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="api-docs-wrapper">
      <iframe
        #docsFrame
        src="/docs/index.html"
        title="@shared/component-library — API Documentation"
        class="docs-iframe"
        [class.iframe-visible]="iframeVisible"
        (load)="onIframeLoad()">
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
      /* White background prevents the grey #f8f9fa body colour from bleeding
         through the transparent iframe while a new Compodoc page is loading */
      background: #fff;
    }
    .docs-iframe {
      flex: 1;
      width: 100%;
      border: none;
      min-height: 0;
      background: #fff;
      /* Start hidden; revealed via .iframe-visible once the page has loaded */
      opacity: 0;
      transition: opacity 0.15s ease-in;
    }
    .docs-iframe.iframe-visible {
      opacity: 1;
    }
  `]
})
export class ApiDocsComponent {
  @ViewChild('docsFrame') docsFrame!: ElementRef<HTMLIFrameElement>;

  /** Whether the iframe content is ready to be shown. */
  iframeVisible = false;

  constructor(private cdr: ChangeDetectorRef) {}

  /**
   * Fired by the iframe's native `load` event — the new Compodoc page (and all
   * its sub-resources) has finished loading.  Fade the iframe back in, then
   * re-attach the beforeunload listener so the next navigation also gets the
   * hide-before-paint treatment.
   */
  onIframeLoad(): void {
    this.iframeVisible = true;
    this.cdr.detectChanges();
    this.attachBeforeUnloadListener();
  }

  /**
   * Attach a one-shot `beforeunload` listener to the iframe's own window.
   * `beforeunload` fires synchronously the moment the iframe begins navigating
   * to a new page — before any new content paints — so hiding the iframe here
   * eliminates the visible white flash entirely.  The listener is `{ once: true }`
   * so it self-removes; `onIframeLoad` re-attaches it after every navigation.
   */
  private attachBeforeUnloadListener(): void {
    try {
      const iframeWindow = this.docsFrame?.nativeElement?.contentWindow;
      if (iframeWindow) {
        iframeWindow.addEventListener(
          'beforeunload',
          () => {
            this.iframeVisible = false;
            this.cdr.detectChanges();
          },
          { once: true }
        );
      }
    } catch {
      // Cross-origin access denied — no-op; the CSS background fallback still
      // prevents the grey body colour from bleeding through.
    }
  }
}
