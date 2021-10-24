import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ViewDashboardListComponent } from './modules/dashboard/components/view-dashboard-list/view-dashboard-list.component';
import { ViewRoomsListComponent } from './modules/rooms/components/view-rooms-list/view-rooms-list.component';
import { ViewUsersListComponent } from './modules/users/components/view-users-list/view-users-list.component';
import { ViewTasksListComponent } from './modules/tasks/components/view-tasks-list/view-tasks-list.component';
import { ViewUserRoomsListComponent } from './modules/user-rooms/components/view-user-rooms-list/view-user-rooms-list.component';
import { ViewAdminListComponent } from './modules/admin-list/components/view-admin-list/view-admin-list.component';
import { DefaultComponent } from './shared/layouts/default/default.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guard/auth.guard' 
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { SignUpComponent } from './modules/sign-up/sign-up.component';
import { VerifyEmailComponent } from './modules/verify-email/verify-email.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: ViewDashboardListComponent,
        canActivate: [AuthGuard]
        },
      {
        path: 'users',
        component: ViewUsersListComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'rooms',
        component: ViewRoomsListComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'user-rooms',
        component: ViewUserRoomsListComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'tasks',
        component: ViewTasksListComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'admin-list',
        component: ViewAdminListComponent,
        canActivate: [AuthGuard]
      }, 
   ]
  },
  { path:'login', component: LoginComponent},
  { path:'forgot-password', component: ForgotPasswordComponent},
  { path:'register', component: SignUpComponent},
  { path:'verify-email', component: VerifyEmailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
