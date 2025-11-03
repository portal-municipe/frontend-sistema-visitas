// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material base que os teus componentes usam

// componentes shared
import { AppListComponent } from './components/app-list/app-list.component';
import { AppFiltersComponent } from './components/app-filters/app-filters.component';
import { AppTableComponent } from './components/app-table/app-table.component';
import { AppPaginationComponent } from './components/app-pagination/app-pagination.component';
import { AppExportComponent } from './components/app-export/app-export.component';
import { AppButtonComponent } from './components/app-button/app-button.component';
import { MaterialModule } from '@app/material.module';

import { AppSidebarComponent } from './components/app-sidebar/app-sidebar.component';
import { AppTopbarComponent } from './components/app-topbar/app-topbar.component';
import { RouterModule } from '@angular/router';
import { DataVoidComponent } from './components/data-void/data-void.component';

@NgModule({
  declarations: [
    AppListComponent,
    AppFiltersComponent,
    AppTableComponent,
    AppPaginationComponent,
    AppExportComponent,
    AppButtonComponent,
    AppSidebarComponent,
    AppTopbarComponent,
    DataVoidComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],
  exports: [
    // exporta para os outros módulos poderem usar
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppSidebarComponent,
    AppTopbarComponent,
    AppListComponent,
    AppFiltersComponent,
    AppTableComponent,
    AppPaginationComponent,
    AppExportComponent,
    AppButtonComponent,
    DataVoidComponent,
    RouterModule
  ]
})
export class SharedModule { }
