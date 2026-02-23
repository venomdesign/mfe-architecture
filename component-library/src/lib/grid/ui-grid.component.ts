import { Component, Input } from '@angular/core';
import {
  GridModule,
  PageService,
  SortService,
  FilterService,
  ToolbarService,
  SelectionService,
  ResizeService,
  ColumnChooserService,
  ExcelExportService,
  PdfExportService
} from '@syncfusion/ej2-angular-grids';

/**
 * Column definition for UiGridComponent.
 */
export interface GridColumnConfig {
  /** Data field name (must match a key in the data objects) */
  field: string;
  /** Column header label */
  headerText: string;
  /** Column width in pixels or CSS string */
  width?: number | string;
  /** Data type for sorting/filtering */
  type?: 'string' | 'number' | 'boolean' | 'date' | 'datetime';
  /** Format string (e.g. 'yMd' for dates, 'N2' for numbers) */
  format?: string;
  /** Text alignment within the column */
  textAlign?: 'Left' | 'Center' | 'Right';
  /** Marks this column as the primary key */
  isPrimaryKey?: boolean;
  /** Whether the column is visible */
  visible?: boolean;
  /** Clip mode for overflow text */
  clipMode?: 'Clip' | 'Ellipsis' | 'EllipsisWithTooltip';
}

/**
 * Top-level configuration object for UiGridComponent.
 */
export interface GridConfig {
  /** Column definitions */
  columns: GridColumnConfig[];
  /** Row data array */
  data: object[];
  /** Enable paging */
  allowPaging?: boolean;
  /** Rows per page (default: 10) */
  pageSize?: number;
  /** Enable column sorting */
  allowSorting?: boolean;
  /** Enable column filtering */
  allowFiltering?: boolean;
  /** Filter UI type */
  filterType?: 'Menu' | 'CheckBox' | 'Excel';
  /** Enable row selection */
  allowSelection?: boolean;
  /** Row selection mode */
  selectionMode?: 'Single' | 'Multiple';
  /** Grid height (CSS string or pixel number) */
  height?: string | number;
  /** Toolbar items (e.g. ['Search', 'ExcelExport']) */
  toolbar?: string[];
  /** Enable column resizing */
  allowResizing?: boolean;
  /** Enable Excel export */
  allowExcelExport?: boolean;
  /** Enable PDF export */
  allowPdfExport?: boolean;
  /** Row height in pixels */
  rowHeight?: number;
  /** Show or hide the grid border */
  gridLines?: 'Default' | 'Both' | 'None' | 'Horizontal' | 'Vertical';
}

/**
 * UiGridComponent — a config-driven wrapper around the Syncfusion EJ2 Grid.
 *
 * @example
 * <ui-grid [config]="gridConfig"></ui-grid>
 *
 * gridConfig: GridConfig = {
 *   columns: [
 *     { field: 'id',   headerText: 'ID',   width: 80,  isPrimaryKey: true },
 *     { field: 'name', headerText: 'Name', width: 200 },
 *   ],
 *   data: [{ id: 1, name: 'Alice' }],
 *   allowPaging: true,
 *   pageSize: 10,
 *   allowSorting: true,
 *   allowFiltering: true,
 * };
 */
@Component({
  selector: 'ui-grid',
  standalone: true,
  imports: [GridModule],
  providers: [ PageService, SortService, FilterService, ToolbarService, SelectionService, ResizeService, ColumnChooserService, ExcelExportService, PdfExportService ],
  template: `
    <ejs-grid [dataSource]="config.data" [allowPaging]="config.allowPaging ?? false" [allowSorting]="config.allowSorting ?? false" [allowFiltering]="config.allowFiltering ?? false" [allowResizing]="config.allowResizing ?? false" [allowExcelExport]="config.allowExcelExport ?? false" [allowPdfExport]="config.allowPdfExport ?? false" [height]="config.height ?? 'auto'" [rowHeight]="config.rowHeight" [gridLines]="config.gridLines ?? 'Default'" [toolbar]="config.toolbar ?? []" [pageSettings]="pageSettings" [filterSettings]="filterSettings" [selectionSettings]="selectionSettings">
      <e-columns>
        @for (col of config.columns; track col.field) {
          <e-column [field]="col.field" [headerText]="col.headerText" [width]="col.width" [type]="col.type" [format]="col.format" [textAlign]="col.textAlign ?? 'Left'" [isPrimaryKey]="col.isPrimaryKey ?? false" [visible]="col.visible ?? true" [clipMode]="col.clipMode ?? 'EllipsisWithTooltip'">
          </e-column>
        }
      </e-columns>
    </ejs-grid>
  `
})
export class UiGridComponent {
  /** Grid configuration object */
  @Input({ required: true }) config!: GridConfig;

  get pageSettings() {
    return { pageSize: this.config.pageSize ?? 10 };
  }

  get filterSettings() {
    return { type: this.config.filterType ?? 'Menu' };
  }

  get selectionSettings() {
    return { type: this.config.selectionMode ?? 'Single' };
  }
}
