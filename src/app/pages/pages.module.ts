import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisitsComponent } from './visit/visits/visits.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { UsersComponent } from './users/users.component';
import { MaterialModule } from '@app/material.module';
import { AppFiltersComponent, AppListComponent } from '@app/shared/components';
import { SharedModule } from '@app/shared/shared.module';
import { VisitCreateComponent } from './visit/visit-create/visit-create.component';
import { VisitStep1SelectComponent } from './visit/visit-create/components/visit-step1-select/visit-step1-select.component';
import { VisitStep2ConfirmComponent } from './visit/visit-create/components/visit-step2-confirm/visit-step2-confirm.component';
import { VisitStep2NewComponent } from './visit/visit-create/components/visit-step2-new/visit-step2-new.component';
import { VisitStep3DetailsComponent } from './visit/visit-create/components/visit-step3-details/visit-step3-details.component';
import { ActiveVisitsComponent } from './visit/active-visits/active-visits.component';
import { VisitorModalCreateOrEditComponent } from './visitors/visitor-modal-create-or-edit/visitor-modal-create-or-edit.component';

@NgModule({
  declarations: [
    DashboardComponent,
    VisitsComponent,
    VisitorsComponent,
    UsersComponent,
    VisitCreateComponent,
    VisitStep1SelectComponent,
    VisitStep2ConfirmComponent,
    VisitStep2NewComponent,
    VisitStep3DetailsComponent,
    ActiveVisitsComponent,
    VisitorModalCreateOrEditComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PagesModule { }
