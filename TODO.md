# TODO — Syncfusion Document Editor Integration

## component-library
- [x] 1. `component-library/package.json` — add `@syncfusion/ej2-angular-documenteditor` peer + dev dep
- [x] 2. `component-library/src/lib/document-editor/ui-document-editor.component.ts` — new component
- [x] 3. `component-library/src/styles/_document-editor.scss` — new style partial
- [x] 4. `component-library/src/styles/index.scss` — add `@use 'document-editor'`
- [x] 5. `component-library/src/public-api.ts` — export new component + config interface
- [x] 6. `npm install` in component-library
- [x] 7. `npm run build` in component-library — ✅ Built successfully

## component-library-showcase
- [x] 8. `component-library-showcase/package.json` — add `@syncfusion/ej2-angular-documenteditor` dep
- [x] 9. `component-library-showcase/src/app/pages/document-editor/document-editor.component.ts` — new showcase page
- [x] 10. `component-library-showcase/src/app/app.routes.ts` — add `/document-editor` route
- [x] 11. `component-library-showcase/src/app/app.component.ts` — add nav link
- [x] 12. `component-library-showcase/angular.json` — add `ej2-documenteditor/styles/bootstrap5.css`
- [x] 13. `npm install` in component-library-showcase
- [x] 14. Verify with `npm run start:fast` — ✅ Compiled & running at http://localhost:4300/
