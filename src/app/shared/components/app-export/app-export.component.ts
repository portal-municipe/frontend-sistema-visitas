// src/app/shared/components/export/export.component.ts
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-export',
  templateUrl: './app-export.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppExportComponent {
  @Input() disabled = false;
  @Output() pdf = new EventEmitter<void>();
  @Output() csv = new EventEmitter<void>();
}
