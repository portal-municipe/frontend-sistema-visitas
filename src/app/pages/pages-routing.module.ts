import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VisitsComponent } from './visit/visits/visits.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { UsersComponent } from './users/users.component';
import { VisitCreateComponent } from './visit/visit-create/visit-create.component';
import { ActiveVisitsComponent } from './visit/active-visits/active-visits.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'visitas', component: VisitsComponent },
  { path: 'visitas/novo', component: VisitCreateComponent },
  { path: 'visitas/ativas', component: ActiveVisitsComponent },
  { path: 'visitantes', component: VisitorsComponent },
  { path: 'utilizadores', component: UsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
