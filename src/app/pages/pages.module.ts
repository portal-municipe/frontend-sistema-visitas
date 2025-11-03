import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisitsComponent } from './visits/visits.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '@app/material.module';
import { AppFiltersComponent, AppListComponent } from '@app/shared/components';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    VisitsComponent,
    VisitorsComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PagesModule { }
