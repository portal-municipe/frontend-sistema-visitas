// src/app/shared/components/table/app-table.component.ts
import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';
import { AppTableCellDirective } from '@app/shared/directives/app-table-cell.directive';
import { TableColumn } from '@app/core/models/index';
@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent
  implements OnChanges, AfterContentInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  // templates que vierem de fora
  @ContentChildren(AppTableCellDirective)
  cellTemplates!: QueryList<AppTableCellDirective>;

  displayedColumns: string[] = [];
  // mapa: { [key: string]: TemplateRef }
  templateMap: { [key: string]: any } = {};

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.columns) {
      this.displayedColumns = (this.columns || []).map(c => c.key);
    }
  }

  ngAfterContentInit(): void {
    this.templateMap = {};
    if (this.cellTemplates) {
      this.cellTemplates.forEach(tpl => {
        this.templateMap[tpl.key] = tpl.template;
      });
    }
  }

  hasTemplate(key: string): boolean {
    return !!this.templateMap[key];
  }

  getTemplate(key: string) {
    return this.templateMap[key];
  }
}
