import { Component } from '@angular/core';
import {
  UiGridComponent,
  GridConfig
} from '@shared/component-library';

@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [UiGridComponent],
  template: `
    <div class="mb-4">
      <h2 class="fw-bold">UiGrid</h2>
      <p class="text-muted">
        A config-driven wrapper around the Syncfusion EJ2 Grid. Pass a single
        <code>GridConfig</code> object to control columns, data, paging, sorting,
        filtering, toolbar, and more.
      </p>
    </div>

    <!-- Import -->
    <div class="mb-4">
      <h5 class="section-title">Import</h5>
      <div class="code-block">import &#123; UiGridComponent, GridConfig &#125; from '&#64;shared/component-library';</div>
    </div>

    <!-- Basic Grid -->
    <div class="mb-5">
      <h5 class="section-title">Basic Grid</h5>
      <p class="text-muted small mb-3">Minimal config — columns and data only.</p>
      <div class="preview-box">
        <ui-grid [config]="basicConfig"></ui-grid>
      </div>
      <div class="code-block">basicConfig: GridConfig = &#123;
  columns: [
    &#123; field: 'id',         headerText: 'ID',         width: 80,  isPrimaryKey: true &#125;,
    &#123; field: 'name',       headerText: 'Name',       width: 180 &#125;,
    &#123; field: 'department', headerText: 'Department', width: 160 &#125;,
    &#123; field: 'salary',     headerText: 'Salary',     width: 120, type: 'number', format: 'C2', textAlign: 'Right' &#125;,
  ],
  data: employees,
&#125;;</div>
    </div>

    <!-- Paging + Sorting + Filtering -->
    <div class="mb-5">
      <h5 class="section-title">Paging · Sorting · Filtering</h5>
      <p class="text-muted small mb-3">Enable interactive features via boolean flags.</p>
      <div class="preview-box">
        <ui-grid [config]="fullConfig"></ui-grid>
      </div>
      <div class="code-block">fullConfig: GridConfig = &#123;
  columns: [...],
  data: employees,
  allowPaging: true,
  pageSize: 5,
  allowSorting: true,
  allowFiltering: true,
  filterType: 'Menu',
  height: 320,
&#125;;</div>
    </div>

    <!-- Toolbar + Export -->
    <div class="mb-5">
      <h5 class="section-title">Toolbar &amp; Export</h5>
      <p class="text-muted small mb-3">Add a search box and export buttons via the <code>toolbar</code> array.</p>
      <div class="preview-box">
        <ui-grid [config]="toolbarConfig"></ui-grid>
      </div>
      <div class="code-block">toolbarConfig: GridConfig = &#123;
  columns: [...],
  data: employees,
  allowPaging: true,
  pageSize: 5,
  allowSorting: true,
  allowExcelExport: true,
  allowPdfExport: true,
  toolbar: ['Search', 'ExcelExport', 'PdfExport'],
&#125;;</div>
    </div>

    <!-- API Reference -->
    <div class="mb-4">
      <h5 class="section-title">GridConfig API Reference</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>Property</th><th>Type</th><th>Default</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>columns</code></td><td><code>GridColumnConfig[]</code></td><td>—</td><td>Column definitions (required)</td></tr>
            <tr><td><code>data</code></td><td><code>object[]</code></td><td>—</td><td>Row data array (required)</td></tr>
            <tr><td><code>allowPaging</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable pagination</td></tr>
            <tr><td><code>pageSize</code></td><td><code>number</code></td><td><code>10</code></td><td>Rows per page</td></tr>
            <tr><td><code>allowSorting</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable column sorting</td></tr>
            <tr><td><code>allowFiltering</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable column filtering</td></tr>
            <tr><td><code>filterType</code></td><td><code>'Menu' | 'CheckBox' | 'Excel'</code></td><td><code>'Menu'</code></td><td>Filter UI style</td></tr>
            <tr><td><code>toolbar</code></td><td><code>string[]</code></td><td><code>[]</code></td><td>Toolbar items (e.g. 'Search', 'ExcelExport')</td></tr>
            <tr><td><code>height</code></td><td><code>string | number</code></td><td><code>'auto'</code></td><td>Grid height</td></tr>
            <tr><td><code>allowResizing</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable column resizing</td></tr>
            <tr><td><code>allowExcelExport</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable Excel export</td></tr>
            <tr><td><code>allowPdfExport</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Enable PDF export</td></tr>
            <tr><td><code>selectionMode</code></td><td><code>'Single' | 'Multiple'</code></td><td><code>'Single'</code></td><td>Row selection mode</td></tr>
            <tr><td><code>gridLines</code></td><td><code>'Default' | 'Both' | 'None' | 'Horizontal' | 'Vertical'</code></td><td><code>'Default'</code></td><td>Grid border style</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- GridColumnConfig API -->
    <div class="mb-4">
      <h5 class="section-title">GridColumnConfig API Reference</h5>
      <div class="table-responsive">
        <table class="table table-bordered table-sm">
          <thead class="table-dark">
            <tr>
              <th>Property</th><th>Type</th><th>Default</th><th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr><td><code>field</code></td><td><code>string</code></td><td>—</td><td>Data field key (required)</td></tr>
            <tr><td><code>headerText</code></td><td><code>string</code></td><td>—</td><td>Column header label (required)</td></tr>
            <tr><td><code>width</code></td><td><code>number | string</code></td><td>—</td><td>Column width</td></tr>
            <tr><td><code>type</code></td><td><code>'string' | 'number' | 'boolean' | 'date' | 'datetime'</code></td><td>—</td><td>Data type</td></tr>
            <tr><td><code>format</code></td><td><code>string</code></td><td>—</td><td>Format string (e.g. 'C2', 'yMd')</td></tr>
            <tr><td><code>textAlign</code></td><td><code>'Left' | 'Center' | 'Right'</code></td><td><code>'Left'</code></td><td>Cell text alignment</td></tr>
            <tr><td><code>isPrimaryKey</code></td><td><code>boolean</code></td><td><code>false</code></td><td>Mark as primary key column</td></tr>
            <tr><td><code>visible</code></td><td><code>boolean</code></td><td><code>true</code></td><td>Show or hide the column</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `
})
export class GridShowcaseComponent {

  private readonly employees = [
    { id: 1,  name: 'Alice Johnson',   department: 'Engineering',  salary: 95000,  startDate: new Date(2019, 2, 15), active: true  },
    { id: 2,  name: 'Bob Martinez',    department: 'Design',       salary: 82000,  startDate: new Date(2020, 6, 1),  active: true  },
    { id: 3,  name: 'Carol White',     department: 'Engineering',  salary: 105000, startDate: new Date(2018, 0, 22), active: true  },
    { id: 4,  name: 'David Lee',       department: 'Marketing',    salary: 74000,  startDate: new Date(2021, 3, 10), active: false },
    { id: 5,  name: 'Eva Brown',       department: 'HR',           salary: 68000,  startDate: new Date(2022, 8, 5),  active: true  },
    { id: 6,  name: 'Frank Wilson',    department: 'Engineering',  salary: 112000, startDate: new Date(2017, 11, 3), active: true  },
    { id: 7,  name: 'Grace Taylor',    department: 'Design',       salary: 88000,  startDate: new Date(2020, 1, 28), active: true  },
    { id: 8,  name: 'Henry Anderson',  department: 'Marketing',    salary: 79000,  startDate: new Date(2021, 9, 14), active: false },
    { id: 9,  name: 'Iris Thomas',     department: 'Engineering',  salary: 98000,  startDate: new Date(2019, 5, 20), active: true  },
    { id: 10, name: 'Jack Jackson',    department: 'HR',           salary: 71000,  startDate: new Date(2023, 0, 9),  active: true  },
    { id: 11, name: 'Karen Harris',    department: 'Engineering',  salary: 103000, startDate: new Date(2018, 7, 17), active: true  },
    { id: 12, name: 'Liam Martin',     department: 'Design',       salary: 85000,  startDate: new Date(2022, 4, 30), active: true  },
  ];

  readonly basicConfig: GridConfig = {
    columns: [
      { field: 'id',         headerText: 'ID',         width: 70,  isPrimaryKey: true, textAlign: 'Center' },
      { field: 'name',       headerText: 'Name',       width: 200 },
      { field: 'department', headerText: 'Department', width: 160 },
      { field: 'salary',     headerText: 'Salary',     width: 130, type: 'number', format: 'C2', textAlign: 'Right' },
    ],
    data: this.employees,
  };

  readonly fullConfig: GridConfig = {
    columns: [
      { field: 'id',         headerText: 'ID',         width: 70,  isPrimaryKey: true, textAlign: 'Center' },
      { field: 'name',       headerText: 'Name',       width: 200 },
      { field: 'department', headerText: 'Department', width: 160 },
      { field: 'salary',     headerText: 'Salary',     width: 130, type: 'number', format: 'C2', textAlign: 'Right' },
      { field: 'startDate',  headerText: 'Start Date', width: 140, type: 'date',   format: 'yMd' },
      { field: 'active',     headerText: 'Active',     width: 100, type: 'boolean', textAlign: 'Center' },
    ],
    data: this.employees,
    allowPaging: true,
    pageSize: 5,
    allowSorting: true,
    allowFiltering: true,
    filterType: 'Menu',
    height: 320,
  };

  readonly toolbarConfig: GridConfig = {
    columns: [
      { field: 'id',         headerText: 'ID',         width: 70,  isPrimaryKey: true, textAlign: 'Center' },
      { field: 'name',       headerText: 'Name',       width: 200 },
      { field: 'department', headerText: 'Department', width: 160 },
      { field: 'salary',     headerText: 'Salary',     width: 130, type: 'number', format: 'C2', textAlign: 'Right' },
      { field: 'startDate',  headerText: 'Start Date', width: 140, type: 'date',   format: 'yMd' },
    ],
    data: this.employees,
    allowPaging: true,
    pageSize: 5,
    allowSorting: true,
    allowResizing: true,
    allowExcelExport: true,
    allowPdfExport: true,
    toolbar: ['Search', 'ExcelExport', 'PdfExport'],
  };
}
