// src/app/shared/components/pagination/pagination.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pagination',
  templateUrl: './app-pagination.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPaginationComponent {
  @Input() length = 0;
  @Input() pageSize = 10;
  @Input() pageSizeOptions: number[] = [5, 10, 20];

  @Output() page = new EventEmitter<PageEvent>();

  onPage(e: PageEvent) {
    this.page.emit(e);
  }
}
