// src/app/shared/components/filters/filters.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './app-filters.component.html',
  styleUrls: ['./app-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppFiltersComponent {
  @Input() form: FormGroup;
  @Input() departments: { label: string; value: string | null }[] = [];
  @Output() clear = new EventEmitter<void>();

  onClear() { this.clear.emit(); }
}
