// src/app/shared/components/table/table.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { TableColumn } from '@core/models/ui-config';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  trackByKey(_: number, col: TableColumn) {
    return col.key;
  }
}
