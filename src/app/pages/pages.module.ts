import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisitsComponent } from './visit/visits/visits.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { UsersComponent } from './user/users/users.component';
import { MaterialModule } from '@app/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { VisitCreateComponent } from './visit/visit-create/visit-create.component';
import { VisitStep1SelectComponent } from './visit/visit-create/components/visit-step1-select/visit-step1-select.component';
import { VisitStep2ConfirmComponent } from './visit/visit-create/components/visit-step2-confirm/visit-step2-confirm.component';
import { VisitStep2NewComponent } from './visit/visit-create/components/visit-step2-new/visit-step2-new.component';
import { VisitStep3DetailsComponent } from './visit/visit-create/components/visit-step3-details/visit-step3-details.component';
import { ActiveVisitsComponent } from './visit/active-visits/active-visits.component';
import { VisitorModalCreateOrEditComponent } from './visitors/visitor-modal-create-or-edit/visitor-modal-create-or-edit.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserFormComponent } from './user/user-create/components/user-form/user-form.component';
import { VisitDetailModalComponent } from './visit/visits/visit-detail-modal/visit-detail-modal.component';
import { TranslateModule } from '@ngx-translate/core';
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
    VisitorModalCreateOrEditComponent,
    UserCreateComponent,
    UserFormComponent,
    VisitDetailModalComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule,
    SharedModule,
    TranslateModule
  ]
})
export class PagesModule { }
