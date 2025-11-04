// src/app/shared/components/table/table.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';

// se já tiveres este tipo noutro sítio, reaproveita
export interface TableColumn {
  key: string;
  header: string;
  align?: 'left' | 'right' | 'center';
  width?: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent implements OnChanges {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  /** usado pelo mat-table no header/rows */
  displayedColumns: string[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.displayedColumns = (this.columns || []).map((c) => c.key);
    }
  }

  trackByKey(_: number, col: TableColumn): string {
    return col.key;
  }
}
