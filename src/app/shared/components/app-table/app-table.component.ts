// src/app/shared/components/table/table.component.ts
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent {
  @Input() dataSource: MatTableDataSource<any>;
  @Input() displayed: string[] = [];
  // util para pipes na célula
  formatDuracao(min: number): string {
    if (min == null) { return '—'; }
    const h = Math.floor(min / 60);
    const m = min % 60;
    if (h && m) { return h + 'h ' + m + 'm'; }
    if (h) { return h + 'h'; }
    return m + 'm';
  }
}
