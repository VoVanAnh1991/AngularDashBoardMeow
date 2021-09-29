import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { DefaultComponent } from 'src/app/shared/layouts/default/default.component';
import { ViewOngoingTasksComponent } from './components/view-ongoing-tasks/view-ongoing-tasks.component';
import { ViewMyTasksComponent } from './components/view-my-tasks/view-my-tasks.component';
import { ViewTasksListComponent } from './components/view-tasks-list/view-tasks-list.component';
import { ViewCompletedTasksComponent } from './components/view-completed-tasks/view-completed-tasks.component';

const routes: Routes = [{
  path: '',
  component: DefaultComponent,
  canActivate: [AuthGuard],
  children: [
    {
      path: 'tasks',
      component: ViewTasksListComponent,
      canActivate: [AuthGuard],
      children: [
        {
          path: 'ongoing-tasks',
          component: ViewOngoingTasksComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'my-tasks',
          component: ViewMyTasksComponent,
          canActivate: [AuthGuard]
        },
        {
          path: 'completed-tasks',
          component: ViewCompletedTasksComponent,
          canActivate: [AuthGuard]
        },
      ]
    },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
