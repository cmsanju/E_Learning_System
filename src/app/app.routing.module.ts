import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ProfessorDashboardComponent } from './professor-dashboard/professor-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'admindashboard', component: AdminDashboardComponent },
  { path: 'professordashboard', component: ProfessorDashboardComponent },
  { path: 'userdashboard', component: UserDashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
