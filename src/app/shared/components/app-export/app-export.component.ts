// src/app/shared/components/export/export.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface ExportAction {
  key: string;    // ex: 'pdf', 'csv'
  label: string;  // ex: 'PDF'
  icon?: string;  // ex: 'picture_as_pdf'
}

@Component({
  selector: 'app-export',
  templateUrl: './app-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppExportComponent {
  @Input() actions: ExportAction[] = [];
  @Input() disabled = false;

  @Output() action = new EventEmitter<string>();

  onClick(key: string) {
    this.action.emit(key);
  }
}
