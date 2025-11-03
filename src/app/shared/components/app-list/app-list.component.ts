import { Component, Input, OnInit } from '@angular/core';
import { DataProvider, PagedResult, Sort, TableColumn } from '@app/shared/types/table.types';

@Component({
  selector: 'app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.scss']
})
export class AppListComponent<T = any, F = any> implements OnInit {
  @Input() title = 'Listagem';
  @Input() columns: TableColumn<T>[] = [];
  @Input() filters: any[] = [];
  @Input() provider: DataProvider<T, F>; // (page, size, filters, sort) => Observable<PagedResult<T>>
  @Input() pageSize = 10;

  data: T[] = [];
  total = 0;
  pageIndex = 0;
  currentFilters: any = {};
  currentSort: Sort = { active: '', direction: '' };

  ngOnInit() { this.fetch(); }

  onApplyFilters(f: any) { this.currentFilters = f; this.pageIndex = 0; this.fetch(); }

  onResetFilters() { this.currentFilters = {}; this.pageIndex = 0; this.fetch(); }

  onSort(s: Sort) { this.currentSort = s; this.fetch(); }

  onPage(e: { pageIndex: number; pageSize: number }): void {
  this.pageIndex = e.pageIndex;
  this.pageSize = e.pageSize;
  this.fetch();
}

private fetch(): void {
  if (!this.provider) {
    return;
  }

  this.provider(this.pageIndex, this.pageSize, this.currentFilters, this.currentSort)
    .subscribe((res: PagedResult<T>) => {
      this.data = res.items;
      this.total = res.total;
    });
}

}
