import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TasksRoutingModule } from './tasks-routing.module';
import { ViewTasksListComponent } from './components/view-tasks-list/view-tasks-list.component';

@NgModule({
  declarations: [ViewTasksListComponent],
  imports: [
    CommonModule,
    TasksRoutingModule
  ]
})
export class TasksModule { }
