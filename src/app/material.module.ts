// src/app/shared/material.module.ts
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatBadgeModule } from '@angular/material/badge';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';

const modules = [
  MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule,
  MatButtonModule, MatCardModule, MatMenuModule, MatTableModule,
  MatInputModule, MatFormFieldModule, MatSnackBarModule,
  MatSelectModule, MatBadgeModule, MatChipsModule, MatPaginatorModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule { }
