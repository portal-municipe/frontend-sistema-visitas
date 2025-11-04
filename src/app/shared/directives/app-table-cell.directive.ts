// src/app/shared/components/table/app-table-cell.directive.ts
import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    selector: '[appTableCell]',
})
export class AppTableCellDirective {
    // nome da coluna que este template vai renderizar
    @Input('appTableCell') key: string;

    constructor(public template: TemplateRef<any>) { }
}
