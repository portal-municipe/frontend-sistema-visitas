import {
  Component,
  Input,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges,
  ContentChildren,
  QueryList,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { AppTableCellDirective } from '@app/shared/directives/app-table-cell.directive';
import { TableColumn } from '@app/core/models';

@Component({
  selector: 'app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppTableComponent implements OnChanges, AfterContentInit {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];

  // templates que vierem de fora
  @ContentChildren(AppTableCellDirective)
  cellTemplates!: QueryList<AppTableCellDirective>;

  // para o pai ouvir ações da célula
  @Output() cellAction = new EventEmitter<{ col: string; row: any; event?: Event }>();

  displayedColumns: string[] = [];
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

  // será chamado pelo template projetado
  onCellAction(col: string, row: any, event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    this.cellAction.emit({ col, row, event });
  }
}
